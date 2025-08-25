'use strict'

const { test } = require('tap');

const templar = require('./');

const { version } = require('./package.json');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Tests
---------+---------+---------+---------+---------+---------+---------+--------*/

test('TeMPlar', async (t) => {
    t.equal(templar.version, version);

    t.equal(typeof templar.parse, 'function');
    t.equal(typeof templar.stringify, 'function');

    t.test('parse()', async (t) => {
        // File Transfer
        t.same(templar.parse('20020508595900000084500003M01', { category: 'file-transfer' }), {
            id: 'F060',
            header: {
                SubsystemName: '20',
                FunctionCode: '02',
                MessageType: '05',
                MessageTime: templar.parse('20020508595900000084500003M01', { category: 'file-transfer' }).header.MessageTime, // dynamic
                StatusCode: '00',
                SourceId: '0000',
                ObjectId: '8450',
                BodyLength: 3
            },
            body: [
                {
                    FileCode: 'M01',
                    ResponseMessage: ''
                }
            ],
            raw: Uint8Array.from([50, 48, 48, 50, 48, 53, 48, 56, 53, 57, 53, 57, 48, 48, 48, 48, 56, 52, 53, 48, 48, 48, 48, 51, 77, 48, 49]),
            remained: new Uint8Array()
        }, 'should parse file-transfer message');

        // Report
        t.same(templar.parse('500000085959008450000001', { category: 'report' }), {
            id: 'R1',
            header: {
                SubsystemName: '50',
                FunctionCode: '00',
                MessageType: '00',
                MessageTime: templar.parse('500000085959008450000001', { category: 'report' }).header.MessageTime, // dynamic
                StatusCode: '00'
            },
            body: [
                {
                    BrokerId: '8450',
                    StartSeq: 1
                }
            ],
            raw: Uint8Array.from([53, 48, 48, 48, 48, 48, 56, 53, 57, 53, 57, 48, 48, 56, 52, 53, 48, 48, 48, 48, 49]),
            remained: new Uint8Array()
        }, 'should parse report message');

        t.throws(() => { templar.parse('', { category: 'foo' }) }, 'should throw if invalid category');
    })
});
