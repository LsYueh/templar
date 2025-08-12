'use strict'

const { PicType } = require('../field/cobol-pic.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Class
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class Spec
 */
class Spec {
    /** @type {string} 名稱 */
    name;
    /** @type {PicType} COBOL-PIC 資料結構描述 */
    picType;
    /** @type {string} 說明 */
    description;

    /**
     * @param {object} options 
     */
    constructor(options) {
        this.name = options.name;
        this.picType = options.picType;
        this.description = options.description;
    }

    toString() {
        return `${this.picType.toString()} ${this.name} : ${this.description}`;
    }
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec
---------+---------+---------+---------+---------+---------+---------+--------*/

/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 全子系統通用的檔頭
 */
const ControlHeader = [
    {
        key: 'SUBSYSTEM-NAME',
        value: new Spec({
            name: 'SUBSYSTEM-NAME',
            picType: new PicType('9', 2),
            description: '子系統名稱',
        })
    },
    {
        key: 'FUNCTION-CODE',
        value: new Spec({
            name: 'FUNCTION-CODE',
            picType: new PicType('9', 2),
            description: '執行功能類型',
        })
    },
    {
        key: 'MESSAGE-TYPE',
        value: new Spec({
            name: 'MESSAGE-TYPE',
            picType: new PicType('9', 2),
            description: '訊息類型',
        })
    },
    {
        key: 'MESSAGE-TIME',
        value: new Spec({
            name: 'MESSAGE-TIME',
            picType: new PicType('9', 6),
            description: '訊息傳送時間(HHMMSS)',
        })
    },
    {
        key: 'STATUS-CODE',
        value: new Spec({
            name: 'STATUS-CODE',
            picType: new PicType('9', 2),
            description: '狀態訊息碼',
        })
    },
];

/**
 * `連線子系統`用的檔身
 */
const L = [
    {
        key: 'APPEND-NO',
        value: new Spec({
            name: 'APPEND-NO',
            picType: new PicType('9', 3),
            description: '其內容為三位數之亂數，附在通知登錄訊息傳給證券商，並要求證券商將其附在登錄訊息傳回給證交所，作為計算KEY-VALUE之用',
        })
    },
    {
        key: 'BORKER-ID',
        value: new Spec({
            name: 'BORKER-ID',
            picType: new PicType('X', 4),
            description: 'BROKER-NO + BRANCH-NO',
        })
    },
    {
        key: 'BROKER-NO',
        value: new Spec({
            name: 'BROKER-NO',
            picType: new PicType('9', 3),
            description: '證券商代號',
        })
    },
    {
        key: 'BRANCH-NO',
        value: new Spec({
            name: 'BRANCH-NO',
            picType: new PicType('X', 1),
            description: '總分公司代號T︰自營商 0︰總公司 >0︰分公司',
        })
    },
    {
        key: 'AP-CODE',
        value: new Spec({
            name: 'AP-CODE',
            picType: new PicType('X', 1),
            description:[
                '0  普通股交易子系統',
                '1  單筆訊息與檔案傳輸子系統',
                '2  盤後零股交易子系統', '3  成交回報子系統',
                '4  標借交易子系統', '5  拍賣交易子系統',
                '6  標購交易子系統','7  盤後定價交易子系統',
                '9  單筆訊息與檔案傳輸子系統 (4K版)',
                'A  成交回報子系統(4K版)',
                'B  證金標購交易子系統',
                'C  盤中零股交易子系統',
            ].join("\n"),
        })
    },
    {
        key: 'KEY-VALUE',
        value: new Spec({
            name: 'KEY-VALUE',
            picType: new PicType('9', 2),
            description: '(APPEND-NO * PASSWORD)取千與百二位數字',
        })
    },
    {
        key: 'PASSWORD',
        value: new Spec({
            name: 'PASSWORD',
            picType: new PicType('9', 4),
            description: '指證券商針對各PVC事先與交易所訂定之密碼'
        })
    },
];

/**
 * `單筆訊息與檔案傳輸子系統`的檔頭
 */
const FileTransferHeader = [
    {
        key: 'SOURCE-ID',
        value: new Spec({
            name: 'SOURCE-ID',
            picType: new PicType('X', 4),
            description: '傳送方之ID',
        })
    },
    {
        key: 'OBJECT-ID',
        value: new Spec({
            name: 'OBJECT-ID',
            picType: new PicType('X', 4),
            description: '接收方之ID',
        })
    },
    {
        key: 'BODY-LENGTH-FT',
        value: new Spec({
            name: 'BODY-LENGTH',
            picType: new PicType('9', 4),
            description: '訊息格式中BODY之長度',
        })
    },
];

/**
 * `單筆訊息與檔案傳輸子系統`的檔身
 */
const F = [
    {
        key: 'FILE-CODE',
        value: new Spec({
            name: 'FILE-CODE',
            picType: new PicType('X', 3),
            description: '檔案代號',
        })
    },
    {
        key: 'FILE-SIZE',
        value: new Spec({
            name: 'FILE-SIZE',
            picType: new PicType('9', 8),
            description: '資料檔案之大小(以byte為單位)',
        })
    },
    {
        key: 'EOF',
        value: new Spec({
            name: 'EOF',
            picType: new PicType('9', 1),
            description: '若為檔案最後一筆資料訊息填1，否則為0',
        })
    },
    {
        key: 'DATA',
        value: new Spec({
            name: 'DATA',
            picType: new PicType('X', 994),
            description: '資料檔案之內容',
        })
    },
    {
        key: 'DATA-4K',
        value: new Spec({
            name: 'DATA',
            picType: new PicType('X', 3976),
            description: '資料檔案之內容 (4K擴充版)',
        })
    },
    {
        key: 'REQUEST-MESSAGE',
        value: new Spec({
            name: 'REQUEST-MESSAGE',
            picType: new PicType('X', 995),
            description: '由傳送介面送出之單筆訊息內容',
        })
    },
    {
        key: 'RESPONSE-MESSAGE',
        value: new Spec({
            name: 'RESPONSE-MESSAGE',
            picType: new PicType('X', 995),
            description: '由接收介面送出單筆訊訊息內容',
        })
    },
];

/**
 * `成交回報資料`使用之傳輸擋頭
 */
const ApHeader = [
    {
        key: 'BODY-LENGTH-AP',
        value: new Spec({
            name: 'BODY-LENGTH',
            picType: new PicType('9', 4),
            description: '成交回報資料總長度',
        })
    },
    {
        key: 'BODY-CNT',
        value: new Spec({
            name: 'BODY-CNT',
            picType: new PicType('9', 4),
            description: '成交回報資料筆數',
        })
    },
];

const batch = [].concat(
    ControlHeader,
    L,
    FileTransferHeader, F,
    ApHeader
);

/** @type {Map<string, Spec>} */
const Specs = new Map(batch.map((data) => [data.key, data.value]));


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Spec, Specs };
