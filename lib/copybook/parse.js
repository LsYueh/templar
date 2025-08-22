'use strict'

const copybooks = require('../spec/copybook/index.js');
const { toBuffer, messageParseFactory } = require('../message/common.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {object} options 
 * @param {string} options.fileCode FILE-CODE
 * @param {string|Buffer} options.data 
 * @returns 
 */
function parse(options) {
    const copybook = copybooks[options.fileCode];

    if (!copybook) throw new Error(`Unknown FILE-CODE: '${options.fileCode}'`);

    const buffer = toBuffer(options.data);

    if (copybook.Size != buffer.length) {
        throw new Error(`FILE-CODE: '${options.fileCode}' Size mismatch. Expected: ${copybook.Size}, Actual: ${options.data.length}`);
    }

    const param = {
        message: structuredClone(buffer),
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
