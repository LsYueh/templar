'use strict'

const { test } = require('tap');

const { buildDDL } = require('./ddl-gen.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('buildDDL test' , async (t) => {
    t.ok(buildDDL, 'buildDDL function should be defined');
    
    const ddls = buildDDL('mysql', 'T30');
    t.ok(Array.isArray(ddls), 'buildDDL should return an array');
    t.ok(ddls.length > 0, 'buildDDL should return non-empty array');
    t.ok(ddls[0].startsWith('create table'), 'First DDL should start with "create table"');
});