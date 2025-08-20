'use strict'

/**
 * @typedef {import('../../spec/messages/type.js').Subsystem} Subsystem
 */

const FIELDS_HEADER = require('../../spec/fields/header.js');
const FIELDS_BODY   = require('../../spec/fields/body/file-transfer.js');

const { Message_t } = require('../../spec/messages/type.js');

const common = require('../common.js');

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
        Meta: null,
    }

    const size = FIELDS_HEADER.Meta.ControlHeader.Size + FIELDS_HEADER.Meta.FileTransferHeader.Size;
    if (messageText.length < size)
        throw new Error(`[F] Insufficient message header length, require '${size}', got '${messageText.length}'.`);

    // CONTROL-HEADER
    param.Meta = FIELDS_HEADER.Meta.ControlHeader;
    const ctrlHeader = common.messageParseFactory(param);

    // FILE-TRANSFER-HEADER
    param.Meta = FIELDS_HEADER.Meta.FileTransferHeader;
    const apHeader = common.messageParseFactory(param);

    message.header = {...ctrlHeader, ...apHeader}
    message.id = common.getMessagesId(message.header);

    if (!message.id)
        throw new Error(`[F] Unable retrieve message ID form message: '${messageText}'.`);

    if (message.header.BodyLength != param.message.length)
        throw new Error(`[F] Message body mismatch, require '${message.header.BodyLength}', got '${param.message.length}'.`);

    // 解析檔身
    param.Meta = FIELDS_BODY.Meta[message.id];
    if (!param.Meta) throw new Error(`[${param.Meta.description}] Unknown MESSAGE-ID: '${message.id}'`);
    message.body.push(common.messageParseFactory(param));

    // 留存剩餘電文
    message.remained = param.message;

    return message;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
