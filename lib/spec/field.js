'use strict'

/**
 * @typedef {import('../field/cobol/cobol-pic.js').PicType} PicType
 */

/**------+---------+---------+---------+---------+---------+---------+----------
 * Base Types
---------+---------+---------+---------+---------+---------+---------+--------*/

let cnt = 1;
/** @enum {number} Modern Data Type */
const DataType = {
  FILLER   : -1,
  String   : cnt,  X: cnt++,
  Unsigned : cnt, _9: cnt++,
  Signed   : cnt, S9: cnt++,
  Date     : cnt++,
  Time     : cnt++,
  Datetime : cnt++,
  Timestamp: cnt++,
};
Object.freeze(DataType);


/**
 * @class Field_t 欄位定義
 */
class Field_t {
    /** @type {string} 名稱 */
    name;
    /** @type {PicType} COBOL-PIC 資料結構描述 */
    picType;
    /** @type {DataType} 資料型態 */
    dataType;
    /** @type {string} 說明 */
    description;

    /**
     * @param {object} options 
     */
    constructor(options) {
        this.name = options.name;
        this.picType = options.picType;
        this.dataType = options.dataType;
        this.description = options.description;
    }

    toString() {
        return `${this.picType.toString()} ${this.name} : ${this.description}`;
    }
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { DataType, Field_t };
