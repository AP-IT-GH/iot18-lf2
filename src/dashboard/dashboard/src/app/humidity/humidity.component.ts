import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {

  LineChart=[];
  constructor() { }

  ngOnInit() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
          labels: ["16u","17u","18u","19u","20u","21u","22u","23u","00u","01u","02u","03u","04u","05u","06u","07u","08u","09u","10u","11u","12u","13u","14u","15u"],
          datasets: [{
             label: 'Luchtvochtigheid (%)',
             data: [43,41,42,44,43,43,41,39,39,38,37,35,35,36,42,46,48,48,46,45,44,44,43,42], 
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

   this.LineChart = new Chart('lineChart2', {
    type: 'line',
    data: {
        labels: ["16u","17u","18u","19u","20u","21u","22u","23u","00u","01u","02u","03u","04u","05u","06u","07u","08u","09u","10u","11u","12u","13u","14u","15u"],
        datasets: [{
           label: 'Bodemvochtigheid',
           data: [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1], 
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
