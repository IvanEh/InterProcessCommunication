var api = {};
global.api = api;
api.net = require('net');
var port = 2016;
var user = {name: 'Marcus Aurelius'}
var task = [1, 2, 3, 4, 5, 6];
var availableClients = 3;
var nextSubtask = 0;
var subtasks = initSubtasks(task, availableClients);
var results = [];


var server = api.net.createServer(function(socket) {
  console.dir(socket.address());
  socket.on('data', function(data) {
    var msg = JSON.parse(data);

    console.dir(msg);
    if(msg == 'free' && nextSubtask < subtasks.length) {
      sendSubtask(socket, subtasks[nextSubtask]);
      ++nextSubtask;
    }else {
      results[msg.id] = msg;
    }

    if(results.length == subtasks.length) {
      var result = joinResults(results);
      console.log(result);
    }

  });
}).listen(port);

function publishTask(socket, task) {
  socket.write(JSON.stringify(task));
//socket.end('')
}
function sendSubtask(socket, subtask) {
  var json = JSON.stringify(subtask);
  socket.write(json);
}

function joinResults() {
  var result = [];
  results.forEach((res) => {
    res.values.forEach((x) => {
      result.push(x);
    })
  });
  return result;
}

function Subtask(id, input) {
  this.completed = false;
  this.input = input;
  this.id = id;
}

function initSubtasks(task, parts) {
  var subtasks = [];
  var partSize = task.length / parts;
  for(var i = 1; i <= parts-1; i++) {
    subtasks.push(new Subtask(i-1, task.slice((i-1)*partSize, (i-1)*partSize + partSize)))
  }
  subtasks.push(new Subtask(parts-1, task.slice((parts - 1)*partSize)));
  return subtasks;
}

setInterval(() => server.unref(), 4000);
