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

test('Parse Message R3', { timeout }, async ({ equal, hasProp }) => {
    const message = parse('50100009005900006601' + ''.padStart(66, '0'));

    equal(message.id, 'R3');

    hasProp(message, 'header');
    equal(message.header.BodyLength, 66);
    equal(message.header.BodyCnt, 1);
    hasProp(message, 'body');
});

test('Parse Message R4', { timeout }, async ({ equal, hasProp }) => {
    const message = parse('50000412345600');

    equal(message.id, 'R4');

    hasProp(message, 'header');
    hasProp(message, 'body');
});

test('Parse Message R5', { timeout }, async ({ equal, hasProp }) => {
    const message = parse('50000512345600');

    equal(message.id, 'R5');

    hasProp(message, 'header');
    hasProp(message, 'body');
});

test('Parse Message R6', { timeout }, async ({ equal, hasProp }) => {
    const message = parse('50200011223300999998');

    equal(message.id, 'R6');

    hasProp(message, 'body');
    equal(message.body.TotalRecord, 999998);

    equal(message.remained, '');
});

test('Parse Message R6 Faild', { timeout }, async ({ throws }) => {
    throws(() => {
        parse('5020001122330099999');
    }, { message: `[R6] Insufficient message length, require '6', got '5'.` });
});
