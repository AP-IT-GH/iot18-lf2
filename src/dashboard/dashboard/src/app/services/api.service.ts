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
  private baseApi = 'http://localhost:59063/api/';

  constructor(private http: Http) {
    super();
  }

  getLabfarm(id: number): Observable<Labfarm> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'labfarm/' + id, options)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );
  }

  getSensor(type: string): Observable<Sensor> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'data/' + type, options)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );
  }

  getOverview(): Observable<Sensorvalue[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'data', options)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );
  }
}
