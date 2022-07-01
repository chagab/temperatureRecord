import {Component, OnInit} from '@angular/core';
import {GetTemperatureService} from '../services/get-temperature.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {GetFakeTemperatureService} from '../services/get-fake-temperature.service';
import {DataFormat} from '../types';
import {combineLatest, filter, switchMap} from 'rxjs';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css'],
  providers: [GetTemperatureService],
})
export class TemperatureComponent implements OnInit {
  range = this.fb.group({start: [null], end: [null]});
  pins: number[] = [0, 1, 2, 3, 4, 5];
  pinsController = new FormControl([]);


  multi: DataFormat;
  view: [number, number] = [700, 300];
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'température';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private temperatureService: GetFakeTemperatureService, private readonly fb: FormBuilder) {
  }

  public ngOnInit(): void {
    combineLatest([this.range.valueChanges, this.pinsController.valueChanges]).pipe(
      filter(([range, pins]) => !!pins.length && !!range?.start && !!range?.end),
      switchMap(([range, pins]) => this.temperatureService.getDataFromPinInRange(pins, range.start, range.end))
    ).subscribe(value => this.multi = value);
  }
}


