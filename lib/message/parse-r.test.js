'use strict'

const { test } = require('tap');

const { parse } = require('./parse-r.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse Message R2', { timeout }, async ({ equal, hasProp }) => {
    const message = parse('500001085959008450000001');

    equal(message.id, 'R2');
    hasProp(message, 'header');
});
