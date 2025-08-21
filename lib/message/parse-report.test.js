'use strict'

const { test } = require('tap');

const { parse } = require('./parse/report.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse Message R1', { timeout }, async (t) => {
    const message = parse('500000085959008450000001');

    t.equal(message.id, 'R1');

    t.hasProp(message, 'header');
    t.equal(message.header.SubsystemName, '50');
    t.equal(message.header.FunctionCode, '00');
    t.equal(message.header.MessageType, '00');
    t.hasProp(message.header, 'MessageTime');
    t.equal(message.header.StatusCode, '00');

    t.hasProp(message, 'body');
    t.equal(message.body[0].BrokerId, '8450');
    t.equal(message.body[0].StartSeq, 1);

    t.match(message.remained, new Uint8Array(''));
});

test('Parse Message R2', { timeout }, async (t) => {
    const message = parse('500001085959008450000001');

    t.equal(message.id, 'R2');

    t.hasProp(message, 'header');
    t.equal(message.header.SubsystemName, '50');
    t.equal(message.header.FunctionCode, '00');
    t.equal(message.header.MessageType, '01');
    t.hasProp(message.header, 'MessageTime');
    t.equal(message.header.StatusCode, '00');

    t.hasProp(message, 'body');
    t.equal(message.body[0].BrokerId, '8450');
    t.equal(message.body[0].StartSeq, 1);

    t.match(message.remained, new Uint8Array(''));
});

test('Parse Message R3', { timeout }, async (t) => {
    const message = parse('50100009005900013202' + ''.padStart(66, '0')+ ''.padStart(66, '0'));

    t.equal(message.id, 'R3');

    t.hasProp(message, 'header');
    t.equal(message.header.BodyLength, 132);
    t.equal(message.header.BodyCnt, 2);

    t.hasProp(message, 'body');
    t.equal(message.body.length, 2);
    t.equal(message.body[0].StkNo, '000000');
    t.equal(message.body[1].StkNo, '000000');

    t.match(message.remained, new Uint8Array(''));
});

test('Parse Message R3 Fail', { timeout }, async (t) => {
    t.throws(() => {
        parse('50100009005900006601' + ''.padStart(66, '0') + '00');
    }, { message: `[AP-HEADER] Text length mismatch. 66 x 1 = 66 != 68` });
});

test('Parse Message R4', { timeout }, async (t) => {
    const message = parse('50000412345600');

    t.equal(message.id, 'R4');

    t.hasProp(message, 'header');
    t.hasProp(message, 'body');
});

test('Parse Message R5', { timeout }, async (t) => {
    const message = parse('50000512345600');

    t.equal(message.id, 'R5');

    t.hasProp(message, 'header');
    t.hasProp(message, 'body');
});

test('Parse Message R6', { timeout }, async (t) => {
    const message = parse('50200011223300999998');

    t.equal(message.id, 'R6');

    t.hasProp(message, 'body');
    t.equal(message.body[0].TotalRecord, 999998);

    t.match(message.remained, new Uint8Array(''));
});

test('Parse Message R6 Faild', { timeout }, async (t) => {
    t.throws(() => {
        parse('5020001122330099999');
    }, { message: `[R6] Insufficient message length, require '6', got '5'.` });
});
