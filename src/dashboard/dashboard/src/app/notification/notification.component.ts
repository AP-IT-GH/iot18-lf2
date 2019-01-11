import { Component, OnInit } from '@angular/core';
import { Sensorvalue } from '../models/sensorvalue';
import { ApiService } from '../services/api.service';
import { Sensor } from '../models/sensor';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  overview: Sensorvalue[] = [];
  livedata: number[] = [];

  notifmsg: String[] = [];
  warning: Boolean;
  severe: Boolean;
  link: String;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getOverview();
  }

  getOverview() {
    this.api.getOverview()
      .subscribe(res => {
        this.overview = res;
        Object.values(this.overview).forEach((p, i) => this.livedata[i] = p.value);

        // Nummersarray:
        // 1 = Temperatuur
        // 2 = Luchtvochtigheid
        // 3 = Bodemvochtigheid
        // 4 = Licht
        // 5 = pH-waarde

        if (this.livedata[1] > 25) {
          this.warning = true;
          this.notifmsg[0] = 'De temperatuur is hoog. (' + this.livedata[1] + '°c)';
          this.link = 'Temperature';
          if (this.livedata[1] > 28) {
            this.severe = true;
            this.warning = false;
            this.notifmsg[0] = 'De temperatuur is zeer hoog! (' + this.livedata[1] + '°c)';
          }
        }

        if (this.livedata[1] < 18) {
          this.warning = true;
          this.notifmsg[0] = 'De temperatuur is laag. (' + this.livedata[1] + '°c)';
          this.link = 'Temperature';
          if (this.livedata[1] < 15) {
            this.severe = true;
            this.warning = false;
            this.notifmsg[0] = 'De temperatuur is zeer laag! (' + this.livedata[1] + '°c)';
          }
        }

        if (this.livedata[2] > 70) {
          this.warning = true;
          this.notifmsg[1] = 'De luchtvochtigheid is hoog. (' + this.livedata[2] + '%)';
          this.link = 'Humidity';
        }

        if (this.livedata[2] < 30) {
          this.warning = true;
          this.notifmsg[1] = 'De luchtvochtigheid is laag. (' + this.livedata[2] + '%)';
          this.link = 'Humidity';
        }

        if (this.livedata[3] < 30) {
          this.warning = true;
          this.notifmsg[2] = 'De bodem is droog. (' + this.livedata[3] + '%)';
          this.link = 'Humidity';
        }

        if (this.livedata[5] < 6) {
          this.warning = true;
          this.notifmsg[3] = 'De bodem is zuur. (pH ' + this.livedata[5] + ')';
          this.link = 'ph-value';
          if (this.livedata[5] < 5) {
            this.severe = true;
            this.warning = false;
            this.notifmsg[3] = 'De bodem is zeer zuur! (pH ' + this.livedata[5] + ')';
          }
        }

        if (this.livedata[5] > 8) {
          this.warning = true;
          this.notifmsg[3] = 'De bodem is basisch. (pH ' + this.livedata[5] + ')';
          this.link = 'ph-value';
          if (this.livedata[5] > 9) {
            this.severe = true;
            this.warning = false;
            this.notifmsg[3] = 'De bodem is zeer basisch. (pH ' + this.livedata[5] + ')';
          }
        }
      });
  }
}
