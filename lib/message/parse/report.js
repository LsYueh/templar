'use strict'

const FIELDS_SPEC_HEADER = require('../../spec/fields/header.js');
const FIELDS_SPEC_BODY   = require('../../spec/fields/body/report.js');

const { Message_t, getMessagesId, messageParseFactory } = require('../common.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Method
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 成交回報子系統
 * @param {string} messageText 
 * @returns 
 */
function parse(messageText) {
    const message = new Message_t();
    message.raw = messageText;

    const param = {
        message: structuredClone(messageText),
        Meta: null,
    }

    // 解析檔頭
    param.Meta = FIELDS_SPEC_HEADER.Meta.ControlHeader;
    message.header = messageParseFactory(param);
    
    message.id = getMessagesId(message.header);

    if (!message.id)
        throw new Error(`[F] Unable Retrieve Message ID form message: '${messageText}'.`);

    // 要多解析AP檔頭
    if (message.id === 'R3') {
        param.Meta = FIELDS_SPEC_HEADER.Meta.ApHeader;
        const apHeader = messageParseFactory(param);

        message.header = {...message.header, ...apHeader}

        // 根據AP檔頭切割資料內容
        if (param.message.length !== message.header.BodyLength)
            throw new Error(`[${param.Meta.description}] Text length mismatch. 66 x ${message.header.BodyCnt} = ${message.header.BodyLength} != ${param.message.length}`);

        // 解析檔身
        param.Meta = FIELDS_SPEC_BODY.Meta[message.id];
        if (!param.Meta) throw new Error(`[${param.Meta.description}] Unknown MESSAGE-ID: '${message.id}'`);
        while (param.message.length > 0) {
            message.body.push(messageParseFactory(param));
        }
    } else {
        // 解析檔身
        param.Meta = FIELDS_SPEC_BODY.Meta[message.id];
        if (!param.Meta) throw new Error(`[${param.Meta.description}] Unknown MESSAGE-ID: '${message.id}'`);
        message.body.push(messageParseFactory(param));
    }
    
    // 留存剩餘電文
    message.remained = param.message;

    return message;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
