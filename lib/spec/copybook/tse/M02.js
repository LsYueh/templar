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
        key: 'TRAN-CODE',
        value: new Field({
            name: 'TranCode',
            picStr: 'X(01)',
            description: '異動碼',
        })
    },
    {
        key: 'ETF-ID',
        value: new Field({
            name: 'EtfId',
            picStr: 'X(06)',
            description: 'ETF代號',
        })
    },
    {
        key: 'BROKER-ID',
        value: new Field({
            name: 'BrokerId',
            picStr: 'X(04)',
            description: '券商代表號',
        })
    },
    {
        key: 'TX-DATE',
        value: new Field({
            name: 'TxDate',
            picStr: '9(08)',
            dataType: DATA_TYPE.Date,
            description: '申請日(西曆)',
        })
    },
    {
        key: 'SEQNO',
        value: new Field({
            name: 'SeqNo',
            picStr: 'X(03)',
            description: '流水號',
        })
    },
    {
        key: 'ACNT-BROKER',
        value: new Field({
            name: 'AcntBroker',
            picStr: 'X(04)',
            description: '開戶券商代號',
        })
    },
    {
        key: 'ACNT-NO',
        value: new Field({
            name: 'AcntNo',
            picStr: '9(07)',
            description: '申請人帳號',
        })
    },
    {
        key: 'STKNO',
        value: new Field({
            name: 'StkNo',
            picStr: 'X(06)',
            description: '股票代號',
        })
    },
    {
        key: 'NORMAL-STOCK-NOS',
        value: new Field({
            name: 'NormalStockNos',
            picStr: '9(10)',
            description: '庫存部位',
        })
    },
    {
        key: 'BORROW-STOCK-NOS',
        value: new Field({
            name: 'BorrowStockNos',
            picStr: '9(10)',
            description: '借券部位',
        })
    },
    {
        key: 'T1-STOCK-NOS',
        value: new Field({
            name: 'T1StockNos',
            picStr: '9(10)',
            description: 'T-1日淨入庫部位',
        })
    },
    {
        key: 'T-STOCK-NOS',
        value: new Field({
            name: 'TStockNos',
            picStr: '9(10)',
            description: 'T日淨入庫部位',
        })
    },
    {
        key: 'LACK-STOCK-NOS',
        value: new Field({
            name: 'LackStockNos',
            picStr: '9(10)',
            description: '短缺部位',
        })
    },
    {
        key: 'CASH-IN-LIEU',
        value: new Field({
            name: 'CashInLieu',
            picStr: 'X(01)',
            description: '現金替代記號',
        })
    },
    {
        key: 'LIEU-REASON',
        value: new Field({
            name: 'LieuReason',
            picStr: 'X(01)',
            description: '替代原因',
        })
    },
    {
        key: 'QFII-AVB-STOCK-NOS',
        value: new Field({
            name: 'QfiiAvbStockNos',
            picStr: '9(10)',
            description: '外資可贖股數',
        })
    },
    {
        key: 'ARBITRAGE-NOS',
        value: new Field({
            name: 'ArbitrageNos',
            picStr: '9(10)',
            description: '套利賣空部位',
        })
    },
    {
        key: 'ERROR-CODE',
        value: new Field({
            name: 'ErrorCode',
            picStr: 'X(02)',
            description: '錯誤代碼(空白)',
        })
    },
    {
        key: 'STOCK-NOS-5',
        value: new Field({
            name: 'StockNos5',
            picStr: '9(10)',
            description: '前日申購/買回部位',
        })
    },
    {
        key: 'FILLER',
        value: new Field({
            name: 'FILLER',
            picStr: 'X(27)',
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
    fileCode: 'M02',
    description: '申購/買回明細申報檔',
    Size: 150,
    primaryKey: ['TranCode', 'EtfId', 'BrokerId', 'TxDate', 'SeqNo']
});

copybook.Meta = messageMetaFactory(fields, copybook.fileCode);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = copybook;
