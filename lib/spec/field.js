'use strict'

/**------+---------+---------+---------+---------+---------+---------+----------
 * Base Types
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class PicType
 */
class PicType {
    /** @type {string} COBOL PIC Type X/9/S9 */
    type;
    /** @type {number} 字串長度/整數位數 */
    length; // Integer digits
    /** @type {number} 小數位數 */
    decimals;

    /**
     * @param {string} type COBOL PIC Type X/9/S9
     * @param {number} length 字串長度/整數位數
     * @param {number} decimals 小數位數
     */
    constructor(type = '', length = 0, decimals = 0) {
        this.type = type;
        this.length = (length > 0) ? length : 0;
        this.decimals = (decimals > 0) ? decimals : 0;
    }

    /**
     * COBOL-PIC 總佔用資料的長度
     */
    get size() {
        return (this.length + this.decimals);
    }

    toString() {
        return `${this.type}(${this.length})` + String((this.decimals > 0) ? `V(${this.decimals})` : '');
    }
}


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
module.exports = { PicType, DataType, Field_t };
