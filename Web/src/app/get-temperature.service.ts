import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class GetTemperatureService {

  temperatureURL: "130.120.230.169/query";

  constructor(private http: HttpClient) { }

  public getTemperature(dateScan): Observable<any> {
    return this.http.get<any>(this.temperatureURL)
      .pipe(
        tap(heroes => console.log(`fetched heroes`))
      );
  }

}
