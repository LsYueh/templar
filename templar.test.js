'use strict'

const { test } = require('tap')

const templar = require('./')

const { version } = require('./package.json')


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('pino version is exposed on export', async ({ equal }) => {
  equal(templar.version, version)
})
