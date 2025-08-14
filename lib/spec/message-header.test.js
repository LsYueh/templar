'use strict'

const { test } = require('tap');

const { SPEC } = require('./message/header.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Spec Factory Result Test', async ({ equal, match }) => {
    equal(SPEC.ControlHeader.Field.length, 5);
    match(SPEC.ControlHeader.Key, ['SubsystemName', 'FunctionCode', 'MessageType', 'MessageTime', 'StatusCode']);
    match(SPEC.ControlHeader.Index, [2, 2, 2, 6, 2]);
    equal(SPEC.ControlHeader.Size, 2+2+2+6+2);
});
