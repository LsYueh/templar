'use strict'

/**
 * @typedef {import('../field/cobol-pic.js').PicType} PicType
 */

const CobolPic = require('./cobol-pic.js');
const { DataType } = require('./data-type.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Method
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
    value = Math.trunc((value * Math.pow(10, picType.decimalPlaces)));

    /** @type {number} */
    const newValue = String(value);

    return newValue;
}

/**
 * @param {object} options 
 * @param {PicType} options.picType 
 * @param {string?} options.picStr COBOL PIC Clause
 * @param {DataType} options.type 
 * @param {string|number|null} options.value 
 * @returns 
 */
function convert(options) {
    const picType = options.picStr ? CobolPic.parse(options.picStr) : options.picType;

    const size = picType.size;

    let value = '';
    switch (options.type) {
        case DataType.FILLER:
            value = ''.padEnd(size, ' ');
            break;
        /** 字串類 */
        case DataType.X:
            value = toX(options.value).padEnd(size, ' ').slice(0, size);
            break;
        case DataType.Date:
        case DataType.Time:
        case DataType.Datetime:
        case DataType.Timestamp:
            value = '';
            break;
        /** 數字類 */
        case DataType._9:
            value = to9(options.value, picType).padStart(size, '0').slice(-size);
            break;
        case DataType.S9: // TODO: S9要查表
            value = '';
            break;
        default:
            value = '';
            break;
    }

    return value;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { convert };
