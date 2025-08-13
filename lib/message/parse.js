'use strict'

const MESSAGE_HEADER_SPEC = require('../spec/message-header.js');

const { convert } = require('../field/field.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Method
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {string} message 
 * @returns 
 */
function parseControlHeader(message) {
    const SpCtrlHeader = MESSAGE_HEADER_SPEC.ControlHeader;

    if (message.length < SpCtrlHeader.Size) return null;

    const subMessage = message.slice(0, SpCtrlHeader.Size);

    const ControlHeader = {};

    for (let index = 0, offset = 0; index < SpCtrlHeader.Index.length; index++) {
        const spec = SpCtrlHeader.Field[index];

        const property = spec.name;
        const value = subMessage.slice(offset, offset + SpCtrlHeader.Index[index]);

        ControlHeader[property] = convert({ picType: spec.picType, type: spec.type, value });

        offset += SpCtrlHeader.Index[index];
    }

    const remained = message.slice(SpCtrlHeader.Size);

    return { ControlHeader, remained };
}

/**
 * @param {string} message 
 * @returns 
 */
function parse(message) {
    const { ControlHeader, remained } = parseControlHeader(message);

    return { ControlHeader };
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
