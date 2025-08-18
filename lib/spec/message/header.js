'use strict'

const { PicType, DATA_TYPE, Field_t } = require('../field/field.js');

const common = require('./common.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec Source
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 全子系統通用的檔頭
 */
const CONTROL_HEADER = [
    {
        key: 'SUBSYSTEM-NAME',
        value: new Field_t({
            name: 'SubsystemName',
            picType: new PicType('9', 2),
            dataType: DATA_TYPE.String,
            description: '子系統名稱',
        })
    },
    {
        key: 'FUNCTION-CODE',
        value: new Field_t({
            name: 'FunctionCode',
            picType: new PicType('9', 2),
            dataType: DATA_TYPE.String,
            description: '執行功能類型',
        })
    },
    {
        key: 'MESSAGE-TYPE',
        value: new Field_t({
            name: 'MessageType',
            picType: new PicType('9', 2),
            dataType: DATA_TYPE.String,
            description: '訊息類型',
        })
    },
    {
        key: 'MESSAGE-TIME',
        value: new Field_t({
            name: 'MessageTime',
            picType: new PicType('9', 6),
            dataType: DATA_TYPE.Time,
            description: '訊息傳送時間(HHMMSS)',
        })
    },
    {
        key: 'STATUS-CODE',
        value: new Field_t({
            name: 'StatusCode',
            picType: new PicType('9', 2),
            dataType: DATA_TYPE.String,
            description: '狀態訊息碼',
        })
    },
];

/**
 * `單筆訊息與檔案傳輸子系統`的檔頭
 */
const FILE_TRANSFER_HEADER = [
    {
        key: 'SOURCE-ID',
        value: new Field_t({
            name: 'SourceId',
            picType: new PicType('X', 4),
            dataType: DATA_TYPE.String,
            description: '傳送方之ID',
        })
    },
    {
        key: 'OBJECT-ID',
        value: new Field_t({
            name: 'ObjectId',
            picType: new PicType('X', 4),
            dataType: DATA_TYPE.String,
            description: '接收方之ID',
        })
    },
    {
        key: 'BODY-LENGTH',
        value: new Field_t({
            name: 'BodyLength',
            picType: new PicType('9', 4),
            dataType: DATA_TYPE.Unsigned,
            description: '訊息格式中BODY之長度',
        })
    },
];

/**
 * `成交回報資料`使用之傳輸擋頭
 */
const AP_HEADER = [
    {
        key: 'BODY-LENGTH',
        value: new Field_t({
            name: 'BodyLength',
            picType: new PicType('9', 4),
            dataType: DATA_TYPE.Unsigned,
            description: '成交回報資料總長度',
        })
    },
    {
        key: 'BODY-CNT',
        value: new Field_t({
            name: 'BodyCnt',
            picType: new PicType('9', 2),
            dataType: DATA_TYPE.Unsigned,
            description: '成交回報資料筆數',
        })
    },
];


/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 建立空物件
 * @param {string} category 
 * @returns 
 */
function messageHeaderFactory(category) {
    /** @type {{ Field: Field_t[], Key: string[], Index: any[], Size: any, length: number }} */
    const spec = SPEC[category];

    if (!spec) throw new Error(`Unknown Header Spec Category: '${category}'`);

    const messageHeader = {};

    for (const field of spec.Field) {
        messageHeader[field.name] = null;
    }

    return messageHeader;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec Object
---------+---------+---------+---------+---------+---------+---------+--------*/

/** Header specs */
const SPEC = {
    /** CONTROL-HEADER */
    ControlHeader: common.specFactory(CONTROL_HEADER, 'CONTROL-HEADER'),

    /** FILE-TRANSFER-HEADER */
    FileTransferHeader: common.specFactory(FILE_TRANSFER_HEADER, 'FILE-TRANSFER-HEADER'),

    /** AP-HEADER */
    ApHeader: common.specFactory(AP_HEADER, 'AP-HEADER'),
};


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { SPEC, messageHeaderFactory };
