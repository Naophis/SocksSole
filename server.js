const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const settings = require("./settings");
const PORT = settings.port || 3000;
const SerialPort = require('serialport');
const Readline = require('parser-readline');

let comport = "";

if (process.argv[2] === "watch") {
    app.use(require('express-dev-autoreload')({}));
}

SerialPort.list(function (err, port) {
    for (let i in port) {
        const p = port[i];
        if (p.comName.match(/usbserial/) || p.comName.match(/COM/)) {
            comport = p.comName;
            break;
        }
    }
    ready();
});
app.get(`/config/*`, (req, res) => {
    var tmp = req.url.split("/");
    console.log(req.url)
    let fileName = tmp[2];
    res.sendFile(`${__dirname}/config/${fileName}`);
});
app.get(`/modules/*`, (req, res) => {
    var tmp = req.url.split("/");
    let moduleName = tmp[2];
    var target = "";
    for (var i = 3; i < tmp.length; i++) {
        if (tmp[i]) {
            target += "/" + tmp[i];
        }
    }
    let fileName = tmp[3];
    let file1 = tmp[3];
    let file2 = tmp[4];
    res.sendFile(`${__dirname}/node_modules/${moduleName}${target}`);
});
app.get(`/*`, (req, res) => {
    res.sendFile(`${__dirname}/src${req.url}`);
});

let globalScoket;
let port;
let parser;

let ready = function () {
    io.on('connection', (socket) => {
        globalScoket = socket;
        if (!port) {
            port = new SerialPort(comport, {
                baudRate: settings.baudrate
            }, function (e) {
                if (e) {
                    console.log("comport access dinied");
                } else {
                    console.log("connect");
                }
            });
            parser = port.pipe(new Readline({
                delimiter: '\r\n'
            }));
        }
        socket.on('disconnect', function () {
            if (port) {
                port.close(function () {
                    log("closed");
                    port = undefined;
                });
            }
        });
        parser.on('data', function (data) {
            if (globalScoket) {
                globalScoket.emit('message', {
                    message: data
                }, function (res) {});
            }
        });
    });
}

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


var sendEnable = true;

function log(data) {
    console.log(data);
}