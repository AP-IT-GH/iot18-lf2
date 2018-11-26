import { Connection } from "../mqtt/connection";

export class ConnectionInstance {
  constructor(public connection: Connection, public socket) { }
}