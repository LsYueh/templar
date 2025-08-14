'use strict'

const { Spec_t } = require('../type.js');
const { PicType } = require('../../../field/cobol/cobol-pic.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * `成交回報作業`會用到的檔身
 */
const batch = [
    {
        key: 'BROKER-ID',
        value: new Spec_t({
            name: 'BROKER-ID',
            picType: new PicType('X', 4),
            description: '證券商代號',
        })
    },
    {
        key: 'START-SEQ',
        value: new Spec_t({
            name: 'START-SEQ',
            picType: new PicType('9', 6),
            description: [
                '等於0時，表示希望由證交所儲存之序號開始',
                '大於0 時，表示希望由此序號開始',
                '例如251表示希望由第251筆開始',
            ].join("\n"),
        })
    },
];

const R3 = [
    {
        key: 'STKNO',
        value: new Spec_t({
            name: 'STKNO',
            picType: new PicType('X', 6),
            description: '證券代號',
        })
    },
    {
        key: 'MTHQTY',
        value: new Spec_t({
            name: 'MTHQTY',
            picType: new PicType('9', 8),
            description: [
                '成交數量',
                'a普通股:成交數量, 資料單位：交易單位',
                'b零股:成交股數(受益權單位)',
            ].join("\n"),
        })
    },
    {
        key: 'MTHPR',
        value: new Spec_t({
            name: 'MTHPR',
            picType: new PicType('9', 5, 4),
            description: '成交價格',
        })
    },
    {
        key: 'MTHTIME',
        value: new Spec_t({
            name: 'MTHTIME',
            picType: new PicType('9', 9),
            description: '成交時間 (HHmmSSsss)',
        })
    },
    {
        key: 'EXCD',
        value: new Spec_t({
            name: 'EXCD',
            picType: new PicType('9', 1),
            description: [
                '交易類別',
                '0︰普通股交易',
                '2︰零股交易',
            ].join("\n"),
        })
    },
    {
        key: 'BUY-SELL',
        value: new Spec_t({
            name: 'BUY-SELL',
            picType: new PicType('X', 1),
            description: [
                '買賣別',
                'B︰買，S︰賣',
            ].join("\n"),
        })
    },
    {
        key: 'ORDER-NO',
        value: new Spec_t({
            name: 'ORDER-NO',
            picType: new PicType('X', 5),
            description: '委託書編號',
        })
    },
    {
        key: 'IVACNO',
        value: new Spec_t({
            name: 'IVACNO',
            picType: new PicType('9', 7),
            description: '投資人帳號',
        })
    },
    {
        key: 'ODRTPE',
        value: new Spec_t({
            name: 'ODRTPE',
            picType: new PicType('9', 1),
            description: '委託類別',
        })
    },
    {
        key: 'SEQNO',
        value: new Spec_t({
            name: 'SEQNO',
            picType: new PicType('9', 6),
            description: '流水號，表示成交回報之順序',
        })
    },
    {
        key: 'BROKER-ID',
        value: new Spec_t({
            name: 'BROKER-ID',
            picType: new PicType('X', 4),
            description: '證券商代號',
        })
    },
    {
        key: 'RECNO',
        value: new Spec_t({
            name: 'RECNO',
            picType: new PicType('9', 8),
            description: '成交總檔編號，示此筆成交資料在成交總檔之序號',
        })
    },
    {
        key: 'MARK-S',
        value: new Spec_t({
            name: 'MARK-S',
            picType: new PicType('X', 1),
            description: [
                '補送註記',
                '補送之成交資料，此欄位內容為"*"',
            ].join("\n"),
        })
    },
];

const batchs = [].concat(
    batch, R3
);

/** @type {Map<string, Spec_t>} */
const Specs = new Map(batchs.map((data) => [data.key, data.value]));


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Specs };
