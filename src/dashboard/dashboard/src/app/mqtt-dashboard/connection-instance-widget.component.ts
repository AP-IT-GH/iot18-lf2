import { Component, Input } from '@angular/core';
import { ConnectionInstance } from "../services/connection.instance";

@Component({
  selector: 'connection-instance-widget',
  template: '',
})
export class ConnectionInstanceWidgetComponent {
  @Input('connection-instance') connectionInstance: ConnectionInstance;
  dataPoints: Array<string> = [];
}