'use strict'

const DataType = require('./data-type.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Class
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class Field
 */
class Field {
    /** @type {DataType.Type} */
    type;
    /** @type {string} */
    lenght;
    /** @type {string|number|null} */ 
    #value;
    /** @type {string} */
    rawValue;

    /** @type {string} */
    name;
    /** @type {string} */
    description;

    /**
     * @param {DataType.Type} type 
     * @param {number} lenght Data lenght
     * @param {string|number|null} value
     */
    constructor(type, lenght, value = null) {
        this.type   = type;
        this.lenght = lenght > 0 ? lenght : 0;
        this.value  = value;

        this.name = '';
        this.description = '';
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
     * @param {tring|number} value 
     * @returns 
     */
    #conversion(value) {
        let newValue = '';

        switch (this.type) {
            case DataType.Type.FILLER:
                newValue = '';
                break;
            /** 字串類 */
            case DataType.Type.X:
            case DataType.Type.Date:
            case DataType.Type.Time:
            case DataType.Type.Datetime:
            case DataType.Type.Timestamp:
                if (typeof value === 'number') {
                    newValue = Number.isNaN(value) ? '' : String(value);
                } else if (typeof str === 'string') {
                    newValue = value;
                } else {
                    newValue = ''
                }

                newValue = newValue.padEnd(this.lenght, ' ').slice(0, this.lenght);

                break;
            /** 數字類 */
            case DataType.Type._9:
            case DataType.Type.S9: // TODO: S9要查表
                if (typeof value === 'number') {
                    newValue = Number.isNaN(value) ? '' : String(value);
                } else if (typeof str === 'string') {
                    const num = Number(value);
                    newValue = Number.isNaN(num) ? '' : String(num);
                } else {
                    newValue = ''
                }

                newValue = newValue.padStart(this.lenght, '0').slice(-this.lenght);

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
        return (this.#value != null) && (this.lenght === this.rawValue.length);
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
