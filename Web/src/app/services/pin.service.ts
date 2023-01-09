import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {DataFormat} from '../types/types';

@Injectable()
export class PinService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getDataFromPinInRange$(pins: string[], startDate: Date, endDate: Date): Observable<DataFormat> {
    const params = new HttpParams().appendAll({pins, startDate: startDate.toISOString(), endDate: endDate.toISOString()});
    return this.http.get<DataFormat>(`${this.API_URL}/temperature`, {params});
  }

  getPins$(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/pins`);
  }
}
