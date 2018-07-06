//  for the server
module.exports.server_parameters = {
	SERVER_PORT: '8000'
}

// for the dataBase
module.exports.dataBase_parameters = {
	DATABASE_PORT: 6379,
	LOCAL_URL: '127.0.0.1'
}

// for the arduino
module.exports.arduino_parameters = {
	ARDUINO_PORT: '/dev/ttyACM0',
	ADAPTOR: 'firmata',
	NUMBER_OF_SENSOR: 6,
	UPPER_BOUND: 22,
	LOWER_BOUND: 18,
	TIME_INTERVAL: 1
}
// for the e-mail manager
module.exports.mail_parameters = {
	SERVICE: 'Gmail',
	USER: 'temperaturerecordtoulouse@gmail.com',
	PASS: 'coldatoms',
	MAIL_LIST: [
		'gabriel.chatelain@googlemail.com',
//		'arnal@irsamc.ups-tlse.fr',
//		'brunaud@irsamc.ups-tlse.fr'
	],
}
