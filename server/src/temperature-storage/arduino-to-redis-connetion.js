//////////////////////////////////////////////////////////////////////////////
// This script is for creating a javascript object that will be passed to 	//
// cylon to launch the storing process. This is done by the "makeConnexion"	//
// function 																																//
//////////////////////////////////////////////////////////////////////////////

'use strict';
import redis from "redis";
import {smtpTransport, mailOptions} from "./mailing/mail-alert.js";

const checkObject = {
    A0: [],
    A1: [],
    A2: [],
    A3: [],
    A4: [],
    A5: [],
};

// function that initialize all the used pins
function initializePin() {
    // we create an empty object ...
    let res = {};
    // to which we add every pin object
    for (let i = 0; i < process.env.NUMBER_OF_SENSOR; i++) {
        res[`a${i}`] = {
            driver: "analogSensor",
            pin: i
        };
    }
    return res;
}

function getTemperatureFromSensor(sensor) {
    const analogValue = sensor.analogRead();
    const voltage = (analogValue * 5.0) / 1024;
    return (voltage - 0.5) * 100;
}

// function that store the temperature and check for unusual behavior
function storeTemperature(sensors, dataBase) {
    for (let pin = 0; pin < process.env.NUMBER_OF_SENSOR; pin++) {
        const sensor = sensors[`a${pin}`];
        const timestampedTemperature = {
            name: new Date().toISOString(),
            value: getTemperatureFromSensor(sensor)
        };
        console.log(timestampedTemperature);
        dataBase.LPUSH(pin, JSON.stringify(timestampedTemperature));

        checkObject[`A${pin}`].push(temperature);
    }
    checkTemperature(checkObject);
}

// function that uses the check object
function checkTemperature() {
    for (let pin in checkObject) {
        if (checkObject[pin].length >= process.env.TIME_INTERVAL) {
            const meanOfPin = mean(checkObject[pin]);
            if (meanOfPin > process.env.UPPER_BOUND || meanOfPin < process.env.LOWER_BOUND) {
                sendAlert();
            } else {
                checkObject[pin].shift()
            }
        }
    }
}

function sendAlert() {
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, (error, _response) => {
        if (!!error) {
            throw new Error(error)
        } else {
            console.log("Mail sent with success!");
        }
    });
    smtpTransport.close();
}

// function that return the mean of an array
function mean(array) {
    return array.reduce((p, c) => p + c, 0) / array.length;
}

export function makeConnexion(dataBase) {
    return {
        connections: {
            arduino: {
                adaptor: process.env.ADAPTOR,
                port: process.env.ARDUINO_PORT
            }
        },
        devices: initializePin(),
        work: (sensors) => {
            // every specified time interval we store the temperature
            // and check for anomalous behavior
            every((process.env.TIME_INTERVAL).second(), () => {
                storeTemperature(sensors, dataBase)
            });
        }
    };
}
