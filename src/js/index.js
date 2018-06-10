var time = 0;

var chartList = [];
var img;
var interval;
var socket;
$(document).ready(function () {
    socket = io.connect('http://localhost:8080');
    var chlength = config.charts.length;
    for (var i = 0; i < 3; i++) {
        chartList.push(new ConsoleChart(config.charts[i]));
    }

    img = new ConsoleSuperimposed(config.img);

    var exceptlist = [];

    $(".except").on("click", function () {
        var self = this;
        if (exceptlist.indexOf(self.name) == -1) {
            exceptlist.push(self.name);
            $(self).removeClass("btn-primary");
        } else {
            exceptlist = exceptlist.filter((ele) => {
                return ele !== self.name;
            });
            $(self).addClass("btn-primary");
        }
    });

    socket.on('connect', function (data) {
        socket.headbeatTimeout = 5000;
        connected = true;
        $("#connection").html("接続中")
            .addClass("connect")
            .removeClass("disconnect");
        interval = setInterval(function () {
            for (var i = 0; i < 3; i++) {
                chartList[i].update(exceptlist);
            }
            img.apply();
        }, 20);
    });

    socket.on('disconnect', function (data) {
        clearInterval(interval);
        $("#connection").html("切断中")
            .addClass("disconnect")
            .removeClass("connect");
    });

    socket.on('error', function (reason) {　
        console.error(reason, 'Error!');
    });

    socket.on('message', function (data, fn) {
        // console.log(JSON.stringify(data));
        try {
            var reg = new RegExp("{.*}", "g");
            var d = JSON.parse(data.message);
            if (d.gyro) {
                chartList[0].append("gyro", d.gyro);
                chartList[1].append("Right", d.right);
                chartList[1].append("Left", d.left);
                chartList[1].append("Right90", d.right90);
                chartList[1].append("Left90", d.left90);
                chartList[1].append("Front", d.front);
                chartList[2].append("battery", d.battery);
                img.update({
                    right: d.right,
                    left: d.left,
                    front: d.front,
                    right90: d.right90,
                    left90: d.left90,
                    gyro: d.gyro,
                    battery: d.battery
                });
            }
        } catch (e) {}
    });

    function connect() {
        log("connect");
        socket.emit("connect", {
            message: true
        });
    }

    function disconnect() {
        log("disconnect");
        socket.emit("connect", {
            message: false
        }, function (result) {
            $("#connection").html(result);
        });
    }

    function log(data) {
        console.log(data);
    }
});


document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    if (keyName === 'Escape') {
        socket.disconnect();
    } else if (keyName === 'F4') {
        socket.connect();
    }
}, false);