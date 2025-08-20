'use strict'

/**
 * @typedef {import('../../spec/messages/type.js').Subsystem} Subsystem
 */

const MESSAGE_HEADER = require('../../spec/message/header.js');
const MESSAGE_BODY   = require('../../spec/message/body/report.js');

const { Message_t } = require('../../spec/messages/type.js');

const common = require('../common.js');


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
        SPEC: null,
    }

    // 解析檔頭
    param.SPEC = MESSAGE_HEADER.SPEC.ControlHeader;
    message.header = common.messageParseFactory(param);
    
    message.id = common.getMessagesId(message.header);

    if (!message.id)
        throw new Error(`[F] Unable Retrieve Message ID form message: '${messageText}'.`);

    // 要多解析AP檔頭
    if (message.id === 'R3') {
        param.SPEC = MESSAGE_HEADER.SPEC.ApHeader;
        const apHeader = common.messageParseFactory(param);

        message.header = {...message.header, ...apHeader}

        // 根據AP檔頭切割資料內容
        if (param.message.length !== message.header.BodyLength)
            throw new Error(`[${param.SPEC.description}] Text length mismatch. 66 x ${message.header.BodyCnt} = ${message.header.BodyLength} != ${param.message.length}`);

        // 解析檔身
        param.SPEC = MESSAGE_BODY.SPEC[message.id];
        if (!param.SPEC) throw new Error(`[${param.SPEC.description}] Unknown MESSAGE-ID: '${message.id}'`);
        while (param.message.length > 0) {
            message.body.push(common.messageParseFactory(param));
        }
    } else {
        // 解析檔身
        param.SPEC = MESSAGE_BODY.SPEC[message.id];
        if (!param.SPEC) throw new Error(`[${param.SPEC.description}] Unknown MESSAGE-ID: '${message.id}'`);
        message.body.push(common.messageParseFactory(param));
    }
    
    // 留存剩餘電文
    message.remained = param.message;

    return message;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
