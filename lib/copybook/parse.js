'use strict'

const copybooks = require('../spec/copybook/index.js');


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

    return {};
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse };
