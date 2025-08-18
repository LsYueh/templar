'use strict'

const cobolPic = require('./cobol/cobol-pic.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Base Types
---------+---------+---------+---------+---------+---------+---------+--------*/

let cnt = 1;
/** @enum {number} Modern Data Type */
const DATA_TYPE = {
  FILLER   : -1,
  String   : cnt,  X: cnt++,
  Unsigned : cnt, _9: cnt++,
  Signed   : cnt, S9: cnt++,
  Date     : cnt++,
  Time     : cnt++,
  Datetime : cnt++,
  Timestamp: cnt++,
};
Object.freeze(DATA_TYPE);


/**
 * @class Field_t 欄位定義
 */
class Field_t {
    /** @type {string} 名稱 */
    name;
    /** @type {PicType} COBOL-PIC 資料結構描述 */
    picType;
    /** @type {DATA_TYPE} 資料型態 */
    dataType;
    /** @type {string} 說明 */
    description;

    /**
     * @param {object} options 
     * @param {string?} options.picStr COBOL PIC Clause
     * @param {PicType} options.picType 
     * @param {DATA_TYPE} options.dataType 
     */
    constructor(options) {
        const picType = options.picStr ? cobolPic.parse(options.picStr) : options.picType;

        this.name = options.name;
        this.picType = picType;
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
module.exports = { PicType: cobolPic.PicType, DATA_TYPE, Field_t };
