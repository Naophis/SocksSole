# SocksSole (socket.io + Serial Console)

このOSSはマイクロマウスからUART送信した所定のフォーマットのJSONデータを画面やグラフに反映するGUIを提供します。

## 必要な環境
* Node.js
* Python 2.7系 (Windowsのみ必要)

## 導入
```
 git clone https://github.com/Naophis/SocketIoSerialConsole.git
```
作業ディレクトリにて、以下を実行
```
npm install
```
`node_modules`というディレクトリが生成されたら準備完了。

## 実行
ルートにあるindex.jsに対して、以下を実行
```
npm run server
```
実行後、[http://localhost:8080](http://localhost:8080)に接続してください。

## 接続
FT234XなどのCOMポートを使用するデバイスを接続した状態で`npm run server`を実行します。

## アプリ上の切断・再接続
* 接続：`F4キー`でシリアルポート接続します。Webアプリ参照
* 切断：`Escキー`でシリアルポートを切断、解放します。


## 受信できるメッセージについて
文字列なら何でも可能です。ただし、加工の手間から、json形式を勧めます。  

例
```
{
    "battery" : 7.625,
    "gyro":-0.12344,
    "RS1":44,
    "LS1":12344,
    "RS2":2344,
    "LS2":2344,
    "RF1":123
}
```
メッセージの境界文字には改行コードを使用します。必ず入力してください。
```
{"battery" : 7.625, "gyro":-0.12345,・・・}\r\n{"battery" : 8.25, "gyro":-0.45678,・・・}\r\n
```
を一度に送信した場合、
```
{"battery" : 7.625, "gyro":-0.12344,・・・}
{"battery" : 7.625, "gyro":-0.12344,・・・}
```
と解釈します。
