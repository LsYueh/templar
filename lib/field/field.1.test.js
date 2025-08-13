'use strict'

const { test } = require('tap');

const { PicType } = require('./cobol-pic.js');
const { DataType } = require('./data-type.js');
const { Field } = require('./field.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - PIC X
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Field X(5) is not valid', { timeout }, async ({ equal }) => {
    const f = new Field({ picStr: 'X(5)', type: DataType.X });

    equal(f.value, null);
    equal(f.rawValue, '     ');
    equal(f.isValid, false);
});

test('Field X(5)', { timeout }, async ({ equal }) => {
    const f = new Field({ picStr: 'X(5)', type: DataType.X, value: 12345 });

    equal(f.value, 12345);
    equal(f.rawValue, '12345');
    equal(f.isValid, true);
});

test('Field X(5) (PicType)', { timeout }, async ({ equal }) => {
    const f = new Field({ picType: new PicType('X', 5), type: DataType.String, value: 12345 });

    equal(f.value, 12345);
    equal(f.rawValue, '12345');
    equal(f.isValid, true);
});

test('Field X(5) (Overflow)', { timeout }, async ({ equal }) => {
    const f = new Field({ picStr: 'X(5)', type: DataType.X, value: 123456 });

    equal(f.value, 123456);
    equal(f.rawValue, '12345');
    equal(f.isValid, true);
});
