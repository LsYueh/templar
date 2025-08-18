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

test('F010', { timeout }, async (t) => {
    const message = parse('20000008595900845000000011M0100000300');

    t.equal(message.id, 'F010');

    t.hasProp(message, 'header');
    t.equal(message.header.SubsystemName, '20');
    t.equal(message.header.FunctionCode, '00');
    t.equal(message.header.MessageType, '00');
    t.hasProp(message.header, 'MessageTime');
    t.equal(message.header.StatusCode, '00');

    t.equal(message.header.SourceId, '8450');
    t.equal(message.header.ObjectId, '0000');
    t.equal(message.header.BodyLength, 11);

    t.hasProp(message, 'body');
    t.equal(message.body[0].FileCode, 'M01');
    t.equal(message.body[0].FileSize, 300);

    t.equal(message.remained, '');
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
