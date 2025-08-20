'use strict'

const FIELDS_SPEC_HEADER = require('../../spec/fields/header.js');
const FIELDS_SPEC_BODY   = require('../../spec/fields/body/file-transfer.js');

const { Message_t, getMessagesId, messageParseFactory } = require('../common.js');

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

    const size = FIELDS_SPEC_HEADER.Meta.ControlHeader.Size + FIELDS_SPEC_HEADER.Meta.FileTransferHeader.Size;
    if (messageText.length < size)
        throw new Error(`[F] Insufficient message header length, require '${size}', got '${messageText.length}'.`);

    // CONTROL-HEADER
    param.Meta = FIELDS_SPEC_HEADER.Meta.ControlHeader;
    const ctrlHeader = messageParseFactory(param);

    // FILE-TRANSFER-HEADER
    param.Meta = FIELDS_SPEC_HEADER.Meta.FileTransferHeader;
    const apHeader = messageParseFactory(param);

    message.header = {...ctrlHeader, ...apHeader}
    message.id = getMessagesId(message.header);

    if (!message.id)
        throw new Error(`[F] Unable retrieve message ID form message: '${messageText}'.`);

    if (message.header.BodyLength != param.message.length)
        throw new Error(`[F] Message body mismatch, require '${message.header.BodyLength}', got '${param.message.length}'.`);

    // 解析檔身
    param.Meta = FIELDS_SPEC_BODY.Meta[message.id];
    if (!param.Meta) throw new Error(`[${param.Meta.description}] Unknown MESSAGE-ID: '${message.id}'`);
    message.body.push(messageParseFactory(param));

    // 留存剩餘電文
    message.remained = param.message;

    return message;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
