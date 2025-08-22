'use strict'

const iconv = require("iconv-lite");
const { test } = require('tap');

const { parse } = require('./parse.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test - Copybook
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Copybook: T30', { timeout }, async (t) => {
    const text = '2330  01155000001140000001140000020250821000024BS1台積電          00000000000000000010Y0            ';

    t.throws(() => {
        parse({ fileCode: 'T30', data: text});
    }, new Error(`FILE-CODE: 'T30' Size mismatch. Expected: 100, Actual: 97`));

    const T30 = parse({ fileCode: 'T30', data: iconv.encode(text, 'cp950') });

    t.notMatch(T30, null);
    t.equal(T30.StockNo, '2330');
    t.equal(T30.StockName, '台積電');
    t.equal(T30.MarkDayTrade, 'Y');
    t.equal(T30.StkCTGCD, '0');
});