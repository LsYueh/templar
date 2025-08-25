'use strict';

const { copybookFactory } = require('../common.js');
const { messageMetaFactory } = require('../../fields/common.js');
const { DATA_TYPE, Field } = require('../../field/field.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Fields Source
---------+---------+---------+---------+---------+---------+---------+--------*/

/** 檔案欄位 */
const fields = [
    {
        key: 'STOCK-NO',
        value: new Field({
            name: 'StockNo',
            picStr: 'X(6)',
            dataType: DATA_TYPE.String,
            description: '股票代號',
        })
    },
    {
        key: 'BULL-PRICE',
        value: new Field({
            name: 'BullPrice',
            picStr: '9(5)V9(4)',
            dataType: DATA_TYPE.Unsigned,
            description: '漲停價',
        })
    },
    {
        key: 'LDC-PRICE',
        value: new Field({
            name: 'LdcPrice',
            picStr: '9(5)V9(4)',
            dataType: DATA_TYPE.Unsigned,
            description: '開盤競價基準',
        })
    },
    {
        key: 'BEAR-PRICE',
        value: new Field({
            name: 'BearPrice',
            picStr: '9(5)V9(4)',
            dataType: DATA_TYPE.Unsigned,
            description: '跌停價',
        })
    },
    {
        key: 'LAST-MTH-DATE',
        value: new Field({
            name: 'LastMthDate',
            picStr: '9(8)',
            dataType: DATA_TYPE.Date,
            description: '上次成交日',
        })
    },
    {
        key: 'SETTYPE',
        value: new Field({
            name: 'SetType',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '交易方式',
        })
    },
    {
        key: 'MARK-W',
        value: new Field({
            name: 'MarkW',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '處置股票註記',
        })
    },
    {
        key: 'MARK-P',
        value: new Field({
            name: 'MarkP',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '注意股票註記',
        })
    },
    {
        key: 'MARK-L',
        value: new Field({
            name: 'MarkL',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '委託限制註記',
        })
    },
    {
        key: 'IND-CODE',
        value: new Field({
            name: 'IndCode',
            picStr: 'X(2)',
            dataType: DATA_TYPE.String,
            description: '產業別代碼',
        })
    },
    {
        key: 'IND-SUB-CODE',
        value: new Field({
            name: 'IndSubCode',
            picStr: 'X(2)',
            dataType: DATA_TYPE.String,
            description: '證券別代碼',
        })
    },
    {
        key: 'MARK-M',
        value: new Field({
            name: 'MarkM',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '豁免平盤下融券賣出註記',
        })
    },
    {
        key: 'STOCK-NAME',
        value: new Field({
            name: 'StockName',
            picStr: 'X(16)',
            dataType: DATA_TYPE.String,
            description: '股票中文名稱',
        })
    },
    {
        key: 'MARK-W-DETAILS::MATCH-INTERVAL',
        value: new Field({
            name: 'MarkWDetails_MatchInterval',
            picStr: '9(3)',
            dataType: DATA_TYPE.Unsigned,
            description: '撮合循環時間 (分)',
        })
    },
    {
        key: 'MARK-W-DETAILS::ORDER-LIMIT',
        value: new Field({
            name: 'MarkWDetails_OrderLimit',
            picStr: '9(6)',
            dataType: DATA_TYPE.Unsigned,
            description: '單筆委託限制數量',
        })
    },
    {
        key: 'MARK-W-DETAILS::ORDERS-LIMIT',
        value: new Field({
            name: 'MarkWDetails_OrdersLimit',
            picStr: '9(6)',
            dataType: DATA_TYPE.Unsigned,
            description: '多筆委託限制數量',
        })
    },
    {
        key: 'MARK-W-DETAILS::PREPAY-RATE',
        value: new Field({
            name: 'MarkWDetails_PrepayRate',
            picStr: '9(3)',
            dataType: DATA_TYPE.Unsigned,
            description: '款券預收成數 (%)',
        })
    },
    {
        key: 'MARK-S',
        value: new Field({
            name: 'MarkS',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '豁免平盤下借券賣出註記',
        })
    },
    {
        key: 'STK-MARK',
        value: new Field({
            name: 'StkMark',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '類股註記',
        })
    },
    {
        key: 'MARK-F',
        value: new Field({
            name: 'MarkF',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '面額註記',
        })
    },
    {
        key: 'MARK-DAY-TRADE',
        value: new Field({
            name: 'MarkDayTrade',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '可現股當沖註記',
        })
    },
    {
        key: 'STK-CTGCD',
        value: new Field({
            name: 'StkCTGCD',
            picStr: 'X(1)',
            dataType: DATA_TYPE.String,
            description: '板別註記',
        })
    },
    {
        key: 'FILLER',
        value: new Field({
            name: 'FILLER',
            picStr: 'X(11)',
            dataType: DATA_TYPE.FILLER,
            description: '保留欄位',
        })
    },
];

/**------+---------+---------+---------+---------+---------+---------+----------
 * Copybook Object
---------+---------+---------+---------+---------+---------+---------+--------*/

/** Copybook */
const copybook = copybookFactory({
    fileCode: 'T30',
    description: '漲跌幅度資料檔',
    Size: 100,
    primaryKey: ['StockNo']
});

copybook.Meta = messageMetaFactory(fields, copybook.fileCode);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = copybook;
