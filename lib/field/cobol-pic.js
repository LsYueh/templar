'use strict'

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

/**
 * @class PicType
 */
class PicType {
    /** @type {string} COBOL PIC Type X/9/S9 */
    type;
    /** @type {number} 字串長度/整數位數 */
    length; // Integer digits
    /** @type {number} 小數位數 */
    decimalPlaces;

    /**
     * @param {string} type COBOL PIC Type X/9/S9
     * @param {number} length 字串長度/整數位數
     * @param {number} dp 小數位數 (Decimal Places)
     */
    constructor(type = '', length = 0, dp = 0) {
        this.type = type;
        this.length = (length > 0) ? length : 0;
        this.decimalPlaces = (dp > 0) ? dp : 0;
    }

    /**
     * COBOL-PIC 總佔用資料的長度
     */
    get size() {
        return (this.length + this.decimalPlaces);
    }

    toString() {
        return `${this.type}(${this.length})` + String((this.decimalPlaces > 0) ? `V(${this.decimalPlaces})` : '');
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
            const type   = tokens[0].char;
            const length = tokens[0].count;
            const dp     = tokens[2] ? tokens[2].count : 0;
            return new PicType(type, length, dp);
        }
        case 'S': {
            if (tokens[1] && tokens[1].char === '9') {
                const type   = `${tokens[0].char}${tokens[1].char}` ;
                const length = tokens[1].count;
                const dp     = tokens[3] ? tokens[3].count : 0;
                return new PicType(type, length, dp);
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
module.exports = { PicType, parse, parsePic };
