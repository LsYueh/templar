'use strict'

/**
 * @typedef {import('./field/field.js').Field_t} Field_t
 */

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {{key: string, value: Field_t}[]} source 
 * @param {string} description 
 * @returns 
 */
function specFactory(source, description = '') {
    const spec = {};

    /** 欄位內容 */
    spec.Field = source.map((obj) => obj.value);

    /** 欄位名稱 */
    spec.Key = source.map((obj) => obj.value.name);

    /** 欄位個別長度 (用於字元起始位置計算) */
    spec.Index = source.map((obj) => obj.value.picType.size);

    /** 欄位總長 */
    spec.Size = spec.Index.reduce((total, num) => total + num, 0);

    /** 欄位數量 */
    spec.length = spec.Field.length;

    /** 說明 */
    spec.description = description;

    return spec;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { specFactory };
