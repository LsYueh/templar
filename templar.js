'use strict'

/**
 * @typedef {import('./lib/message/parse/common.js').Message_t} Message_t
 * @typedef {import('./lib/spec/field/cobol/overpunch.js').OverpunchOpt} OverpunchOpt
 */

const f = {}; const r = {}

f.parse     = require('./lib/message/parse/file-transfer.js').parse;
f.stringify = require('./lib/message/stringify/file-transfer.js').stringify;

r.parse     = require('./lib/message/parse/report.js').parse;
r.stringify = require('./lib/message/stringify/report.js').stringify;

const { version } = require('./lib/meta');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Copybook
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * COBOL PIC Copybook Utilities
 * @namespace copybook
 */
const copybook = {};

copybook.parse = require('./lib/copybook/parse.js').parse;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Methods
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * parse
 * @param {string|Buffer} message 
 * @param {object} [options]
 * @param {string} [options.category] - 'file-transfer' or 'report' (default: 'file-transfer')
 * @returns Parsed message object
 */
function parse(message, options = {}) {
    if (!message) {
        throw new TypeError('Invalid message, require string or Buffer.')
    }

    const catgory = options?.category || 'file-transfer';
    if (catgory !== 'file-transfer' && catgory !== 'report')
        throw new TypeError(`Invalid category '${catgory}', require 'file-transfer' or 'report'.`);

    switch (catgory) {
        case 'file-transfer': // File Transfer
            return f.parse(message)

        case 'report': // Report
            return r.parse(message)

        default:
            throw new TypeError(`Invalid category '${catgory}', require 'file-transfer' or 'report'.`);
    }
}

/**
 * stringify
 * @param {Message_t} message 
 * @param {object} [options]
 * @param {string} [options.category] - 'file-transfer' or 'report' (default: 'file-transfer')
 * @param {OverpunchOpt} [options.overpunchOption] 
 * @returns {string} Stringified message
 */
function stringify(message, options = {}) {
    if (!message || typeof message !== 'object') {
        throw new TypeError('Invalid message, require object.')
    }

    const overpunchOption = options.overpunchOption;

    const catgory = options?.category || 'file-transfer';
    if (catgory !== 'file-transfer' && catgory !== 'report')
        throw new TypeError(`Invalid category '${catgory}', require 'file-transfer' or 'report'.`);

    switch (catgory) {
        case 'file-transfer': // File Transfer
            return f.stringify(message, { overpunchOption });

        case 'report': // Report
            return r.stringify(message, { overpunchOption });

        default:
            throw new TypeError(`Invalid category '${catgory}', require 'file-transfer' or 'report'.`);
    }
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/

/** */
module.exports.version = version;
module.exports.copybook = copybook;
module.exports.parse = parse;
module.exports.stringify = stringify;
