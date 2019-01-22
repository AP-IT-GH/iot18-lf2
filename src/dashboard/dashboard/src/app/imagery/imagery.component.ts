import { Component, OnInit } from '@angular/core';
import * as Convert from 'color-convert';
import * as Hex from 'hex2dec';
import * as ClarifaiSVC from '../clarifai_service/clarifai.service';
import * as ImgurSVC from '../services/imgur.service';
import { and } from '@angular/router/src/utils/collection';
import { timeout } from 'rxjs/operators';
@Component({
    selector: 'app-imagery',
    templateUrl: './imagery.component.html',
    styleUrls: ['./imagery.component.css']
})

export class ImageryComponent implements OnInit {

    constructor(private Clarifai: ClarifaiSVC.ClarifaiService, private Imgur: ImgurSVC.ImgurService) { }
    Labfarm1: string[] = [];
    Labfarm2: string[] = [];
    Labfarm3: string[] = [];
    Index1: number;
    Index2: number;
    Index3: number;
    Playing1: boolean;
    Playing2: boolean;
    Playing3: boolean;

    LabfarmAlbumHash: string[];
    SelectedLab = 0;

    url: string;
    Output: ClarifaiSVC.RootObject;
    ColorData: ClarifaiSVC.Color[];
    GreenPercentage: number;
    PlantHealth: number;
    Growth: number;
    MinGreenPercentage: string;
    MinPlantHealth: string;
    MinGrowth: string;
    ColorValue: HSL = {
        hue: 0,
        saturation: 0,
        light: 0
    };

    ngOnInit() {
        /*
        this.Imgur.getProfile().subscribe(data => {
            console.log(data);
        }, (err) => {
            console.error(err);
        });*/
        this.Playing1 = false;
        this.Playing2 = false;
        this.Playing3 = false;
        this.LabfarmAlbumHash = ['PxUx4w5', 'CDRbq7I', '4naDlCx'];

        this.Imgur.getAlbum('PxUx4w5').subscribe(data => {
            const res = data;
            console.log(res.data.images.length);
            console.log(data.data);
            for (const image of res.data.images) {
                console.log('link: ' + image.link);
                this.Labfarm1.push(image.link);
            }
            this.Index1 = this.Labfarm1.length - 1;
        }, (err) => {
            console.error(err);
        });
        this.Imgur.getAlbum('CDRbq7I').subscribe(data => {
            const res = data;
            console.log(res.data.images.length);
            console.log(data.data);
            for (const image of res.data.images) {
                console.log('link: ' + image.link);
                this.Labfarm2.push(image.link);
            }
            this.Index2 = this.Labfarm2.length - 1;
        }, (err) => {
            console.error(err);
        });
        this.Imgur.getAlbum('4naDlCx').subscribe(data => {
            const res = data;
            console.log(res.data.images.length);
            console.log(data.data);
            for (const image of res.data.images) {
                console.log('link: ' + image.link);
                this.Labfarm3.push(image.link);
            }
            this.Index3 = this.Labfarm3.length - 1;
        }, (err) => {
            console.error(err);
        });
        this.waitForData();
    }

    waitForData() {
        console.log('Labfarm 1 count: ' + this.Labfarm1.length + '\r\nLabfarm 2 count: ' + this.Labfarm2.length + '\r\nLabfarm 3 count: ' + this.Labfarm3.length);
        if (this.Labfarm1.length === 0 || this.Labfarm2.length === 0 || this.Labfarm3.length === 0) {
            setTimeout(() => this.waitForData(), 1000);
        } else {
            console.log('Pulling Data...');
            this.pullData();
            this.gif();
        }
    }

    calculateGreenPercentage(hsl: HSL): number {
        let value: number;
        if (hsl.hue < 140 && hsl.hue > 70) {
            value = ((1 / hsl.light) * (hsl.saturation)) * 50;
        } else {
            value = 0;
        }

        if (value < 0) { value = 0; }
        if (value > 100) { value = 100; }
        value = parseFloat(value.toFixed(2));
        return value;
    }

    calculatePlantHealth(hsl: HSL): number {
        let value: number = (((1 / (hsl.light - 50)) + hsl.saturation) / 50) * 100;

        if (value < 0) { value = 0; }
        if (value > 100) { value = 100; }
        value = parseFloat(value.toFixed(2));
        return value;
    }

