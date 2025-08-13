'use strict'

const { test } = require('tap');

const { PicType } = require('./cobol-pic.js');
const { DataType } = require('./data-type.js');
const { parse } = require('./field.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - PIC X
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse X(5)', { timeout }, async ({ equal }) => {
    equal(parse({ picStr: 'X(5)', type: DataType.X, text: 12345 }), '12345');
    equal(parse({ picStr: 'X(5)', type: DataType.X, text: 123456 }), '12345');
    equal(parse({ picStr: 'X(5)', type: DataType.X, text: ' 1 2 345' }), ' 1 2 ');

    equal(parse({ picType: new PicType('X', 5), type: DataType.String, text: 12345 }), '12345');
});

test('Parse 9(5)', { timeout }, async ({ equal }) => {
    equal(parse({ picStr: '9(5)', type: DataType._9, text: 1 }), 1);
    equal(parse({ picStr: '9(5)', type: DataType._9, text: 12345 }), 12345);
    equal(parse({ picStr: '9(5)', type: DataType._9, text: 123456 }), 23456);

    equal(parse({ picStr: '9(5)', type: DataType.X, text: 12345 }), '12345');

    equal(parse({ picType: new PicType('9', 5), type: DataType.String, text: 12345 }), '12345');
});

test('Parse 9(5)V9(4)', { timeout }, async ({ equal }) => {
    equal(parse({ picStr: '9(5)V9(4)', type: DataType._9, text: '1' }), 0.0001);
    equal(parse({ picStr: '9(5)V9(4)', type: DataType._9, text: '123456789' }), 12345.6789);
    equal(parse({ picStr: '9(5)V9(4)', type: DataType._9, text: '1234567890' }), 23456.7890);
});
