'use strict'

let cnt = 0;

/**------+---------+---------+---------+---------+---------+---------+----------
 * Base
---------+---------+---------+---------+---------+---------+---------+--------*/

cnt = 1;
/** @enum {number} Based on COBOL Data Type: X/9/S9 */
const Type = {
  FILLER: -1,
  X : cnt, String: cnt++,
  _9: cnt, Unsigned: cnt++,
  S9: cnt, Signed: cnt++,
  Date: cnt++,
  Time: cnt++,
  Datetime: cnt++,
  Timestamp: cnt++,
};
Object.freeze(Type);

cnt = 1;
/** @enum {number} sign-storage conventions: -Dca, -Dcb, -Dci, -Dcm, -Dcn, -Dcr, and -Dcv. */
const SignStorageOption = {
  CA: cnt++, // RM/COBOL (not RM/COBOL-85) 
  CB: cnt++, // MBP COBOL
  CI: cnt++, // IBM COBOL (RM/COBOL-85)
  CM: cnt++, // Micro Focus COBOL
  CN: cnt++, // NCR COBOL
  CR: cnt++, // Realia COBOL
  CV: cnt++, // VAX COBOL
}
Object.freeze(SignStorageOption);

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Type, SignStorageOption };
