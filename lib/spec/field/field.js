'use strict'

const cobolPic = require('./cobol/cobol-pic.js');

/**
 * @typedef {typeof cobolPic.PicType[keyof typeof cobolPic.PicType]} PicType_t
 */

/**------+---------+---------+---------+---------+---------+---------+----------
 * Base Types
---------+---------+---------+---------+---------+---------+---------+--------*/

let cnt = 1;
/**
 * @enum {number} Modern Data Type
 * 
 * @typedef {typeof DATA_TYPE[keyof typeof DATA_TYPE]} DATA_TYPE_t
 */
const DATA_TYPE = Object.freeze({
    FILLER   : -1,
    /** @type {number} Trimmed String */
    String   : cnt++,
    /** @type {number} Non-trimmed String */
    X        : cnt++,
    Unsigned : cnt, _9: cnt++,
    Signed   : cnt, S9: cnt++,
    Date     : cnt++,
    Time     : cnt++,
    Datetime : cnt++,
    Timestamp: cnt++,
});

/**
 * @class Field 欄位定義
 * 
 * @typedef {typeof Field[keyof typeof Field]} Field_t
 */
class Field {
    /** @type {string} 名稱 */
    name;
    /** @type {PicType_t} COBOL-PIC 資料結構描述 */
    picType;
    /** @type {DATA_TYPE_t} 資料型態 */
    dataType;
    /** @type {string} 說明 */
    description;
    /** @type {boolean} 資料長度變動，但是不超過COBOL-PIC所定義的長度 */
    isVariableLength = false;

    /** 
     * 建構子
     * @param {object} options 
     * @param {string} options.name 欄位名稱
     * @param {string} [options.picStr] COBOL PIC Clause
     * @param {PicType_t} options.picType 
     * @param {DATA_TYPE_t} [options.dataType] 資料型態
     * @param {string} options.description 說明
     * @param {boolean} [options.isVariableLength=false] 資料長度變動，但是不超過COBOL-PIC所定義的長度
     */
    constructor(options) {
        const picType = options.picStr ? cobolPic.parse(options.picStr) : options.picType;

        this.name = options.name;
        this.picType = picType;
        this.description = options.description;
        this.isVariableLength = options.isVariableLength;

        // 從COBOL PIC 自動抓預設 DATA_TYPE
        if (!options.dataType) {
            switch (picType.type) {
                case 'X': this.dataType = DATA_TYPE.String; break;
                case '9': this.dataType = DATA_TYPE.Unsigned; break;
                case 'S9':this.dataType = DATA_TYPE.Signed; break;
                default : this.dataType = options.dataType; break;
            }
        } else {
            this.dataType = options.dataType;
        }
    }

    toString() {
        return `${this.picType.toString()} ${this.name} : ${this.description}`;
    }
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { PicType: cobolPic.PicType, DATA_TYPE, Field };
