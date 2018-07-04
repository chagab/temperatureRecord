export class Layout {
  _layout: any = {
    "frames": [{
      "layout": {
        "autosize": true,
        "title": "Temperature record",
        "paper_bgcolor": "rgb(17,23,33)",
        "plot_bgcolor": "rgb(18,25,36)",
        "yaxis": {
          "tickfont": {
            "color": "rgb(187, 187, 187)"
          },
          "title": "Temperature (°C)",
          "titlefont": {
            "color": "rgb(187, 187, 187)",
            "family": "Verdana, Arial, sans-serif",
            "size": 14
          },
          "type": "linear",
          "autorange": true
        },
        "titlefont": {
          "color": "rgb(187, 187, 187)",
          "size": 20
        },
        "xaxis": {
          "tickfont": {
            "color": "rgb(187, 187, 187)"
          },
          "title": "time (hours)",
          "gridcolor": "rgb(187, 187, 187)",
          "zeroline": true,
          "titlefont": {
            "color": "rgb(187, 187, 187)",
            "family": "Verdana, Arial, sans-serif",
            "size": 14
          },
          "type": "category",
          "autorange": true,
          "rangeselector": {
            "buttons": [
              {
                "count": 1,
                "label": '1m',
                "step": 'month',
                "stepmode": 'backward'
              },
              {
                "count": 6,
                "label": '6m',
                "step": 'month',
                "stepmode": 'backward'
              },
              { "step": 'all' }
            ]
          },
          "rangeslider": { "range": ['2015-02-17', '2017-02-16'] },
        },
        "hovermode": "x",
        "font": {
          "family": "\"Open Sans\", verdana, arial, sans-serif"
        },
        "margin": {
          "pad": 4,
          "r": 50,
          "b": 150,
          "l": 70,
          "t": 100
        },
        "legend": {
          "font": {
            "color": "rgb(187, 187, 187)"
          }
        }
      },
      "name": "workspace-breakpoint-0"
    }]

  };
}
