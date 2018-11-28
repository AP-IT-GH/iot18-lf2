import { Component, OnInit } from '@angular/core';
import { Sensorvalue } from '../models/sensorvalue';
import { ApiService } from '../services/api.service';
import { Sensor } from '../models/sensor';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  overview: Sensorvalue[] = [];
  livedata: number[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getOverview();
  }

  getOverview() {
    this.api.getOverview()
      .subscribe(res => {
        this.overview = res;
        Object.values(this.overview).forEach((p, i) => this.livedata[i] = p.value)

        // Nummersarray:
        // 1 = Temperatuur
        // 2 = Luchtvochtigheid
        // 3 = Bodemvochtigheid
        // 4 = Licht
        // 5 = pH-waarde
      })
  }
}
