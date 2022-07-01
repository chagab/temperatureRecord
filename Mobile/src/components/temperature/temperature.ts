import { Component, OnInit, /* Input , OnChanges */ } from '@angular/core';
//import { Temperature } from './temperature';
import * as Plotly from 'plotly.js';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.html',
  //  styleUrls: ['./temperature.css'],
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
  private _layout: any = {
    "autosize": true,
    "height": 250,
    "title": "<br>",
    "paper_bgcolor": '#eee',
    "plot_bgcolor": 'white',
    "yaxis": {
      "tickfont": {
        "color": "black"
      },
      "showticklabels": false,
      "title": "Temperature (°C)",
      "showgrid": true,
      "range": [
        21.90231437862394,
        24.088799818019254
      ],
      "titlefont": {
        "color": "black",
        "family": "Verdana, Arial, sans-serif",
        "size": 10
      },
      "showline": false,
      "gridcolor": "rgba(187, 187, 187, 0.9)",
      "type": "linear",
      "autorange": true
    },
    "showlegend": false,
    "titlefont": {
      "color": "black",
      "size": 20
    },
    "xaxis": {
      "tickfont": {
        "color": "black",
        "size": 1
      },
      "showticklabels": false,
      "title": "times (houres)",
      "range": [
        0,
        59
      ],
      "gridcolor": "rgba(187, 187, 187, 0.9)",
      "zeroline": false,
      "titlefont": {
        "color": "black",
        "family": "Verdana, Arial, sans-serif",
        "size": 10
      },
      "type": "category",
      "autorange": true
    },
    "hovermode": "x",
    "font": {
      "family": "\"Open Sans\", verdana, arial, sans-serif"
    },
    "margin": {
      "pad": 0,
      "r": 0,
      "b": 25,
      "l": 25,
      "t": 0
    },
    "legend": {
      "font": {
        "color": "rgb(187, 187, 187)"
      }
    }
  };

  constructor() { }

  public ngOnInit(): void {
    // get the div wihch id is "plot" to plot temperature record
    this._plot = document.getElementById('plot');
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
  }

  public onDateChanged(date: string): void {
    // change the "_date" attribute when user click in DateComponent
    this._date = date;
    // plot the new data
    this.plotTemperature();
  }
}
