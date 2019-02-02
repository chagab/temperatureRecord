const SerialPort = require("serialport");
const Readline = require('parser-readline');
const redis = require("redis"), client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});
const multi = client.multi();

const port = new SerialPort("/dev/ttyACM0", {baudRate: 9600});
const parser = port.pipe(new Readline({delimiter: '\n'}));

port.on('open', function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message);
  } else {
    console.log("Communication serie Arduino 9600 bauds : Ok");
  }
});

parser.on('data', function (data) {
  console.log(data);
  //TODO: connexion to redis
  client.set(new Date(Date.now()), "string val", redis.print);
  const result = client.rpush('test',4);
  console.log(result);
});
