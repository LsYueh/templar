'use strict'

/**
 * @typedef {import('../spec/messages/type.js').Subsystem} Subsystem
 */

const MESSAGES = {
    TSE: require('../spec/messages/tse.js'),
    OTC: require('../spec/messages/otc.js'),
};

const common = require('./common.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

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
    const message = {};

    const param = {
        message: structuredClone(messageText),
        category: '',
    }

    param.category = 'ControlHeader';
    message.header = common.messageHeaderParseFactory(param);
    message.id = getMessagesId(message.header);

    return message;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
