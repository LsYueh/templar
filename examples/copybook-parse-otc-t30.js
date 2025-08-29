'use strict'

const fs = require('fs');
const { Transform } = require('stream');


/**------+---------+---------+---------+---------+---------+---------+----------
 * TeMPlar
---------+---------+---------+---------+---------+---------+---------+--------*/

const { copybook } = require('templar');


/**------+---------+---------+---------+---------+---------+---------+----------
 * Class
---------+---------+---------+---------+---------+---------+---------+--------*/

/**
 * @class 
 */
class decoder extends Transform {
    constructor(options) {
        super({ ...options, readableObjectMode: true });
        this.leftover = '';
    }

    _transform(chunk, encoding, callback) {
        const buffer = this.leftover ? Buffer.concat([this.leftover, chunk]) : chunk;
        let start = 0;

        for (let i = 0; i < buffer.length; i++) {
            if (buffer[i] === 0x0a) { // \n
                // 判斷前一個字元是不是 \r
                const end = (i > 0 && buffer[i - 1] === 0x0d) ? i - 1 : i;
                const line = buffer.slice(start, end);
                this.push(line);
                start = i + 1;
            }
        }

        this.leftover = start < buffer.length ? buffer.slice(start) : null;
        callback();
    }

    _flush(callback) {
        if (this.leftover) {
            this.push(this.leftover);
        }
        callback();
    }
}

/**------+---------+---------+---------+---------+---------+---------+----------
 * Method - Example Usage
---------+---------+---------+---------+---------+---------+---------+--------*/

fs.createReadStream('otc-t30.dat') // 資料來源 https://dsp.tpex.org.tw/web/system/mainboard.php
    .pipe(new decoder())
    .on('data', (buffer) => {
        const T30 = copybook.parse(buffer, { fileCode: 'T30', market: 'OTC' });
        console.log(`[OTC] T30: ${T30.StockNo} - ${T30.StockName} (當沖: ${T30.MarkDayTrade})`);
    })
    .on('end', () => {
        console.log('檔案讀取完畢');
    });
