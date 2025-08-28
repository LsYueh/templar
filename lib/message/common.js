'use strict'

/**
 * @typedef {import('../spec/fields/common.js').MessageMeta_t} MessageMeta_t
 * @typedef {import('../spec/message/common.js').Subsystem_t} Subsystem_t
 */

const iconv = require('iconv-lite');

const { OverpunchOpt } = require('../spec/field/cobol/overpunch.js');

const MESSAGE_SPEC = {
    TSE: require('../spec/message/tse.js'),
    OTC: require('../spec/message/otc.js'),
};

const { parse } = require('../field/parse.js');
const { DATA_TYPE } = require('../spec/field/field.js');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Class
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class Message_t
 */
class Message_t {
    /** @type {string} MESSAGE-ID */
    id;
    /** @type {object} Message Header */
    header;
    /** @type {object[]} Message Body */
    body = [];

    /** @type {Buffer} 剩餘電文 */
    remained;

    /** @type {Buffer} 原始電文 */
    raw;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 將輸入轉換為Buffer
 * @param {string|Buffer} input
 * @param {string} [encoding='utf8']
 * @returns {Buffer}
 */
function toBuffer(input, encoding = 'utf8') {
    if (typeof input === 'string') {
        if (encoding.toLowerCase() === 'cp950') {
            return iconv.encode(input, 'cp950');
        }
        return Buffer.from(input, /** @type {BufferEncoding} */(encoding));
    }

    return input;
}

/**
 * 根據`CONTROL-HEADER`找到對應的`MESSAGE ID`
 * @param {*} controlHeader 
 * @returns 
 */
function getMessagesId(controlHeader) {
    // 判斷訊息種類

    /** @type {Subsystem_t} */
    const subsystem = MESSAGE_SPEC.TSE.Subsys.get(controlHeader.SubsystemName) || MESSAGE_SPEC.OTC.Subsys.get(controlHeader.SubsystemName);

    if (!subsystem) throw new Error(`Unknown Subsystem Name: '${controlHeader.SubsystemName}'`);

    const message = subsystem.conditions.find((condition) => {
        let isMatched = true;
        for (const [fieldName, fieldCond] of Object.entries(condition.cond)) {
            if (!controlHeader[fieldName]) { isMatched = false; break; }
            if (controlHeader[fieldName] != fieldCond) { isMatched = false; break; }
        }

        return isMatched;
    });

    return message?.id ?? null;
}

/**
 * @param {object} param
 * @param {MessageMeta_t} param.Meta 
 * @param {Buffer} param.message (in/out)
 * @param {OverpunchOpt} [param.overpunchOption] 進位符號選項
 * @returns 
 */
function messageParseFactory(param) {
    if (!param.Meta) throw new Error(`Param 'Meta' is required`);

    // Note: 有包含到變動長度欄位(DATA, REQUEST-MESSAGE, RESPONSE-MESSAGE)的情況下不做固定長度檢查
    if (!param.Meta.isVariableLength && (param.message.length < param.Meta.Size))
        throw new Error(`[${param.Meta.description}] Insufficient message length, require '${param.Meta.Size}', got '${param.message.length}'.`);

    const subMessage = param.message.subarray(0, param.Meta.Size);

    /** @type {Object<string, any>} */
    const messageHeader = {};

    for (let index = 0, offset = 0; index < param.Meta.length; index++) {
        const field = param.Meta.Field[index];
        const shift = param.Meta.Index[index];

        const buffer = subMessage.subarray(offset, offset + shift);
        messageHeader[field.name] = parse(buffer, { picType: field.picType, dataType: field.dataType });

        offset += shift;
    }

    // 保留未處理的段落給下一個Parser處理
    param.message = param.message.subarray(param.Meta.Size);

    return messageHeader;
}


/**
 * 建立空物件
 * @param {object} param
 * @param {MessageMeta_t} param.Meta 
 * @returns 
 */
function createEmptymMessageObject(param) {
    /** @type {Object<string, any>} */
    const emptyObject = {};

    /**
     * @param {number} dataType 
     * @returns {Buffer<ArrayBufferLike>}
     */
    function setupBuffer(dataType) {
        if (dataType === DATA_TYPE.Time) return new Buffer.from('000000');
        return new Buffer.from([]);
    }
    
    for (const field of param.Meta.Field) {
        const dataType = field.dataType;

        const buffer = setupBuffer(dataType);
        emptyObject[field.name] = parse(buffer, { picType: field.picType, dataType });
    }

    return emptyObject;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Message_t, toBuffer, getMessagesId, messageParseFactory, createEmptymMessageObject };
