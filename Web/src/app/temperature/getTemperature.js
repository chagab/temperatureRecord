const redis = require('redis');
<<<<<<< HEAD:Web/www/getTemperature.js
const {
	promisify
} = require('util');
//creates a new client
const client = redis.createClient();
// promisify useful function !
const mgetAsync = promisify(client.mget).bind(client);
const scanAsync = promisify(client.scan).bind(client);
const getAsync = promisify(client.get).bind(client);

async function getTemperature(dateScan) {
	const keys = await scanAsync('0', 'MATCH', dateScan, 'COUNT', '1000');
	const values = await mgetAsync(keys[1]);
	return values;
=======
const { promisify } = require('util');

// setting up redis connection parameters
const url = '127.0.0.1';
const port = 6379;

// create client 
const client = redis.createClient(port, url); 

// promisify useful function ! 
const getAsync = promisify(client.get).bind(client);
const mgetAsync = promisify(client.mget).bind(client); 
const keysAsync = promisify(client.keys).bind(client); 


client.on('connect', (err) => {
	if(err){
		throw err;
	} else {
		console.log('connected to redis'); 
	}
}); 

client.on('ready', (err) => {
	if(err) {
		throw err; 
	} else {
		console.log('redis is ready to use'); 
	}
}); 

client.on('end', (err) => {
	console.log('ready is disconnected'); 
});


// all functions that get values from the database
// are async functions

async function getValueByKey(key) {
	const res = await getAsync(key);
	return res; 
}

async function getKeys(keys) {
	const res = await keysAsync(keys);
	return res;
}

async function getValuesByKeys(keys) {
	const res = await mgetAsync(keys);
	return res; 
>>>>>>> 91fa5b74702b43da6128101bc8f5f742b9858395:Web/src/app/temperature/getTemperature.js
}

/////////////
// exports //
/////////////

<<<<<<< HEAD:Web/www/getTemperature.js
module.export.client = cilent;
module.export.mgetAsync = mgetAsync;
module.export.scanAsync = scanAsync;
module.export.getAsync = getAsync;
module.export.getTemperature = getTemperature;
=======
getKeys('*-A1').then((keys) => {
	getValuesByKeys(keys).then((val) => {
		console.log(val);
		client.quit();
	});
});
>>>>>>> 91fa5b74702b43da6128101bc8f5f742b9858395:Web/src/app/temperature/getTemperature.js
