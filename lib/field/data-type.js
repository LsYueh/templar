'use strict'

let dt = 0;

/**------+---------+---------+---------+---------+---------+---------+----------
 * Base
---------+---------+---------+---------+---------+---------+---------+--------*/

dt = 1;
/** @enum {number} Based on COBOL Data Type: X/9/S9 */
const Type = {
  FILLER: -1,
  X: dt++,
  _9: dt++,
  S9: dt++,
  Date: dt++,
  Time: dt++,
  Datetime: dt++,
  Timestamp: dt++,
};
Object.freeze(Type);

dt = 1;
/** @enum {number} sign-storage conventions: -Dca, -Dcb, -Dci, -Dcm, -Dcn, -Dcr, and -Dcv. */
const SignStorageOption = {
  CA: dt++, // RM/COBOL (not RM/COBOL-85) 
  CB: dt++, // MBP COBOL
  CI: dt++, // IBM COBOL (RM/COBOL-85)
  CM: dt++, // Micro Focus COBOL
  CN: dt++, // NCR COBOL
  CR: dt++, // Realia COBOL
  CV: dt++, // VAX COBOL
}
Object.freeze(SignStorageOption);

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Type, SignStorageOption };
