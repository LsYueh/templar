'use strict'

const { test } = require('tap');

const { Type } = require('./data-type.js');
const { Field } = require('./field.js');

const timeout = 60000;

/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Field type: (99999) is not valid', { timeout }, async ({ equal }) => {
    const f = new Field(99999, 5);

    equal(f.value, null);
    equal(f.rawValue, '');
    equal(f.isValid, false);
});


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - Field type: X
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Field type: X is not valid', { timeout }, async ({ equal }) => {
    const f = new Field(Type.X, 5);

    equal(f.value, null);
    equal(f.rawValue, '     ');
    equal(f.isValid, false);
});

test('Field type: X', { timeout }, async ({ equal }) => {
    const f = new Field(Type.X, 5, 12345);

    equal(f.value, 12345);
    equal(f.rawValue, '12345');
    equal(f.isValid, true);
});

test('Field type: X (Overflow)', { timeout }, async ({ equal }) => {
    const f = new Field(Type.X, 5, 123456);

    equal(f.value, 123456);
    equal(f.rawValue, '12345');
    equal(f.isValid, true);
});


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - Field type: 9
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Field type: 9 is not valid', { timeout }, async ({ equal }) => {
    const f = new Field(Type._9, 5);

    equal(f.value, null);
    equal(f.rawValue, '00000');
    equal(f.isValid, false);
});

test('Field type: 9', { timeout }, async ({ equal }) => {
    const f = new Field(Type._9, 5, 12345);

    equal(f.value, 12345);
    equal(f.rawValue, '12345');
    equal(f.isValid, true);
});

test('Field type: 9 (Overflow)', { timeout }, async ({ equal }) => {
    const f = new Field(Type._9, 5, 123456);

    equal(f.value, 123456);
    equal(f.rawValue, '23456');
    equal(f.isValid, true);
});
