'use strict'

const { test } = require('tap');

const { getCopybook } = require('./copybook/index.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Copybook Test', async (t) => {
    const copybook = getCopybook({market: 'TSE', fileCode: 'T30'});
    t.equal(copybook.Size, copybook.Meta.Size);
});

test('Copybook Test (OTC)', async (t) => {
    const copybook = getCopybook({market: 'OTC', fileCode: 'T30'});
    t.equal(copybook.Size, copybook.Meta.Size);
});

test('Copybook Test (OTC with market override)', async (t) => {
    t.equal(getCopybook({market: 'OTC', fileCode: 'O40'}), null);

    const copybook = getCopybook({market: 'OTC', fileCode: 'O40', marketOverride: true});
    t.equal(copybook.Size, copybook.Meta.Size);
});

test('Copybook Test ETFs', async (t) => {
    const M01 = getCopybook({market: 'TSE', fileCode: 'M01'});
    t.equal(M01.Size, M01.Meta.Size, 'M01 file size: 300');

    const M02 = getCopybook({market: 'TSE', fileCode: 'M02'});
    t.equal(M02.Size, M02.Meta.Size, 'M02 file size: 150');
});
