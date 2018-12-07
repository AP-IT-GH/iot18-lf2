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
    
  }
}
