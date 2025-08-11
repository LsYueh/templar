'use strict'

const { test } = require('tap');

const { Type } = require('./data-type.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Type: FILLER = -1', async ({ equal }) => {
    equal(Type.FILLER, -1)
});
