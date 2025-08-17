'use strict'

/**
 * @typedef {import('./type.js').Sub_t} Sub_t
 */

const { MessageDef_t, Subsystem } = require('./type.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec Source
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @type {Sub_t}
 */
const SUB_10 = [
    '10', new Subsystem({
        name: '10',
        description: '連線子系統',
        messages: [
        ],
    })
];

/**
 * @type {Sub_t}
 */
const SUB_20 = [
    '20', new Subsystem({
        name: '20',
        description: '單筆訊息及檔案傳輸系統',
        messages: [
            {
                id: 'F010',
                define: new MessageDef_t({
                    id: 'F010',
                    name: '起始訊息',
                    cond: {
                        FunctionCode: '00', 
                        MessageType : '00',
                        StatusCode  : '00',
                        ObjectId    : '0000',
                    },
                })
            },
            {
                id: 'F030',
                define: new MessageDef_t({
                    id: 'F030',
                    name: '傳送資料訊息',
                    cond: {
                        FunctionCode: '01', 
                        MessageType : '02',
                        StatusCode  : '00',
                        SourceId    : '0000',
                    },
                })
            },
            {
                id: 'F050', 
                define: new MessageDef_t({
                    id: 'F050',
                    name: '傳送單筆訊息',
                    cond: {
                        FunctionCode: '02',
                        MessageType : '04',
                        StatusCode  : '00',
                        ObjectId    : '0000',
                    },
                })
            },
            {
                id: 'F060', 
                define: new MessageDef_t({
                    id: 'F060',
                    name: '錯誤訊息',
                    cond: {
                        FunctionCode: '02',
                        MessageType : '05',
                        // StatusCode  : null,
                        SourceId    : '0000',
                    },
                })
            },
            {
                id: 'F130', 
                define: new MessageDef_t({
                    id: 'F130',
                    name: '傳送單筆訊息',
                    cond: {
                        FunctionCode: '02',
                        MessageType : '04',
                        StatusCode  : '00',
                        SourceId    : '0000',
                    },
                })
            },
            {
                id: 'T900', 
                define: new MessageDef_t({
                    id: 'T900',
                    name: '單筆訊息(證券商 > 證券所)',
                    cond: {
                        FunctionCode: '02',
                        MessageType : '04',
                        ObjectId    : '0000',
                        FileCode    : 'S00',
                    },
                })
            },
            {
                id: 'T910', 
                define: new MessageDef_t({
                    id: 'T910',
                    name: '單筆訊息(證券商 < 證交所)',
                    cond: {
                        FunctionCode: '02',
                        MessageType : '04',
                        SourceId    : '0000',
                        FileCode    : 'S10',
                    },
                })
            },
        ],
    })
];

/**
 * @type {Sub_t}
 */
const SUB_30 = [
    '30', new Subsystem({
        name: '30',
        description: '一般交易子系統',
        messages: [
            {
                id: 'T010', 
                define: new MessageDef_t({
                    id: 'T010',
                    name: '委託輸入訊息',
                    cond: {
                        MessageType : '00',
                        StatusCode  : '00',
                    },
                })
            },
            {
                id: 'T020', 
                define: new MessageDef_t({
                    id: 'T020',
                    name: '委託回報訊息',
                    cond: {
                        MessageType : '01',
                        StatusCode  : '00',
                    },
                })
            },
            {
                id: 'T030', 
                define: new MessageDef_t({
                    id: 'T030',
                    name: '錯誤發生回覆訊息',
                    cond: {
                        MessageType : '03',
                        // StatusCode  : null,
                    },
                })
            },
            {
                id: 'T040', 
                define: new MessageDef_t({
                    id: 'T040',
                    name: '確定連線訊息',
                    cond: {
                        FunctionCode: '00',
                        MessageType : '02',
                        StatusCode  : '00',
                    },
                })
            },
            {
                id: 'T050', 
                define: new MessageDef_t({
                    id: 'T050',
                    name: '確定連線回覆訊息',
                    cond: {
                        FunctionCode: '00',
                        MessageType : '05',
                        StatusCode  : '00',
                    },
                })
            },
            {
                id: 'T060', 
                define: new MessageDef_t({
                    id: 'T060',
                    name: '重新連線訊息',
                    cond: {
                        FunctionCode: '00',
                        MessageType : '04',
                        StatusCode  : '00',
                    },
                })
            },
            {
                id: 'T070', 
                define: new MessageDef_t({
                    id: 'T070',
                    name: '跨PVC查詢委託訊息',
                    cond: {
                        FunctionCode: '00',
                        MessageType : '06',
                        StatusCode  : '00',
                    },
                })
            },
        ],
    })
];

/**
 * @type {Sub_t}
 */
const SUB_50 = [
    '50', new Subsystem({
        name: '50',
        description: '成交回報子系統',
        messages: [
            {
                id: 'R3', 
                define: new MessageDef_t({
                    id: 'R3',
                    name: '成交回報資料',
                    cond: {
                        FunctionCode: '10',
                        MessageType : '00',
                        StatusCode  : '00',
                    },
                })
            },
            {
                id: 'R6', 
                define: new MessageDef_t({
                    id: 'R6',
                    name: '結束成交資料傳送',
                    cond: {
                        FunctionCode: '20',
                        MessageType : '00',
                        StatusCode  : '00',
                    },
                })
            },
            {
                id: 'R1', 
                define: new MessageDef_t({
                    id: 'R1',
                    name: '起始作業訊息',
                    cond: {
                        FunctionCode: '00',
                        MessageType : '00',
                        StatusCode  : '00',
                    },
                })
            },
            {
                id: 'R2', 
                define: new MessageDef_t({
                    id: 'R2',
                    name: '起始作業回覆訊息',
                    cond: {
                        FunctionCode: '00',
                        MessageType : '01',
                    },
                })
            },
            {
                id: 'R4', 
                define: new MessageDef_t({
                    id: 'R4',
                    name: '確定連線作業訊息',
                    cond: {
                        FunctionCode: '00',
                        MessageType : '04',
                        StatusCode  : '00',
                    },
                })
            },
            {
                id: 'R5', 
                define: new MessageDef_t({
                    id: 'R5',
                    name: '確定連線作業回覆訊息',
                    cond: {
                        FunctionCode: '00',
                        MessageType : '05',
                        StatusCode  : '00',
                    },
                })
            },
        ],
    })
];


/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec Object
---------+---------+---------+---------+---------+---------+---------+--------*/

/** @type {Map<string, Subsystem>} */
const SPEC = new Map([SUB_20, SUB_30, SUB_50]);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { SPEC };
