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
        key: 'RSLPR',
        value: new Field({
            name: 'RslPr',
            picStr: '9(5)V9(4)',
            dataType: DATA_TYPE.Unsigned,
            description: '漲停價',
        })
    },
    {
        key: 'FLLPR',
        value: new Field({
            name: 'FllPr',
            picStr: '9(5)V9(4)',
            dataType: DATA_TYPE.Unsigned,
            description: '跌停價',
        })
    },
    {
        key: 'REFPR',
        value: new Field({
            name: 'RefPr',
            picStr: '9(5)V9(4)',
            dataType: DATA_TYPE.Unsigned,
            description: '參考價',
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
        key: 'FILLER',
        value: new Field({
            name: 'FILLER',
            picStr: 'X(16)',
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
    fileCode: 'O60',
    description: '盤中零股價格資料檔',
    Size: 50,
    primaryKey: ['StockNo']
});

copybook.Meta = messageMetaFactory(fields, copybook.fileCode);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = copybook;
