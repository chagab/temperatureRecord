import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  combineLatest, filter, Observable, switchMap,
} from 'rxjs';
import { PinService } from '../services/pin.service';
import { DataFormat } from '../types/types';
import { FakePinService } from '../services/fake-pin.service';

@Component({
  selector: 'app-temperature-component',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
  providers: [{ provide: PinService, useClass: FakePinService }],
})
export class TemperatureComponent implements OnInit {
  range = this.fb.group({start: [null], end: [null]});
  pins$: Observable<string[]> = this.pinService.getPins$();
  pinsController = new FormControl([]);
  multi: DataFormat;
  view: [number, number] = [700, 300];
  legend = true;
  xAxis = true;
  yAxis = true;
  timeline = true;

  constructor(private pinService: PinService, private readonly fb: FormBuilder) {}

  public ngOnInit(): void {
    this.listenControllersChanges();
  }

  private listenControllersChanges(): void {
    combineLatest([this.range.valueChanges, this.pinsController.valueChanges]).pipe(
      filter(([range, pins]) => !!pins.length && !!range?.start && !!range?.end),
      switchMap(([range, pins]) => this.pinService.getDataFromPinInRange$(pins, range.start, range.end))
    ).subscribe(value => this.multi = value);

    this.pinsController.valueChanges.pipe(
      filter(pins => !pins.length)
    ).subscribe(() => this.multi = null);
  }
}
