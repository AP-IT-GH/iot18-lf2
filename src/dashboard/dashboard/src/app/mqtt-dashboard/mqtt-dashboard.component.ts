import { Component } from '@angular/core';
import { MqttService } from "../services/mqtt.service";
import { ConnectionInstanceWidgetComponent } from "./connection-instance-widget.component";

@Component({
  selector: 'mqtt-dashboard',
  templateUrl: './mqtt-dashboard.component.html',
  styleUrls: ['./mqtt-dashboard.component.css']
})
export class MqttDashboardComponent {
  constructor(private mqttService: MqttService) { }

  connectionInstances() {
    return this.mqttService.getConnectionInstance();
  }
}