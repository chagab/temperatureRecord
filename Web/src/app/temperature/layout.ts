export const layout = {
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
    autorange: false,
    type : 'date', 
    title: "date",
    gridcolor: "#ddd",
    zeroline: true,
    titlefont: {
      color: "#666",
      family: "Verdana, Arial, sans-serif",
      size: 14
    },
    rangeselector: {
    	visible: true, 
	xanchor : 'center',
	yanchor : 'top',
    	buttons: 
    	[
      		{	
	          count: 20,
		  step: 'hour',
        	  label: "1 hour",
		  stepmode: 'backward'
	        },
		{
	          count: 1,
		  step : 'minute',
        	  label: "1 minute",
	          stepmode: 'backward'
       		 },
		 {
		  label : 'all',
        	  step: 'all'
	         }
      	]},
     rangeslider: { 
	 //range: ['2015-02-17', '2017-02-16'] 
	 autorange : true,
	 thickness : 0.2
	},
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
