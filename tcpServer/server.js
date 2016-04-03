var api = {};
global.api = api;
api.net = require('net');
var port = 2010;
var user = {name: 'Marcus Aurelius'}
var task = [1, 2, 3, 4, 5, 6];

var server = api.net.createServer(function(socket) {
  console.log('Connected: ' + socket.localAddress);
  socket.write(JSON.stringify(task));
  socket.on('data', function(data) {
    var result = JSON.parse(data);
    console.log('result ' + result);
  });
}).listen(port);

function publishTask(socket, task) {
  socket.write(JSON.stringify(task));
//socket.end('')
}

setInterval(() => server.unref(), 4000);
