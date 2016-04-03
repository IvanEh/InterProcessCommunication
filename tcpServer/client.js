var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();
var user;
var port = 2010;

socket.connect({
  port: port,
  host: '127.0.0.1',
}, function() {
  socket.on('data', function(data) {
    task = JSON.parse(data);
    task = task.map((x) => 2*x);
    socket.write(JSON.stringify(task));
  });
});
