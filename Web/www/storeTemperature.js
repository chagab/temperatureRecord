require("./fifo.js");
const redis = require('redis');
const Cylon = require("cylon");
const port = 6379;
const url = '127.0.0.1';
const numberOfSensor = 6;
const check = new FIFO(6, 10); 

// TODO: implement a secure connection
// const tls = require('tls');
// const fs = require('fs');

// create client for the database
const client = redis.createClient(port, url, {
	no_ready_check: true
});

// for the current date. Note that d is a date object
function today(d) {
	return ((d.getDate() < 10) ? "0" : "") + d.getDate() + "/" + (((d.getMonth() + 1) < 10) ? "0" : "") + (d.getMonth() + 1) + "/" + d.getFullYear();
}

// for the current time. Note d is a date object
function timeNow(d) {
	return ((d.getUTCHours() < 10) ? "0" : "") + d.getUTCHours() + ":" + ((d.getUTCMinutes() < 10) ? "0" : "") + d.getUTCMinutes() + ":" + ((d.getUTCSeconds() < 10) ? "0" : "") + d.getUTCSeconds();
}


// client.auth(null, function(err) {
//      if (err) throw err;
// });


// const ssl = {
//   key: fs.readFileSync('path_to_keyfile',encoding='ascii'),
//   cert: fs.readFileSync('path_to_certfile',encoding='ascii'),
//   ca: [ fs.readFileSync('path_to_ca_certfile',encoding='ascii') ]
// };

client.on('connect', (err) => {
	if (err) {
		throw err;
	} else {
		console.log('Connected to Redis');
		Cylon.robot({
			connections: {
				arduino: {
					adaptor: "firmata",
					port: "/dev/ttyACM0"
				}
			},
			// For this work we are using TMP36 sensor
			// initialize all the used pins
			devices: (() => {
				// we create an empty object ...
				let res = {};
				// to which we add every pin object
				for (let i = 0; i < numberOfSensor; i++) {
					res[`a${i}`] = {
						driver: "analogSensor",
						pin: i
					}
				}
				return res;
			})(),
			// then we declare the work to be done
			work: (my) => {
				// every seconde ...
				every((1).second(), function() {
					// we create an empty array that will contain the temperature data
					let temperatures = [];
					// for each pin ...
					for (let pin = 0; pin < numberOfSensor; pin++) {
						// we get the analog value that is read
						const analogValue = my[`a${pin}`].analogRead();
						// convert it to a voltage
						const voltage = (analogValue * 5.0) / 1024;
						// convert this voltage to a temperature and store in the array
						const temperature = (voltage - 0.5) * 100;
						// the computed temperature is pushed to the temperatures array
						temperatures.push(temperature);
						// we insert the value into the database
						const d = new Date();
						const key = `${today(d)}-${timeNow(d)}-A${pin}`;
						client.set(key, temperature, redis.print);
						// add values to the fifo
						check.push(pin, temperature); 
					}
					check.update(); 
					console.log(check);  

				});
			}
		}).start();
	}
});

client.on('disconnect', (err) => {
	if (err) {
		throw err;
	} else {
		console.log('Disconnect from Redis');
	}
});

