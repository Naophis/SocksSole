let serialPort = require("serialport");
let fs = require('fs');
let io = require('socket.io').listen(8080);

let sp;
let globalScoket;

io.set('heartbeat timeout', 5000);
io.set('heartbeat interval', 5000);

io.sockets.on('connection', function (socket) {
	globalScoket = socket;
	// 通信確立確認
	sp = new serialPort.SerialPort("COM7", {
		baudrate: 230400,
		parser: serialPort.parsers.readline("\n")
	});
	// 接続断
	socket.on('disconnect', function () {
		sp.close(function () {
			log("closed");
		});
	});
	// メッセージ送信
	sp.on('data', function (data) {
		// log(data);
		if (globalScoket) {
			globalScoket.emit('message', {
				message: data
			}, function (res) {});
		}
	});
});

let sendEnable = true;


log('server listening ...');

function log(data) {
	console.log(data);
}