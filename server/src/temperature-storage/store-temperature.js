//////////////////////////////////////////////////////////////////////////////
// This script is inserting temepratures into the database 									//
//////////////////////////////////////////////////////////////////////////////

'use strict';
const redis = require('redis');
const cylon = require('cylon');
const connection = require('./arduino-to-redis-connetion.js');

const {
	DATABASE_PORT,
	URL
} = require('./parameters.js').dataBase_parameters;

// create client for the database
const client = redis.createClient(DATABASE_PORT, URL, {
	no_ready_check: true
});

// on connect, create a connection between the arduino and the database
client.on('connect', (err) => {
	if (err) {
		throw err;
	} else {
		console.log('Connected to Redis');
		cylon.robot(connection.makeConnexion(client)).start();
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
