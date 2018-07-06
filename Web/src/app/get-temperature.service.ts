import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
// in order to use http, we have to import HttpModule in app.module.ts
// see this post for more details : https://stackoverflow.com/questions/33721276/angular-exception-no-provider-for-http



@Injectable()

export class GetTemperatureService {

  url: string = "http://130.120.230.169";
  port: number = 8000;
  route: string = "/api/";
  regex: string;

  constructor(private http: HttpClient) { }

  public getTemperature(date: string, pin: number) {
    // extract parameters from the date string
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 11);
    // create the regex
    const dateScan = `${this.url}:${this.port}${this.route}${day}-${month}-${year}-*-*-*-A${pin}`;
    return this.http.get(dateScan)
      .map((res: Response) => res.json());
  }
}
