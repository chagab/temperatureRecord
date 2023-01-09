import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {faker} from '@faker-js/faker';
import {DataFormat} from '../types/types';
import {PinService} from './pin.service';


@Injectable()
export class FakePinService extends PinService {

  private static generateFakeSeries(startDate: Date, endDate: Date) {
    const series = [];
    for (let i = 0; i <= 100; i++) {
      series.push({name: faker.date.between(startDate, endDate), value: faker.finance.amount()});
    }
    return series;
  }

  getDataFromPinInRange$(pins: string[], startDate: Date, endDate: Date): Observable<DataFormat> {
    const data: DataFormat = pins.map(pin =>
      ({name: pin, series: FakePinService.generateFakeSeries(startDate, endDate)})
    );
    return of(data);
  }

  getPins$(): Observable<string[]> {
    return of(['1', '2', '3', '4', '5']);
  }

}
