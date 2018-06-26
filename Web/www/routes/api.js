const express = require('express');
const router = express.Router(); 
const redis = require('redis');
const {
	promisify
} = require('util');

//creates a new client for the database
const client = redis.createClient();

// promisify useful function !
const mgetAsync = promisify(client.mget).bind(client);
const scanAsync = promisify(client.scan).bind(client);
const getAsync = promisify(client.get).bind(client);

// function to scan the database given a regex
async function getTemperature(dateScan) {
	const keys = await scanAsync('0', 'MATCH', dateScan, 'COUNT', '1000');
	const values = await mgetAsync(keys[1]);
	return { date : keys[1], temperatures: values };
}

router.get('/:day-:month-:year-:hour-:minute-:second-:pin', (req, res) => {
	// the parameters from the url are stored
	console.log("in router.get");
	const day = req.params.day;
	const month = req.params.month;
	const year = req.params.year;
	const hour = req.params.hour;
	const minute = req.params.minute;
	const second = req.params.second;
	const pin = req.params.pin;
	// create the regex
	const dateScan = `${day}/${month}/${year}-${hour}:${minute}:${second}-${pin}`;
	// ask the database for temperature
	getTemperature(dateScan).then( temperatures => {
		// if temperatures match the regex, they are send to the client
		res.send(temperatures);
	}).catch(err => {
		// otherwise, an error is send
		res.end(err);
	}) ;
});

module.exports = router;
