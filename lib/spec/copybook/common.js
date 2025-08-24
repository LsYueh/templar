'use strict'

/**
 * @typedef {import('../../spec/fields/common.js').MessageMeta_t} MessageMeta_t
 */

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {object} options 
 * @param {string} options.fileCode FILE-CODE
 * @param {string} [options.description] 
 * @param {number} [options.Size] 
 * @param {string[]} [options.primaryKey]  
 * @param {MessageMeta_t} [options.Meta]  
 * @returns Copybook_t
 * 
 * @typedef {ReturnType<typeof copybookFactory>} Copybook_t
 * @description 用於建立Copybook物件的工廠函式
 */
function copybookFactory(options) {
    const copybook = {
        fileCode: options.fileCode,
        description: options.description ?? '',
        Size: options.Size ?? 0,
        primaryKey: options.primaryKey ?? [],
        Meta: options.Meta ?? null,
    };

    return copybook;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { copybookFactory };
