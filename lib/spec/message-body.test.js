'use strict'

const { test } = require('tap');

const MESSAGE_BODY = {
    F: require('./message/body/file-transfer.js'),
    L: require('./message/body/link.js'),
    R: require('./message/body/report.js'),
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Message Body (L) Spec Get', async (t) => {
});

test('Message Body (F) Spec Get', async (t) => {
});

test('Message Body (R) Spec Get', async (t) => {
    t.hasProp(MESSAGE_BODY.R.SPEC, 'R1');
});

test('Message Body R3 Size = 66', async (t) => {
    t.equal(MESSAGE_BODY.R.SPEC.R3.Size, 66);
});
