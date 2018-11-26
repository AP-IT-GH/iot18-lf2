import { Component, OnInit } from '@angular/core';
import { Connection } from './connection';
import { MqttService } from '../services/mqtt.service';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.css']
})
export class MqttComponent implements OnInit {
  server = "test.mosquitto.org";
  port = 1883;
  topic = "testtopic/labfarm";

  connection: Connection;
  public loading: boolean = false;
  public shouldShowDemoHelp: boolean = false;

  constructor(private mqttService: MqttService) {
    this.connection = new Connection(this.server, this.port, this.topic);
  }

  ngOnInit() {

  }

  connect() {
    this.loading = true;
    this.mqttService.connect(this.connection)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });

    this.connection = new Connection(this.connection.host, this.connection.port, "");
  }

  showDemoHelp() {
    this.shouldShowDemoHelp = !this.shouldShowDemoHelp;
  }

  fillInExample1() {
    this.connection = new Connection(this.server, this.port, this.topic);
  }


}
