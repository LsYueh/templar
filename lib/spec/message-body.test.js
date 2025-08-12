'use strict'

const { test } = require('tap');

const Body = {
    F: require('./message-body/F.js'),
    L: require('./message-body/L.js'),
    R: require('./message-body/R.js'),
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Message Body (L) Spec Get', async ({ equal }) => {
    const spec = Body.L.Specs.get('BORKER-ID');
    equal(String(spec), 'X(4) BORKER-ID : BROKER-NO + BRANCH-NO');
});

test('Message Body (F) Spec Get', async ({ equal }) => {
    const spec = Body.F.Specs.get('FILE-CODE');
    equal(String(spec), 'X(3) FILE-CODE : 檔案代號');
});

test('Message Body (R) Spec Get', async ({ equal }) => {
    const spec = Body.R.Specs.get('BROKER-ID');
    equal(String(spec), 'X(4) BROKER-ID : 證券商代號');
});