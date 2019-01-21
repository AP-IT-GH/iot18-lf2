import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Sensorvalue } from '../models/sensorvalue';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ph-value',
  templateUrl: './ph-value.component.html',
  styleUrls: ['./ph-value.component.css']
})
export class PhValueComponent implements OnInit {

  LineChart = [];
  ph: Sensorvalue[] = [];
  phValue: number[] = [];
  phLabel: string[] = [];
  date: string[] = [];
  selectedDate: string;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getPh();
  }

  getPh() {
    const type = 'ph';
    this.api.getSensor(type)
      .subscribe(res => {
        this.phValue = [];
        this.phLabel = [];
        this.ph = res;
        this.ph.forEach((p, i) => { this.phValue[i] = p.value, this.date[i] = p.timestamp.split('T')[0] });
        if (this.phValue.length >= 24) {
          this.ph.slice(this.ph.length - 24, this.ph.length).forEach((p, i) => { this.phValue[i] = p.value });
          // tslint:disable-next-line:max-line-length
          this.ph.slice(this.ph.length - 24, this.ph.length).forEach((p, i) => this.phLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        } else {
          this.ph.forEach((p, i) => this.phLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        }
        this.date = this.date.filter((el, i, a) => i === a.indexOf(el));
        this.AddChart();
      });
  }

  getPhFiltered() {
    const type = 'ph';
    this.api.getSensorByDate(type, this.selectedDate)
      .subscribe(res => {
        this.phValue = [];
        this.phLabel = [];
        this.ph = res;
        this.ph.forEach((p, i) => { this.phValue[i] = p.value });
        if (this.phValue.length >= 24) {
          this.ph.slice(this.ph.length - 24, this.ph.length).forEach((p, i) => { this.phValue[i] = p.value });
          // tslint:disable-next-line:max-line-length
          this.ph.slice(this.ph.length - 24, this.ph.length).forEach((p, i) => this.phLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        } else {
          this.ph.forEach((p, i) => this.phLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        }
        this.AddChart();
      });
  }

  getFiltered() {
    if (this.selectedDate == "All") {
      this.getPh();
    }
    else {
      this.getPhFiltered();
    }
  }

  AddChart() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.phLabel,
        datasets: [{
          label: 'Ph-value (ph)',
          data: this.phValue,
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
