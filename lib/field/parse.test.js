'use strict'

const { test } = require('tap');

const { SignIs, OverpunchOpt } = require('../spec/field/cobol/overpunch.js');
const { DATA_TYPE } = require('../spec/field/field.js');

const { parse } = require('./parse.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - COBOL PIC
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse X(5)', { timeout }, async ({ equal }) => {
    equal(parse({ picStr: 'X(5)', dataType: DATA_TYPE.X, buffer: Buffer.from('12345') }), '12345');
    equal(parse({ picStr: 'X(5)', dataType: DATA_TYPE.X, buffer: Buffer.from('123456') }), '12345');
    equal(parse({ picStr: 'X(5)', dataType: DATA_TYPE.X, buffer: Buffer.from(' 1 2 345') }), ' 1 2 ');
});

test('Parse 9(5)', { timeout }, async ({ equal }) => {
    equal(parse({ picStr: '9(5)', dataType: DATA_TYPE._9, buffer: Buffer.from('1') }), 1);
    equal(parse({ picStr: '9(5)', dataType: DATA_TYPE._9, buffer: Buffer.from('12345') }), 12345);
    equal(parse({ picStr: '9(5)', dataType: DATA_TYPE._9, buffer: Buffer.from('123456') }), 23456);

    equal(parse({ picStr: '9(5)', dataType: DATA_TYPE.X, buffer: Buffer.from('12345') }), '12345');
});

test('Parse 9(5)V9(4)', { timeout }, async ({ equal }) => {
    equal(parse({ picStr: '9(5)V9(4)', dataType: DATA_TYPE._9, buffer: Buffer.from('1') }), 0.0001);
    equal(parse({ picStr: '9(5)V9(4)', dataType: DATA_TYPE._9, buffer: Buffer.from('123456789') }), 12345.6789);
    equal(parse({ picStr: '9(5)V9(4)', dataType: DATA_TYPE._9, buffer: Buffer.from('1234567890') }), 23456.7890);
});

test('Parse S9(3)', { timeout }, async ({ equal }) => {
    equal(parse({ picStr: 'S9(3)', dataType: DATA_TYPE.S9, buffer: Buffer.from('12C') }), 123);
    equal(parse({ picStr: 'S9(3)', dataType: DATA_TYPE.S9, buffer: Buffer.from('12L') }), -123);

    equal(parse({ picStr: 'S9(3)', dataType: DATA_TYPE.S9, buffer: Buffer.from('J23'), overpunchOption: new OverpunchOpt(undefined, SignIs.Leading) }), -123);
});

test('Parse S9(3)V9', { timeout }, async ({ equal }) => {
    equal(parse({ picStr: 'S9(3)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('12C') }), 12.3);
    equal(parse({ picStr: 'S9(3)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('12L') }), -12.3);

    equal(parse({ picStr: 'S9(3)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('J23'), overpunchOption: new OverpunchOpt(undefined, SignIs.Leading) }), -12.3);
});
