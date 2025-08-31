'use strict'

const FIELDS_SPEC_HEADER = require('../../spec/fields/header.js');
const FIELDS_SPEC_BODY   = require('../../spec/fields/body/report.js');

const { Message_t, toBuffer, getMessagesId, messageParseFactory } = require('./common.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Method
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 成交回報子系統
 * @param {string|Buffer} message 
 * @returns 
 */
function parse(message) {
    const message_ = new Message_t();
    message_.raw = toBuffer(message);

    const param = {
        message: structuredClone(message_.raw),
        Meta: null,
    }

    // 解析檔頭
    param.Meta = FIELDS_SPEC_HEADER.Meta.ControlHeader;
    message_.header = messageParseFactory(param);
    
    message_.id = getMessagesId(message_.header);

    if (!message_.id)
        throw new Error(`[F] Unable Retrieve Message ID form message: '${message}'.`);

    // 要多解析AP檔頭
    if (message_.id === 'R3') {
        param.Meta = FIELDS_SPEC_HEADER.Meta.ApHeader;
        const apHeader = messageParseFactory(param);

        message_.header = {...message_.header, ...apHeader}

        // 根據AP檔頭切割資料內容
        if (param.message.length !== message_.header.BodyLength)
            throw new Error(`[${param.Meta.description}] Text length mismatch. 66 x ${message_.header.BodyCnt} = ${message_.header.BodyLength} != ${param.message.length}`);

        // 解析檔身
        param.Meta = FIELDS_SPEC_BODY.Meta[message_.id];
        if (!param.Meta) throw new Error(`[${param.Meta.description}] Unknown MESSAGE-ID: '${message_.id}'`);
        while (param.message.length > 0) {
            message_.body.push(messageParseFactory(param));
        }
    } else {
        // 解析檔身
        param.Meta = FIELDS_SPEC_BODY.Meta[message_.id];
        if (!param.Meta) throw new Error(`[${param.Meta.description}] Unknown MESSAGE-ID: '${message_.id}'`);
        message_.body.push(messageParseFactory(param));
    }
    
    // 留存剩餘電文
    message_.remained = param.message;

    return message_;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
