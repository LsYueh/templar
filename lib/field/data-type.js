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
 * Overpunch Codes
---------+---------+---------+---------+---------+---------+---------+--------*/

cnt = 1;
/** @enum {number} Data Storage Options: -Dca, -Dcb, -Dci, -Dcm, -Dcn, -Dcr, and -Dcv. */
const DataStorageOptions = {
  /** RM/COBOL (not RM/COBOL-85) */
  CA: cnt++,
  /** MBP COBOL */
  CB: cnt++,
  /** IBM COBOL (RM/COBOL-85) */
  CI: cnt++,
  /** Micro Focus COBOL */
  CM: cnt++,
  /** NCR COBOL */
  CN: cnt++,
  /** Realia COBOL */
  CR: cnt++,
  /** VAX COBOL */
  CV: cnt++,
}
Object.freeze(DataStorageOptions);

/** @enum {number} `SIGN IS TRAILING` is the default. */
const SignIs = {
  Trailing: 0,
  Leading : 1,
}
Object.freeze(SignIs);

/**
 * @class OverpunchOpt
 */
class OverpunchOpt {
  /** @type {DataStorageOptions} */
  dataStorage = DataStorageOptions.CM;
  /** @type {SignIs} */
  signIs = SignIs.Trailing;

  /**
   * @param {DataStorageOptions} dataStorage 
   * @param {SignIs} signIs 
   */
  constructor(dataStorage = DataStorageOptions.CM, signIs = SignIs.Trailing) {
    this.dataStorage = dataStorage;
    this.signIs = signIs;
  }
}

/**
 * -Dca, -Dcb, -Dcm, -Dcr
 */
const OP_POSITIVE_01 = {
  '0': { sign:  1, digit: '0' },
  '1': { sign:  1, digit: '1' },
  '2': { sign:  1, digit: '2' },
  '3': { sign:  1, digit: '3' },
  '4': { sign:  1, digit: '4' },
  '5': { sign:  1, digit: '5' },
  '6': { sign:  1, digit: '6' },
  '7': { sign:  1, digit: '7' },
  '8': { sign:  1, digit: '8' },
  '9': { sign:  1, digit: '9' },
};

/**
 * -Dci, -Dcn
 */
const OP_POSITIVE_02 = {
  '{': { sign:  1, digit: '0' },
  'A': { sign:  1, digit: '1' },
  'B': { sign:  1, digit: '2' },
  'C': { sign:  1, digit: '3' },
  'D': { sign:  1, digit: '4' },
  'E': { sign:  1, digit: '5' },
  'F': { sign:  1, digit: '6' },
  'G': { sign:  1, digit: '7' },
  'H': { sign:  1, digit: '8' },
  'I': { sign:  1, digit: '9' },
};

/**
 * -Dca, -Dci, -Dcn
 */
const OP_NEGATIVE_01 = {
  '}': { sign: -1, digit: '0' },
  'J': { sign: -1, digit: '1' },
  'K': { sign: -1, digit: '2' },
  'L': { sign: -1, digit: '3' },
  'M': { sign: -1, digit: '4' },
  'N': { sign: -1, digit: '5' },
  'O': { sign: -1, digit: '6' },
  'P': { sign: -1, digit: '7' },
  'Q': { sign: -1, digit: '8' },
  'R': { sign: -1, digit: '9' },
};

/**
 * -Dcb
 */
const OP_NEGATIVE_02 = {
  '@': { sign: -1, digit: '0' },
  'A': { sign: -1, digit: '1' },
  'B': { sign: -1, digit: '2' },
  'C': { sign: -1, digit: '3' },
  'D': { sign: -1, digit: '4' },
  'E': { sign: -1, digit: '5' },
  'F': { sign: -1, digit: '6' },
  'G': { sign: -1, digit: '7' },
  'H': { sign: -1, digit: '8' },
  'I': { sign: -1, digit: '9' },
};

/**
 * -Dcm
 */
const OP_NEGATIVE_03 = {
  'p': { sign: -1, digit: '0' },
  'q': { sign: -1, digit: '1' },
  'r': { sign: -1, digit: '2' },
  's': { sign: -1, digit: '3' },
  't': { sign: -1, digit: '4' },
  'u': { sign: -1, digit: '5' },
  'v': { sign: -1, digit: '6' },
  'w': { sign: -1, digit: '7' },
  'x': { sign: -1, digit: '8' },
  'y': { sign: -1, digit: '9' },
};

/**
 * -Dcr
 */
const OP_NEGATIVE_04 = {
  ' ': { sign: -1, digit: '0' },
  '!': { sign: -1, digit: '1' },
  '"': { sign: -1, digit: '2' },
  '#': { sign: -1, digit: '3' },
  '$': { sign: -1, digit: '4' },
  '%': { sign: -1, digit: '5' },
  '&': { sign: -1, digit: '6' },
  "'": { sign: -1, digit: '7' },
  '(': { sign: -1, digit: '8' },
  ')': { sign: -1, digit: '9' },
};

const OverpunchCode = {}
OverpunchCode[DataStorageOptions.CA] = { ...OP_POSITIVE_01, ...OP_NEGATIVE_01 };
OverpunchCode[DataStorageOptions.CB] = { ...OP_POSITIVE_01, ...OP_NEGATIVE_02 };
OverpunchCode[DataStorageOptions.CI] = { ...OP_POSITIVE_02, ...OP_NEGATIVE_01 };
OverpunchCode[DataStorageOptions.CM] = { ...OP_POSITIVE_01, ...OP_NEGATIVE_03 };
OverpunchCode[DataStorageOptions.CN] = { ...OP_POSITIVE_02, ...OP_NEGATIVE_01 };
OverpunchCode[DataStorageOptions.CR] = { ...OP_POSITIVE_01, ...OP_NEGATIVE_04 };

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = {
  DataType,
  SignIs, DataStorageOptions,
  OverpunchOpt, OverpunchCode
};
