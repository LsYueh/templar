'use strict'

const { test } = require('tap');

const cobolPic = require('./cobol/cobol-pic.js');
const { PicType, DATA_TYPE } = require('./field.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('Type: FILLER = -1', async (t) => {
    t.equal(DATA_TYPE.FILLER, -1);
    t.equal(DATA_TYPE.String, 1);
    t.equal(DATA_TYPE.X, 2);
});

test('COBOL PIC X Parse Test', async (t) => {
    const picType_01 = cobolPic.parse('X(7)');
    const picType_02 = new PicType('X', 7);

    t.match(picType_01, picType_02);
});

test('COBOL PIC 9 Parse Test', async (t) => {
    const picType_01 = cobolPic.parse('9(2)V9(5)');
    const picType_02 = new PicType('9', 2, 5);

    t.match(picType_01, picType_02);
});

test('COBOL PIC S9 Parse Test', async (t) => {
    const picType_01 = cobolPic.parse('S9(5)V9(4)');
    const picType_02 = new PicType('S9', 5, 4);

    t.match(picType_01, picType_02);
});
