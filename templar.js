'use strict'

const f = require('./lib/message/parse/file-transfer.js')
const r = require('./lib/message/parse/report.js')
const { version } = require('./lib/meta')


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
 * @param {object} obj 
 * @returns {string|Buffer} Stringified message
 */
function stringify(obj) {
    throw new Error('Not implemented.');
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/

module.exports.version = version
module.exports.parse = parse
module.exports.stringify = stringify
