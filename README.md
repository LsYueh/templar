# TeMPlar
`TMP`是臺灣證券交易所（TWSE）所使用的專屬傳輸協定，全名為`Transaction Message Protocol`，用於證券交易相關的訊息傳輸。此工具用於解析TMP提供的`委託`/`成交`/`申報`/`檔案傳輸`服務訊息內容，將序列化的字串資料轉為非序列化的資料物件後再加以利用。

<br><br>

# 使用方式

## 單筆訊息及檔案傳輸

```js
const { parse } = require('./parse-f.js');
```

```js
const message = parse('20000008595900845000000011T3000000100');

console.log(message);

// Message_t {
//   body: [ { FileCode: 'T30', FileSize: 100 } ],
//   raw: '20000008595900845000000011T3000000100',
//   header: {
//     SubsystemName: '20',
//     FunctionCode: '00',
//     MessageType: '00',
//     MessageTime: 2025-08-17T00:59:59.000Z,
//     StatusCode: '00',
//     SourceId: '8450',
//     ObjectId: '0000',
//     BodyLength: 11
//   },
//   id: 'F010',
//   remained: ''
// }
```

## 成交回報

```js
const { parse } = require('./parse-r.js');
```

```js
const message = parse('500000085959008450000001'); // R1

console.log(message);

// Message_t {
//   body: [ { BrokerId: '8450', StartSeq: 1 } ],
//   raw: '500000085959008450000001',
//   header: {
//     SubsystemName: '50',
//     FunctionCode: '00',
//     MessageType: '00',
//     MessageTime: 2025-08-15T00:59:59.000Z,
//     StatusCode: '00'
//   },
//   id: 'R1',
//   remained: ''
// }
```

```js
const message = parse('50100009005900013202' + ''.padStart(66, '0')+ ''.padStart(66, '0')); // R3

console.log(message);

// Message_t {
//   body: [
//     {
//       StkNo: '000000',
//       MthQty: 0,
//       MthPr: 0,
//       MthTime: 2025-08-14T16:00:00.000Z,
//       ExCd: '0',
//       BuySell: '0',
//       OrderNo: '00000',
//       IVAcNo: '0000000',
//       OdrTpe: '0',
//       SeqNo: '000000',
//       BrokerId: '0000',
//       RecNo: '00000000',
//       MarkS: '0'
//     },
//     {
//       StkNo: '000000',
//       MthQty: 0,
//       MthPr: 0,
//       MthTime: 2025-08-14T16:00:00.000Z,
//       ExCd: '0',
//       BuySell: '0',
//       OrderNo: '00000',
//       IVAcNo: '0000000',
//       OdrTpe: '0',
//       SeqNo: '000000',
//       BrokerId: '0000',
//       RecNo: '00000000',
//       MarkS: '0'
//     }
//   ],
//   raw: '50100009005900013202000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
//   header: {
//     SubsystemName: '50',
//     FunctionCode: '10',
//     MessageType: '00',
//     MessageTime: 2025-08-15T01:00:59.000Z,
//     StatusCode: '00',
//     BodyLength: 132,
//     BodyCnt: 2
//   },
//   id: 'R3',
//   remained: ''
// }
```

```js
const message = parse('50200011223300999998'); // R6

console.log(message);

// Message_t {
//   body: [ { TotalRecord: 999998 } ],
//   raw: '50200011223300999998',
//   header: {
//     SubsystemName: '50',
//     FunctionCode: '20',
//     MessageType: '00',
//     MessageTime: 2025-08-15T03:22:33.000Z,
//     StatusCode: '00'
//   },
//   id: 'R6',
//   remained: ''
// }


parse('5020001122330099999'); // R6 (Error!)

// Exception: [R6] Insufficient message length, require '6', got '5'.
```

<br><br>

# 時間格式表示
在交易所提供的文件中，`X(8)`對應`YYYYMMDD`的`DATE`型別，而`X(6)`與`X(9)`分別對應`HHmmss`/`HHmmssSSS`的`TIME`型別。目前Node 22尚未支援`Temporal.PlainTime`與`Temporal.PlainDate`，故對於上述資料型態的轉換會統一轉換至JS的`Date`型別，其中`X(6)`與`X(9)`會自動補上當下執行的日期。

