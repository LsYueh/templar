'use strict'

/**
 * @typedef {import('../common.js').MessageMeta_t} MessageMeta_t
 */

const { PicType, DATA_TYPE, Field_t } = require('../../field/field.js');

const { messageMetaFactory } = require('../common.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Common Field
---------+---------+---------+---------+---------+---------+---------+--------*/

/** 檔案代號 */
const FILE_CODE = {
    key: 'FILE-CODE',
    value: new Field_t({
        name: 'FileCode',
        picType: new PicType('X', 3),
        dataType: DATA_TYPE.String,
        description: '檔案代號',
    })
}

/** EOF */
const EOF = {
    key: 'EOF',
    value: new Field_t({
        name: 'EOF',
        picType: new PicType('9', 1),
        dataType: DATA_TYPE.Unsigned,
        description: '若為檔案最後一筆資料訊息填1，否則為0',
    })
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec Source (傳送功能)
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * MESSAGE ID︰F010  
 * MESSAGE NAME︰起始訊息
 */
const F010 = [
    FILE_CODE,
    {
        key: 'FILE-SIZE',
        value: new Field_t({
            name: 'FileSize',
            picType: new PicType('9', 8),
            dataType: DATA_TYPE.Unsigned,
            description: '資料檔案之大小(以byte為單位)',
        })
    },
];

/**
 * MESSAGE ID︰F030  
 * MESSAGE NAME︰傳送資料訊息
 */
const F030 = [
    FILE_CODE,
    EOF,
    {
        key: 'DATA',
        value: new Field_t({
            name: 'Data',
            picType: new PicType('X', 994),
            dataType: DATA_TYPE.String,
            description: '資料檔案之內容',
            isVariableLength: true,
        })
    },
];

/**
 * MESSAGE ID︰F040  
 * MESSAGE NAME︰回覆資料訊息
 */
const F040 = [
    FILE_CODE,
    EOF,
];

/**
 * MESSAGE ID︰F050  
 * MESSAGE NAME︰傳送單筆訊息
 */
const F050 = [
    FILE_CODE,
    {
        key: 'REQUEST-MESSAGE',
        value: new Field_t({
            name: 'RequestMessage',
            picType: new PicType('X', 995),
            dataType: DATA_TYPE.String,
            description: '由傳送介面送出之單筆訊息內容',
            isVariableLength: true,
        })
    },
];

/**
 * MESSAGE ID︰F060  
 * MESSAGE NAME︰回覆單筆訊息
 */
const F060 = [
    FILE_CODE,
    {
        key: 'RESPONSE-MESSAGE',
        value: new Field_t({
            name: 'ResponseMessage',
            picType: new PicType('X', 995),
            dataType: DATA_TYPE.String,
            description: '由接收介面送出單筆訊訊息內容',
            isVariableLength: true,
        })
    },
];

/**
 * MESSAGE ID︰F210 (原格式為F030)  
 * MESSAGE NAME︰檔案傳輸中繼作業傳送資料訊息 – 傳送功能
 */
const F210 = [
    FILE_CODE,
    EOF,
    {
        key: 'DATA-4K',
        value: new Field_t({
            name: 'Data',
            picType: new PicType('X', 3976),
            dataType: DATA_TYPE.String,
            description: '資料檔案之內容 (4K擴充版)',
            isVariableLength: true,
        })
    },
];

/**
 * MESSAGE ID︰F220 (原格式為F040)  
 * MESSAGE NAME︰檔案傳輸中繼作業回覆傳送資料訊息 – 傳送功能
 */
const F220 = F040;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec Source (接收功能)
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * MESSAGE ID︰F090  
 * MESSAGE NAME︰起始訊息
 */
const F090 = F010;

/**
 * MESSAGE ID︰F110  
 * MESSAGE NAME︰傳送資料訊息
 */
const F110 = F030;

/**
 * MESSAGE ID︰F120  
 * MESSAGE NAME︰回覆資料訊息
 */
const F120 = F040;

/**
 * MESSAGE ID︰F130  
 * MESSAGE NAME︰傳送單筆訊息
 */
const F130 = F050;

/**
 * MESSAGE ID︰F140  
 * MESSAGE NAME︰回覆單筆訊息
 */
const F140 = F060;

/**
 * MESSAGE ID︰F230 (原格式為F110)  
 * MESSAGE NAME︰檔案傳輸中繼作業傳送資料訊息 – 接收訊息
 */
const F230 = F210;

/**
 * MESSAGE ID︰F240 (原格式為F120)  
 * MESSAGE NAME︰檔案傳輸中繼作業回覆傳送資料訊息– 接收訊息
 */
const F240 = F220;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Meta Object
---------+---------+---------+---------+---------+---------+---------+--------*/

/** @type {Object<string, MessageMeta_t>} */
const Meta = {
    // 傳送功能
    F010: messageMetaFactory(F010, 'F010'),
    F030: messageMetaFactory(F030, 'F030'), F040: messageMetaFactory(F040, 'F040'),
    F050: messageMetaFactory(F050, 'F050'), F060: messageMetaFactory(F060, 'F060'),
    F210: messageMetaFactory(F210, 'F210'), F220: messageMetaFactory(F220, 'F220'),
    
    // 接收功能
    F090: messageMetaFactory(F090, 'F090'),
    F110: messageMetaFactory(F110, 'F110'), F120: messageMetaFactory(F120, 'F120'),
    F130: messageMetaFactory(F130, 'F130'), F140: messageMetaFactory(F140, 'F140'),
    F230: messageMetaFactory(F230, 'F230'), F240: messageMetaFactory(F240, 'F240'),
};


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Meta };
