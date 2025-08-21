'use strict'

const { test } = require('tap');

const { parse } = require('./parse.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - Copybook
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Copybook', { timeout }, async (t) => {
    const dataText = ''.padEnd(100, '0')
    const data = parse({ fileCode: 'T30', dataText });

    t.notMatch(data, null);
});