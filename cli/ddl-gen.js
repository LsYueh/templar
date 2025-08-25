#!/usr/bin/env node

'use strict'

/**
 * @typedef {import('../lib/spec/field/field.js').Field_t} Field_t
 */

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const Knex = require('knex');

const copybooks = require('../lib/spec/copybook/index.js');
const { DATA_TYPE } = require('../lib/spec/field/field.js');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper Functions
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @param {Field_t} field 
 * @param {import('knex').Knex.TableBuilder} table 
 * @returns 
 */
function columnGen(field, table) {
    const columnName = field.name;
    // 根據 Copybook Field 的屬性決定資料型態

    switch (field.dataType) {
        case DATA_TYPE.String   : 
        case DATA_TYPE.X        : return table.string(columnName, field.picType.length);
        case DATA_TYPE.Unsigned : 
        case DATA_TYPE._9       : {
            if (field.picType.decimals > 0) {
                return table.decimal(columnName, field.picType.length + field.picType.decimals, field.picType.decimals);
            } else {
                return table.integer(columnName, field.picType.length).unsigned(true);
            }
        }
        case DATA_TYPE.Signed   : 
        case DATA_TYPE.S9       : 
        {
            if (field.picType.decimals > 0) {
                return table.decimal(columnName, field.picType.length + field.picType.decimals, field.picType.decimals);
            } else {
                return table.integer(columnName, field.picType.length).unsigned(false);
            }
        }
        case DATA_TYPE.Date     : return table.date(columnName);
        case DATA_TYPE.Time     : return table.time(columnName);
        case DATA_TYPE.Datetime : return table.dateTime(columnName);
        case DATA_TYPE.Timestamp: return table.timestamp(columnName);
        case DATA_TYPE.FILLER   : return null; // FILLER fields are ignored
        default:
            return null;
    }
}

/** 建立資料表的 DDL 語法
 * @param {string} [client] 資料庫方言 (e.g., 'mysql', 'postgres', 'sqlite')
 * @returns {string} DDL 語法
 */
function buildDDL(client) {
    const knex = Knex({ client: client || 'sqlite' });

    // Copybook 的 Field 定義來產生 DDL
    for (const copybook of Object.values(copybooks)) {
        console.log(`Copybook: ${copybook.fileCode} - ${copybook.description}`);

        const tableName = copybook.fileCode.toLowerCase();
        const sql = knex.schema.createTable(tableName, (table) => {
            table.comment(copybook.description);

            for (const field of copybook.Meta.Field) {
                if (field.name === 'FILLER') continue; // Skip FILLER fields

                const col = columnGen(field, table);

                if (!col) continue;

                if (field.description) {
                    col.comment(field.description);
                }
            }
        }).toQuery();

        console.log(`-- DDL for table: ${tableName} --`);
        console.log(sql);
    }

    return '-- DDL generation not fully implemented yet --';
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * CLI Entry Point
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 主程式
 * @param {object} argv 命令列參數
 * @param {string} [argv.client] 資料庫方言 (e.g., 'mysql', 'postgres', 'sqlite')
 * @returns {number} 結束碼 (0 表示成功)
 */
function main(argv) {
    const client = argv.client || 'sqlite';

    console.log(`-- DDL for database client: ${client} --`);

    try {
        const ddl = buildDDL(client);
        console.log(ddl);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        return process.exit(1); 
    }

    return process.exit(0);
}

if (require.main === module) {
    const argv = yargs(hideBin(process.argv))
        .usage('$0 [options]')
        .option('client', {
            type: 'string',
            describe: 'database client (e.g., mysql, postgres, sqlite)',
        })
        .help()
        .argv;

    main(argv);
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { buildDDL };
