'use strict'

const { test } = require('tap');

const { DATA_TYPE } = require('../spec/field/field.js');

const { parse } = require('./parse.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - COBOL PIC
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse 9(08)', { timeout }, async (t) => {
    const date = parse({ picStr: '9(08)', dataType: DATA_TYPE.Date, buffer: Buffer.from('20001010') });

    t.same(date, new Date('2000/10/10'));
});

test('Parse X(08)', { timeout }, async (t) => {
    const date = parse({ picStr: 'X(08)', dataType: DATA_TYPE.Date, buffer: Buffer.from('20001010') });

    t.same(date, new Date('2000/10/10'));
});
