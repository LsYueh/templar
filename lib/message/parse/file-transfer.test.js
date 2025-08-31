'use strict'

const { test } = require('tap');

const { parse } = require('./file-transfer.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse Wrong Messages', { timeout }, async (t) => {
    t.throws(() => {
        parse('500000085959008450000001'); // R1
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

    t.match(message.remained, new Uint8Array(''));

    // 

    t.throws(() => {
        parse('20020508595900000084500003M01.  ');
    }, { message: `[F] Message body mismatch, require '3', got '6'.` });

    t.throws(() => {
        parse('20020508595900000084500007M01.  ');
    }, { message: `[F] Message body mismatch, require '7', got '6'.` });
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

    t.match(message.remained, new Uint8Array(''));
});

test('F110', { timeout }, async (t) => {
    const message = parse('20010208595900000084500998T301' + ''.padEnd(994, '0'));

    t.equal(message.id, 'F110');

    t.hasProp(message, 'header');
    t.equal(message.header.SubsystemName, '20');
    t.equal(message.header.FunctionCode, '01');
    t.equal(message.header.MessageType, '02');
    t.hasProp(message.header, 'MessageTime');
    t.equal(message.header.StatusCode, '00');

    t.equal(message.header.SourceId, '0000');
    t.equal(message.header.ObjectId, '8450');
    t.equal(message.header.BodyLength, 998);

    t.hasProp(message, 'body');
    t.equal(message.body[0].FileCode, 'T30');
    t.equal(message.body[0].EOF, 1);
    t.equal(message.body[0].Data.length, 994);

    // 

    t.throws(() => {
        parse('20010208595900000084500998T301' + ''.padEnd(995, '0'));
    }, { message: `[F] Message body mismatch, require '998', got '999'.` });
});

test('F230', { timeout }, async (t) => {
    const message = parse('20011208595900000084503980T301' + ''.padEnd(3976, '0'));

    t.equal(message.id, 'F230');

    t.hasProp(message, 'header');
    t.equal(message.header.SubsystemName, '20');
    t.equal(message.header.FunctionCode, '01');
    t.equal(message.header.MessageType, '12');
    t.hasProp(message.header, 'MessageTime');
    t.equal(message.header.StatusCode, '00');

    t.equal(message.header.SourceId, '0000');
    t.equal(message.header.ObjectId, '8450');
    t.equal(message.header.BodyLength, 3980);

    t.hasProp(message, 'body');
    t.equal(message.body[0].FileCode, 'T30');
    t.equal(message.body[0].EOF, 1);
    t.equal(message.body[0].Data.length, 3976);

    // 

    t.throws(() => {
        parse('20011208595900000084503980T301' + ''.padEnd(3977, '0'));
    }, { message: `[F] Message body mismatch, require '3980', got '3981'.` });
});
