'use strict'

const iconv = require("iconv-lite");
const { test } = require('tap');

const { DATA_TYPE } = require('../spec/field/field.js');

const { parse } = require('./parse.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - COBOL PIC
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse X(5)', { timeout }, async ({ equal }) => {
    const buffer = iconv.encode('中文字', 'cp950')
    equal(parse({ picStr: 'X(5)', dataType: DATA_TYPE.X, buffer }), '中文�');
});
