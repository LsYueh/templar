'use strict'

/**
 * @typedef {import('../spec/field/field.js').PicType_t} PicType_t
 */

const iconv = require('iconv-lite');

const { SignIs, OverpunchOpt, OverpunchCode } = require('../spec/field/cobol/overpunch.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Method - Stringify
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {string|number|Date} input 
 * @param {PicType_t} picType
 * @returns {Buffer} 
 */
function toASCII(input, picType) {
    /** */ if (typeof input === "string") {
        return iconv.encode(input, 'cp950');
    } else if (typeof input === "number") {
        return iconv.encode(String(input), 'cp950');
    } else if (input instanceof Date) {
        if (picType.type === 'S9') throw new Error(`Unsupported Date format with PIC S9`);

        const year = input.getFullYear();
        const month = String(input.getMonth() + 1).padStart(2, "0");
        const day = String(input.getDate()).padStart(2, "0");

        const hour = String(input.getHours()).padStart(2, "0");
        const minute = String(input.getMinutes()).padStart(2, "0");
        const second = String(input.getSeconds()).padStart(2, "0");
        const ms = String(input.getMilliseconds()).padStart(3, "0");

        if (picType.length === 8) {
            const yyyymmdd = `${year}${month}${day}`;
            return iconv.encode(yyyymmdd, 'cp950');
        } else if (picType.length === 6) {
            const HHmmss = `${hour}${minute}${second}`;
            return iconv.encode(HHmmss, 'cp950');
        } else if (picType.length === 9) {
            const HHmmssSSS = `${hour}${minute}${second}${ms}`;
            return iconv.encode(HHmmssSSS, 'cp950');
        } else {
            throw new Error(`Unsupported Date format with PIC X/9 length '${picType.length}'`);
        }
    } else {
        throw new TypeError('Unsupported type');
    }
}

/**
 * 
 * @param {Buffer} buf 
 * @param {string|Buffer} delimiter 
 * @returns 
 */
function bufferSplit(buf, delimiter = '.') {
    if (typeof delimiter === "string") {
        delimiter = Buffer.from(delimiter);
    } else if (!Buffer.isBuffer(delimiter)) {
        throw new TypeError("Delimiter must be string or Buffer");
    }

    const parts = [];

    let start = 0;
    let index;

    while ((index = buf.indexOf(delimiter, start)) !== -1) {
        parts.push(buf.subarray(start, index)); // 切片
        start = index + delimiter.length;
    }
    parts.push(buf.subarray(start)); // 最後一段

    return parts;
}

/**
 * 
 * @param {Buffer} buf 
 * @param {number} targetLength 
 * @param {string} padChar 
 * @returns 
 */
function bufferPadStart(buf, targetLength, padChar = '0') {
    if (buf.length >= targetLength) return buf;

    const padBuf = Buffer.alloc(targetLength, padChar); // 先填滿 padChar
    buf.copy(padBuf, targetLength - buf.length);        // 把原本的字串往後貼
    return padBuf;
}

/**
 * 
 * @param {Buffer} buf 
 * @param {number} targetLength 
 * @param {string} padChar 
 * @returns 
 */
function bufferPadEnd(buf, targetLength, padChar = ' ') {
    if (buf.length >= targetLength) return buf;

    const padBuf = Buffer.alloc(targetLength, padChar); // 先填滿 padChar
    buf.copy(padBuf, 0);                                // 把原本的字串貼在前面
    return padBuf;
}

/**
 * @param {Buffer} buf 
 * @returns 
 */
function removeMinus(buf) {
    const minus = '-'.charCodeAt(0); // 負號的 ASCII (45)

    // 找第一個負號位置
    const idx = buf.indexOf(minus);
    if (idx === -1) return buf; // 沒有負號，直接回傳原 buffer

    return buf.subarray(idx + 1);
}

/**
 * X
 * @param {Buffer} buf 
 * @param {PicType_t} picType 
 * @returns {string} 
 */
function toX(buf, picType) {
    const buffer = bufferPadEnd(buf, picType.length).subarray(0, picType.length);
    return iconv.decode(buffer, 'CP950');
}

/**
 * 9
 * @param {Buffer} buf 
 * @param {PicType_t} picType 
 * @returns {string}
 */
function to9(buf, picType) {
    /** @type {Buffer?} */
    let buffer = null;

    if (picType.decimals === 0) {
        buffer = bufferPadStart(buf, picType.length).subarray(-picType.length);

    } else {
        const a = bufferSplit(buf, '.');

        const digit = bufferPadStart(a[0], picType.length).subarray(-picType.length);
        const decimals = bufferPadEnd(a[1] ?? new Buffer.from([]), picType.decimals, '0').subarray(0, picType.decimals);

        buffer = Buffer.concat([digit, decimals]);
    }

    return iconv.decode(buffer, 'CP950');
}

/**
 * @param {*} OpCode 
 * @param {number} sign 
 * @param {string} digit 
 * @returns {string}    
 */
function getOpCode(OpCode, sign, digit) {
    const op = Object.entries(OpCode).find((opCode) => {
        return opCode[1].sign === sign && opCode[1].digit === digit;
    });

    if (!op) throw new Error(`Unsupported Overpunch code for sign '${sign}' and digit '${digit}'`);

    return op[0];
}

/**
 * S9
 * @param {Buffer} buf 
 * @param {PicType_t} picType 
 * @param {OverpunchOpt} overpunchOption 
 * @returns {string}
 */
function toS9(buf, picType, overpunchOption) {
    /** @type {Buffer?} */
    let buffer = null;

    const _buf = removeMinus(buf);

    if (picType.decimals === 0) {
        const digit = bufferPadStart(_buf, picType.length).subarray(-picType.length);

        buffer = digit;
    } else {
        const a = bufferSplit(_buf, '.');

        const digit = bufferPadStart(a[0], picType.length).subarray(-picType.length);
        const decimals = bufferPadEnd(a[1] ?? new Buffer.from([]), picType.decimals, '0').subarray(0, picType.decimals);

        buffer = Buffer.concat([digit, decimals]);
    }

    // Overpunch Encoding
    const text = iconv.decode(buffer, 'CP950');

    const OpCode = OverpunchCode[overpunchOption.dataStorage];

    const sign = buf[0] === 45 ? -1 : 1;

    if (overpunchOption.signIs === SignIs.Trailing) {
        const digit = text.slice(-1);

        const code = getOpCode(OpCode, sign, digit);
        
        return text.slice(0, -1) + code;
    } else if (overpunchOption.signIs === SignIs.Leading) {
        const digit = text.slice(0, 1);

        const code = getOpCode(OpCode, sign, digit);

        return code + text.slice(1);
    } else {
        throw new TypeError(`Unsupported SignIs: ${overpunchOption.signIs}`);
    }
}

/**
 * 
 * @param {string|number|Date} input 
 * @param {object} options 
 * @param {PicType_t} options.picType 
 * @param {OverpunchOpt} [options.overpunchOption] 
 * @returns 
 */
function stringify(input, options = {}) {
    const picType = options.picType;
    const overpunchOption = options.overpunchOption ?? new OverpunchOpt();

    const ascii = toASCII(input, picType);

    switch (picType.type) {
        case 'X': { return toX(ascii, picType); }
        case '9': { return to9(ascii, picType); }
        case 'S9': { return toS9(ascii, picType, overpunchOption); }
        default: { throw new TypeError('Unsupported PicType'); }
    }
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { stringify };
