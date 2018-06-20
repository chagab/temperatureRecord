import { Component, OnInit, Input /*, OnChanges */ } from '@angular/core';
import { GetTemperatureService } from '../get-temperature.service';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.html',
  styleUrls: ['./temperature.css'],
  inputs: ['_date'],
})
export class TemperatureComponent implements OnInit /*, OnChanges */ {
  // "_date" contains the date selected by the DateComponent
  private _date: string;
  // "_data" contains the temperature record
  private _data: any;
  // "_plot" contains the DOM element to plot in
  private _plot: HTMLElement;
  // "_layout" contains the layout of the plot
  // TODO: store the layout in a JSON file !
  private _layout: any = {
    "title": "Temperature record",
    "paper_bgcolor": "#eee",
    "plot_bgcolor": "white",
    "yaxis": {
      "tickfont": {
        "color": "#777"
      },
      "title": "Temperature (°C)",
      "range": [
        21.90231437862394,
        24.088799818019254
      ],
      "titlefont": {
        "color": "#777",
        "family": "Verdana, Arial, sans-serif",
        "size": 14
      },
      "gridcolor": "rgba(187, 187, 187, 0.9)",
      "type": "linear",
      "autorange": true
    },
    "breakpoints": [
      {
        "frame": "workspace-breakpoint-0",
        "type": "width",
        "range": [
          0,
          320
        ]
      }
    ],
    "titlefont": {
      "color": "#777"
    },
    "xaxis": {
      "tickfont": {
        "color": "#777",
        "size": 9
      },
      "title": "time (hours)",
      "range": [
        0,
        59
      ],
      autorange: true,
      rangeselector: {
        buttons: [
          {
            count: 1,
            label: '1m',
            step: 'month',
            stepmode: 'backward'
          },
          {
            count: 6,
            label: '6m',
            step: 'month',
            stepmode: 'backward'
          },
          { step: 'all' }
        ]
      },
      rangeslider: { range: [1, 6] },
      "gridcolor": "rgba(187, 187, 187, 0.9)",
      "zeroline": true,
      "titlefont": {
        "color": "#777",
        "family": "Verdana, Arial, sans-serif",
        "size": 14
      },
      "type": "category"
    },
    "hovermode": "x",
    "margin": {
      "pad": 4,
      "r": 50,
      "b": 100,
      "l": 70,
      "t": 100
    },
    "legend": {
      "font": {
        "color": "#777"
      }
    }
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
      // TODO: find a way to keep all selected plot instead of a new plot !
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
     let t = {};
     for (let i = 0; i < 60; i++) {
       if (i < 10) {
         t[`23:44:0${i}`] = 23 + (Math.random() * 2) - 1;
       } else {
         t[`23:44:${i}`] = 23 + (Math.random() * 2) - 1;
       }
     }
     return t; 
   // return this.temperatureService.getTemperature();
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
