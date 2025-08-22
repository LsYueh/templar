'use strict'

/**
 * @typedef {import('../spec/field/field.js').PicType} PicType
 */

const iconv = require('iconv-lite');

const { SignIs, OverpunchOpt, OverpunchCode } = require('../spec/field/cobol/overpunch.js');
const { DATA_TYPE } = require('../spec/field/field.js');

const cobolPic = require('../spec/field/cobol/cobol-pic.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Method - Stringify
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * X
 * @param {tring|number} value 
 * @returns 
 */
function toX(value) {
    /** @type {string} */
    let newValue = '';

    if (typeof value === 'number') {
        newValue = Number.isNaN(value) ? '' : String(value);
    } else if (typeof value === 'string') {
        newValue = value;
    } else {
        newValue = ''
    }

    return newValue;
}

/**
 * 9
 * @param {tring|number} value 
 * @param {PicType} picType 
 * @returns 
 */
function to9(value, picType) {
    if (!value) return '';

    /** @type {number} */
    const num = (typeof value === 'number') ? value : Number(value);
    if (Number.isNaN(num)) return '';

    // Note: 已經有IEEE 754 雙精度浮點數會遇到的溢位問題
    value = Math.trunc((value * Math.pow(10, picType.decimals)));

    /** @type {number} */
    const newValue = String(value);

    return newValue;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Method - Parse
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * X >> String
 * @param {String} text COBOL格式的數字字串
 * @param {PicType} picType 
 * @returns 
 */
function toUnsigned(text, picType) {
    return toSigned(text, picType);
}

/**
 * 9/S9 >> Number
 * @param {String} text COBOL格式的數字字串
 * @param {PicType} picType 
 * @param {OverpunchOpt?} opt 
 * @returns 
 */
function toSigned(text, picType, opt = null) {
    let str = text.trim();

    // 去除前導零
    str = str.replace(/^0+/, '');

    // 根據PIC內容限制大小
    str = str.slice(-picType.size);

    // Sign overpunch decode
    let sign = 1;
    if (opt) {
        const overpunchCode = OverpunchCode[opt.dataStorage];

        if (opt.signIs == SignIs.Trailing) {
            const last = str.slice(-1);
            const body = str.slice(0, -1);

            const m = overpunchCode[last];
            if (!m) throw new Error(`Unknown overpunch char: '${last}'`);

            sign = m.sign;

            str = body + m.digit;
        } else {
            const first = str.slice(0, 1);
            const body  = str.slice(1);

            const m = overpunchCode[first];
            if (!m) throw new Error(`Unknown overpunch char: '${first}'`);

            sign = m.sign;

            str = m.digit + body;
        }
    }

    // 補上隱含小數點
    if (picType.decimals > 0) {
        if (str === '') str = '0';

        if (str.length <= picType.decimals) {
            str = str.padStart(picType.decimals + 1, '0');
        }

        const $ = str.length - picType.decimals
        const intPart = str.slice(0, $);
        const fracPart = str.slice($);

        return sign * parseFloat(intPart + '.' + fracPart);
    }

    return sign * parseInt(str || '0', 10);
}

/**
 * X(8) >> Date
 * @param {string} text YYYYMMDD
 * @returns 
 */
function toDate(text) {
    if (!text) return new Date(); 

    if (text.length < 8) throw new Error(`Unknown Time Format String: '${text}'`);

    const year  = Number(text.substring(0, 4));
    const month = Number(text.substring(4, 6)); // 01~12
    const day   = Number(text.substring(6, 8));

    return new Date(year, month - 1, day);
}

/**
 * X(6)/X(9) >> Date
 * @param {string} text HHmmss/HHmmssSSS
 * @returns 
 */
function toDateTime(text) {
    if (!text) return new Date(); 

    if ((text.length !== 6) && (text.length !== 9)) throw new Error(`Unknown Time Format String: '${text}'`);

    const hour   = Number(text.substring(0, 2));
    const minute = Number(text.substring(2, 4));
    const second = Number(text.substring(4, 6));
    const ms     = (text.length === 9) ? Number(text.substring(6, 9)) : 0;

    const date = new Date();
    date.setHours(hour, minute, second, ms);

    return date;
}

/**
 * 將電文內容轉成對應資料型態
 * @param {object} options 
 * @param {PicType} options.picType 
 * @param {string?} options.picStr COBOL PIC Clause
 * @param {DATA_TYPE} options.dataType 
 * @param {OverpunchOpt?} options.overpunchOption 
 * @param {Buffer?} options.buffer 訊息內容
 * @returns 
 */
function parse(options) {
    if (!options.buffer) return '';

    const picType = options.picStr ? cobolPic.parse(options.picStr) : options.picType;

    // COBOL語言特性處理
    const buffer = (picType.type === 'X') ? options.buffer.subarray(0, picType.size) : options.buffer.subarray(-picType.size);
    const text = iconv.decode(buffer, 'CP950');

    let value = '';
    switch (options.dataType) {
        case DATA_TYPE.FILLER: { value = ''; break; }
        /** 字串類 */
        case DATA_TYPE.X: { value = text; break; }
        case DATA_TYPE.String: { value = text.trim(); break; }
        case DATA_TYPE.Date: { value = toDate(text); break; }
        case DATA_TYPE.Time:
        case DATA_TYPE.Datetime:
        case DATA_TYPE.Timestamp: { value = toDateTime(text); break; }
        /** 數字類 */
        case DATA_TYPE.Unsigned: {
            value = toUnsigned(text, picType); break;
        }
        case DATA_TYPE.Signed: {
            value = toSigned(text, picType, (options.overpunchOption ?? new OverpunchOpt())); break;
        }
        default: { value = ''; break; }
    }

    return value;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
