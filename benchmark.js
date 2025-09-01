'use strict'

/**------+---------+---------+---------+---------+---------+---------+----------
 * Node-API
---------+---------+---------+---------+---------+---------+---------+--------*/

const native = require('./lib/spec/field/cobol/cobol-pic.node');


/**------+---------+---------+---------+---------+---------+---------+----------
 * JS
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class Token
 */
class Token {
    /** @type {string} */
    char;
    /** @type {number} */
    count;

    /**
     * @param {string} char 
     * @param {number} count 
     */
    constructor(char = '', count = 0) {
        this.char = char;
        this.count = count;
    }
}

/**
 * 解析一個 COBOL PIC 單位
 * @param {string} unit 例如 "9(5)", "X", "S", "V", "Z(3)", "."
 * @returns {Token} 
 */
function parseUnit(unit) {
    unit = unit.trim();
    // eslint-disable-next-line no-useless-escape
    const re = /^([9XAVPZS\*\.,\/\+\-])(?:\((\d+)\))?$/i;
    const m = unit.match(re);

    if (!m) throw new Error(`Invalid PIC unit: "${unit}"`);

    return new Token(m[1].toUpperCase(), m[2] ? parseInt(m[2], 10) : 1);
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Benchmark
---------+---------+---------+---------+---------+---------+---------+--------*/

const ITER = 1_000_000;
const TEST_STR = "X(10)";

function bench(name, fn) {
    const start = process.hrtime.bigint();
    for (let i = 0; i < ITER; i++) {
        fn(TEST_STR);
    }
    const end = process.hrtime.bigint();
    console.log(`${name}: ${(Number(end - start) / 1e6).toFixed(2)} ms`);
}

console.log(`Running ${ITER} iterations...\n`);
bench("C Addon", native.parseUnit);
bench("Pure JS", parseUnit);
