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
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getPh();
  }

  getPh() {
    let type = "ph";
    this.api.getSensor(type)
      .subscribe(res => {
        this.ph = res;
        if (this.phValue.length >= 24) {
          this.ph.forEach((p, i) => this.phValue[i] = p.value);
          this.ph.slice(this.ph.length - 24, this.ph.length).forEach((p, i) => this.phValue[i] = p.value);
          this.ph.slice(this.ph.length - 24, this.ph.length).forEach((p, i) => this.phLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        } else {
          this.ph.forEach((p, i) => this.phValue[i] = p.value);
          this.ph.forEach((p, i) => this.phLabel[i] = p.timestamp.toString().slice(11, 13) + 'u');
        }
        this.AddChart();
      })
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
