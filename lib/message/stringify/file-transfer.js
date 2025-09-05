'use strict'

/**
 * @typedef {import('../parse/common.js').Message_t} Message_t
 * @typedef {import('../../spec/field/cobol/overpunch.js').OverpunchOpt} OverpunchOpt
 */

const { messageStringifyFactory } = require('./common.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Specs
---------+---------+---------+---------+---------+---------+---------+--------*/

const FIELDS_SPEC_HEADER = require('../../spec/fields/header.js');
const FIELDS_SPEC_BODY   = require('../../spec/fields/body/file-transfer.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Method
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {Message_t} message Message
 * @param {object} options 
 * @param {OverpunchOpt} [options.overpunchOption] 
 * @returns 
 */
function stringify(message, options = {}) {
    const overpunchOption = options.overpunchOption;
    
    let strBody = '';

    // Message body
    const Meta = FIELDS_SPEC_BODY.Meta[message.id];
    for (const body of message.body) {
        strBody += messageStringifyFactory(body, { Meta, overpunchOption });
    }
    
    // Update FILE-TRANSFER-HEADER
    message.header.BodyLength = strBody.length;

    // CONTROL-HEADER + FILE-TRANSFER-HEADER
    const strHeader = messageStringifyFactory(message.header, { Meta: FIELDS_SPEC_HEADER.Meta.ControlHeader, overpunchOption })
    /** -------- */ + messageStringifyFactory(message.header, { Meta: FIELDS_SPEC_HEADER.Meta.FileTransferHeader, overpunchOption });

    return strHeader + strBody;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { stringify };
