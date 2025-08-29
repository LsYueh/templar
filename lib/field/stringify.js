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
 * X
 * @param {string|number|Date} value 
 * @param {PicType_t} picType 
 * @returns {string} 
 */
function toX(value, picType) {
    const ascii = toASCII(value, picType);

    const buffer = bufferPadEnd(ascii, picType.length).subarray(0, picType.length);

    return iconv.decode(buffer, 'CP950');
}

/**
 * 9
 * @param {string|number} value 
 * @param {PicType_t} picType 
 * @returns {string}
 */
function to9(value, picType) {
    const ascii = toASCII(value, picType);

    /** @type {Buffer?} */
    let buffer = null;

    if (picType.decimals === 0) {
        buffer = bufferPadStart(ascii, picType.length).subarray(-picType.length);
        
    } else {
        const a = bufferSplit(ascii, '.');

        const digit    = bufferPadStart(a[0], picType.length).subarray(-picType.length);
        const decimals = bufferPadEnd(a[1] ?? new Buffer.from([]), picType.decimals, '0').subarray(0, picType.decimals);

        buffer = Buffer.concat([digit, decimals]);
    }

    return iconv.decode(buffer, 'CP950');
}

/**
 * S9
 * @param {string|number} value 
 * @param {PicType_t} picType 
 * @returns {string}
 */
function toS9(value, picType, overpunchOption) {
    const ascii = toASCII(value, picType);

    /** @type {Buffer?} */
    let buffer = null;

    if (picType.decimals === 0) {
        buffer = bufferPadStart(ascii, picType.length).subarray(-picType.length);
        
    } else {
        const a = bufferSplit(ascii, '.');

        const digit    = bufferPadStart(a[0], picType.length).subarray(-picType.length);
        const decimals = bufferPadEnd(a[1] ?? new Buffer.from([]), picType.decimals, '0').subarray(0, picType.decimals);

        buffer = Buffer.concat([digit, decimals]);
    }

    return iconv.decode(buffer, 'CP950');

    // W.I.P.
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

    switch (picType.type) {
        case 'X': { return toX(input, picType); }
        case '9': { return to9(input, picType); }
        case 'S9': { return toS9(input, picType, overpunchOption); }
        default: { throw new TypeError('Unsupported PicType'); }
    }
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { stringify };
