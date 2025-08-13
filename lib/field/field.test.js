'use strict'

const { test } = require('tap');

const { PicType } = require('./cobol-pic.js');
const { DataType } = require('./data-type.js');
const { convert } = require('./field.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - PIC X
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Convert to X(5)', { timeout }, async ({ equal }) => {
    equal(convert({ picStr: 'X(5)', type: DataType.X }), '     ');
    equal(convert({ picStr: 'X(5)', type: DataType.X, value: 12345 }), '12345');
    equal(convert({ picStr: 'X(5)', type: DataType.X, value: 123456 }), '12345');

    equal(convert({ picType: new PicType('X', 5), type: DataType.String, value: 12345 }), '12345');
});

test('Convert to 9(5)', { timeout }, async ({ equal }) => {
    equal(convert({ picStr: '9(5)', type: DataType._9 }), '00000');
    equal(convert({ picStr: '9(5)', type: DataType._9, value: 12345 }), '12345');
    equal(convert({ picStr: '9(5)', type: DataType._9, value: 123456 }), '23456');

    equal(convert({ picStr: '9(5)', type: DataType.X, value: 12345 }), '12345');

    equal(convert({ picType: new PicType('9', 5), type: DataType.String, value: 12345 }), '12345');
});

test('Convert to 9(5)V9(4)', { timeout }, async ({ equal }) => {
    equal(convert({ picStr: '9(5)V9(4)', type: DataType._9, value: 12345.6789 }), '123456789');
    equal(convert({ picStr: '9(5)V9(4)', type: DataType._9, value: 123456.7890 }), '234567890');
});