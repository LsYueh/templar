'use strict'

const { test } = require('tap');

const { SignIs, DataStorageOptions, OverpunchOpt } = require('../spec/field/cobol/overpunch.js');
const { DATA_TYPE } = require('../spec/field/field.js');

const { parse } = require('./parse.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - COBOL PIC
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse X(5)', { timeout }, async (t) => {
    t.equal(parse({ picStr: 'X(5)', dataType: DATA_TYPE.X, buffer: Buffer.from('12345') }), '12345');
    t.equal(parse({ picStr: 'X(5)', dataType: DATA_TYPE.X, buffer: Buffer.from('123456') }), '12345');
    t.equal(parse({ picStr: 'X(5)', dataType: DATA_TYPE.X, buffer: Buffer.from(' 1 2 345') }), ' 1 2 ');
});

test('Parse 9(5)', { timeout }, async (t) => {
    t.equal(parse({ picStr: '9(5)', dataType: DATA_TYPE.Unsigned, buffer: Buffer.from('1') }), 1);
    t.equal(parse({ picStr: '9(5)', dataType: DATA_TYPE.Unsigned, buffer: Buffer.from('12345') }), 12345);
    t.equal(parse({ picStr: '9(5)', dataType: DATA_TYPE.Unsigned, buffer: Buffer.from('123456') }), 23456);

    t.equal(parse({ picStr: '9(5)', dataType: DATA_TYPE.X, buffer: Buffer.from('12345') }), '12345');
    t.equal(parse({ picStr: '9(5)', dataType: DATA_TYPE.X, buffer: Buffer.from('123456') }), '23456');
});

test('Parse 9(5)V9(4)', { timeout }, async (t) => {
    t.equal(parse({ picStr: '9(5)V9(4)', dataType: DATA_TYPE._9, buffer: Buffer.from('1') }), 0.0001);
    t.equal(parse({ picStr: '9(5)V9(4)', dataType: DATA_TYPE._9, buffer: Buffer.from('123456789') }), 12345.6789);
    t.equal(parse({ picStr: '9(5)V9(4)', dataType: DATA_TYPE._9, buffer: Buffer.from('1234567890') }), 23456.7890);
});

test('Parse S9(3)', { timeout }, async (t) => {
    const overpunchOption = new OverpunchOpt(undefined, SignIs.Leading);

    t.equal(parse({ picStr: 'S9(3)', dataType: DATA_TYPE.S9, buffer: Buffer.from('12C') }), 123);
    t.equal(parse({ picStr: 'S9(3)', dataType: DATA_TYPE.S9, buffer: Buffer.from('12L') }), -123);

    t.equal(parse({ picStr: 'S9(3)', dataType: DATA_TYPE.S9, buffer: Buffer.from('J23'), overpunchOption }), -123);
});

test('Parse S9(n)V9', { timeout }, async (t) => {
    const overpunchOption = new OverpunchOpt(undefined, SignIs.Leading);

    t.equal(parse({ picStr: 'S9(3)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('12C') }), 12.3);
    t.equal(parse({ picStr: 'S9(3)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('12L') }), -12.3);

    t.equal(parse({ picStr: 'S9(1)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('12C') }), 2.3);
    t.equal(parse({ picStr: 'S9(1)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('12L') }), -2.3);

    t.equal(parse({ picStr: 'S9(3)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('J23'), overpunchOption }), -12.3);

    t.throws(() => {
        parse({ picStr: 'S9(1)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('J23'), overpunchOption });
    }, { message: `Unknown overpunch char: '2'` });

    overpunchOption.dataStorage = DataStorageOptions.CM;
    t.equal(parse({ picStr: 'S9(1)V9', dataType: DATA_TYPE.S9, buffer: Buffer.from('J23'), overpunchOption }), 2.3);
});
