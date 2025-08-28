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
    t.equal(parse(Buffer.from('12345') , { picStr: 'X(5)', dataType: DATA_TYPE.X }), '12345');
    t.equal(parse(Buffer.from('123456'), { picStr: 'X(5)', dataType: DATA_TYPE.X }), '12345');

    t.equal(parse(Buffer.from(' 1 2 345'), { picStr: 'X(5)', dataType: DATA_TYPE.String }), '1 2');
    t.equal(parse(Buffer.from(' 1 2 345'), { picStr: 'X(5)', dataType: DATA_TYPE.X      }), ' 1 2 ');
});

test('Parse 9(5)', { timeout }, async (t) => {
    t.equal(parse(Buffer.from('1')     , { picStr: '9(5)', dataType: DATA_TYPE.Unsigned }), 1);
    t.equal(parse(Buffer.from('12345') , { picStr: '9(5)', dataType: DATA_TYPE.Unsigned }), 12345);
    t.equal(parse(Buffer.from('123456'), { picStr: '9(5)', dataType: DATA_TYPE.Unsigned }), 23456);

    t.equal(parse(Buffer.from('12345') , { picStr: '9(5)', dataType: DATA_TYPE.X }), '12345');
    t.equal(parse(Buffer.from('123456'), { picStr: '9(5)', dataType: DATA_TYPE.X }), '23456');
});

test('Parse 9(5)V9(4)', { timeout }, async (t) => {
    t.equal(parse(Buffer.from('1')         , { picStr: '9(5)V9(4)', dataType: DATA_TYPE._9 }), 0.0001);
    t.equal(parse(Buffer.from('123456789') , { picStr: '9(5)V9(4)', dataType: DATA_TYPE._9 }), 12345.6789);
    t.equal(parse(Buffer.from('1234567890'), { picStr: '9(5)V9(4)', dataType: DATA_TYPE._9 }), 23456.7890);
});

test('Parse S9(3)', { timeout }, async (t) => {
    const overpunchOption = new OverpunchOpt(undefined, SignIs.Leading);

    t.equal(parse(Buffer.from('12C'), { picStr: 'S9(3)', dataType: DATA_TYPE.S9 }), 123);
    t.equal(parse(Buffer.from('12L'), { picStr: 'S9(3)', dataType: DATA_TYPE.S9 }), -123);

    t.equal(parse(Buffer.from('J23'), { picStr: 'S9(3)', dataType: DATA_TYPE.S9, overpunchOption }), -123);
});

test('Parse S9(n)V9', { timeout }, async (t) => {
    const overpunchOption = new OverpunchOpt(undefined, SignIs.Leading);

    t.equal(parse(Buffer.from('12C'), { picStr: 'S9(3)V9', dataType: DATA_TYPE.S9 }), 12.3);
    t.equal(parse(Buffer.from('12L'), { picStr: 'S9(3)V9', dataType: DATA_TYPE.S9 }), -12.3);

    t.equal(parse(Buffer.from('12C'), { picStr: 'S9(1)V9', dataType: DATA_TYPE.S9 }), 2.3);
    t.equal(parse(Buffer.from('12L'), { picStr: 'S9(1)V9', dataType: DATA_TYPE.S9 }), -2.3);

    t.equal(parse(Buffer.from('J23'), { picStr: 'S9(3)V9', dataType: DATA_TYPE.S9, overpunchOption }), -12.3);

    t.throws(() => {
        parse(Buffer.from('J23'), { picStr: 'S9(1)V9', dataType: DATA_TYPE.S9, overpunchOption });
    }, { message: `Unknown overpunch char: '2'` });

    overpunchOption.dataStorage = DataStorageOptions.CM;
    t.equal(parse(Buffer.from('J23'), { picStr: 'S9(1)V9', dataType: DATA_TYPE.S9, overpunchOption }), 2.3);
});
