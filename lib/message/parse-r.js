'use strict'

/**
 * @typedef {import('../spec/messages/type.js').Subsystem} Subsystem
 */

const MESSAGE_HEADER = require('../spec/message/header.js');
const MESSAGE_BODY   = require('../spec/message/body/R.js');

const MESSAGES = {
    TSE: require('../spec/messages/tse.js'),
    OTC: require('../spec/messages/otc.js'),
};

const { Message_t } = require('../spec/messages/type.js');

const common = require('./common.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {string} str 
 * @param {number} length 
 * @returns 
 */
function splitByLength(str, length) {
    const regex = new RegExp(`.{1,${length}}`, 'g');
    return str.match(regex);
}

/**
 * @param {*} controlHeader 
 * @returns 
 */
function getMessagesId(controlHeader) {
    // 判斷訊息種類

    /** @type {Subsystem} */
    const subsystem = MESSAGES.TSE.SPEC.get(controlHeader.SubsystemName) || MESSAGES.TSE.OTC.get(controlHeader.SubsystemName);

    if (!subsystem) throw new Error(`Unknown Subsystem Name: '${controlHeader.SubsystemName}'`);

    const message = subsystem.messages.find((message) => {
        let isMatched = true;
        for (const [fieldName, fieldCond] of Object.entries(message.define.cond)) {
            if (controlHeader[fieldName] && ((controlHeader[fieldName] != fieldCond))) { isMatched = false; break;}
        }

        return isMatched;
    });

    return message?.id ?? null;
}


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
    message.id = getMessagesId(message.header);

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

    
    // 如果沒有處理完，把剩餘電文留存
    message.remained = param.message;

    return message;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
