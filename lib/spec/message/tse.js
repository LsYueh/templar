'use strict'

const { Subsystem_t, Condition_t } = require('./common.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Subsystem Source
---------+---------+---------+---------+---------+---------+---------+--------*/

/**  */
const SUB_10 = [
    '10', new Subsystem_t({
        name: '10',
        description: '連線子系統',
        conditions: [
        ],
    })
];

const SUB_20 = [
    '20', new Subsystem_t({
        name: '20',
        description: '單筆訊息及檔案傳輸系統',
        conditions: [
            new Condition_t({
                id: 'F010',
                name: '起始訊息',
                cond: {
                    FunctionCode: '00', 
                    MessageType : '00',
                    StatusCode  : '00',
                    ObjectId    : '0000',
                },
            }),
            new Condition_t({
                id: 'F050',
                name: '傳送單筆訊息',
                cond: {
                    FunctionCode: '02',
                    MessageType : '04',
                    StatusCode  : '00',
                    ObjectId    : '0000',
                },
            }),
            new Condition_t({
                id: 'F060',
                name: '錯誤訊息',
                cond: {
                    FunctionCode: '02',
                    MessageType : '05',
                    SourceId    : '0000',
                },
            }),
            new Condition_t({
                id: 'F090',
                name: '起始訊息',
                cond: {
                    FunctionCode: '00', 
                    MessageType : '00',
                    StatusCode  : '00',
                    SourceId    : '0000',
                },
            }),
            new Condition_t({
                id: 'F110',
                name: '傳送資料訊息',
                cond: {
                    FunctionCode: '01',
                    MessageType : '02',
                    StatusCode  : '00',
                    SourceId    : '0000',
                },
            }),
            new Condition_t({
                id: 'F130',
                name: '傳送單筆訊息',
                cond: {
                    FunctionCode: '02',
                    MessageType : '04',
                    StatusCode  : '00',
                    SourceId    : '0000',
                },
            }),
            new Condition_t({
                id: 'F230', // F110
                name: '檔傳送資料訊息 (4K)',
                cond: {
                    FunctionCode: '01',
                    MessageType : '12',
                    StatusCode  : '00',
                    SourceId    : '0000',
                },
            }),
            new Condition_t({
                id: 'T900',
                name: '單筆訊息(證券商 > 證券所)',
                cond: {
                    FunctionCode: '02',
                    MessageType : '04',
                    ObjectId    : '0000',
                    FileCode    : 'S00',
                },
            }),
            new Condition_t({
                id: 'T910',
                name: '單筆訊息(證券商 < 證交所)',
                cond: {
                    FunctionCode: '02',
                    MessageType : '04',
                    SourceId    : '0000',
                    FileCode    : 'S10',
                },
            }),
        ],
    })
];

const SUB_30 = [
    '30', new Subsystem_t({
        name: '30',
        description: '一般交易子系統',
        conditions: [
            new Condition_t({
                id: 'T010',
                name: '委託輸入訊息',
                cond: {
                    MessageType : '00',
                    StatusCode  : '00',
                },
            }),
            new Condition_t({
                id: 'T020',
                name: '委託回報訊息',
                cond: {
                    MessageType : '01',
                    StatusCode  : '00',
                },
            }),
            new Condition_t({
                id: 'T030',
                name: '錯誤發生回覆訊息',
                cond: {
                    MessageType : '03',
                    // StatusCode  : null,
                },
            }),
            new Condition_t({
                id: 'T040',
                name: '確定連線訊息',
                cond: {
                    FunctionCode: '00',
                    MessageType : '02',
                    StatusCode  : '00',
                },
            }),
            new Condition_t({
                id: 'T050',
                name: '確定連線回覆訊息',
                cond: {
                    FunctionCode: '00',
                    MessageType : '05',
                    StatusCode  : '00',
                },
            }),
            new Condition_t({
                id: 'T060',
                name: '重新連線訊息',
                cond: {
                    FunctionCode: '00',
                    MessageType : '04',
                    StatusCode  : '00',
                },
            }),
            new Condition_t({
                id: 'T070',
                name: '跨PVC查詢委託訊息',
                cond: {
                    FunctionCode: '00',
                    MessageType : '06',
                    StatusCode  : '00',
                },
            }),
        ],
    })
];

const SUB_50 = [
    '50', new Subsystem_t({
        name: '50',
        description: '成交回報子系統',
        conditions: [
            new Condition_t({
                id: 'R3',
                name: '成交回報資料',
                cond: {
                    FunctionCode: '10',
                    MessageType : '00',
                    StatusCode  : '00',
                },
            }),
            new Condition_t({
                id: 'R6',
                name: '結束成交資料傳送',
                cond: {
                    FunctionCode: '20',
                    MessageType : '00',
                    StatusCode  : '00',
                },
            }),
            new Condition_t({
                id: 'R1',
                name: '起始作業訊息',
                cond: {
                    FunctionCode: '00',
                    MessageType : '00',
                    StatusCode  : '00',
                },
            }),
            new Condition_t({
                id: 'R2',
                name: '起始作業回覆訊息',
                cond: {
                    FunctionCode: '00',
                    MessageType : '01',
                },
            }),
            new Condition_t({
                id: 'R4',
                name: '確定連線作業訊息',
                cond: {
                    FunctionCode: '00',
                    MessageType : '04',
                    StatusCode  : '00',
                },
            }),
            new Condition_t({
                id: 'R5',
                name: '確定連線作業回覆訊息',
                cond: {
                    FunctionCode: '00',
                    MessageType : '05',
                    StatusCode  : '00',
                },
            }),
        ],
    })
];


/**------+---------+---------+---------+---------+---------+---------+----------
 * Subsystem Object
---------+---------+---------+---------+---------+---------+---------+--------*/

/** @type {Map<string, Subsystem_t>} */
const Subsys = new Map([SUB_20, SUB_30, SUB_50]);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Subsys };
