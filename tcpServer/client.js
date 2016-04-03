var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();
var user;
var port = 2016;

socket.connect({
  port: port,
  host: '127.0.0.1',
}, function() {
  socket.write('"free"');

  socket.on('data', function(data) {
    setTimeout(() => {
      var task = JSON.parse(data);
      if(typeof data !== 'object') {
        return;
      }
      var output = task.input.map((x) => 2*x);
      var result = new Result(task.id, output);
      socket.write(JSON.stringify(result));
      socket.write('"free"');
    }, 4000);
  });
});

function Result(id, result) {
  this.id = id;
  this.values = result;
}
