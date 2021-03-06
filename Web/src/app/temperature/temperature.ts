import { Component, OnInit, Input /*, OnChanges */ } from '@angular/core';
import { GetTemperatureService } from '../get-temperature.service';
import * as Plotly from 'plotly.js';
import { layout } from './layout';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.html',
  styleUrls: ['./temperature.css'],
  inputs: ['_date'],
  providers: [GetTemperatureService],
})


export class TemperatureComponent implements OnInit /*, OnChanges */ {
  // "_date" contains the date selected by the DateComponent
  private _date: string;
  // "_data" contains the temperature record
  private _data: any;
  // "_plot" contains the DOM element to plot in
  private _plot: HTMLElement;
  // "_pins" contains all the pins number to get data from
  private _pins: number[] = [0, 1, 2, 3, 4, 5];
  // "_activePin" contains all the pins that the user want to display
  // TODO: change this attribute to be an array
  private _activePin: number = 0;
  // "_layout" contains the layout of the plot
  private _layout: any = layout;

  constructor(private temperatureService: GetTemperatureService) { }

  public ngOnInit(): void {
    // get the div wihch id is "plot" to plot temperature record
    this._plot = document.getElementById('plot');
    // get the current date
    this._date = new Date().toISOString().slice(0, 10);
    // rescale the plot when the window size changes
    window.onresize = () => {
      // the width of the plot should be the body width, so the total window width
      this._layout.width = document.getElementsByTagName('body')[0].clientWidth;
      Plotly.newPlot(this._plot, this._data, this._layout);
    };

  }

  //private plotTemperature(): void {
  //this.processTemperature();
  //Plotly.plot(this._plot, this._data, this._layout);
  //}

  private processTemperature(data): void {
    // fetched the data for the current "_date " attribute
    //const data = this.getTemperature();
    // extract time from the data
    const time = Object.keys(data);
    // extract temperature variation from the data
    const temperature = Object.values(data);
    // update the "_data" attribute
    this._data = [{
      x: time,
      y: temperature,
      name: `${this._date} A${this._activePin}`
    }];
  }

  private getTemperature(): any {
    this.temperatureService.getTemperature(this._date, this._activePin ).subscribe(data => {
      this.processTemperature(data);
      Plotly.newPlot(this._plot, this._data, this._layout);
    });
  }
  

  private uniq(array: number[]): number[] {
    let seen: Object = {};
    let out: number[] = [];
    const len: number = array.length;
    let j: number = 0;

    for (let i: number = 0; i < len; i++) {
      const item: number = array[i];
      if (seen[item] !== 1) {
        seen[item] = 1;
        out[j++] = item;
      }
    }
    return out;
  }

  public onDateChanged(date: string): void {
    // update the "_date" attribute when user click in DateComponent
    this._date = date;
    // plot the new data
    this.getTemperature();
  }


  public setPin(value: number): void {
    // update the "_activePin" attribute when user click on pinComponent
    // TODO: implement array of pin
    //this._activePin.push(value);
    //this._activePin = this.uniq(this._activePin);
    this._activePin = value;
    console.log(this._activePin);
    // plot the new data
    this.getTemperature();
  }

  public getPins(): number[] {
    return this._pins;
  }

}
 

