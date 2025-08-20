'use strict'

const { test } = require('tap');

const FIELDS_SPEC_BODY = {
    F: require('./fields/body/file-transfer.js'),
    L: require('./fields/body/link.js'),
    R: require('./fields/body/report.js'),
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Message Body (L) Spec Get', async (t) => {
});

test('Message Body (F) Spec Get', async (t) => {
});

test('Message Body (R) Spec Get', async (t) => {
    t.hasProp(FIELDS_SPEC_BODY.R.Meta, 'R1');
});

test('Message Body R3 Size = 66', async (t) => {
    t.equal(FIELDS_SPEC_BODY.R.Meta.R3.Size, 66);
});
