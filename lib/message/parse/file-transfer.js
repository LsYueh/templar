'use strict'

const FIELDS_SPEC_HEADER = require('../../spec/fields/header.js');
const FIELDS_SPEC_BODY   = require('../../spec/fields/body/file-transfer.js');

const { Message_t, toBuffer, getMessagesId, messageParseFactory } = require('../common.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 檔案傳輸子系統
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

    const size = FIELDS_SPEC_HEADER.Meta.ControlHeader.Size + FIELDS_SPEC_HEADER.Meta.FileTransferHeader.Size;
    if (message.length < size)
        throw new Error(`[F] Insufficient message header length, require '${size}', got '${message.length}'.`);

    // CONTROL-HEADER
    param.Meta = FIELDS_SPEC_HEADER.Meta.ControlHeader;
    const ctrlHeader = messageParseFactory(param);

    // FILE-TRANSFER-HEADER
    param.Meta = FIELDS_SPEC_HEADER.Meta.FileTransferHeader;
    const apHeader = messageParseFactory(param);

    message_.header = {...ctrlHeader, ...apHeader}
    message_.id = getMessagesId(message_.header);

    if (!message_.id)
        throw new Error(`[F] Unable retrieve message ID form message: '${message}'.`);

    if (message_.header.BodyLength != param.message.length)
        throw new Error(`[F] Message body mismatch, require '${message_.header.BodyLength}', got '${param.message.length}'.`);

    // 解析檔身
    param.Meta = FIELDS_SPEC_BODY.Meta[message_.id];
    if (!param.Meta) throw new Error(`[${param.Meta.description}] Unknown MESSAGE-ID: '${message_.id}'`);
    message_.body.push(messageParseFactory(param));

    // 留存剩餘電文
    message_.remained = param.message;

    return message_;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
