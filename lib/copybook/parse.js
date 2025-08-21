'use strict'

const copybooks = require('../spec/copybook/index.js');
const { messageParseFactory } = require('../message/common.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {object} options 
 * @param {string} options.fileCode FILE-CODE
 * @param {string} options.dataText 
 * @returns 
 */
function parse(options) {
    const copybook = copybooks[options.fileCode];

    if (!copybook) throw new Error(`Unknown FILE-CODE: '${options.fileCode}'`);

    if (copybook.Size != options.dataText.length) {
        throw new Error(`FILE-CODE: '${options.fileCode}' Size mismatch. Expected: ${copybook.Size}, Actual: ${options.dataText.length}`);
    }

    const param = {
        message: structuredClone(options.dataText),
        Meta: copybook.Meta,
    }

    const data = messageParseFactory(param);

    if (param.message.length !== 0) throw new Error(`FILE-CODE: '${options.fileCode}' has unparsed data: ${param.message}`);
    
    return data;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
