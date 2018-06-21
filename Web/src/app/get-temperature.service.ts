import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// in order to use http, we have to import HttpModule in app.module.ts
// see this post for more details : https://stackoverflow.com/questions/33721276/angular-exception-no-provider-for-http

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class GetTemperatureService {

  url: string = "130.120.230.169";
  port: number = 8000;
  route: string = "/api/";
  regex: string;

  constructor(private http: Http) { }

  public getTemperature(date: string): Observable<number[]> {
    // extract parameters from the date string
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 11);
    // create the regex
    const dateScan = `${this.url}:${this.port}${this.route}${day}-${month}-${year}-*-*-*-A2`;
    // ...using get request
    return this.http.get(dateScan)
      // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      //...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
