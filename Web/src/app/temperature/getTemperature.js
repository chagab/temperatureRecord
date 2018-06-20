// import needed library
const redis = require('redis');
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
}

// example of getting all the temperature data from the pin A1

getKeys('*-A1').then((keys) => {
	getValuesByKeys(keys).then((val) => {
		console.log(val);
		client.quit();
	});
});
