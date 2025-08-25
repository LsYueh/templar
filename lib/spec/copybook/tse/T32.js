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
        key: 'TRADE-UNIT',
        value: new Field({
            name: 'TradeUnit',
            picStr: '9(5)',
            dataType: DATA_TYPE.Unsigned,
            description: '每一交易單位所含股數',
        })
    },
    {
        key: 'TRADE-CURRENCY',
        value: new Field({
            name: 'TRADE-CURRENCY',
            picStr: 'X(3)',
            dataType: DATA_TYPE.String,
            description: '交易幣別代碼',
        })
    },
    {
        key: 'FILLER',
        value: new Field({
            name: 'FILLER',
            picStr: 'X(36)',
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
    fileCode: 'T32',
    description: '外幣計價暨非千股(受益權單位) 交易單位有價證券資料檔',
    Size: 50,
    primaryKey: ['StockNo']
});

copybook.Meta = messageMetaFactory(fields, copybook.fileCode);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = copybook;
