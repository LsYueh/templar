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
 * @param {string|null} [fileCode] 指定的 Copybook FILE-CODE (若為 null 則產生所有 Copybook 的 DDL)
 * @return {string} DDL 語法
 */
function buildDDL(client, fileCode = null) {
    const knex = Knex({ client: client || 'sqlite' });

    const ddls = [];

    const targetCopybooks = fileCode ? { [fileCode]: copybooks[fileCode] } : copybooks;

    // Copybook 的 Field 定義來產生 DDL
    for (const copybook of Object.values(targetCopybooks)) {
        const tableName = copybook.fileCode.toLowerCase();
        const ddl = knex.schema.createTable(tableName, (table) => {
            table.comment(copybook.description);

            for (const field of copybook.Meta.Field) {
                if (field.name === 'FILLER') continue; // Skip FILLER fields

                const col = columnGen(field, table);

                if (!col) continue;

                if (field.description) {
                    col.comment(field.description);
                }
            }

            table.primary(copybook.primaryKey);
        }).toQuery();

        ddls.push(ddl);

        console.log(`-- DDL for table: ${copybook.fileCode} - ${copybook.description} --`);
    }

    return ddls;
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
    
    const validClients = ['mysql', 'postgres', 'sqlite', 'mssql', 'oracledb']; 
    if (!validClients.includes(client)) {
        console.error(`Error: Unsupported client '${client}'. Supported clients are: ${validClients.join(', ')}`);
        return process.exit(1);
    }

    const fileCode = argv.file || null;

    if (fileCode) {
        if (!copybooks[fileCode]) {
            console.error(`Error: Unknown FILE-CODE '${fileCode}'.`);
            return process.exit(1);
        }
    }

    console.log(`-- DDL for database client: ${client} --`);

    try {
        const ddls = buildDDL(client, fileCode);
        console.log(ddls.join(';\n') + ';');
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
            describe: 'Database client (e.g., mysql, postgres, sqlite)',
        })
        .option('file', {
            type: 'string',
            describe: 'FILE-CODE of the copybook to generate DDL for (default: all)',
        })
        .help()
        .argv;

    main(argv);
}


/**------+---------+---------+---------+---------+---------+---------+----------
 * Exports
---------+---------+---------+---------+---------+---------+---------+--------*/
module.exports = { buildDDL };
