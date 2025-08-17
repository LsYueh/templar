'use strict'

const { PicType } = require('../../spec/field.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Class
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
        this.char  = char;
        this.count = count; 
    }
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * COBOL PIC Parser
---------+---------+---------+---------+---------+---------+---------+--------*/

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

/**
 * 將整個 PIC 拆成 Token
 * @param {string} picStr 例如 "S9(3)V99"
 * @returns {Array<Token>}
 */
function parsePic(picStr) {
    /** @type {Token[]} */
    const tokens = [];
    let i = 0;
    const len = picStr.length;

    while (i < len) {
        const ch = picStr[i];

        if (/\s/.test(ch)) { // 跳過空白
            i++;
            continue;
        }

        // 如果是符號 + (n) 形式
        if (i + 1 < len && picStr[i + 1] === '(') {
            const closeIdx = picStr.indexOf(')', i + 2);

            if (closeIdx === -1) throw new Error(`Missing ")" in PIC: ${picStr}`);

            const unit = picStr.slice(i, closeIdx + 1);
            tokens.push(parseUnit(unit));
            i = closeIdx + 1;
        } else {
            // 連續相同符號合併
            let j = i + 1;
            while (j < len && picStr[j] === ch) j++;
            const count = j - i;
            tokens.push(parseUnit(`${ch}(${count})`));
            i = j;
        }
    }

    return tokens;
}

/**
 * 解析COBOL PIC Clause
 * @param {string} picStr 例如 "S9(3)V99"
 * @returns 
 */
function parse(picStr) {
    const tokens = parsePic(picStr);

    switch (tokens[0].char) {
        case 'X': {
            const type   = tokens[0].char;
            const length = tokens[0].count;
            return new PicType(type, length);
        }
        case '9': {
            const type     = tokens[0].char;
            const length   = tokens[0].count;
            const decimals = tokens[2] ? tokens[2].count : 0;
            return new PicType(type, length, decimals);
        }
        case 'S': {
            if (tokens[1] && tokens[1].char === '9') {
                const type     = `${tokens[0].char}${tokens[1].char}` ;
                const length   = tokens[1].count;
                const decimals = tokens[3] ? tokens[3].count : 0;
                return new PicType(type, length, decimals);
            } else {
                throw new Error(`Invalid PIC Clause: "${picStr}"`);
            }
        }
        default:
            throw new Error(`Invalid PIC Clause: "${picStr}"`);
    }
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { parse, parsePic };
