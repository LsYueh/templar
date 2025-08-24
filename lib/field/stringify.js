'use strict'

/**------+---------+---------+---------+---------+---------+---------+----------
 * Method - Stringify
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * X
 * @param {string|number} value 
 * @returns {string}
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
 * @param {string|number} value 
 * @param {PicType_t} picType 
 * @returns {string}
 */
function to9(value, picType) {
    if (!value) return '';

    /** @type {number} */
    const num = (typeof value === 'number') ? value : Number(value);
    if (Number.isNaN(num)) return '';

    // Note: 已經有IEEE 754 雙精度浮點數會遇到的溢位問題
    value = Math.trunc((num * Math.pow(10, picType.decimals)));

    /** @type {string} */
    const newValue = String(value);

    return newValue;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { toX, to9 };
