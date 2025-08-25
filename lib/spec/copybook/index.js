'use strict'

const copybooks = {
    tse: require('./tse/index.js'),
    otc: require('./otc/index.js'),
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {object} options 
 * @param {string} options.fileCode FILE-CODE
 * @param {string} options.market 市場別 (TSE:上市 OTC:上櫃)
 * @param {boolean} [options.marketOverride] 上櫃用，當沒有OTC的copybook則改用上市的取代
 * @returns 
 */
function getCopybook(options) {
    const cp_t = copybooks.tse[options.fileCode] ?? null;
    const cp_o = copybooks.otc[options.fileCode] ?? null;

    /** */ if (options.market === 'TSE') {
        return cp_t;
    } else if (options.market === 'OTC') {
        if (!cp_o && options.marketOverride) return cp_t;
        return cp_o;
    }
    else { return null; }
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { getCopybook };
