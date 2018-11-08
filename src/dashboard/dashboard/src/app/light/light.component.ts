import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  LineChart=[];
  constructor() { }

  ngOnInit() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
          labels: ["16u","17u","18u","19u","20u","21u","22u","23u","00u","01u","02u","03u","04u","05u","06u","07u","08u","09u","10u","11u","12u","13u","14u","15u"],
          datasets: [{
             label: 'Verlichting (Lumen)',
             data: [243,238,239,61,54,42,43,42,42,41,42,42,42,42,42,260,241,245,201,213,224,231,216,251], 
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
