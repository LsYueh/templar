'use strict'

/**
 * @typedef {import('../common.js').MessageMeta_t} MessageMeta_t
 */

const { PicType, DATA_TYPE, Field_t } = require('../../field/field.js');

const { messageMetaFactory } = require('../common.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec Source
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * MESSAGE ID︰R1  
 * MESSAGE NAME︰起始作業訊息
 */
const R1 = [
    {
        key: 'BROKER-ID',
        value: new Field_t({
            name: 'BrokerId',
            picType: new PicType('X', 4),
            dataType: DATA_TYPE.String,
            description: '證券商代號',
        })
    },
    {
        key: 'START-SEQ',
        value: new Field_t({
            name: 'StartSeq',
            picType: new PicType('9', 6),
            dataType: DATA_TYPE.Unsigned,
            description: [
                '等於0時，表示希望由證交所儲存之序號開始',
                '大於0 時，表示希望由此序號開始',
                '例如251表示希望由第251筆開始',
            ].join("\n"),
        })
    },
];

/**
 * MESSAGE ID︰R2  
 * MESSAGE NAME︰起始作業回覆訊息
 */
const R2 = R1;

/**
 * MESSAGE ID︰R3  
 * MESSAGE NAME︰成交回報資料
 */
const R3 = [
    {
        key: 'STKNO',
        value: new Field_t({
            name: 'StkNo',
            picType: new PicType('X', 6),
            dataType: DATA_TYPE.String,
            description: '證券代號',
        })
    },
    {
        key: 'MTHQTY',
        value: new Field_t({
            name: 'MthQty',
            picType: new PicType('9', 8),
            dataType: DATA_TYPE.Unsigned,
            description: [
                '成交數量',
                'a普通股:成交數量, 資料單位：交易單位',
                'b零股:成交股數(受益權單位)',
            ].join("\n"),
        })
    },
    {
        key: 'MTHPR',
        value: new Field_t({
            name: 'MthPr',
            picType: new PicType('9', 5, 4),
            dataType: DATA_TYPE.Unsigned,
            description: '成交價格',
        })
    },
    {
        key: 'MTHTIME',
        value: new Field_t({
            name: 'MthTime',
            picType: new PicType('9', 9),
            dataType: DATA_TYPE.Timestamp,
            description: '成交時間 (HHmmSSsss)',
        })
    },
    {
        key: 'EXCD',
        value: new Field_t({
            name: 'ExCd',
            picType: new PicType('9', 1),
            dataType: DATA_TYPE.String,
            description: [
                '交易類別',
                '0︰普通股交易',
                '2︰零股交易',
            ].join("\n"),
        })
    },
    {
        key: 'BUY-SELL',
        value: new Field_t({
            name: 'BuySell',
            picType: new PicType('X', 1),
            dataType: DATA_TYPE.String,
            description: [
                '買賣別',
                'B︰買，S︰賣',
            ].join("\n"),
        })
    },
    {
        key: 'ORDER-NO',
        value: new Field_t({
            name: 'OrderNo',
            picType: new PicType('X', 5),
            dataType: DATA_TYPE.String,
            description: '委託書編號',
        })
    },
    {
        key: 'IVACNO',
        value: new Field_t({
            name: 'IVAcNo',
            picType: new PicType('9', 7),
            dataType: DATA_TYPE.String,
            description: '投資人帳號',
        })
    },
    {
        key: 'ODRTPE',
        value: new Field_t({
            name: 'OdrTpe',
            picType: new PicType('9', 1),
            dataType: DATA_TYPE.String,
            description: '委託類別',
        })
    },
    {
        key: 'SEQNO',
        value: new Field_t({
            name: 'SeqNo',
            picType: new PicType('9', 6),
            dataType: DATA_TYPE.String,
            description: '流水號，表示成交回報之順序',
        })
    },
    {
        key: 'BROKER-ID',
        value: new Field_t({
            name: 'BrokerId',
            picType: new PicType('X', 4),
            dataType: DATA_TYPE.String,
            description: '證券商代號',
        })
    },
    {
        key: 'RECNO',
        value: new Field_t({
            name: 'RecNo',
            picType: new PicType('9', 8),
            dataType: DATA_TYPE.String,
            description: '成交總檔編號，示此筆成交資料在成交總檔之序號',
        })
    },
    {
        key: 'MARK-S',
        value: new Field_t({
            name: 'MarkS',
            picType: new PicType('X', 1),
            dataType: DATA_TYPE.String,
            description: [
                '補送註記',
                '補送之成交資料，此欄位內容為"*"',
            ].join("\n"),
        })
    },
];

/**
 * MESSAGE ID︰R4  
 * MESSAGE NAME︰確定連線作業訊息
 */
const R4 = [];

/**
 * MESSAGE ID︰R5  
 * MESSAGE NAME︰確定連線作業回覆訊息
 */
const R5 = [];

/**
 * MESSAGE ID︰R6  
 * MESSAGE NAME︰結束成交資料傳送
 */
const R6 = [
    {
        key: 'TOTAL-RECORD',
        value: new Field_t({
            name: 'TotalRecord',
            picType: new PicType('9', 6),
            dataType: DATA_TYPE.Unsigned,
            description: '成交資料總筆數',
        })
    },
];

/**------+---------+---------+---------+---------+---------+---------+----------
 * Meta Object
---------+---------+---------+---------+---------+---------+---------+--------*/

/** @type {Object<string, MessageMeta_t>} */
const Meta = {
    R1: messageMetaFactory(R1, 'R1'),
    R2: messageMetaFactory(R2, 'R2'),
    R3: messageMetaFactory(R3, 'R3'),
    R4: messageMetaFactory(R4, 'R4'),
    R5: messageMetaFactory(R5, 'R5'),
    R6: messageMetaFactory(R6, 'R6'),
};


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Meta };
