//////////////////////////////////////////////////////////////////////////////
// This script is serving the app. It uses the api-temepratures to send the //
// temperature to the client																								//
//////////////////////////////////////////////////////////////////////////////

'use strict';
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// Get the API routes
const api = require('./routes/api-temperature');
const {
	SERVER_PORT
} = require('./parameters.js').server_parameters;
// create app support
const app = express();
// Get port from environment and store in Express.
const port = process.env.PORT || SERVER_PORT;
// Create HTTP server.
const server = http.createServer(app);


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist/')));

// Set the api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.set('port', port);

// Listen on provided port, on all network interfaces.
server.listen(port, () => {
	console.log(`API running on http://130.120.230.169:${port}`)
});