import { Component, OnInit } from '@angular/core';
import { MqttService } from '../../../node_modules/ngx-mqtt/src/mqtt.service';
import { FormsModule } from '@angular/forms';
import { IClientOptions } from 'mqtt';
import { Subscription } from 'rxjs';
import { IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.css']
})
export class MqttComponent implements OnInit {
  topic: string = 'testtopic/labfarm'
  private subscription: Subscription;
  public messages: string[] = [];

  constructor(private _mqttService: MqttService) {
    this.subscribe();
  }

  public ngOnDestroy() {
    if (this.subscription)
      this.unsubscribe();
  }

  public subscribe() {
    this.subscription = this._mqttService.observe(this.topic).subscribe((message: IMqttMessage) => {
      this.messages.push(message.payload.toString());
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
