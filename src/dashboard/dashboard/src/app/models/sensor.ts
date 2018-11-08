import { Sensorvalue } from './sensorvalue';

export class Labfarm {
    constructor() {

    }

    sensorId: number;
    sensorType: string;
    value: number;

    sensorvalues: Sensorvalue[];
}