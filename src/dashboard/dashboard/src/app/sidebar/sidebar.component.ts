import { Component, OnInit } from '@angular/core';
import { Sensorvalue } from '../models/sensorvalue';
import { ApiService } from '../services/api.service';
import { Sensor } from '../models/sensor';
import { Subscription } from 'rxjs';
import { MqttService } from 'ngx-mqtt';
import { IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  overview: Sensorvalue[] = [];
  livedata: number[] = [];

  // temp, bodemvochtigheid, *, *, licht, luchtvochtigheid, water
  topic = 'testtopic/labfarm';
  private subscription: Subscription;
  public messages: string[] = [];
  temperature: number;
  humidityAir: number;
  humidityGround: number;
  light: number;
  ph: number;
  water: string;
  lamp: string;

  constructor(private _mqttService: MqttService, private api: ApiService) {
    this.subscribe();
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.unsubscribe();
    }
  }

  public subscribe() {
    this.subscription = this._mqttService.observe(this.topic).subscribe((message: IMqttMessage) => {
      const value = message.payload.toString();
      this.messages.push(value);
      const temp = value.split(';');
      this.temperature = Math.round(Number(Number(temp[0]).toPrecision(5)) * 10) / 10;
      this.humidityAir = Number(temp[5]);
      this.humidityGround = Math.round(Number(temp[1]));
      this.light = Number(temp[3]);
      this.ph = Math.round(0.00297 * Number(temp[2]) * 10) / 10;
      this.water = temp[6];
      this.lamp = temp[7];
    });
    if (this._mqttService.onConnect) {
      console.log('Connected');
    }
  }

  public unsubscribe() {
    this.subscription.unsubscribe();
    if (this._mqttService.onClose) {
      console.log('Disconnected');
    }
  }

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
      });
  }
}
