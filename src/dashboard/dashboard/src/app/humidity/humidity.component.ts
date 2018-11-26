import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../services/api.service';
import { Sensorvalue } from '../models/sensorvalue';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {
  LineChart = [];
  humidityAir: Sensorvalue[] = [];
  humidityAirValue: number[] = [];
  humidityAirLabel: string[] = [];
  humidityGround: Sensorvalue[] = [];
  humidityGroundValue: number[] = [];
  humidityGroundLabel: string[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getHumidity();
  }

  getHumidity() {
    let type = "humidityAir";
    this.api.getSensor(type)
      .subscribe(res => {
        this.humidityAir = res.sensorvalues;
        if (this.humidityAirValue.length >= 24) {
          this.humidityAir.forEach((p, i) => this.humidityAirValue[i] = p.value);
          this.humidityAir.slice(this.humidityAir.length - 24, this.humidityAir.length).forEach((p, i) => this.humidityAirValue[i] = p.value);
          this.humidityAir.slice(this.humidityAir.length - 24, this.humidityAir.length).forEach((p, i) => this.humidityAirLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        } else {
          this.humidityAir.forEach((p, i) => this.humidityAirValue[i] = p.value);
          this.humidityAir.forEach((p, i) => this.humidityAirLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        }
        this.AddChartAir();
      });

    let type2 = "humidityGround";
    this.api.getSensor(type)
      .subscribe(res => {
        this.humidityGround = res.sensorvalues;
        if (this.humidityGroundValue.length >= 24) {
          this.humidityGround.forEach((p, i) => this.humidityGroundValue[i] = p.value);
          this.humidityGround.slice(this.humidityGround.length - 24, this.humidityGround.length).forEach((p, i) => this.humidityGroundValue[i] = p.value);
          this.humidityGround.slice(this.humidityGround.length - 24, this.humidityGround.length).forEach((p, i) => this.humidityGroundLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        } else {
          this.humidityGround.forEach((p, i) => this.humidityGroundValue[i] = p.value);
          this.humidityGround.forEach((p, i) => this.humidityGroundLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        }
        this.AddChartGround();
      });
  }

  AddChartAir() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.humidityAirLabel,
        datasets: [{
          label: 'Luchtvochtigheid (%)',
          data: this.humidityAirValue,
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

  AddChartGround() {
    this.LineChart = new Chart('lineChart2', {
      type: 'line',
      data: {
        labels: this.humidityGroundLabel,
        datasets: [{
          label: 'Bodemvochtigheid',
          data: this.humidityGroundValue,
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
