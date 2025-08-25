'use strict'

const { test } = require('tap');

const { buildDDL } = require('./ddl-gen.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('buildDDL test' , async (t) => {
    t.ok(buildDDL, 'buildDDL function should be defined');
    
    const ddl = buildDDL('mysql');
    t.type(ddl, 'string', 'DDL should be a string');
});