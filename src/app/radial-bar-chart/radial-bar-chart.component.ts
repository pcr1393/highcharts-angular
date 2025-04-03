// radial-bar-chart.component.ts
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';

// Initialize the "more" module for radial charts
HighchartsMore(Highcharts);
SolidGauge(Highcharts);

@Component({
  selector: 'app-radial-bar-chart',
  templateUrl: './radial-bar-chart.component.html',
})
export class RadialBarChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsForBar!: Highcharts.Options;
  chartOptionsForBar2!: Highcharts.Options;

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
        height: 300
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

    this.chartOptionsForBar2 = {
      chart: {
        type: 'column',
        backgroundColor: 'transparent', // No background,
        width: 500,
        height: 300
      },
      title: {
        text: 'User Generated vs Generative AI Alerts',
        align: 'center',
        style: {
          color: '#333',
          fontSize: '18px',
          fontWeight: 'bold'
        }
      },
      xAxis: {
        categories: ['False Positive', 'True Match', 'Unable to Clear'],
        labels: {
          style: {
            color: '#555',
            fontSize: '14px'
          }
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Percentage',
          style: {
            color: '#333',
            fontSize: '14px'
          }
        },
        gridLineColor: '#ddd'
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#333'
            }
          },
          borderRadius: 10 // Smooth rounded bars
        }
      },
      series: [
        {
          name: 'User Generated (UG)',
          type: 'column',
          data: [
            { y: 70, color: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, '#4A90E2'], [1, '#1B4F93']] } },
            { y: 5, color: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, '#4A90E2'], [1, '#1B4F93']] } },
            { y: 25, color: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, '#4A90E2'], [1, '#1B4F93']] } }
          ]
        },
        {
          name: 'Generative AI (GA)',
          type: 'column',
          data: [
            { y: 68, color: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, '#FF9800'], [1, '#D84315']] } },
            { y: 5, color: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, '#FF9800'], [1, '#D84315']] } },
            { y: 27, color: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, '#FF9800'], [1, '#D84315']] } }
          ]
        }
      ]
    };


  }
}

