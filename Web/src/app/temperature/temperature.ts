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
  // "_pins" contains all the pins number to get data from
  private _pins: number[] = [0, 1, 2, 3, 4, 5];
  // "_layout" contains the layout of the plot
  private _layout: any = {
    title: "Temperature (°C)",
    gridcolor: "#666",
    paper_bgcolor: "#eee",
    plot_bgcolor: "#eee",
    zeroline: true,
    font: {
      "family": "\"Open Sans\", verdana, arial, sans-serif"
    },
    titlefont: {
      color: "#666",
      size: 20
    },
    margin: {
      l: 70,
      r: 50,
      t: 100,
      b: 200,
    },

    xaxis: {
      autorange: true,
      title: "date",
      gridcolor: "#ddd",
      zeroline: true,
      titlefont: {
        color: "#666",
        family: "Verdana, Arial, sans-serif",
        size: 14
      },
      rangeselector: {
        buttons: [
          {
            label: "month",
            stepmode: 'backward'
          },
          {
            label: "week",
            stepmode: 'backward'
          },
          {
            step: 'all'
          }
        ]
      },
      rangeslider: { range: ['2015-02-17', '2017-02-16'] },
    },
    yaxis: {
      autorange: true,
      title: "Temperature (C)",
      type: 'linear',
      gridcolor: "#ddd",
      tickfont: {
        color: "#666"
      },
    },
  };

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
    this.temperatureService.getTemperature(this._date).subscribe(data => {
      this.processTemperature(data);
      Plotly.plot(this._plot, this._data, this._layout);
    });
  }
  

  public onDateChanged(date: string): void {
    // change the "_date" attribute when user click in DateComponent
    this._date = date;
    // plot the new data
    this.getTemperature();
  }

  public setPin(value: number): void {
    console.log(value);
  }

  public getPins(): number[] {
    return this._pins;
  }

}
 

