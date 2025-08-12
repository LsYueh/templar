'use strict'

const { Spec } = require('../type.js');
const { PicType } = require('../../field/cobol-pic.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * `單筆訊息與檔案傳輸子系統`的檔身
 */
const batchs = [
    {
        key: 'FILE-CODE',
        value: new Spec({
            name: 'FILE-CODE',
            picType: new PicType('X', 3),
            description: '檔案代號',
        })
    },
    {
        key: 'FILE-SIZE',
        value: new Spec({
            name: 'FILE-SIZE',
            picType: new PicType('9', 8),
            description: '資料檔案之大小(以byte為單位)',
        })
    },
    {
        key: 'EOF',
        value: new Spec({
            name: 'EOF',
            picType: new PicType('9', 1),
            description: '若為檔案最後一筆資料訊息填1，否則為0',
        })
    },
    {
        key: 'DATA',
        value: new Spec({
            name: 'DATA',
            picType: new PicType('X', 994),
            description: '資料檔案之內容',
        })
    },
    {
        key: 'DATA-4K',
        value: new Spec({
            name: 'DATA',
            picType: new PicType('X', 3976),
            description: '資料檔案之內容 (4K擴充版)',
        })
    },
    {
        key: 'REQUEST-MESSAGE',
        value: new Spec({
            name: 'REQUEST-MESSAGE',
            picType: new PicType('X', 995),
            description: '由傳送介面送出之單筆訊息內容',
        })
    },
    {
        key: 'RESPONSE-MESSAGE',
        value: new Spec({
            name: 'RESPONSE-MESSAGE',
            picType: new PicType('X', 995),
            description: '由接收介面送出單筆訊訊息內容',
        })
    },
];

/** @type {Map<string, Spec>} */
const Specs = new Map(batchs.map((data) => [data.key, data.value]));


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Specs };
