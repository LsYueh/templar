'use strict'

const { Spec } = require('./type.js');
const { PicType } = require('../field/cobol-pic.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 全子系統通用的檔頭
 */
const ControlHeader = [
    {
        key: 'SUBSYSTEM-NAME',
        value: new Spec({
            name: 'SUBSYSTEM-NAME',
            picType: new PicType('9', 2),
            description: '子系統名稱',
        })
    },
    {
        key: 'FUNCTION-CODE',
        value: new Spec({
            name: 'FUNCTION-CODE',
            picType: new PicType('9', 2),
            description: '執行功能類型',
        })
    },
    {
        key: 'MESSAGE-TYPE',
        value: new Spec({
            name: 'MESSAGE-TYPE',
            picType: new PicType('9', 2),
            description: '訊息類型',
        })
    },
    {
        key: 'MESSAGE-TIME',
        value: new Spec({
            name: 'MESSAGE-TIME',
            picType: new PicType('9', 6),
            description: '訊息傳送時間(HHMMSS)',
        })
    },
    {
        key: 'STATUS-CODE',
        value: new Spec({
            name: 'STATUS-CODE',
            picType: new PicType('9', 2),
            description: '狀態訊息碼',
        })
    },
];

/**
 * `單筆訊息與檔案傳輸子系統`的檔頭
 */
const FileTransferHeader = [
    {
        key: 'SOURCE-ID',
        value: new Spec({
            name: 'SOURCE-ID',
            picType: new PicType('X', 4),
            description: '傳送方之ID',
        })
    },
    {
        key: 'OBJECT-ID',
        value: new Spec({
            name: 'OBJECT-ID',
            picType: new PicType('X', 4),
            description: '接收方之ID',
        })
    },
    {
        key: 'BODY-LENGTH-FT',
        value: new Spec({
            name: 'BODY-LENGTH',
            picType: new PicType('9', 4),
            description: '訊息格式中BODY之長度',
        })
    },
];

/**
 * `成交回報資料`使用之傳輸擋頭
 */
const ApHeader = [
    {
        key: 'BODY-LENGTH-AP',
        value: new Spec({
            name: 'BODY-LENGTH',
            picType: new PicType('9', 4),
            description: '成交回報資料總長度',
        })
    },
    {
        key: 'BODY-CNT',
        value: new Spec({
            name: 'BODY-CNT',
            picType: new PicType('9', 4),
            description: '成交回報資料筆數',
        })
    },
];

const batchs = [].concat(
    ControlHeader, FileTransferHeader, ApHeader
);

/** @type {Map<string, Spec>} */
const Specs = new Map(batchs.map((data) => [data.key, data.value]));


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Specs };
