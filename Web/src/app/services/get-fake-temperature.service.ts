import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { faker } from '@faker-js/faker';
import { DataFormat } from '../types';


@Injectable()
export class GetFakeTemperatureService {
  getDataFromPinInRange(pins: string[] , startDate: Date, endDate: Date): Observable<DataFormat> {
    const data: DataFormat = pins.map( pin => {
      const series = [];
      for (let i = 0; i <= 100; i++) {
        series.push({name: faker.date.between(startDate, endDate), value: faker.finance.amount()});
      }
      return {name: pin, series};
    });
    return of(data);
  }
}
