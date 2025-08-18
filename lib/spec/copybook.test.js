'use strict'

const { test } = require('tap');

const copybook = require('./copybook/index.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Copybook Test', async (t) => {
    t.equal(copybook['T30'].Size, copybook['T30'].SPEC.Size);
});