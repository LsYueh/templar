'use strict'

const { test } = require('tap');

const { parse } = require('../spec/field/cobol/cobol-pic.js');

const { toX } = require('./stringify.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Stringify to PIC X', { timeout }, async (t) => {
    t.equal(toX('99999', parse('X(10)')), '99999     ', 'String');

    t.equal(toX('中文字', parse('X(04)')), '中文', 'CP950');
    t.equal(toX('中文字', parse('X(05)')), '中文�', 'CP950');
    t.equal(toX('中文字', parse('X(06)')), '中文字', 'CP950');
    t.equal(toX('中文字', parse('X(07)')), '中文字 ', 'CP950');

    t.equal(toX(99999, parse('X(01)')), '9', 'Number');
    t.equal(toX(99999, parse('X(10)')), '99999     ', 'Number');

    t.equal(toX(new Date(2025, 0, 1), parse('X(7)')), '2025010', 'Date'); // 合乎解析規則，但是不會刻意截位
    t.equal(toX(new Date(2025, 0, 1), parse('X(8)')), '20250101', 'Date');
})