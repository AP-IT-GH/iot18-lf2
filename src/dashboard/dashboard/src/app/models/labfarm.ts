import { Sensor } from './sensor';
import { Plant } from './plant';

export class Labfarm {
    constructor() {

    }

    labfarmId: number;
    name: string;

    sensors: Sensor[];
    plants: Plant[];
}
