'use strict'

const MESSAGE_HEADER = require('../spec/message/header.js');
const MESSAGES = {
    TSE: require('../spec/messages/tse.js'),
    OTC: require('../spec/messages/otc.js'),
};

const Field = require('../field/field.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {object} param
 * @param {string} param.message (in/out)
 * @param {string} param.category 
 * @returns 
 */
function messageHeaderParseFactory(param) {
    const HDSP = MESSAGE_HEADER.SPEC[param.category];

    if (!HDSP) throw new Error(`Unknown Header Spec Category: '${param.category}'`);

    if (param.message.length < HDSP.Size) return null;

    const subMessage = param.message.slice(0, HDSP.Size);

    const messageHeader = {};

    for (let index = 0, offset = 0; index < HDSP.length; index++) {
        const field = HDSP.Field[index];
        const shift = HDSP.Index[index];

        const text = subMessage.slice(offset, offset + shift);
        messageHeader[field.name] = Field.parse({ picType: field.picType, type: field.type, text });

        offset += shift;
    }

    // 保留未處理的段落給下一個Parser處理
    param.message = param.message.slice(HDSP.Size);

    return messageHeader;
}

/**
 * @param {*} controlHeader 
 * @returns 
 */
function getMessagesId(controlHeader) {
     // 判斷訊息種類
    const subsystem = MESSAGES.TSE.SUBSYS.get(controlHeader.SubsystemName);

    if (!subsystem) throw new Error(`Unknown Subsystem Name: '${controlHeader.SubsystemName}'`);

    const message = subsystem.messages.find((message) => {
        let isMatched = true;
        for (const [fieldName, fieldCond] of Object.entries(message.define.cond)) {
            if (controlHeader[fieldName] && ((controlHeader[fieldName] != fieldCond))) { isMatched = false; break;}
        }

        return isMatched;
    });

    return message?.id ?? '';
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Method
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {string} message 
 * @returns 
 */
function parse(message) {
    const param = {
        message: structuredClone(message),
        category: '',
    }

    param.category = 'ControlHeader';
    const ControlHeader = messageHeaderParseFactory(param);

    const id = getMessagesId(ControlHeader);

    return { id };
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
