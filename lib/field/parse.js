'use strict'

/**
 * @typedef {import('../spec/field/field.js').PicType_t} PicType_t
 * @typedef {import('../spec/field/field.js').DATA_TYPE_t} DATA_TYPE_t
 * @typedef {import('../spec/fields/common.js').MessageMeta_t} MessageMeta_t
 */

const iconv = require('iconv-lite');

const { SignIs, OverpunchOpt, OverpunchCode } = require('../spec/field/cobol/overpunch.js');
const { DATA_TYPE } = require('../spec/field/field.js');

const cobolPic = require('../spec/field/cobol/cobol-pic.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Method
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * X >> String
 * @param {String} text COBOL格式的數字字串
 * @param {PicType_t} picType 
 * @returns 
 */
function toUnsigned(text, picType) {
    return toSigned(text, picType);
}

/**
 * 9/S9 >> Number
 * @param {String} text COBOL格式的數字字串
 * @param {PicType_t} picType 
 * @param {OverpunchOpt} [opt] 
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
 * @param {PicType_t} picType Source type
 * @param {DATA_TYPE_t} dataType Destination type
 * @param {string} text 
 * @param {OverpunchOpt} [overpunchOption] 進位符號選項
 * @returns 
 */
function trasnferValue(picType, dataType, text, overpunchOption) {
    switch (dataType) {
        case DATA_TYPE.FILLER: { return ''; }
        /** 字串類 */
        case DATA_TYPE.X: { return text; }
        case DATA_TYPE.String: { return text.trim(); }
        case DATA_TYPE.Date: { return toDate(text); }
        case DATA_TYPE.Time:
        case DATA_TYPE.Datetime:
        case DATA_TYPE.Timestamp: { return toDateTime(text); }
        /** 數字類 */
        case DATA_TYPE.Unsigned: {
            return toUnsigned(text, picType);
        }
        case DATA_TYPE.Signed: {
            return toSigned(text, picType, (overpunchOption ?? new OverpunchOpt()));
        }
        default: { return ''; }
    }
}

/**
 * 將電文內容轉成對應資料型態
 * @param {Buffer} input 訊息內容
 * @param {object} options 
 * @param {string} [options.picStr] COBOL PIC Clause
 * @param {PicType_t} options.picType 
 * @param {DATA_TYPE_t} options.dataType 資料型態
 * @param {OverpunchOpt} [options.overpunchOption] 進位符號選項
 * @returns {string|number|Date} 轉換後的資料
 */
function parse(input, options) {
    if (!input) return '';

    const picType = options.picStr ? cobolPic.parse(options.picStr) : options.picType;

    // COBOL語言特性處理
    const buffer = (picType.type === 'X') ? input.subarray(0, picType.size) : input.subarray(-picType.size);
    const text = iconv.decode(buffer, 'CP950');

    // COBOL資料轉換
    const value = trasnferValue(picType, options.dataType, text, options.overpunchOption);

    return value;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
