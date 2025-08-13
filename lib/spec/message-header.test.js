'use strict'

const { test } = require('tap');

const { ControlHeader } = require('./message-header.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Spec Factory Result Test', async ({ equal, match }) => {
    equal(ControlHeader.Field.length, 5);
    match(ControlHeader.Key, ['SubsystemName', 'FunctionCode', 'MessageType', 'MessageTime', 'StatusCode']);
    match(ControlHeader.Index, [2, 2, 2, 6, 2]);
    equal(ControlHeader.Size, 2+2+2+6+2);
});
