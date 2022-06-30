import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {EMPTY, Observable} from 'rxjs';

@Injectable()
export class GetTemperatureService {
  readonly API_URL = environment.apiUrl;

  regex: string;

  constructor(private http: HttpClient) { }

  public getDataFromPinAtDate(pin: number, date: string): Observable<any> {
    const params = new HttpParams();
    params.appendAll({year: date.slice(0, 4), month: date.slice(5, 7), day: date.slice(8, 11), pin});
    // return this.http.get(`${this.API_URL}`, {params});
    return EMPTY;
    }
}
