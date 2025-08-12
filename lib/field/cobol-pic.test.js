'use strict'

const { test } = require('tap');

const CB = require('./cobol-pic.js');

const timeout = 60000;

/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - COBOL-PIC
---------+---------+---------+---------+---------+---------+---------+--------*/

test('COBOL-PIC : S9(3)V99', { timeout }, async ({ match }) => {
    const tokens = CB.parsePic('S9(3)V99');

    match(tokens, [
        { char: 'S', count: 1 },
        { char: '9', count: 3 },
        { char: 'V', count: 1 },
        { char: '9', count: 2 }
    ]);
});

test('COBOL-PIC : 999v99999', { timeout }, async ({ match }) => {
    const tokens = CB.parsePic('999v99999');

    match(tokens, [
        { char: '9', count: 3 },
        { char: 'V', count: 1 },
        { char: '9', count: 5 }
    ]);
});

test('COBOL-PIC : XX', { timeout }, async ({ match }) => {
    const tokens = CB.parsePic('XX');

    match(tokens, [
        { char: 'X', count: 2 }
    ]);
});

test('COBOL-PIC : XX', { timeout }, async ({ match }) => {
    const tokens = CB.parsePic('XX');

    match(tokens, [
        { char: 'X', count: 2 }
    ]);
});

test('COBOL-PIC : ZZZ9.99', { timeout }, async ({ match }) => {
    const tokens = CB.parsePic('ZZZ9.99');

    match(tokens, [
        { char: 'Z', count: 3 },
        { char: '9', count: 1 },
        { char: '.', count: 1 },
        { char: '9', count: 2 }
    ]);
});


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - Parser
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Parse : X(999)', { timeout }, async ({ equal }) => {
    const picType = CB.parse('X(999)');

    equal(picType.type, 'X');
    equal(picType.length, 999);
    equal(picType.decimalPlaces, 0);

    equal(picType.size, 999);
});

test('Parse : 999v99999', { timeout }, async ({ equal }) => {
    const picType = CB.parse('999v99999');

    equal(picType.type, '9');
    equal(picType.length, 3);
    equal(picType.decimalPlaces, 5);

    equal(picType.size, 8);
});

test('Parse : S999v99999', { timeout }, async ({ equal }) => {
    const picType = CB.parse('S999v99999');

    equal(picType.type, 'S9');
    equal(picType.length, 3);
    equal(picType.decimalPlaces, 5);

    equal(picType.size, 8);
});

test('Parse : 9(5)V9(4)', { timeout }, async ({ equal }) => {
    const picType = CB.parse('9(5)V9(4)');

    equal(picType.type, '9');
    equal(picType.length, 5);
    equal(picType.decimalPlaces, 4);

    equal(picType.size, 9);
});

