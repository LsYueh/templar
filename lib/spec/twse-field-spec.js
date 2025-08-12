'use strict'

const { PicType } = require('../field/cobol-pic.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Class
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class Spec
 */
class Spec {
    /** @type {string} 名稱 */
    name;
    /** @type {PicType} COBOL-PIC 資料結構描述 */
    picType;
    /** @type {string} 說明 */
    description;

    /**
     * @param {object} options 
     */
    constructor(options) {
        this.name = options.name;
        this.picType = options.picType;
        this.description = options.description;
    }

    toString() {
        return `${this.picType.toString()} ${this.name} : ${this.description}`;
    }
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * 
---------+---------+---------+---------+---------+---------+---------+--------*/

/** @type {Spec[]} */
const ControlHeader = [
    new Spec({
        name: 'SUBSYSTEM-NAME',
        picType: new PicType('9', 2),
        description: '子系統名稱',
    }),
    new Spec({
        name: 'FUNCTION-CODE',
        picType: new PicType('9', 2),
        description: '執行功能類型',
    }),
    new Spec({
        name: 'MESSAGE-TYPE',
        picType: new PicType('9', 2),
        description: '訊息類型',
    }),
    new Spec({
        name: 'MESSAGE-TIME',
        picType: new PicType('9', 6),
        description: '訊息傳送時間(HHMMSS)',
    }),
    new Spec({
        name: 'STATUS-CODE',
        picType: new PicType('9', 2),
        description: '狀態訊息碼',
    }),
];

    // new Spec({
    //     name: '',
    //     picType: new PicType('', 0, 0),
    //     description: '',
    // }),

const Specs = [].concat(ControlHeader);

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Spec, Specs };
