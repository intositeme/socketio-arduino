var events 			= require("events");
var five = require("johnny-five");
var EventEmitter 	= require("events").EventEmitter;
var util         	= require("util");

var ArduinoConnection = function() {
    console.log('[ArduinoConnection]');
    var self = this;
	var board = new five.Board(); 
	var pinLeft, pinRight;
	var customEvent = new EventEmitter();

	board.on("ready", function() {
		console.log( "[ArduinoConnection] - board ready" );
		pinLeft = new five.Button({
			pin: 8,
			isPullup: true
		});
		pinLeft.on("down", function(value) {
		    self.emit("data", "left");
		});
		pinRight = new five.Button({
			pin: 6,
			isPullup: true
		});
		pinRight.on("down", function(value) {
		    self.emit("data", 'right');
		});
	});
};

util.inherits(ArduinoConnection, EventEmitter);
module.exports = ArduinoConnection;