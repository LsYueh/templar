'use strict'

/**
 * @typedef {ReturnType<typeof import('../../spec/common.js').specFactory>} SPEC_t
 */

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {object} options 
 * @param {string} options.fileCode FILE-CODE
 * @param {string?} options.description 
 * @param {number?} options.Size 
 * @param {string[]?} options.primaryKey  
 * @param {SPEC_t?} options.SPEC  
 * @returns 
 */
function copybookFactory(options) {
    const copybook = {
        fileCode: options.fileCode,
        description: options.description ?? '',
        Size: options.Size ?? 0,
        primaryKey: options.primaryKey ?? [], 
        SPEC: options.SPEC ?? null,
    };

    return copybook;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { copybookFactory };
