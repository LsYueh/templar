'use strict'

const { test } = require('tap');

const copybooks = {
    tse: require('./copybook/tse/index.js'),
    otc: require('./copybook/otc/index.js'),
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Copybook Test', async (t) => {
    const copybook = copybooks.tse['T30'];
    t.equal(copybook.Size, copybook.Meta.Size);
});

test('Copybook Test (OTC)', async (t) => {
    const copybook = copybooks.otc['T30'];
    t.equal(copybook.Size, copybook.Meta.Size);
});