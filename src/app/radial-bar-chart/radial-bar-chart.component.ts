// radial-bar-chart.component.ts
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

// Initialize the "more" module for radial charts
HighchartsMore(Highcharts);

@Component({
  selector: 'app-radial-bar-chart',
  templateUrl: './radial-bar-chart.component.html',
})
export class RadialBarChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsForBar!: Highcharts.Options;
  chartOptions!: Highcharts.Options;

  ngOnInit(): void {
    const userData = [70, 70, 70];
    const aiData = [60, 60, 60];
    const categories = ['False Positive', 'True Match', 'Unable to Clear'];
    
    // Calculate matching percentages
    const percentages = userData.map((userVal, i) => {
      const aiVal = aiData[i];
      return Math.round((aiVal / userVal) * 10000) / 100; // Rounds to 2 decimal places
    });
    
    this.chartOptionsForBar = {
      chart: {
        type: 'column',
        spacing: [10, 10, 10, 10], // Overall chart padding,
        width: 500,
        height: 500
      },
      title: {
        text: 'Alert Classification Statistics'
      },
      xAxis: {
        categories: ['False Positive', 'True Match', 'Unable to Clear'],
        title: {
          text: 'Alert Type'
        },
        lineWidth: 0,
        tickLength: 0
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Alerts'
        },
        gridLineWidth: 1
      },
      plotOptions: {
        column: {
          pointPadding: 0, // Negative padding makes bars overlap slightly
          borderWidth: 0,
          groupPadding: 0.15, // Space between main categories
          pointWidth: 25, // Fixed bar width
          states: {
            hover: {
              brightness: -0.1 // Darken on hover
            }
          }
        }
      },
      series: [{
        name: 'User Generated',
        type: 'column',
        data: [70, 70, 70],
        color: '#4285F4',
        borderRadius: 0 // Sharp rectangular corners
      }, {
        name: 'Generative AI',
        type: 'column',
        data: [60, 60, 60],
        color: '#EA4335',
        borderRadius: 0
      }],
      tooltip: {
        headerFormat: '<b>{point.key}</b><br/>',
        pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b> alerts',
        shared: false
      },
      legend: {
        verticalAlign: 'top'
      }
    };

    this.chartOptions = {
      chart: {
        type: 'column',
        spacing: [10, 10, 10, 10],
        width: 500,
        height: 500,
        events: {
          render: function() {
            // Add percentage labels after chart renders
            const chart = this;
            categories.forEach((category, i) => {
              chart.renderer.text(
                `${percentages[i]}% match`,
                chart.plotLeft + (i + 0.5) * (chart.plotWidth / categories.length) - 25,
                chart.plotTop + chart.plotHeight + 20
              )
              .addClass('match-percentage')
              .add();
            });
          }
        }
      },
      title: {
        text: 'Alert Classification Statistics'
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Alert Type'
        },
        lineWidth: 0,
        tickLength: 0
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Alerts'
        },
        gridLineWidth: 1
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0.15,
          pointWidth: 25,
          states: {
            hover: {
              brightness: -0.1
            }
          }
        }
      },
      series: [{
        name: 'User Generated',
        type: 'column',
        data: userData,
        color: '#4285F4',
        borderRadius: 0
      }, {
        name: 'Generative AI',
        type: 'column',
        data: aiData,
        color: '#EA4335',
        borderRadius: 0
      }],
      tooltip: {
        headerFormat: '<b>{point.key}</b><br/>',
        pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b> alerts<br>' +
                     'Match: <b>{point.percentage:.1f}%</b>',
        shared: false,
        useHTML: true
      },
      legend: {
        verticalAlign: 'top'
      }
    } as Highcharts.Options;


  }
}

