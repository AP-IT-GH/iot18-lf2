import { Plant } from './plant';

export class Sensorvalue {
    constructor() {

    }

    Temperature: number;
    sensorvalueId: number;
    value: number;
    timestamp: string;
    plantId: number;
    plant: Plant;
}