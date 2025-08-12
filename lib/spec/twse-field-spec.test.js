'use strict'

const { test } = require('tap');

const { Specs } = require('./twse-field-spec.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Type: FILLER = -1', async ({ equal }) => {
    const spec = Specs.get('SUBSYSTEM-NAME');
    equal(String(spec), '9(2) SUBSYSTEM-NAME : 子系統名稱');
});