<br><br>

# COBOL PICTURE Clause 處理
TMP電文中除`X`與`9`的文字解析外，還支援各種COBOL的`S9`有正負號的數字字串轉換

|  數 字  | ca,<br>cb,<br>cm,<br>cr<br>Positive | ci,<br>cn<br>Positive | ca,<br>ci,<br>cn<br>Negative | cb<br>Negative | cm<br>Negative | cr<br>Negative |
| :---- | :---- | :------ | :------ | :------ | :------ | :------ |
| 0 | '0' | '{' | '}' | '@' | 'p' | ' ' (space) |
| 1 | '1' | 'A' | 'J' | 'A' | 'q' | '!' |
| 2 | '2' | 'B' | 'K' | 'B' | 'r' | '"' (double-quote) |
| 3 | '3' | 'C' | 'L' | 'C' | 's' | '#' |
| 4 | '4' | 'D' | 'M' | 'D' | 't' | '$' |
| 5 | '5' | 'E' | 'N' | 'E' | 'u' | '%' |
| 6 | '6' | 'F' | 'O' | 'F' | 'v' | '&' |
| 7 | '7' | 'G' | 'P' | 'G' | 'w' | ''' (single-quote) |
| 8 | '8' | 'H' | 'Q' | 'H' | 'x' | '(' |
| 9 | '9' | 'I' | 'R' | 'I' | 'y' | ')' |

<br>

|  選 項  | 對 應 COBOL |
| :----: | :---- |
| ca | RM/COBOL (not RM/COBOL-85) |
| cb | MBP COBOL |
| ci | IBM COBOL (RM/COBOL-85) |
| cm | Micro Focus COBOL |
| cn | NCR COBOL |
| cr | Realia COBOL |
| cv | VAX COBOL |

<br>

COBOL的`S9`對正負號數字表示範例 (IBM COBOL)
```cobol
PIC S9(3) VALUE -123.
TRAILING                 '1'   '2'   'L'
TRAILING SEPARATE  '1'   '2'   '3'   '-'
LEADING                  'J'   '2'   '3'
LEADING SEPARATE   '-'   '1'   '2'   '3'

PIC S9(5)V9 VALUE -12345.6.
TRAILING                '1'  '2'  '3'  '4'  '5'  'O'
TRAILING SEPARATE  '1'  '2'  '3'  '4'  '5'  '6'  '-'
LEADING                 'J'  '2'  '3'  '4'  '5'  '6'
LEADING SEPARATE   '-'  '1'  '2'  '3'  '4'  '5'  '6'
```

<br><br>

# 交易所TMP連線架構

PVC：Permanent Virtual Circuit（永久虛擬電路）

## 實體線

一條實體線上可建立多條PVC，每10條PVC為一組。

|  PVC<br>或<br>PORT NO | 執行功能 |
| :----: | :----: |
| 01 | FT送 |
| 02 | FT收 |
| 03 | 成交回報 |
| 04 | 委託輸入 |
| 05 | 委託輸入 |
| 06 | 委託輸入 |
| 07 | 委託輸入 |
| 08 | 委託輸入 |
| 09 | 委託輸入 |

<br>

## PVC作業時間表

|     PVC   |  時 間  | 執 行 業 務 |
|   :----:  | :----: | :------: |
| (01)<br>FT 送  | 07:30－19:00 | 單筆訊息及檔案傳輸<br>(證券商的傳送線路) |
| (02)<br>FT 收  | 07:30－19:00 | 單筆訊息及檔案傳輸<br>(證券商的傳送線路) |
| (03)<br>成交回報 | 08:30－14:40 | 成交回報接收 |
| (04~09)<br>委託輸入 | 08:30－13:30<br>09:00－12:10<br>09:00－13:30<br>13:40－14:30<br>14:00－14:30<br>14:30－15:00<br>15:00－16:00<br>15:00－16:00 | 普通股交易<br>標借交易<br>盤中零股交易<br>盤後零股交易<br>盤後定價交易<br>證金標購交易<br>拍賣交易<br>標購交易 |

<br>

## 連線子系統

|   時 間   |  證 券 商 與 證 交 所  |
|  :----:  | ---- |
| 07:30<br>｜<br>08:20 | 1.開機通知作業<br>2.登錄作業<br>&emsp;準備進入連線狀態 |
| 08:20以後 | 完成連線進入各應用子統統 |
| 08:30<br>｜<br>19:00 | 1.進行各項業務<br>2.若在各項業務處理中發現有任何異常狀況時<br>&emsp;(1)開機通知作業<br>&emsp;(2)登錄作業<br>&emsp;&emsp;重新進入連線狀態 |
| 19:00以後 | 1.完成各項業務<br>2.離線作業<br>&emsp;雙方進入離線狀態 |

### 訊息格式
> MESSAGE ID︰L010、L020、L030、L040、L050、L060、L070、L080

<br>

## 單筆訊息與檔案傳輸通訊協定

|   時 間   |  系 統  |  功 能  |
|  :----:  | :----: | ------ |
| 07:30<br>｜<br>08:00 | 連線子系統 | 建立證交所與證券商的電腦連線作業，並進入業務系統。 |
| 08:00<br>｜<br>19:00 | 單筆訊息與檔案傳輸子系統<br>結算作業<br>申購作業<br>投資人管理作業 | 提供交易報表。<br>補送成交回報資料給證券商。<br>申購作業。<br>處理結算業務。<br>處理申購業務。<br>處理與投資人管理有關之業務。 |
| 19:00 | 連線子系統 | 離線 |

### 訊息格式 (傳送功能)
> MESSAGE ID︰F010、F020、F030(F210)、F040(F220)、F050、F060、F070、F080  

### 訊息格式 (接收功能)
> MESSAGE ID︰F090、F100、F110(F230)、F120(F240)、F130、F140、F150、F160  

### 訊息格式
> MESSAGE ID︰F170、F180、F190、F200


<br>

## 委託輸入通訊協定

|   時 間   |  系 統  |  功 能  |
|  :----:  | :----: | ------ |
| 08:00－08:30 | 連線子系統 | 建立證交所與證券商的電腦連線作業，並進入業務系統。 |
| 08:30－13:30<br>09:00－12:10<br>09:00－13:30<br>13:40－14:30<br>14:00－14:30<br>14:30－15:00<br>15:00－16:00<br>15:00－16:00 | 普通股交易子系統<br>標借交易子系統<br>盤中零股交易子系統<br>盤後零股交易子系統<br>盤後定價交易子系統<br>證金標購交易子系統<br>拍賣交易子系統<br>標購交易子系統 | 證券商輸入買賣委託，並接受證交所的委託回報。 |
| 16:00 | 連線子系統 | 結束委託輸入，回到連線子系統。<br>離線 |

### 訊息格式
> MESSAGE ID︰T1、T2、T3、T4、T5、T6、T7

<br>

## 成交回報通訊協定

|   時 間   |  系 統  |  功 能  |
|  :----:  | :----: | ------ |
| 08:00<br>｜<br>08:30 | 連線子系統 | 建立證交所與證券商的電腦連線作業，並進入業務系統。 |
| 08:30<br>｜<br>14:00 | 成交回報接收子系統 | 接收普通股、盤中零股成交回報資料。 |
| 14:00<br>｜<br>14:40 | 成交回報接收子系統 | 接收盤後定價、盤後零股成交回報資料。 |
| 14:40 | 連線子系統 | 結束委託輸入，回到連線子系統。<br>離線 |

### 訊息格式
> MESSAGE ID︰R1、R2、R3、R4、R5、R6

<br><br>

# 專案結構

```console
{project-root}
 ├─ lib
 │   ├─ field  <------------- 欄位轉換
 │   ├─ message  <----------- 訊息解析
 │   ├─ spec
 │   │   ├─ copybook  <------ 各類FILE-CODE檔案內容定義
 │   │   ├─ field  <--------- TMP格式欄位定義
 │   │   ├─ message  <------- TMP格式訊息定義
 │   │   │   ├─ body
 │   │   │   └─ header.js
 │   │   └─ messages  <------ 交易所電文種類定義
 │   │       ├─ otc.js
 │   │       └─ tse.js
 │   └─ meta.js
 └─ templar.js
```

<br><br>

# 其他

[參考資料](./doc/refs.md)  
