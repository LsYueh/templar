'use strict'

const { getCopybook } = require('../spec/copybook/index.js');

const { toBuffer, messageParseFactory } = require('../message/common.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/



/**
 * @param {object} options 
 * @param {string} options.fileCode FILE-CODE
 * @param {string|Buffer} options.data 
 * @param {string} [options.market] 市場別 (TSE:上市 OTC:上櫃)
 * @param {boolean} [options.marketOverride] 上櫃用，當沒有OTC的copybook則改用上市的取代
 * @returns 
 */
function parse(options) {
    options.market = options.market || 'TSE';

    if (!options.market || (options.market !== 'TSE' && options.market !== 'OTC')) throw new Error("Invalid options.market. Should be 'TSE' or 'OTC'");

    const copybook = getCopybook(options);

    if (!copybook) throw new Error(`Unknown ${options.market} FILE-CODE: '${options.fileCode}'`);

    const buffer = toBuffer(options.data);

    if (copybook.Size != buffer.length) {
        throw new Error(`${options.market} FILE-CODE: '${options.fileCode}' Size mismatch. Expected: ${copybook.Size}, Actual: ${options.data.length}`);
    }

    const param = {
        message: structuredClone(buffer),
        Meta: copybook.Meta,
    }

    const data = messageParseFactory(param);

    if (param.message.length !== 0) throw new Error(`${options.market} FILE-CODE: '${options.fileCode}' has unparsed data: ${param.message}`);
    
    return data;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
