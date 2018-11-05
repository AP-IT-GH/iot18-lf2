import { Component, OnInit } from '@angular/core';
import { ClarifaiService } from '../clarifai_service/clarifai.service';

@Component({
    selector: 'app-imagery',
    templateUrl: './imagery.component.html',
    styleUrls: ['./imagery.component.css']
})

export class ImageryComponent implements OnInit {

    constructor(private _svc: ClarifaiService) { }

    url:string;
    ngOnInit() {
        this.url = "https://us-east-1.tchyn.io/snopes-production/uploads/2017/06/Dieffenbachia_amoena_poison_fb.jpg";
        this._svc.getColorValues(this.url).then( x =>
            console.log(this._svc.data)
        );}

}