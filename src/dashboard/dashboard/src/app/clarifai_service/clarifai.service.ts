import { Injectable } from "@angular/core";
<<<<<<< HEAD
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
//import * as Clarifai from 'clarifai';
import { Observable } from "rxjs";
=======
import * as Clarifai from 'clarifai';
>>>>>>> Dashboard_Clarifai

@Injectable()

export class ClarifaiService {
<<<<<<< HEAD
  constructor(private _http: HttpClient) { };

  /*public getColorValues(imageUrl:string): RootObject {
    const app = new Clarifai.App({
      ApiKey: "700aba9a33a94a48bcb5b88f53a414cc"
    });
    let obj;
    app.models.predict(Clarifai.GENERAL_MODEL, imageUrl).then(
      function(response) {
        obj = response;
      }
    );
    while(obj = null){}
    return obj;
  }
  */
  ngOnInit() { 
  }
=======
    constructor() {
    };

    ngOnInit() {
        
    }
    public data;
    async getColorValues(imageUrl: string): Promise<RootObject> {
        const app = new Clarifai.App({apiKey: '700aba9a33a94a48bcb5b88f53a414cc'});
        this.data = app.models.predict('eeed0b6733a644cea07cf4c60f87ebb7', imageUrl);
        return await this.data;
    }
>>>>>>> Dashboard_Clarifai
}

export interface Status {
    code: number;
    description: string;
}
export interface Status2 {
    code: number;
    description: string;
}
export interface OutputInfo {
    message: string;
    type: string;
}
export interface Status3 {
    code: number;
    description: string;
}
export interface ModelVersion {
    id: string;
    created_at: Date;
    status: Status3;
}
export interface Model {
    name: string;
    id: string;
    created_at: Date;
    app_id?: any;
    output_info: OutputInfo;
    model_version: ModelVersion;
}
export interface Image {
    url: string;
}
export interface Data {
    image: Image;
}
export interface Input {
    id: string;
    data: Data;
}
export interface W3c {
    hex: string;
    name: string;
}
export interface Color {
    raw_hex: string;
    w3c: W3c;
    value: number;
}
export interface Data2 {
    colors: Color[];
}
export interface Output {
    id: string;
    status: Status2;
    created_at: Date;
    model: Model;
    input: Input;
    data: Data2;
}
export interface RootObject {
    status: Status;
    outputs: Output[];
}