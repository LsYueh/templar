'use strict'

const { test } = require('tap');

const { parse } = require('../parse/report.js');
const { stringify } = require('./report.js');

const timeout = 60000;

/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Stringify Message R1 (Object)', { timeout }, async (t) => {
    const message = {
      body: [ { BrokerId: '8450', StartSeq: 1 } ],
      header: {
        SubsystemName: '50',
        FunctionCode: '00',
        MessageType: '00',
        MessageTime: new Date('2025-08-15T00:59:59.000Z'),
        StatusCode: '00'
      },
      id: 'R1',
    }
    
    t.equal('500000085959008450000001', stringify(message));
});

test('Stringify Message R1 (Missing Field)', { timeout }, async (t) => {
    const message = {
      body: [ { BrokerId: '8450' } ],
      header: {
        SubsystemName: '50',
        FunctionCode: '00',
        MessageType: '00',
        MessageTime: new Date('2025-08-15T00:59:59.000Z'),
        StatusCode: '00'
      },
      id: 'R1',
    }

    t.throws(() => {
        stringify(message);
    }, { message: `Field 'StartSeq' is missing in message.` });
});

test('Stringify Message R2', { timeout }, async (t) => {
    const text = '500001085959008450000001';
    const obj = parse(text);
    
    t.equal(text, stringify(obj));
});

test('Stringify Message R3', { timeout }, async (t) => {
    const text = '50100009005900013202' + ''.padStart(66, '0')+ ''.padStart(66, '0');
    const obj = parse(text);
    
    t.equal(text, stringify(obj));
});

test('Stringify Message R4', { timeout }, async (t) => {
    const text = '50000412345600'
    const obj = parse(text);
    
    t.equal(text, stringify(obj));
});

test('Stringify Message R5', { timeout }, async (t) => {
    const text = '50000512345600'
    const obj = parse(text);
    
    t.equal(text, stringify(obj));
});

test('Stringify Message R6', { timeout }, async (t) => {
    const text = '50200011223300999998'
    const obj = parse(text);
    
    t.equal(text, stringify(obj));
});
