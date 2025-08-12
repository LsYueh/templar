'use strict'

const { test } = require('tap');

const { Specs } = require('./message-header.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Message Header Spec Get', async ({ equal }) => {
    const spec = Specs.get('SUBSYSTEM-NAME');
    equal(String(spec), '9(2) SUBSYSTEM-NAME : 子系統名稱');
});
