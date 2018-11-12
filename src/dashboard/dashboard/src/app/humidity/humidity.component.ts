import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../services/api.service'
import { Sensorvalue } from '../models/sensorvalue';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {
  LineChart = [];
  humidity: Sensorvalue[] = [];
  humidityValue: number[] = [];
  humidityLabel: string[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getHumidity();


    this.LineChart = new Chart('lineChart2', {
      type: 'line',
      data: {
        labels: ["16u", "17u", "18u", "19u", "20u", "21u", "22u", "23u", "00u", "01u", "02u", "03u", "04u", "05u", "06u", "07u", "08u", "09u", "10u", "11u", "12u", "13u", "14u", "15u"],
        datasets: [{
          label: 'Bodemvochtigheid',
          data: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
          fill: false,
          lineTension: 0.2,
          borderColor: "#f92",
          borderWidth: 1.5
        }]
      },
      options: {
        title: {
          text: "Line Chart",
          display: false
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    })
  }

  getHumidity() {
    let type = "humidityAir";
    this.api.getSensor(type)
      .subscribe(res => {
        this.humidity = res.sensorvalues;
        this.humidity.forEach((p, i) => this.humidityValue[i] = p.value);
        if (this.humidityValue.length >= 24) {

        } else {
          this.humidity.forEach((p, i) => this.humidityLabel[i] = p.timestamp.toString().slice(11, 13) + 'u')
        }
        this.AddChart();
      });
  }

  AddChart() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.humidityLabel,
        datasets: [{
          label: 'Luchtvochtigheid (%)',
          data: this.humidityValue,
          fill: false,
          lineTension: 0.2,
          borderColor: "#f92",
          borderWidth: 1.5
        }]
      },
      options: {
        title: {
          text: "Line Chart",
          display: false
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    })
  }
}
