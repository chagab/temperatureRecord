import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GetTemperatureService {
  readonly API_URL = environment.apiUrl;

  regex: string;

  constructor(private http: HttpClient) { }

  public getDataFromPinAtDate(pin: number, date: string) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 11);
    return this.http.get(`${this.API_URL}${day}-${month}-${year}-*-*-*-A${pin}`);
    }
}
