import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Sensorvalue } from '../models/sensorvalue';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  LineChart = [];
  light: Sensorvalue[] = [];
  lightValue: number[] = [];
  lightLabel: string[] = [];
  date: string[] = [];
  selectedDate: string;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getLight();
  }

  getLight() {
    const type = 'light';
    this.api.getSensor(type)
      .subscribe(res => {
        this.lightLabel = [];
        this.lightValue = [];
        this.light = res;
        this.light.forEach((p, i) => { this.lightValue[i] = p.value, this.date[i] = p.timestamp.split('T')[0] });
        if (this.lightValue.length >= 24) {
          this.light.slice(this.light.length - 24, this.light.length).forEach((p, i) => this.lightValue[i] = p.value);
          // tslint:disable-next-line:max-line-length
          this.light.slice(this.light.length - 24, this.light.length).forEach((p, i) => this.lightLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        } else {
          this.light.forEach((p, i) => this.lightLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        }
        this.date = this.date.filter((el, i, a) => i === a.indexOf(el));
        this.AddChart();
      });
  }

  getLightFiltered() {
    const type = 'light';
    this.api.getSensorByDate(type, this.selectedDate)
      .subscribe(res => {
        this.lightLabel = [];
        this.lightValue = [];
        this.light = res;
        this.light.forEach((p, i) => this.lightValue[i] = p.value);
        if (this.lightValue.length >= 24) {
          this.light.slice(this.light.length - 24, this.light.length).forEach((p, i) => this.lightValue[i] = p.value);
          // tslint:disable-next-line:max-line-length
          this.light.slice(this.light.length - 24, this.light.length).forEach((p, i) => this.lightLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        } else {
          this.light.forEach((p, i) => this.lightLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        }
        this.AddChart();
      });
  }

  getFiltered() {
    if (this.selectedDate == "All") {
      this.getLight();
    }
    else {
      this.getLightFiltered();
    }
  }

  deleteSensorvalue(id: number) {
    this.api.deleteSensorvalue(id)
      .subscribe(res => {
        this.getLight();
      });
  }

  AddChart() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.lightLabel,
        datasets: [{
          label: 'Licht (lumen)',
          data: this.lightValue,
          fill: false,
          lineTension: 0.2,
          borderColor: '#f92',
          borderWidth: 1.5
        }]
      },
      options: {
        title: {
          text: 'Line Chart',
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
    });
  }

}
