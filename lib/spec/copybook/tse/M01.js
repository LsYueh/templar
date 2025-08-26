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
        key: 'TX-KIND',
        value: new Field({
            name: 'TxKind',
            picStr: 'X(01)',
            description: '交易種類',
        })
    },
    {
        key: 'APPLICATION-UNITS',
        value: new Field({
            name: 'ApplicationUnits',
            picStr: '9(03)',
            description: '申請基數',
        })
    },
    {
        key: 'STATE',
        value: new Field({
            name: 'State',
            picStr: 'X(01)',
            description: '註記(空白)',
        })
    },
    {
        key: 'BANK-ID',
        value: new Field({
            name: 'BankId',
            picStr: '9(03)',
            description: '買回時匯款銀行代號',
        })
    },{
        key: 'RM-ACNT',
        value: new Field({
            name: 'RmAcnt',
            picStr: 'X(16)',
            description: '買回時匯款帳號',
        })
    },
    {
        key: 'APPLIER-NUMBER',
        value: new Field({
            name: 'ApplierNumber',
            picStr: '9(01)',
            description: '申請人數目',
        })
    },
    {
        key: 'ACNT-BROKER-1',
        value: new Field({
            name: 'AcntBroker1',
            picStr: 'X(04)',
            description: '開戶券商代號1',
        })
    },
    {
        key: 'ACNT-NO-1',
        value: new Field({
            name: 'AcntNo1',
            picStr: '9(07)',
            description: '申請人帳號1',
        })
    },
    {
        key: 'KEEP-ACNT-1',
        value: new Field({
            name: 'KeepAcnt1',
            picStr: 'X(11)',
            description: '申請人保管銀行帳號1',
        })
    },
    {
        key: 'ID-CODE-1',
        value: new Field({
            name: 'IdCode1',
            picStr: 'X(03)',
            description: '身份碼1',
        })
    },
    {
        key: 'CASH-ASSIGN-1',
        value: new Field({
            name: 'CashAssign1',
            picStr: 'X(01)',
            description: '現金差額收取人1',
        })
    },
    {
        key: 'MERGE-ASSIGN-1',
        value: new Field({
            name: 'MergeAssign1',
            picStr: 'X(01)',
            description: '零股整合帳戶1',
        })
    },
    {
        key: 'ACNT-BROKER-2',
        value: new Field({
            name: 'AcntBroker2',
            picStr: 'X(04)',
            description: '開戶券商代號2',
        })
    },
    {
        key: 'ACNT-NO-2',
        value: new Field({
            name: 'AcntNo2',
            picStr: '9(07)',
            description: '申請人帳號2',
        })
    },
    {
        key: 'KEEP-ACNT-2',
        value: new Field({
            name: 'KeepAcnt2',
            picStr: 'X(11)',
            description: '申請人保管銀行帳號2',
        })
    },
    {
        key: 'ID-CODE-2',
        value: new Field({
            name: 'IdCode2',
            picStr: 'X(03)',
            description: '身份碼2',
        })
    },
    {
        key: 'CASH-ASSIGN-2',
        value: new Field({
            name: 'CashAssign2',
            picStr: 'X(01)',
            description: '現金差額收取人2',
        })
    },
    {
        key: 'MERGE-ASSIGN-2',
        value: new Field({
            name: 'MergeAssign2',
            picStr: 'X(01)',
            description: '零股整合帳戶2',
        })
    },
    {
        key: 'ACNT-BROKER-3',
        value: new Field({
            name: 'AcntBroker3',
            picStr: 'X(04)',
            description: '開戶券商代號3',
        })
    },
    {
        key: 'ACNT-NO-3',
        value: new Field({
            name: 'AcntNo3',
            picStr: '9(07)',
            description: '申請人帳號3',
        })
    },
    {
        key: 'KEEP-ACNT-3',
        value: new Field({
            name: 'KeepAcnt3',
            picStr: 'X(11)',
            description: '申請人保管銀行帳號3',
        })
    },
    {
        key: 'ID-CODE-3',
        value: new Field({
            name: 'IdCode3',
            picStr: 'X(03)',
            description: '身份碼3',
        })
    },
    {
        key: 'CASH-ASSIGN-3',
        value: new Field({
            name: 'CashAssign3',
            picStr: 'X(01)',
            description: '現金差額收取人3',
        })
    },
    {
        key: 'MERGE-ASSIGN-3',
        value: new Field({
            name: 'MergeAssign3',
            picStr: 'X(01)',
            description: '零股整合帳戶3',
        })
    },
    {
        key: 'APPLY-FEE',
        value: new Field({
            name: 'ApplyFee',
            picStr: '9(08)',
            description: '申購買回手續費',
        })
    },
    {
        key: 'MANAGEMENT-CHARGE',
        value: new Field({
            name: 'ManagementCharge',
            picStr: '9(08)',
            description: '行政處理費',
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
        key: 'TX-CASH',
        value: new Field({
            name: 'TxCash',
            picStr: 'X(01)',
            description: '現金申贖Y/" "',
        })
    },
    {
        key: 'AMOUNT',
        value: new Field({
            name: 'Amount',
            picStr: '9(18)',
            description: '現金申贖金額',
        })
    },
    {
        key: 'RM-ACNT-NAME',
        value: new Field({
            name: 'RmAcntName',
            picStr: 'X(60)',
            description: '匯款帳戶名',
        })
    },
    {
        key: 'RM-ACNT-ID',
        value: new Field({
            name: 'RmAcntId',
            picStr: 'X(10)',
            description: '匯款帳戶ID',
        })
    },
    {
        key: 'FILLER',
        value: new Field({
            name: 'FILLER',
            picStr: 'X(65)',
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
    fileCode: 'M01',
    description: '申購/買回彙總申報檔',
    Size: 300,
    primaryKey: ['TranCode', 'EtfId', 'BrokerId', 'TxDate', 'SeqNo']
});

copybook.Meta = messageMetaFactory(fields, copybook.fileCode);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = copybook;
