'use strict'

const MESSAGES = {
    TSE: require('../spec/messages/tse.js'),
    OTC: require('../spec/messages/otc.js'),
};

const { parse } = require('../field/parse.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 根據`CONTROL-HEADER`找到對應的`MESSAGES ID`
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
            if (!controlHeader[fieldName]) { isMatched = false; break; }
            if (controlHeader[fieldName] != fieldCond) { isMatched = false; break; }
        }

        return isMatched;
    });

    return message?.id ?? null;
}

/**
 * @param {object} param
 * @param {object} param.SPEC 
 * @param {string} param.message (in/out)
 * @returns 
 */
function messageParseFactory(param) {
    if (!param.SPEC) throw new Error(`Param 'SPEC' is required`);

    // Note: 有包含到變動長度欄位(DATA, REQUEST-MESSAGE, RESPONSE-MESSAGE)的情況下不做固定長度檢查
    if (!param.SPEC.isVariableLength && (param.message.length < param.SPEC.Size)) 
        throw new Error(`[${param.SPEC.description}] Insufficient message length, require '${param.SPEC.Size}', got '${param.message.length}'.`);

    const subMessage = param.message.slice(0, param.SPEC.Size);

    const messageHeader = {};

    for (let index = 0, offset = 0; index < param.SPEC.length; index++) {
        const field = param.SPEC.Field[index];
        const shift = param.SPEC.Index[index];

        const text = subMessage.slice(offset, offset + shift);
        messageHeader[field.name] = parse({ picType: field.picType, dataType: field.dataType, text });

        offset += shift;
    }

    // 保留未處理的段落給下一個Parser處理
    param.message = param.message.slice(param.SPEC.Size);

    return messageHeader;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { getMessagesId, messageParseFactory };
