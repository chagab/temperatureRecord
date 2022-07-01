//////////////////////////////////////////////////////////////////////////////
// This script is for displaying the temperatures from the sensors directly //
// It is aimed for debugging purpose 																				//
// NOTE : the script store-temperature.js needs to be shut down for this 		//
// script to work => simply run : "sudo service store-temperature stop" to	//
// disable it 																															//
//////////////////////////////////////////////////////////////////////////////

'use strict';
const redis = require('redis');
const cylon = require('cylon');
// create client for the database
const client = redis.createClient(DATABASE_PORT, URL, {
	no_ready_check: true
});

const {
	DATABASE_PORT,
	URL
} = require('../src/parameters.js').dataBase_parameters;

const {
	ARDUINO_PORT,
	ADAPTOR,
	NUMBER_OF_SENSOR,
	UPPER_BOUND,
	LOWER_BOUND,
	TIME_INTERVAL
} = require('../src/parameters.js').arduino_parameters;

// function that initialize all the used pins
function initializePin() {
	// we create an empty object ...
	let res = {};
	// to which we add every pin object
	for (let i = 0; i < NUMBER_OF_SENSOR; i++) {
		res[`a${i}`] = {
			driver: "analogSensor",
			pin: i
		};
	}
	return res;
}

// function that display the temperature
function displayTemperature(sensors) {
	console.log('Checking temperature');
	for (let pin = 0; pin < NUMBER_OF_SENSOR; pin++) {
		// we get the analog value that is read
		const analogValue = sensors[`a${pin}`].analogRead();
		// convert it to a voltage
		const voltage = (analogValue * 5.0) / 1024;
		// convert this voltage to a temperature and store in the array
		const temperature = (voltage - 0.5) * 100;
		// we insert the value into the database
		const d = new Date();
		const key = `${today(d)}-${timeNow(d)}-A${pin}`;
		console.log(key, temperature);
	}
}

function checkTemperature() {
	return {
		connections: {
			arduino: {
				adaptor: ADAPTOR,
				port: ARDUINO_PORT
			}
		},
		devices: initializePin(),
		work: (sensors) => {
			// every specified time interval we store the temperature
			// and check for anomalous behavior
			every((1).second(), () => {
				displayTemperature(sensors);
			});
		}
	};
}

// on connect, create a connection between the arduino and the database
client.on('connect', (err) => {
	if (err) {
		throw err;
	} else {
		console.log('Connected to Redis');
		cylon.robot(checkTemperature()).start();
	}
});

// if errors on disconnect, throw them
client.on('disconnect', (err) => {
	if (err) {
		throw err;
	} else {
		console.log('Disconnect from Redis');
	}
});
