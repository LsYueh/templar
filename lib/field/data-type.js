'use strict'

let cnt = 0;

/**------+---------+---------+---------+---------+---------+---------+----------
 * Base
---------+---------+---------+---------+---------+---------+---------+--------*/

cnt = 1;
/** @enum {number} Modern Data Type */
const DataType = {
  FILLER   : -1,
  String   : cnt,  X: cnt++,
  Unsigned : cnt, _9: cnt++,
  Signed   : cnt, S9: cnt++,
  Date     : cnt++,
  Time     : cnt++,
  Datetime : cnt++,
  Timestamp: cnt++,
};
Object.freeze(DataType);


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { DataType };
