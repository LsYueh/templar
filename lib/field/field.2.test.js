'use strict'

const { test } = require('tap');

const { PicType } = require('./cobol-pic.js');
const { DataType } = require('./data-type.js');
const { Field } = require('./field.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - PIC 9
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Field 9(5) is not valid', { timeout }, async ({ equal }) => {
    const f = new Field({ picStr: '9(5)', type: DataType._9 });

    equal(f.value, null);
    equal(f.rawValue, '00000');
    equal(f.isValid, false);
});

test('Field 9(5)', { timeout }, async ({ equal }) => {
    const f = new Field({ picStr: '9(5)', type: DataType._9, value: 12345 });

    equal(f.value, 12345);
    equal(f.rawValue, '12345');
    equal(f.isValid, true);
});

test('Field 9(5) (PicType)', { timeout }, async ({ equal }) => {
    const f = new Field({ picType: new PicType('9', 5), type: DataType.Unsigned, value: 12345 });

    equal(f.value, 12345);
    equal(f.rawValue, '12345');
    equal(f.isValid, true);
});

test('Field 9(5) (Overflow)', { timeout }, async ({ equal }) => {
    const f = new Field({ picStr: '9(5)', type: DataType._9, value: 123456 });

    equal(f.value, 123456);
    equal(f.rawValue, '23456');
    equal(f.isValid, true);
});
