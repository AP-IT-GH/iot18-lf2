import { Sensorvalue } from './sensorvalue';

export class Sensor {
    constructor() {

    }

    sensorId: number;
    sensorType: string;
    value: number;

    sensorvalues: Sensorvalue[];
}