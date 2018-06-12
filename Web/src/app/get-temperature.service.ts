import { Injectable } from '@angular/core';
import * as redis from 'redis';


@Injectable()
export class GetTemperatureService {

  client: any;

  constructor() {
    this.connectToDataBase();
  }


  public connectToDataBase(): void {
    // setting up redis connection parameters
    const url = '127.0.0.1';
    const port = 6379;
    this.client = redis.createClient(port, url);

    this.client.on('connect', (err) => {
      if (err) {
        throw err;
      } else {
        console.log('connected to redis');
      }
    });

    this.client.on('ready', (err) => {
      if (err) {
        throw err;
      } else {
        console.log('redis is ready to use');
      }
    });

    this.client.on('end', (err) => {
      console.log('ready is disconnected');
    });
  }

  public getTemperature(): Number {
    return this.client.get("05/06/2018-15:32:11-A0");
  }
}
