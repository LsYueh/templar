'use strict'

const { test } = require('tap');

const copybooks = require('./copybook/index.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Copybook Test', async (t) => {
    const copybook = copybooks['T30'];
    t.equal(copybook.Size, copybook.message.Size);
});