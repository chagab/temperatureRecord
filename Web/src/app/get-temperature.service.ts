import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class GetTemperatureService {

  client: any;

  constructor() { }

  public getTemperature(): any { }

}
