'use strict'

/**
 * @typedef {import('../field/data-type.js').Type} Type
 * @typedef {import('../field/cobol-pic.js').PicType} PicType
 */

/**------+---------+---------+---------+---------+---------+---------+----------
 * Base Types
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class Spec
 */
class Spec {
    /** @type {string} 名稱 */
    name;
    /** @type {PicType} COBOL-PIC 資料結構描述 */
    picType;
    /** @type {Type} 資料型態 */
    type;
    /** @type {string} 說明 */
    description;

    /**
     * @param {object} options 
     */
    constructor(options) {
        this.name = options.name;
        this.picType = options.picType;
        this.type = options.type;
        this.description = options.description;
    }

    toString() {
        return `${this.picType.toString()} ${this.name} : ${this.description}`;
    }
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Spec };
