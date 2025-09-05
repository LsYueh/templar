'use strict'

/**
 * @typedef {import('../../spec/field/cobol/overpunch.js').OverpunchOpt} OverpunchOpt
 * @typedef {import('../../spec/fields/common.js').MessageMeta_t} MessageMeta_t
 */


/**------+---------+---------+---------+---------+---------+---------+----------
 * Stringify
---------+---------+---------+---------+---------+---------+---------+--------*/

const { stringify } = require('../../field/stringify.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {object} messagePartial
 * @param {object} options
 * @param {MessageMeta_t} options.Meta 
 * @param {OverpunchOpt} [options.overpunchOption] 進位符號選項
 * @returns 
 */
function messageStringifyFactory(messagePartial, options = {}) {
    let str = '';

    for (const field of options.Meta.Field) {
        if (!(field.name in messagePartial)) throw new Error(`Field '${field.name}' is missing in message.`);

        const input = messagePartial[field.name];

        const text = stringify(input, { picType: field.picType, overpunchOption: options.overpunchOption, isVariableLength: field.isVariableLength });
        
        str += text;
    }

    return str
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { messageStringifyFactory };
