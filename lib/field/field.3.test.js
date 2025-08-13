'use strict'

const { test } = require('tap');

const { DataType } = require('./data-type.js');
const { Field } = require('./field.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - PIC 9(N)V9(N)
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Field 9(5)V9(4)', { timeout }, async ({ equal }) => {
    const f = new Field({ picStr: '9(5)V9(4)', type: DataType._9, value: 12345.6789 });
    equal(f.value, 12345.6789);
    equal(f.rawValue, '123456789');
    equal(f.isValid, true);
});

test('Field 9(5)V9(4) (Overflow)', { timeout }, async ({ equal }) => {
    const f = new Field({ picStr: '9(5)V9(4)', type: DataType._9, value: 123456.7890 });
    equal(f.value, 123456.789);
    equal(f.rawValue, '234567890');
    equal(f.isValid, true);
});
