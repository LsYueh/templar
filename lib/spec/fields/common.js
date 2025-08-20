'use strict'

/**
 * @typedef {import('../field/field.js').Field_t} Field_t
 */

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {{key: string, value: Field_t}[]} source 
 * @param {string} description 
 * @returns MessageMeta_t
 * 
 * @typedef {ReturnType<typeof messageMetaFactory>} MessageMeta_t
 * @description 用於建立MessageMeta物件的工廠函式
 */
function messageMetaFactory(source, description = '') {
    const messageMeta = {};

    /** 欄位內容 */
    messageMeta.Field = source.map((obj) => obj.value);

    /** 欄位名稱 */
    messageMeta.Key = source.map((obj) => obj.value.name);

    /** 欄位個別長度 (用於字元起始位置計算) */
    messageMeta.Index = source.map((obj) => obj.value.picType.size);

    /** 欄位總長 */
    messageMeta.Size = messageMeta.Index.reduce((total, num) => total + num, 0);

    /** 欄位數量 */
    messageMeta.length = messageMeta.Field.length;

    /** 說明 */
    messageMeta.description = description;

    /** @type {boolean} 資料長度變動，但是不超過COBOL-PIC所定義的長度 */
    messageMeta.isVariableLength = messageMeta.Field.some((field) => field.isVariableLength);

    return messageMeta;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { messageMetaFactory };
