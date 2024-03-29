import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Sensorvalue } from '../models/sensorvalue';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  LineChart = [];
  temperature: Sensorvalue[] = [];
  temperatureValue: number[] = [];
  temperatureLabel: string[] = [];
  date: string[] = [];
  selectedDate: string;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getTemperature();

  }

  getTemperature() {
    const type = 'temperature';
    this.api.getSensor(type)
      .subscribe(res => {
        this.temperatureValue = [];
        this.temperatureLabel = [];
        this.temperature = res;
        this.temperature.forEach((p, i) => { this.temperatureValue[i] = p.value, this.date[i] = p.timestamp.split('T')[0] });
        if (this.temperatureValue.length >= 24) {
          this.temperature.slice(this.temperature.length - 24, this.temperature.length).forEach((p, i) => this.temperatureValue[i] = p.value);
          this.temperature.slice(this.temperature.length - 24, this.temperature.length).forEach((p, i) => this.temperatureLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        } else {
          this.temperature.forEach((p, i) => this.temperatureLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        }
        this.date = this.date.filter((el, i, a) => i === a.indexOf(el));
        this.AddChart();
      })
  }

  getTemperatureFiltered() {
    let type = "temperature";
    this.api.getSensorByDate(type, this.selectedDate)
      .subscribe(res => {
        this.temperatureValue = [];
        this.temperatureLabel = [];
        this.temperature = res;
        this.temperature.forEach((p, i) => { this.temperatureValue[i] = p.value });
        if (this.temperatureValue.length >= 24) {
          this.temperature.slice(this.temperature.length - 24, this.temperature.length).forEach((p, i) => this.temperatureValue[i] = p.value);
          this.temperature.slice(this.temperature.length - 24, this.temperature.length).forEach((p, i) => this.temperatureLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        } else {
          this.temperature.forEach((p, i) => this.temperatureLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        }
        this.AddChart();
      });
  }

  getFiltered() {
    if (this.selectedDate == "All") {
      this.getTemperature();
    }
    else {
      this.getTemperatureFiltered();
    }
  }

  deleteSensorvalue(id: number) {
    this.api.deleteSensorvalue(id)
      .subscribe(res => {
        this.getTemperature();
      });
  }

  AddChart() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.temperatureLabel,
        datasets: [{
          label: 'Temperatuur (°c)',
          data: this.temperatureValue,
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