    calculateHSL(rgbHex: string) {
        const r = Hex.hexToDec('0x' + rgbHex.slice(1, 3));
        const g = Hex.hexToDec('0x' + rgbHex.slice(3, 5));
        const b = Hex.hexToDec('0x' + rgbHex.slice(5, 7));

        // console.log("Red: " + r + "\r\nGreen: " + g + "\r\nBlue: " + b);

        this.ColorValue.hue = Convert.rgb.hsl(r, g, b)[0];
        this.ColorValue.saturation = Convert.rgb.hsl(r, g, b)[1];
        this.ColorValue.light = Convert.rgb.hsl(r, g, b)[2];

        /*
        console.log("Hue: " + this.ColorValue.hue +
                "\r\nSaturation: " + this.ColorValue.saturation +
                "\r\nLight: " + this.ColorValue.light);
        */
    }

    pullData() {
        this.SelectedLab = Number((<HTMLSelectElement>document.getElementById('select')).value);
        if (this.SelectedLab === 0) {
            this.url = this.Labfarm1[this.Labfarm1.length - 1];
        }
        if (this.SelectedLab === 1) {
            this.url = this.Labfarm2[this.Labfarm1.length - 1];
        }
        if (this.SelectedLab === 2) {
            this.url = this.Labfarm3[this.Labfarm1.length - 1];
        }

        this.Clarifai.getColorValues(this.url).then(x => {
            this.Output = x;
            this.ColorData = x.outputs[0].data.colors;
            this.calculateHSL(this.ColorData[length].w3c.hex);
            this.GreenPercentage = this.calculateGreenPercentage(this.ColorValue);
            this.PlantHealth = this.calculatePlantHealth(this.ColorValue);
            this.Growth = 45.37;
            this.MinGrowth = this.Growth + '%';
            this.MinGreenPercentage = this.GreenPercentage.toFixed(0) + '%';
            this.MinPlantHealth = this.PlantHealth.toFixed(0) + '%';
            console.log('Using labfarm ' + (this.SelectedLab + 1).toString() + ':\n    ' + this.url + '\n    PlantHealth%: ' + this.MinPlantHealth + '\n    GreenPercentage%: ' + this.MinGreenPercentage);
        });
    }

    nextImage(event, id: number) {
        console.log('Called nextImage');
        switch (id) {
            case 1: {
                if (this.Index1 < this.Labfarm1.length - 1) {
                    this.Index1++;
                }
                break;
            }
            case 2: {
                if (this.Index2 < this.Labfarm2.length - 1) {
                    this.Index2++;
                }
                break;
            }
            case 3: {
                if (this.Index3 < this.Labfarm3.length - 1) {
                    this.Index3++;
                }
                break;
            }
        }

    }
    previousImage(event, id: number) {
        console.log('Called previousImage');
        switch (id) {
            case 1: {
                if (this.Index1 > 0) {
                    this.Index1--;
                }
                break;
            }
            case 2: {
                if (this.Index2 > 0) {
                    this.Index2--;
                }
                break;
            }
            case 3: {
                if (this.Index3 > 0) {
                    this.Index3--;
                }
                break;
            }
        }
    }
    playImage(event, id: number) {
        console.log('Called playImage');
        if (id === 1) {
            this.Playing1 = true;
        } else if (id === 2) {
            this.Playing2 = true;
        } else if (id === 3) {
            this.Playing3 = true;
        }
    }
    stopImage(event, id: number) {
        console.log('Called stopImage');
        if (id === 1) {
            this.Playing1 = false;
        } else if (id === 2) {
            this.Playing2 = false;
        } else if (id === 3) {
            this.Playing3 = false;
        }
    }

    gif() {
        if (this.Playing2 === true) {
            if (this.Index2 < this.Labfarm2.length - 1) {
                this.Index2++;
            } else {
                this.Index2 = 0;
            }

        }
        if (this.Playing3 === true) {
            if (this.Index3 < this.Labfarm2.length - 1) {
                this.Index3++;
            } else {
                this.Index3 = 0;
            }

        }
        if (this.Playing1 === true) {
            if (this.Index1 < this.Labfarm1.length - 1) {
                this.Index1++;
            } else {
                this.Index1 = 0;
            }

        }
        setTimeout(() => this.gif(), 300);
    }

}

interface HSL {
    hue: number;
    saturation: number;
    light: number;
}
