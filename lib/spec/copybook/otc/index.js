'use strict';

/**
 * @typedef {import('../common.js').Copybook_t} Copybook_t
 * @typedef {Object<string, Copybook_t>} Copybooks_t
 */

const fs = require('fs');
const path = require('path');

/** @type {string} */
const basename = path.basename(__filename);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Copybook Object
---------+---------+---------+---------+---------+---------+---------+--------*/

/** @type {Copybooks_t} */
const copybooks = {};


/**------+---------+---------+---------+---------+---------+---------+----------
 * Load Copybooks
---------+---------+---------+---------+---------+---------+---------+--------*/

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    /** @type {Copybook_t} */
    const copybook = require(path.join(__dirname, file));
    copybooks[copybook.fileCode] = copybook;
  });


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = copybooks;
