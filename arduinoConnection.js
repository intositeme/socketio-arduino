var events 			= require("events");
var five = require("johnny-five");
var EventEmitter 	= require("events").EventEmitter;
var util         	= require("util");

var ArduinoConnection = function() {
    console.log('[ArduinoConnection]');
    var self = this;
	var board = new five.Board(); 
	var pinLeft, pinRight, sonar;
	var customEvent = new EventEmitter();
	var reading = 0;

	board.on("ready", function() {
		console.log( "[ArduinoConnection] - board ready" );
		sonar = new five.Proximity({
			controller: "HCSR04",
			pin: 7,
			freq: 500
		});
		sonar.on("change", function() {
			if (reading != Math.round(this.cm) ) {
				reading = Math.round(this.cm);
				// console.log("  cm  : ", reading);
				// console.log("-----------------");
				self.emit("data", reading);
			}
			
		});
		// pinLeft = new five.Button({
		// 	pin: 8,
		// 	isPullup: true
		// });
		// pinLeft.on("down", function(value) {
		//     self.emit("data", "left");
		// });
		// pinRight = new five.Button({
		// 	pin: 6,
		// 	isPullup: true
		// });
		// pinRight.on("down", function(value) {
		//     self.emit("data", 'right');
		// });
	});
};

util.inherits(ArduinoConnection, EventEmitter);
module.exports = ArduinoConnection;