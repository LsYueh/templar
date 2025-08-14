'use strict'

const { Spec_t } = require('../type.js');
const { PicType } = require('../../../field/cobol/cobol-pic.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Spec
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * `連線子系統`用的檔身
 */
const batchs = [
    {
        key: 'APPEND-NO',
        value: new Spec_t({
            name: 'APPEND-NO',
            picType: new PicType('9', 3),
            description: '其內容為三位數之亂數，附在通知登錄訊息傳給證券商，並要求證券商將其附在登錄訊息傳回給證交所，作為計算KEY-VALUE之用',
        })
    },
    {
        key: 'BORKER-ID',
        value: new Spec_t({
            name: 'BORKER-ID',
            picType: new PicType('X', 4),
            description: 'BROKER-NO + BRANCH-NO',
        })
    },
    {
        key: 'BROKER-NO',
        value: new Spec_t({
            name: 'BROKER-NO',
            picType: new PicType('9', 3),
            description: '證券商代號',
        })
    },
    {
        key: 'BRANCH-NO',
        value: new Spec_t({
            name: 'BRANCH-NO',
            picType: new PicType('X', 1),
            description: '總分公司代號T︰自營商 0︰總公司 >0︰分公司',
        })
    },
    {
        key: 'AP-CODE',
        value: new Spec_t({
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
        value: new Spec_t({
            name: 'KEY-VALUE',
            picType: new PicType('9', 2),
            description: '(APPEND-NO * PASSWORD)取千與百二位數字',
        })
    },
    {
        key: 'PASSWORD',
        value: new Spec_t({
            name: 'PASSWORD',
            picType: new PicType('9', 4),
            description: '指證券商針對各PVC事先與交易所訂定之密碼'
        })
    },
];

/** @type {Map<string, Spec_t>} */
const Specs = new Map(batchs.map((data) => [data.key, data.value]));


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Specs };
