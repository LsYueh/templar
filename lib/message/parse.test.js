'use strict'

const { test } = require('tap');

const { parse } = require('./parse.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse Message R2', { timeout }, async ({ hasProp }) => {
    const message = parse('500001085959008450000001');

    hasProp(message, 'ControlHeader');
});
