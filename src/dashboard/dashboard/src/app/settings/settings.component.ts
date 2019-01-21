import { Component, OnInit } from '@angular/core';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { MqttService } from 'ngx-mqtt';
import { IMqttMessage } from 'ngx-mqtt';
import { Sensor } from '../models/sensor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  //temp, bodemvochtigheid, *, *, licht, luchtvochtigheid, water
  topic: string = 'testtopic/labfarm'
  private subscription: Subscription;

  constructor(private _mqttService: MqttService) {
    this.subscribe();
  }

  public ngOnDestroy() {
    if (this.subscription)
      this.unsubscribe();
  }

  public subscribe() {
    if (this._mqttService.onConnect)
      console.log('Connected')
  }

  public lampToggle(event1) {
    if(event1 == true) {
      this._mqttService.unsafePublish("testtopic/labfarm/cmd", "lamp on", {qos: 2, retain: true});
    } else {
      this._mqttService.unsafePublish("testtopic/labfarm/cmd", "lamp off", {qos: 2, retain: true});
    }
  }

  public moveMotor(direction) {
    if(direction == "left") {
      this._mqttService.unsafePublish("testtopic/labfarm/cmd", "motor left", {qos: 2, retain: true});
    } else {
      this._mqttService.unsafePublish("testtopic/labfarm/cmd", "motor right", {qos: 2, retain: true});
    }
  }

  public togglePump(pumpNr) {
    var time = ((document.getElementById(pumpNr) as HTMLInputElement).value);
    this._mqttService.unsafePublish("testtopic/labfarm/cmd", "pump" + " " + pumpNr + " " + time, {qos: 2, retain: true});
  }

  public unsubscribe() {
    this.subscription.unsubscribe();
    if (this._mqttService.onClose)
      console.log('Disconnected')
  };

  ngOnInit() {
  }

}
