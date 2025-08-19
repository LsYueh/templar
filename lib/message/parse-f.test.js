'use strict'

const { test } = require('tap');

const { parse } = require('./parse-f.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse Wrong Message (R1)', { timeout }, async (t) => {
    t.throws(() => {
         parse('500000085959008450000001');
    }, { message: `[F] Insufficient message header length, require '26', got '24'.` });
});

test('F060', { timeout }, async (t) => {
    const message = parse('20020508595900000084500003M01');

    t.equal(message.id, 'F060');

    t.hasProp(message, 'header');
    t.equal(message.header.SubsystemName, '20');
    t.equal(message.header.FunctionCode, '02');
    t.equal(message.header.MessageType, '05');
    t.hasProp(message.header, 'MessageTime');
    t.equal(message.header.StatusCode, '00');

    t.equal(message.header.SourceId, '0000');
    t.equal(message.header.ObjectId, '8450');
    t.equal(message.header.BodyLength, 3);

    t.hasProp(message, 'body');
    t.equal(message.body[0].FileCode, 'M01');
    t.equal(message.body[0].ResponseMessage, '');

    t.equal(message.remained, '');
});

test('F060 - Message Overflow', { timeout }, async (t) => {
    t.throws(() => {
         parse('20020508595900000084500003M01.  ');
    }, { message: `[F] Message body mismatch, require '3', got '6'. (M01.  )` });
});

test('F060 - Message Lacked', { timeout }, async (t) => {
    t.throws(() => {
         parse('20020508595900000084500007M01.  ');
    }, { message: `[F] Message body mismatch, require '7', got '6'. (M01.  )` });
});

test('F090', { timeout }, async (t) => {
    const message = parse('20000008595900000084500011T3000000100');

    t.equal(message.id, 'F090');

    t.hasProp(message, 'header');
    t.equal(message.header.SubsystemName, '20');
    t.equal(message.header.FunctionCode, '00');
    t.equal(message.header.MessageType, '00');
    t.hasProp(message.header, 'MessageTime');
    t.equal(message.header.StatusCode, '00');

    t.equal(message.header.SourceId, '0000');
    t.equal(message.header.ObjectId, '8450');
    t.equal(message.header.BodyLength, 11);

    t.hasProp(message, 'body');
    t.equal(message.body[0].FileCode, 'T30');
    t.equal(message.body[0].FileSize, 100);

    t.equal(message.remained, '');
});
