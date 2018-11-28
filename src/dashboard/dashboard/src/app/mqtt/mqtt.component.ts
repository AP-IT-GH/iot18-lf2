import { Component, OnInit } from '@angular/core';
import { Connection } from './connection';
import { MqttService } from '../services/mqtt.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mqtt',
  templateUrl: './mqtt.component.html',
  styleUrls: ['./mqtt.component.css']
})
export class MqttComponent implements OnInit {
  host = "broker.mqttdashboard.com";
  port = 8000;
  topic = "testtopic/labfarm";

  connection: Connection;
  public loading: boolean = false;

  constructor(private mqttService: MqttService) {
    this.connection = new Connection(this.host, this.port, this.topic);
  }

  ngOnInit() {

  }

  connect() {
    this.loading = true;
    this.connection = new Connection(this.host, this.port, this.topic)
    console.log(this.connection)
    this.mqttService.connect(this.connection)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });

    //this.connection = new Connection(this.data[0], this.data[1], this.data[2]);
  }

  fillIn() {
    this.connection = new Connection(this.host, this.port, this.topic);
  }

}
