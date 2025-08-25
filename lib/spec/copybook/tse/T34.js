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
        key: 'STK-PRICE',
        value: new Field({
            name: 'StkPrice',
            picStr: '9(5)V9(4)',
            dataType: DATA_TYPE.Unsigned,
            description: '收盤價',
        })
    },
    {
        key: 'FILLER',
        value: new Field({
            name: 'FILLER',
            picStr: 'X(25)',
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
    fileCode: 'T33',
    description: '盤後定價可交易股票資料檔',
    Size: 40,
    primaryKey: ['StockNo']
});

copybook.Meta = messageMetaFactory(fields, copybook.fileCode);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = copybook;
