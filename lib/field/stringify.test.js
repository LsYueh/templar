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

    t.equal(stringify(99999, { picType: parse('X(01)') }), '9'         , 'Integer');
    t.equal(stringify(99999, { picType: parse('X(10)') }), '99999     ', 'Integer');

    t.equal(stringify(new Date(2025, 0, 1), { picType: parse('X(8)') }), '20250101', 'Date');
    t.throws(() => {
         stringify(new Date(2025, 0, 1), { picType: parse('X(7)') });
    }, new Error(`Unsupported Date format with PIC X/9 length '7'`));
});

test('Stringify to PIC 9', { timeout }, async (t) => {
    t.equal(stringify(12345 , { picType: parse('9(05)')       }), '12345'  , 'Integer');
    t.equal(stringify(12345 , { picType: parse('9(04)')       }), '2345'   , 'Integer');
    t.equal(stringify(12345 , { picType: parse('9(05)V9')     }), '123450' , 'NumIntegerber');
    t.equal(stringify(12345 , { picType: parse('9(05)V9(02)') }), '1234500', 'Float');
    t.equal(stringify(123.45, { picType: parse('9(05)V9(02)') }), '0012345', 'Float');
    t.equal(stringify(123.45, { picType: parse('9(05)V9(01)') }), '001234' , 'Float');
    t.equal(stringify(123.45, { picType: parse('9(02)V9(01)') }), '234'    , 'Float');
});