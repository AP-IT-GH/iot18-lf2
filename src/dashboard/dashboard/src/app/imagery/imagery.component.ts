import { Component, OnInit } from '@angular/core';
import * as Convert from 'color-convert'
import * as hex from 'hex2dec';
import * as clarifai from '../clarifai_service/clarifai.service';

@Component({
    selector: 'app-imagery',
    templateUrl: './imagery.component.html',
    styleUrls: ['./imagery.component.css']
})

export class ImageryComponent implements OnInit {

    constructor(private _svc: clarifai.ClarifaiService) { }

    url:string;
    Output:clarifai.RootObject;
    ColorData:clarifai.Color[];
    GreenPercentage:number;
    PlantHealth:number;
    Growth:number;
    MinGreenPercentage:string;
    MinPlantHealth:string;
    MinGrowth:string;
    ColorValue:HSL = {
        hue:0,
        saturation:0,
        light:0
    };

    ngOnInit() {
        this.pullData();
    }

    calculateGreenPercentage(hsl:HSL):number{
        let value:number;
        if (hsl.hue <  140 && hsl.hue > 70 )
            value = ((1/hsl.light)*(hsl.saturation))*50;
        else
            value = 0;

        if (value < 0) value = 0;
        if (value > 100) value = 100;
        value = parseFloat(value.toFixed(2));

        console.log("GreenPercentage: " + value);
        return value;
    }

    calculatePlantHealth(hsl:HSL):number{
        let value:number = (((1/(hsl.light-50)) + hsl.saturation)/50)*100;

        if (value < 0) value = 0;
        if (value > 100) value = 100;
        value = parseFloat(value.toFixed(2));

        console.log("PlantHealth: " + value);
        return value;
    }

    calculateHSL(rgbHex:string){
        let r = hex.hexToDec("0x" + rgbHex.slice(1,3));
        let g = hex.hexToDec("0x" + rgbHex.slice(3,5));
        let b = hex.hexToDec("0x" + rgbHex.slice(5,7));
        
        //console.log("Red: " + r + "\r\nGreen: " + g + "\r\nBlue: " + b);

        this.ColorValue.hue = Convert.rgb.hsl(r,g,b)[0];
        this.ColorValue.saturation = Convert.rgb.hsl(r,g,b)[1];
        this.ColorValue.light = Convert.rgb.hsl(r,g,b)[2];
        
        /*
        console.log("Hue: " + this.ColorValue.hue + 
                "\r\nSaturation: " + this.ColorValue.saturation + 
                "\r\nLight: " + this.ColorValue.light);
        */
    }

    pullData(){
        this.url = "https://us-east-1.tchyn.io/snopes-production/uploads/2017/06/Dieffenbachia_amoena_poison_fb.jpg";
        this._svc.getColorValues(this.url).then( x =>{
            this.Output = x;
            this.ColorData = x.outputs[0].data.colors;
            this.calculateHSL(this.ColorData[length].w3c.hex);
            this.GreenPercentage = this.calculateGreenPercentage(this.ColorValue);
            this.PlantHealth = this.calculatePlantHealth(this.ColorValue);
            this.Growth = 45.37;
            this.MinGrowth = this.Growth + "%";
            this.MinGreenPercentage = this.GreenPercentage.toFixed(0) + "%";
            this.MinPlantHealth = this.PlantHealth.toFixed(0) + "%";
            //console.log("PlantHealth%: " + this.MinPlantHealth + "\r\nGreenPercentage%: " + this.MinGreenPercentage);
        });
    }
}

interface HSL {
    hue:number;
    saturation:number;
    light:number;
}