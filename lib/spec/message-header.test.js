'use strict'

const { test } = require('tap');

const { Meta } = require('./fields/header.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Spec Factory Result Test', async ({ equal, match }) => {
    equal(Meta.ControlHeader.Field.length, 5);
    match(Meta.ControlHeader.Key, ['SubsystemName', 'FunctionCode', 'MessageType', 'MessageTime', 'StatusCode']);
    match(Meta.ControlHeader.Index, [2, 2, 2, 6, 2]);
    equal(Meta.ControlHeader.Size, 2+2+2+6+2);
});
