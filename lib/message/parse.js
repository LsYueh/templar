'use strict'

const MESSAGE_HEADER_SPEC = require('../spec/message-header.js');

const Field = require('../field/field.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {string} message 
 * @param {*} specCategory 
 * @returns 
 */
function messageHeaderParseFactory(message, specCategory) {
    const HDSP = MESSAGE_HEADER_SPEC.ControlHeader;

    if (message.length < HDSP.Size) return null;

    const subMessage = message.slice(0, HDSP.Size);

    const messageHeader = {};

    for (let index = 0, offset = 0; index < HDSP.Index.length; index++) {
        const field = HDSP.Field[index];
        const shift = HDSP.Index[index];

        const text = subMessage.slice(offset, offset + shift);
        messageHeader[field.name] = Field.parse({ picType: field.picType, type: field.type, text });

        offset += shift;
    }

    const remained = message.slice(HDSP.Size);

    return { messageHeader, remained };
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Method
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {string} message 
 * @returns 
 */
function parse(message) {
    const { messageHeader:ControlHeader, remained } = messageHeaderParseFactory(message);

    return { ControlHeader };
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
