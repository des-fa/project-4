import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment'

function WeatherChart({ weatherInfo }) {
  // console.log('chart weather', weatherInfo?.daily)

  const months = weatherInfo?.daily?.time?.map((time) => (
    moment(time).format('MMM Do YY')
  ))
  // const uniqueMonths = months?.reduce((acc, char) => (acc.includes(char) ? acc : [...acc, char]), [])
  // [...new Set(months)]
  // console.log('months', uniqueMonths)

  const options = {
    title: {
      text: 'A Year of Weather Data',
      align: 'left'
    },
    subtitle: {
      text: 'Source: Open-Meteo.com',
      align: 'left'
    },
    xAxis: [{
      categories: months,
      crosshair: true,
      minTickInterval: 30,
      tickLength: 20
      // max: uniqueMonths ? (uniqueMonths.length - 1) : (null)
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}°C',
        // reserveSpace: false,
        // padding: '2px',
        style: {
          color: Highcharts.getOptions().colors[4],
          fontSize: '8px'
        }
      },
      title: {
        text: undefined,
        style: {
          color: Highcharts.getOptions().colors[4],
          fontSize: '10px'
        }
      },
      opposite: true
    },
    { // Secondary yAxis
      gridLineWidth: 0,
      title: {
        text: 'Rainfall',
        style: {
          color: Highcharts.getOptions().colors[9],
          fontSize: '10px'
        }
      },
      labels: {
        format: '{value} mm',
        style: {
          color: Highcharts.getOptions().colors[9],
          fontSize: '8px'
        }
      }
    },
    { // Tertiary yAxis
      gridLineWidth: 0,
      title: {
        text: 'Snowfall',
        style: {
          color: Highcharts.getOptions().colors[7],
          fontSize: '10px'
        }
      },
      labels: {
        format: '{value} cm',
        style: {
          color: Highcharts.getOptions().colors[7],
          fontSize: '8px'
        }
      }

    }],
    tooltip: {
      shared: true
    },
    // legend: {
    //   layout: 'vertical',
    //   align: 'left',
    //   x: 80,
    //   verticalAlign: 'top',
    //   y: 55,
    //   floating: true,
    //   backgroundColor:
    //         Highcharts.defaultOptions.legend.backgroundColor // theme
    //         // || 'rgba(255,255,255,0.25)'
    // },
    series: [{
      name: 'Rainfall',
      type: 'spline',
      yAxis: 1,
      data: weatherInfo?.daily?.rain_sum,
      color: Highcharts.getOptions().colors[9],
      width: 1,
      tooltip: {
        valueSuffix: ' mm'
      }

    }, {
      name: 'Snowfall',
      type: 'spline',
      yAxis: 2,
      data: weatherInfo?.daily?.snowfall_sum,
      color: Highcharts.getOptions().colors[7],
      tooltip: {
        valueSuffix: ' cm'
      }

    }, {
      name: 'Min Temperature',
      type: 'spline',
      data: weatherInfo?.daily?.temperature_2m_min,
      color: Highcharts.getOptions().colors[5],
      tooltip: {
        valueSuffix: ' °C'
      }
    }, {
      name: 'Max Temperature',
      type: 'spline',
      data: weatherInfo?.daily?.temperature_2m_max,
      color: Highcharts.getOptions().colors[4],
      tooltip: {
        valueSuffix: ' °C'
      }
    }],
    responsive: {
      rules: [{
        condition: {
          // minWidth: 400,
          minHeight: 700
        },
        chartOptions: {
          // legend: {
          //   floating: false,
          //   layout: 'horizontal',
          //   align: 'center',
          //   verticalAlign: 'bottom',
          //   x: 0,
          //   y: 0
          // },
          yAxis: [{
            labels: {
              align: 'right',
              x: 0,
              y: -6
            },
            showLastLabel: false
          }, {
            labels: {
              align: 'left',
              x: 0,
              y: -6
            },
            showLastLabel: false
          }, {
            visible: false
          }]
        }
      }]
    }
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>

  )
}

export default WeatherChart
