import { Injectable } from '@angular/core';
import { Connection } from "../mqtt/connection";
import { ConnectionInstance } from "./connection.instance";
import { BaseService } from './base.service';

@Injectable()
export class MqttService extends BaseService {
  public connectionInstances: Array<ConnectionInstance> = [];

  constructor() {
    super();
  }

  connect(connection: Connection) {

    return new Promise((resolve, reject) => {
      var socket = new WebSocket("ws://mqtt-ws-bridge.herokuapp.com/" + connection.topic + "?host=" + connection.host + "&port=" + connection.port);

      var num;

      socket.onerror = (e) => {

        var message = 'Socket failed for ' + connection.topic;
        console.log(message);

        if (typeof num !== 'undefined') {
          this.connectionInstances.splice((num - 1), 1);
          num = undefined;
        }
        reject();
      };

      socket.onopen = () => {
        console.log('Success')
        num = this.connectionInstances.push(new ConnectionInstance(connection, socket));
        resolve();
      };

      socket.onclose = () => {
        var message = 'Socket closed for ' + connection.topic;
        console.log(message);

        if (typeof num !== 'undefined') {
          this.connectionInstances.splice((num - 1), 1);
          num = undefined;
        }
        resolve();
      };
    });

  }

  getConnectionInstance() {
    return this.connectionInstances;
  }

}