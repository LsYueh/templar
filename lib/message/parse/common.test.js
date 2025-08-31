'use strict'

const FIELDS_SPEC_HEADER = require('../../spec/fields/header.js');

const { test } = require('tap');

const { createEmptymMessageObject } = require('./common.js');

const timeout = 60000;


/**------+---------+---------+---------+---------+---------+---------+----------
 * Test
---------+---------+---------+---------+---------+---------+---------+--------*/

test('createEmptymMessageObject()', { timeout }, async (t) => {
    const ControlHeader = createEmptymMessageObject({ Meta: FIELDS_SPEC_HEADER.Meta.ControlHeader });
    t.hasOwnPropsOnly(ControlHeader, ['SubsystemName', 'FunctionCode', 'MessageType', 'MessageTime', 'StatusCode']);

    const FileTransferHeader = createEmptymMessageObject({ Meta: FIELDS_SPEC_HEADER.Meta.FileTransferHeader });
    t.hasOwnPropsOnly(FileTransferHeader, ['SourceId', 'ObjectId', 'BodyLength']);

    const ApHeader = createEmptymMessageObject({ Meta: FIELDS_SPEC_HEADER.Meta.ApHeader });
    t.hasOwnPropsOnly(ApHeader, ['BodyLength', 'BodyCnt']);
});
