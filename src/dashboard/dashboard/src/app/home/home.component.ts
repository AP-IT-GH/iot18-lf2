import { Component, OnInit } from '@angular/core';
import { Sensorvalue } from '../models/sensorvalue';
import { ApiService } from '../services/api.service';
import { Sensor } from '../models/sensor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getOverview();
  }

  getOverview() {
    this.api.getOverview()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
      })
  }

}
