'use strict'

/**
 * @typedef {import('../spec/messages/type.js').Subsystem} Subsystem
 */

const MESSAGE_HEADER = require('../spec/message/header.js');
const MESSAGE_BODY   = require('../spec/message/body/F.js');

const { Message_t } = require('../spec/messages/type.js');

const common = require('./common.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 檔案傳輸子系統
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

    const size = MESSAGE_HEADER.SPEC.ControlHeader.Size + MESSAGE_HEADER.SPEC.FileTransferHeader.Size;
    if (messageText.length < size)
        throw new Error(`[F] Insufficient message header length, require '${size}', got '${messageText.length}'.`);

    // CONTROL-HEADER
    param.SPEC = MESSAGE_HEADER.SPEC.ControlHeader;
    const ctrlHeader = common.messageParseFactory(param);

    // FILE-TRANSFER-HEADER
    param.SPEC = MESSAGE_HEADER.SPEC.FileTransferHeader;
    const apHeader = common.messageParseFactory(param);

    message.header = {...ctrlHeader, ...apHeader}
    message.id = common.getMessagesId(message.header);

    if (!message.id)
        throw new Error(`[F] Unable retrieve message ID form message: '${messageText}'.`);

    if (message.header.BodyLength != param.message.length)
        throw new Error(`[F] Message body mismatch, require '${message.header.BodyLength}', got '${param.message.length}'.`);

    // 解析檔身
    param.SPEC = MESSAGE_BODY.SPEC[message.id];
    if (!param.SPEC) throw new Error(`[${param.SPEC.description}] Unknown MESSAGE-ID: '${message.id}'`);
    message.body.push(common.messageParseFactory(param));

    // 留存剩餘電文
    message.remained = param.message;

    return message;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
