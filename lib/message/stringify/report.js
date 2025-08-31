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
const FIELDS_SPEC_BODY   = require('../../spec/fields/body/report.js');


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
    let str = '';

    // CONTROL-HEADER
    str += messageStringifyFactory(message.header, { Meta: FIELDS_SPEC_HEADER.Meta.ControlHeader, overpunchOption: options.overpunchOption });

    // AP-HEADER
    if (message.id === 'R3') {
        str += messageStringifyFactory(message.header, { Meta: FIELDS_SPEC_HEADER.Meta.ApHeader, overpunchOption: options.overpunchOption });
    }

    // Message body
    const Meta = FIELDS_SPEC_BODY.Meta[message.id];
    for (const body of message.body) {
        str += messageStringifyFactory(body, { Meta, overpunchOption: options.overpunchOption });
    }

    return str;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { stringify };
