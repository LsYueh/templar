#!/usr/bin/env node

'use strict'

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { Sequelize, DataTypes } = require('sequelize');

/**------+---------+---------+---------+---------+---------+---------+----------
 * Helper Functions
---------+---------+---------+---------+---------+---------+---------+--------*/

/** 建立資料表的 DDL 語法
 * @param {string} dialect 資料庫方言 (e.g., 'mysql', 'postgres', 'sqlite')
 * @returns {string} DDL 語法
 */
function buildDDL(dialect) {
    const sequelize = new Sequelize('dummy', 'user', 'pass', {
        dialect, logging: false
    });

    // TODO: 從 Copybook 的 model 定義來產生 DDL
    // 目前僅為示範，實際應根據 Copybook 定義來建立模型

    const tableModel = sequelize.define('User', {
        username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        birthday: { type: DataTypes.DATE }
    }, {
        tableName: 'users',
        timestamps: false,
        paranoid: false,
    });

    const qg = sequelize.getQueryInterface().queryGenerator;
    return qg.createTableQuery(tableModel.getTableName(), tableModel.getAttributes());
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * CLI Entry Point
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * 主程式
 * @param {object} argv 命令列參數
 * @param {string} [argv.dialect] 資料庫方言 (e.g., 'mysql', 'postgres', 'sqlite')
 * @returns {number} 結束碼 (0 表示成功)
 */
function main(argv) {
    const dialect = argv.dialect || 'sqlite';

    try {
        const ddl = buildDDL(dialect);
        console.log(`-- DDL for dialect: ${dialect} --`);
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
        .option('dialect', {
            type: 'string',
            describe: 'database dialect (e.g., mysql, postgres, sqlite)',
        })
        .help()
        .argv;

    main(argv);
}

module.exports = main;
