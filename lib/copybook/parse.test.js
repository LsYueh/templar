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
    t.notHas(T30, 'IndSubCode', 'OTC only');
    t.notHas(T30, 'StkMark', 'OTC only');
    t.equal(T30.MarkDayTrade, 'Y');
    t.equal(T30.StkCTGCD, '0');
});

test('Copybook: T30 (OTC)', { timeout }, async (t) => {
    const text = '00620100023950000021780000019610020250822000000  1元大富櫃50      000000000000000000100X0           ';

    const T30 = parse({ fileCode: 'T30', data: iconv.encode(text, 'cp950'), market: 'OTC' });

    t.notMatch(T30, null);
    t.equal(T30.StockNo, '006201');
    t.equal(T30.StockName, '元大富櫃50');
    t.hasProp(T30, 'IndSubCode', 'OTC only');
    t.hasProp(T30, 'StkMark', 'OTC only');
    t.equal(T30.MarkDayTrade, 'X');
    t.equal(T30.StkCTGCD, '0');
});

test('Copybook: O40', { timeout }, async (t) => {
    const text = '2330  台積電          01155000001140000001140000020250821   ';

    const O40 = parse({ fileCode: 'O40', data: iconv.encode(text, 'cp950') });

    t.notMatch(O40, null);
    t.equal(O40.StockNo, '2330');
    t.equal(O40.StockName, '台積電');
    t.equal(O40.RslPr, 1155.0);
    t.equal(O40.FllPr, 1140.0);
    t.equal(O40.RefPr, 1140.0);
    t.hasProp(O40, 'LMthDat');
});