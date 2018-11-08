import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ClarifaiService, RootObject } from '../clarifai_service/clarifai.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private _svc:ClarifaiService) { }

  ngOnInit() {
    //this._svc.getColorValues("https://us-east-1.tchyn.io/snopes-production/uploads/2017/06/Dieffenbachia_amoena_poison_fb.jpg");
  }
}
