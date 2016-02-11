var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ArduinoConnection = require('./arduinoConnection');
var aC = new ArduinoConnection();

var connectedUsers = 0;
var clients = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', function(socket){
	connectedUsers++;
	clients.push(socket.id);
	console.log('user connected', clients);

	socket.on('disconnect', function(){
		removeClient(socket.id);
		console.log('user disconnected',clients);
		io.emit('event', "-- someone disconnected" );
	});

	socket.on('event', function(msg){
		io.emit('event', msg );
	});

	aC.on ('data', function (msg) {
		io.emit('event',  msg );
	});
});

http.listen(13000, function(){
  console.log('listening on *:13000');
});

function removeClient (id) {
	var tIndex = clients.indexOf(id);
	clients.splice(tIndex, 1);
}