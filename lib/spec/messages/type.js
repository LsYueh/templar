'use strict'

/**
 * @typedef {[string, Subsystem]} Sub_t
 */


/**------+---------+---------+---------+---------+---------+---------+----------
 * Class
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class MessageDef
 */
class MessageDef_t {
    /**
     * @param {object} options 
     * @param {string} options.id MESSAGE ID
     * @param {string} options.name MESSAGE NAME
     * @param {object} options.cond 符合條件
     */
    constructor(options) {
        /** @type {string} MESSAGE ID */
        this.id   = options.id;
        /** @type {string} MESSAGE NAME */
        this.name = options.name;
        /** @type {object} 符合條件 */
        this.cond = options.cond ?? null;
    }
}

/**
 * @class Subsystem
 */
class Subsystem {
    /**
     * @param {object} options 
     */
    constructor(options) {
        /** @type {string} 9(2) SUBSYSTEM-NAME */
        this.name = options.name;
        /** @type {string} 說明 */
        this.description = options.description;
        /** @type {{id: string, define: MessageDef_t}[]} 該Subsystem下所擁有的訊息格式 */
        this.messages = options.messages ?? [];
    }

    toString() {
        return `SUBSYSTEM-NAME: ${this.name}`;
    }
}

class Message_t {
    /** @type {string} MESSAGE-ID */
    id;
    /** @type {object} Message Header */
    header;
    /** @type {object} Message Body */
    body;

    /** @type {string} 剩餘電文 */
    remained;

    /** @type {string} 原始電文 */
    raw;
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Message_t, MessageDef_t, Subsystem };
