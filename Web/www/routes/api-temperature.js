'use strict';
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
const dbsizeAsyn = promisify(client.dbsize).bind(client);


// function to scan the database given a regex
async function getTemperature(dateScan) {
	console.log(dateScan);
	// get the data base's size
	const SIZE = await dbsizeAsyn() - 1;
	// get all the keys that match "dateScan"
	const keys = await scanAsync('0', 'MATCH', dateScan, 'COUNT', SIZE.toString());
	// sort the keys !
	const sortedKeys = keys[1].sort();
	// get the values corresponding to the sorted keys
	const values = await mgetAsync(sortedKeys);
	let res = {};
	for (let i = 0; i < sortedKeys.length; i++) {
		// return only the hours for the object keys
		res[sortedKeys[i].slice(0, 19)] = values[i];
	}
	// send the data
	return res;
}

router.get('/:day-:month-:year-:hour-:minute-:second-:pin', (req, res) => {
	// the parameters from the url are stored
	const day = req.params.day;
	const month = req.params.month;
	const year = req.params.year;
	const hour = req.params.hour;
	const minute = req.params.minute;
	const second = req.params.second;
	const pin = req.params.pin;
	// create the regex
	const dateScan = `${year}-${month}-${day} ${hour}:${minute}:${second}-${pin}`;
	// ask the database for temperature
	getTemperature(dateScan)
		.then(temperatures => {
			// if temperatures match the regex, they are send to the client
			// console.log(res);
			res.send(temperatures);
		})
		.catch(err => {
			// otherwise, an error is send
			//res.end(err);
			console.log(err);
			// otherwise send an empty array
			return [];
		});
});

module.exports = router;