'use strict'

const MESSAGE_HEADER = require('../spec/message/header.js');

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


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { messageHeaderParseFactory };
