'use strict'

const { test } = require('tap');

const { DataType } = require('./data-type.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Type: FILLER = -1', async ({ equal }) => {
    equal(DataType.FILLER, -1);
    equal(DataType.X, 1);
});
