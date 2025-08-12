'use strict'

const CobolPic = require('./cobol-pic.js');
const DataType = require('./data-type.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Class
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class Field
 */
class Field {
    /** @type {CobolPic.PicType} */
    #picType;
    /** @type {number} */
    #lenght;
    /** @type {string|number|null} */ 
    #value;

    /** @type {DataType.Type} */
    type;
    /** @type {string} */
    rawValue;
    /** @type {string} */
    name;
    /** @type {string} */
    description;

    /**
     * @param {object} options
     * @param {CobolPic.PicType} options.picType COBOL PIC Type
     * @param {string?} options.picStr COBOL PIC Clause
     * @param {DataType.Type} options.type 
     * @param {string|number|null} options.value
     */
    constructor(options = {}) {
        this.#picType = options.picType ?? CobolPic.parse(options.picStr);
        this.#lenght = this.#picType.length + this.#picType.decimalPlaces;

        this.type = options.type;
        this.name = '';
        this.description = '';

        this.value = options.value ?? null;
    }

    get value() {
        return this.#value;
    }

    /**
     * @param {string|number} newValue
     */
    set value(newValue) {
        this.#value = newValue;
        this.rawValue = this.#conversion(newValue);
    }

    /**
     * X
     * @param {tring|number} value 
     * @returns 
     */
    #toX(value) {
        /** @type {string} */
        let newValue = '';

        if (typeof value === 'number') {
            newValue = Number.isNaN(value) ? '' : String(value);
        } else if (typeof str === 'string') {
            newValue = value;
        } else {
            newValue = ''
        }

        return newValue;
    }

    /**
     * 9
     * @param {tring|number} value 
     * @returns 
     */
    #to9(value) {
        if (!value) return '';

        /** @type {number} */
        const num = (typeof value === 'number') ? value : Number(value);
        if (Number.isNaN(num)) return '';

        // Note: 已經有IEEE 754 雙精度浮點數會遇到的溢位問題
        value = Math.trunc((value * Math.pow(10, this.#picType.decimalPlaces)));

        /** @type {number} */
        const newValue = String(value);

        return newValue;
    }

    /**
     * @param {tring|number} value 
     * @returns 
     */
    #conversion(value) {
        let newValue = '';

        switch (this.type) {
            case DataType.Type.FILLER:
                newValue = ''.padEnd(this.#lenght, ' ');
                break;
            /** 字串類 */
            case DataType.Type.X:
                newValue = this.#toX(value).padEnd(this.#lenght, ' ').slice(0, this.#lenght);
                break;
            case DataType.Type.Date:
            case DataType.Type.Time:
            case DataType.Type.Datetime:
            case DataType.Type.Timestamp:
                newValue = '';
                break;
            /** 數字類 */
            case DataType.Type._9:
                newValue = this.#to9(value).padStart(this.#lenght, '0').slice(-this.#lenght);
                break;
            case DataType.Type.S9: // TODO: S9要查表
                newValue = '';
                break;
            default:
                newValue = '';
                break;
        }

        return newValue;
    }

    /**
     * @returns 
     */
    get isValid() {
        return (this.#value != null) && (this.#lenght === this.rawValue.length);
    }
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Method
---------+---------+---------+---------+---------+---------+---------+--------*/
function processDatatype() {

}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports.Field = Field;
