import { TestBed, inject } from '@angular/core/testing';

import { GetTemperatureService } from './get-temperature.service';

describe('GetTemperatureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetTemperatureService]
    });
  });

  it('should be created', inject([GetTemperatureService], (service: GetTemperatureService) => {
    expect(service).toBeTruthy();
  }));
});
