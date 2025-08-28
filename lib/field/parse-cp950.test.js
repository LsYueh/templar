'use strict'

const iconv = require("iconv-lite");
const { test } = require('tap');

const { DATA_TYPE } = require('../spec/field/field.js');

const { parse } = require('./parse.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - COBOL PIC
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse CP950', { timeout }, async (t) => {
    const buffer = iconv.encode('中文字', 'cp950')

    t.equal(parse(buffer, { picStr: 'X(4)', dataType: DATA_TYPE.String }), '中文');
    t.equal(parse(buffer, { picStr: 'X(5)', dataType: DATA_TYPE.String }), '中文�');
    t.equal(parse(buffer, { picStr: 'X(6)', dataType: DATA_TYPE.String }), '中文字');
});
