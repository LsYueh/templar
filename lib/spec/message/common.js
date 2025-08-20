'use strict'

/**------+---------+---------+---------+---------+---------+---------+----------
 * Class
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class Condition_t
 * 
 * @typedef {Object<string, string>} Cond_t
 */
class Condition_t {
    /**
     * @param {object} options 
     * @param {string} options.id MESSAGE ID
     * @param {string} options.name MESSAGE NAME
     * @param {Cond_t?} options.cond 符合條件
     */
    constructor(options) {
        /** @type {string} MESSAGE ID */
        this.id   = options.id;
        /** @type {string} MESSAGE NAME */
        this.name = options.name;
        /** @type {Cond_t?} 符合條件 */
        this.cond = options.cond ?? null;
    }
}

/**
 * @class Subsystem_t
 */
class Subsystem_t {
    /**
     * @param {object} options 
     * @param {Condition_t[]?} options.conditions 訊息符合條件
     */
    constructor(options) {
        /** @type {string} 9(2) SUBSYSTEM-NAME */
        this.name = options.name;
        /** @type {string} 說明 */
        this.description = options.description;
        /** @type {Condition_t[]?} 訊息符合條件 */
        this.conditions = options.conditions ?? [];
    }

    toString() {
        return `SUBSYSTEM-NAME: ${this.name}`;
    }
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { Subsystem_t, Condition_t };
