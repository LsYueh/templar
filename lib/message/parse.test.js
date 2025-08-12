'use strict'

const { test } = require('tap');

const { parse } = require('./parse.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - PIC X
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse Message R2', { timeout }, async ({ equal }) => {
    const message = parse('500001085959008450000001');

    equal(message, null);
});
