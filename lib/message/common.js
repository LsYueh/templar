'use strict'

const Field = require('../field/field.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {object} param
 * @param {object} param.SPEC 
 * @param {string} param.message (in/out)
 * @returns 
 */
function messageParseFactory(param) {
    if (!param.SPEC) throw new Error(`Param 'SPEC' is required`);

    if (param.message.length < param.SPEC.Size) 
        throw new Error(`[${param.SPEC.description}] Insufficient message length, require '${param.SPEC.Size}', got '${param.message.length}'.`);

    const subMessage = param.message.slice(0, param.SPEC.Size);

    const messageHeader = {};

    for (let index = 0, offset = 0; index < param.SPEC.length; index++) {
        const field = param.SPEC.Field[index];
        const shift = param.SPEC.Index[index];

        const text = subMessage.slice(offset, offset + shift);
        messageHeader[field.name] = Field.parse({ picType: field.picType, type: field.type, text });

        offset += shift;
    }

    // 保留未處理的段落給下一個Parser處理
    param.message = param.message.slice(param.SPEC.Size);

    return messageHeader;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { messageParseFactory };
