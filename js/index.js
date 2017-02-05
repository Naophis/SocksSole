var socket;

let regexp = new RegExp("{{1}\.*}{1}", "g");
$(document).ready(function () {
    socket = io.connect('http://localhost:8080');
    socket.on('connect', function (data) {
        socket.headbeatTimeout = 5000;
        connected = true;
        $("#connection").html("<h2>接続中</h2>");
        $("#connection").addClass("connect");
        $("#connection").removeClass("disconnect");
    });
    socket.on('disconnect', function (data) {
        $("#connection").html("<h2>切断中</h2>");
        $("#connection").addClass("disconnect");
        $("#connection").removeClass("connect");
    });
    socket.on('error', function (reason) {　
        console.error(reason, 'Error!');
    });
    socket.on('message', function (data, fn) {
        var msg = data.message;
        $("#console").html(msg);
        try {
            var res = msg.match(regexp);
            if (res !== null) {
                applySensorData(JSON.parse(res[0]));
            }
        } catch (e) {
            console.log("json parse error");
        }
    });
    applySensorData(Sensor);
});
var Sensor = {
    LS2: 0,
    LS1: 0,
    RS2: 0,
    RS1: 0,
    LF1: 0,
    RF1: 0,
    gyro: 0,
    battery: 0
};

function applySensorData(d) {
    $("#ls2").html(Math.round(d.LS2));
    $("#ls1").html(Math.round(d.LS1));
    $("#rs2").html(Math.round(d.RS2));
    $("#rs1").html(Math.round(d.RS1));
    $("#lf1").html(Math.round(d.LF1));
    $("#rf1").html(Math.round(d.RF1));
    $("#gyro").html(d.gyro);
    $("#battery").html(d.battery + "V");
}

function toggleConnection() {
    var result = $("#connection").hasClass("connect");
    if (result) {
        socket.disconnect();
        $("#connection").addClass("disconnect");
        $("#connection").removeClass("connect");
    } else {
        socket.connect();
    }
}
document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    if (keyName === 'Escape') {
        socket.disconnect();
    } else if (keyName === 'F4') {
        socket.connect();
    }
}, false);
