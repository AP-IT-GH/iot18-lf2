import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  
  LineChart=[];
  constructor() { }

  ngOnInit() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
          labels: ["16u","17u","18u","19u","20u","21u","22u","23u","00u","01u","02u","03u","04u","05u","06u","07u","08u","09u","10u","11u","12u","13u","14u","15u"],
          datasets: [{
             label: 'Temperatuur (°c)',
             data: [21.2,21.3,21.3,21.0,20.8,20.7,20.5,20.2,19.9,19.6,19.3,19.1,19.0,18.9,18.8,18.8,18.7,19.2,19.9,20.6,20.9,21.0,21.0,20.9], 
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
           ticks:{
              beginAtZero:true
           }
        }]
       }
   })
  }

}
