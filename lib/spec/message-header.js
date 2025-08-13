'use strict'

const { Spec } = require('./type.js');

const { DataType } = require('../field/data-type.js');
const { PicType } = require('../field/cobol/cobol-pic.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec Source
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 全子系統通用的檔頭
 */
const CONTROL_HEADER = [
    {
        key: 'SUBSYSTEM-NAME',
        value: new Spec({
            name: 'SubsystemName',
            picType: new PicType('9', 2),
            type: DataType.String,
            description: '子系統名稱',
        })
    },
    {
        key: 'FUNCTION-CODE',
        value: new Spec({
            name: 'FunctionCode',
            picType: new PicType('9', 2),
            type: DataType.String,
            description: '執行功能類型',
        })
    },
    {
        key: 'MESSAGE-TYPE',
        value: new Spec({
            name: 'MessageType',
            picType: new PicType('9', 2),
            type: DataType.String,
            description: '訊息類型',
        })
    },
    {
        key: 'MESSAGE-TIME',
        value: new Spec({
            name: 'MessageTime',
            picType: new PicType('9', 6),
            type: DataType.Time,
            description: '訊息傳送時間(HHMMSS)',
        })
    },
    {
        key: 'STATUS-CODE',
        value: new Spec({
            name: 'StatusCode',
            picType: new PicType('9', 2),
            type: DataType.String,
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
        value: new Spec({
            name: 'SourceId',
            picType: new PicType('X', 4),
            type: DataType.String,
            description: '傳送方之ID',
        })
    },
    {
        key: 'OBJECT-ID',
        value: new Spec({
            name: 'ObjectId',
            picType: new PicType('X', 4),
            type: DataType.String,
            description: '接收方之ID',
        })
    },
    {
        key: 'BODY-LENGTH',
        value: new Spec({
            name: 'BodyLength',
            picType: new PicType('9', 4),
            type: DataType.String,
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
        value: new Spec({
            name: 'BodyLength',
            picType: new PicType('9', 4),
            type: DataType.String,
            description: '成交回報資料總長度',
        })
    },
    {
        key: 'BODY-CNT',
        value: new Spec({
            name: 'BodyCnt',
            picType: new PicType('9', 4),
            type: DataType.String,
            description: '成交回報資料筆數',
        })
    },
];

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper Method
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 
 * @param {{key: string, value: Spec}[]} source 
 * @returns 
 */
function specFactory(source) {
    const spec = {};

    /** 欄位內容 */
    spec.Field = source.map((obj) => obj.value);

    /** 欄位名稱 */
    spec.Key = source.map((obj) => obj.value.name);

    /** 欄位個別長度 (用於字元起始位置計算) */
    spec.Index = source.map((obj) => obj.value.picType.size);

    /** 欄位總長 */
    spec.Size = spec.Index.reduce((total, num) => total + num, 0);

    return spec;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec Object
---------+---------+---------+---------+---------+---------+---------+--------*/

/** CONTROL-HEADER */
const ControlHeader = specFactory(CONTROL_HEADER);

/** FILE-TRANSFER-HEADER */
const FileTransferHeader = specFactory(FILE_TRANSFER_HEADER);

/** AP-HEADER */
const ApHeader = specFactory(AP_HEADER);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { ControlHeader, FileTransferHeader, ApHeader };
