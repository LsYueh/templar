'use strict'

/**
 * @typedef {import('../spec/fields/common.js').MessageMeta_t} MessageMeta_t
 */

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
 * @param {MessageMeta_t} param.Meta 
 * @param {string} param.message (in/out)
 * @returns 
 */
function messageParseFactory(param) {
    if (!param.Meta) throw new Error(`Param 'SPEC' is required`);

    // Note: 有包含到變動長度欄位(DATA, REQUEST-MESSAGE, RESPONSE-MESSAGE)的情況下不做固定長度檢查
    if (!param.Meta.isVariableLength && (param.message.length < param.Meta.Size)) 
        throw new Error(`[${param.Meta.description}] Insufficient message length, require '${param.Meta.Size}', got '${param.message.length}'.`);

    const subMessage = param.message.slice(0, param.Meta.Size);

    const messageHeader = {};

    for (let index = 0, offset = 0; index < param.Meta.length; index++) {
        const field = param.Meta.Field[index];
        const shift = param.Meta.Index[index];

        const text = subMessage.slice(offset, offset + shift);
        messageHeader[field.name] = parse({ picType: field.picType, dataType: field.dataType, text });

        offset += shift;
    }

    // 保留未處理的段落給下一個Parser處理
    param.message = param.message.slice(param.Meta.Size);

    return messageHeader;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { getMessagesId, messageParseFactory };
