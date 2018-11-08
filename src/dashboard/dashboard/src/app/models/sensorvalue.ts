import { Plant } from './plant';

export class Sensorvalue {
    constructor() {

    }

    sensorvalueId: number;
    value: number;
    timestamp: number;
    plnatId: number;

    plant: Plant;
}