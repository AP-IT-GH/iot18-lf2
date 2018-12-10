import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MqttService } from 'ngx-mqtt';
import { IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  //temp, bodemvochtigheid, *, *, licht, luchtvochtigheid, water
  topic: string = 'testtopic/labfarm'
  private subscription: Subscription;
  public messages: string[] = [];
  temperature: number;
  humidityAir: number;
  humidityGround: number;
  light: number;
  ph: number;
  water: string;

  constructor(private _mqttService: MqttService) {
    this.subscribe();
  }

  public ngOnDestroy() {
    if (this.subscription)
      this.unsubscribe();
  }

  public subscribe() {
    this.subscription = this._mqttService.observe(this.topic).subscribe((message: IMqttMessage) => {
      let value = message.payload.toString();
      this.messages.push(value);
      let temp = value.split(';');
      this.temperature = Number(Number(temp[0]).toPrecision(5));
      this.humidityAir = Number(temp[5]);
      this.humidityGround = Number(temp[1]);
      this.light = Number(temp[3]);
      this.ph = Number(temp[2]);
      this.water = temp[6];
    });
    if (this._mqttService.onConnect)
      console.log('Connected')
  }

  public unsubscribe() {
    this.subscription.unsubscribe();
    if (this._mqttService.onClose)
      console.log('Disconnected')
  };

  ngOnInit() {
  }

}
