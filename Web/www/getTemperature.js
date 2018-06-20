const redis = require('redis');
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
}

/////////////
// exports //
/////////////

module.export.client = cilent;
module.export.mgetAsync = mgetAsync;
module.export.scanAsync = scanAsync;
module.export.getAsync = getAsync;
module.export.getTemperature = getTemperature;