import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable()
export class ImgurService extends BaseService {
  clientId: String = '8119d5433d9b2f3';

  private baseApi: String = 'https://api.imgur.com/3/';
  constructor(private http: Http) {
    super();
  }
/*
  getProfile(): Observable<IAccountReturn> {
    const headers = new Headers({ 'Authorization': 'Client-ID ' + this.clientId + ' '});
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'account/LabFarm', options).pipe(
      map(res => res.json()),
      catchError(this.handleError)
    );
  }
*/
  getAlbum(hash: String): Observable<RootObject> {
    const headers = new Headers({ 'Authorization': 'Client-ID ' + this.clientId + ' '});
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseApi + 'album/' + hash, options).pipe(
      map(res => res.json()),
      catchError(this.handleError)
    );
  }

}


export interface Image {
  id: string;
  title?: any;
  description?: any;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  vote?: any;
  favorite: boolean;
  nsfw?: any;
  section?: any;
  account_url?: any;
  account_id?: any;
  is_ad: boolean;
  in_most_viral: boolean;
  has_sound: boolean;
  tags: any[];
  ad_type: number;
  ad_url: string;
  in_gallery: boolean;
  link: string;
}

export interface Data {
  id: string;
  title: string;
  description?: any;
  datetime: number;
  cover: string;
  cover_width: number;
  cover_height: number;
  account_url: string;
  account_id: number;
  privacy: string;
  layout: string;
  views: number;
  link: string;
  favorite: boolean;
  nsfw?: any;
  section?: any;
  images_count: number;
  in_gallery: boolean;
  is_ad: boolean;
  include_album_ads: boolean;
  is_album: boolean;
  images: Image[];
}

export interface RootObject {
  data: Data;
  success: boolean;
  status: number;
}

/*
export interface IAccount {
  id: string;
  title?: any;
  description?: any;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  vote?: any;
  favorite: boolean;
  nsfw?: any;
  section?: any;
  account_url?: any;
  account_id?: any;
  is_ad: boolean;
  in_most_viral: boolean;
  has_sound: boolean;
  tags: any[];
  ad_type: number;
  ad_url: string;
  in_gallery: boolean;
  link: string;
}

export interface IAccountReturn {
  data: Account[];
  success: boolean;
  status: number;
}*/
