'use strict'

const { test } = require('tap');

const { stringify } = require('./file-transfer.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('F050', { timeout }, async (t) => {
     const message = {
      body: [ { FileCode: 'M01', RequestMessage: '' } ],
      header: {
        SubsystemName: '20',
        FunctionCode: '02',
        MessageType: '05',
        MessageTime: new Date('2025-08-15T00:59:59.000Z'),
        StatusCode: '00',
        SourceId: '8450',
        ObjectId: '0000',
        // BodyLength: 3,
      },
      id: 'F050',
    };
    
    t.equal('20020508595900845000000003M01', stringify(message));
});