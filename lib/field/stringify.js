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
 * @returns {Buffer} 
 */
function toASCII(input) {
    /** */ if (typeof input === "string") {
        return iconv.encode(input, 'cp950');
    } else if (typeof input === "number") {
        return iconv.encode(String(input), 'cp950');
    } else if (input instanceof Date) {
        const year = input.getFullYear();
        const month = String(input.getMonth() + 1).padStart(2, "0");
        const day = String(input.getDate()).padStart(2, "0");
        const yyyymmdd = `${year}${month}${day}`;
        return iconv.encode(yyyymmdd, 'cp950');

        // TODO: 根據picType內容切換時間格式
    } else {
        throw new TypeError('Unsupported type');
    }
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
    const ascii = toASCII(value);

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

    const buffer = bufferPadStart(ascii, picType.length).subarray(0, picType.length);

    return iconv.decode(buffer, 'CP950');

    // W.I.P.
}

/**
 * 9
 * @param {string|number} value 
 * @param {PicType_t} picType 
 * @returns {string}
 */
function toS9(value, picType, overpunchOption) {
    const ascii = toASCII(value, picType);

    const buffer = bufferPadStart(ascii, picType.length).subarray(0, picType.length);

    return iconv.decode(buffer, 'CP950');

    // W.I.P.
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { toX, to9, toS9 };
