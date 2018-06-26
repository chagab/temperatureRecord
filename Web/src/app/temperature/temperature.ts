import { Component, OnInit, Input /*, OnChanges */ } from '@angular/core';
import { GetTemperatureService } from '../get-temperature.service';
import * as Plotly from 'plotly.js';
import { Layout } from './layout';

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
  // "_layout" contains the layout of the plot
  private _layout: any = new Layout()._layout;

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

  private plotTemperature(): void {
    this.processTemperature();
    Plotly.plot(this._plot, this._data, this._layout);
  }

  private processTemperature(): void {
    // fetched the data for the current "_date " attribute
    const data = this.getTemperature();
    // extract time from the data
    const time = Object.keys(data)/*.map(x => +x.slice(6, 9))*/;
    // extract temperature variation from the data
    const temperature = Object.values(data);
    // update the "_data" attribute
    this._data = [{
      x: time,
      y: temperature,
      name: `${this._date}`
    }];
  }

  private getTemperature(): any {
    // TODO: change this function to get data and not generate them !
    // let t = {};
    // for (let i = 0; i < 60; i++) {
    //   if (i < 10) {
    //     t[`23:44:0${i}`] = 23 + (Math.random() * 2) - 1;
    //   } else {
    //     t[`23:44:${i}`] = 23 + (Math.random() * 2) - 1;
    //   }
    // }
    // return t;
    const data = this.temperatureService.getTemperature(this._date);
    return data;
  }

  // TODO: check these two functions if they indeed compute a sliding average
  // taken from https://stackoverflow.com/questions/12636613/how-to-calculate-moving-average-without-keeping-the-count-and-data-total
  private calcNormalAvg(list) {
    // sum(list) / len(list)
    return list.reduce((a, b) => a + b) / list.length;
  }

  private calcRunningAvg(previousAverage, currentNumber, index) {
    // [ avg' * (n-1) + x ] / n
    return (previousAverage * (index - 1) + currentNumber) / index;
  }

  public onDateChanged(date: string): void {
    // change the "_date" attribute when user click in DateComponent
    this._date = date;
    // plot the new data
    this.plotTemperature();
  }
}
