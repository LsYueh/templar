'use strict'

const { test } = require('tap');

const { parse } = require('../spec/field/cobol/cobol-pic.js');

const { stringify } = require('./stringify.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Stringify to PIC X', { timeout }, async (t) => {
    t.equal(stringify('99999', { picType: parse('X(10)') }), '99999     ', 'String');

    t.equal(stringify('中文字', { picType: parse('X(04)') }), '中文', 'CP950');
    t.equal(stringify('中文字', { picType: parse('X(05)') }), '中文�', 'CP950');
    t.equal(stringify('中文字', { picType: parse('X(06)') }), '中文字', 'CP950');
    t.equal(stringify('中文字', { picType: parse('X(07)') }), '中文字 ', 'CP950');

    t.equal(stringify(99999, { picType: parse('X(01)') }), '9', 'Number');
    t.equal(stringify(99999, { picType: parse('X(10)') }), '99999     ', 'Number');

    t.equal(stringify(new Date(2025, 0, 1), { picType: parse('X(7)') }), '2025010', 'Date'); // 合乎解析規則，但是不會刻意截位
    t.equal(stringify(new Date(2025, 0, 1), { picType: parse('X(8)') }), '20250101', 'Date');
})