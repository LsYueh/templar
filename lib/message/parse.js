'use strict'

const MESSAGE_HEADER_SPEC = require('../spec/message-header.js');

const Field = require('../field/field.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {object} param
 * @param {string} param.message (in/out)
 * @param {string} param.specCategory 
 * @returns 
 */
function messageHeaderParseFactory(param) {
    const HDSP = MESSAGE_HEADER_SPEC[param.specCategory];

    if (!HDSP) throw new Error(`Unknown Header Spec Category: '${param.specCategory}'`);

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
        specCategory: '',
    }

    param.specCategory = 'ControlHeader';
    const ControlHeader = messageHeaderParseFactory(param);

    return { ControlHeader };
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
