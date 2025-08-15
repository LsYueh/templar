'use strict'

const { test } = require('tap');

const MESSAGE_BODY = {
    F: require('../spec/message/body/F.js'),
    L: require('../spec/message/body/L.js'),
    R: require('../spec/message/body/R.js'),
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Message Body (L) Spec Get', async ({ equal }) => {
    const spec = MESSAGE_BODY.L.Specs.get('BORKER-ID');
    equal(String(spec), 'X(4) BORKER-ID : BROKER-NO + BRANCH-NO');
});

test('Message Body (F) Spec Get', async ({ equal }) => {
    const spec = MESSAGE_BODY.F.Specs.get('FILE-CODE');
    equal(String(spec), 'X(3) FILE-CODE : 檔案代號');
});

test('Message Body (R) Spec Get', async ({ hasProp }) => {
    hasProp(MESSAGE_BODY.R.SPEC, 'R1');
});