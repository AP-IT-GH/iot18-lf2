import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { BaseService } from '../services/base.service';

import { Labfarm } from '../models/labfarm';
import { Plant } from '../models/plant';
import { Sensor } from '../models/sensor';
import { Sensorvalue } from '../models/sensorvalue';

@Injectable()
export class ApiService extends BaseService {
  private baseApi: string = 'https://labfarmrest147.azurewebsites.net/api/';
  //private baseApi: string = 'http://localhost:59063/api/';

  constructor(private http: Http) {
    super();
  }

  getLabfarm(id: number): Observable<Labfarm> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'labfarm/' + id, options)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      )
  }

  getSensor(type: string): Observable<Sensorvalue[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'data/' + type, options)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      )
  }

  getOverview(): Observable<Sensorvalue[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'data', options)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      )
  }

  getSensorByDate(type, date): Observable<Sensorvalue[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'data/' + type + '/' + date, options)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      )
  }
}