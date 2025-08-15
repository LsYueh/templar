'use strict'

const { test } = require('tap');

const { parse } = require('./parse-r.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse Message R1', { timeout }, async ({ equal, hasProp }) => {
    const message = parse('500000085959008450000001');

    equal(message.id, 'R1');

    hasProp(message, 'header');
    equal(message.header.SubsystemName, '50');
    equal(message.header.FunctionCode, '00');
    equal(message.header.MessageType, '00');
    hasProp(message.header, 'MessageTime');
    equal(message.header.StatusCode, '00');

    hasProp(message, 'body');
    equal(message.body.BrokerId, '8450');
    equal(message.body.StartSeq, 1);

    equal(message.remained, '');
});

test('Parse Message R2', { timeout }, async ({ equal, hasProp }) => {
    const message = parse('500001085959008450000001');

    equal(message.id, 'R2');

    hasProp(message, 'header');
    equal(message.header.SubsystemName, '50');
    equal(message.header.FunctionCode, '00');
    equal(message.header.MessageType, '01');
    hasProp(message.header, 'MessageTime');
    equal(message.header.StatusCode, '00');

    hasProp(message, 'body');
    equal(message.body.BrokerId, '8450');
    equal(message.body.StartSeq, 1);

    equal(message.remained, '');
});
