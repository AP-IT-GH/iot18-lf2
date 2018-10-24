import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-ph-value',
  templateUrl: './ph-value.component.html',
  styleUrls: ['./ph-value.component.css']
})
export class PhValueComponent implements OnInit {

  LineChart=[];
  constructor() { }

  ngOnInit() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
          labels: ["16u","17u","18u","19u","20u","21u","22u","23u","00u","01u","02u","03u","04u","05u","06u","07u","08u","09u","10u","11u","12u","13u","14u","15u"],
          datasets: [{
             label: 'pH-waarde',
             data: [7.6,7.6,7.6,7.5,7.5,7.6,7.7,7.7,7.7,7.8,7.7,7.8,7.6,7.5,7.4,7.4,7.3,7.3,7.2,7.2,7.3,7.4,7.5,7.5], 
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
