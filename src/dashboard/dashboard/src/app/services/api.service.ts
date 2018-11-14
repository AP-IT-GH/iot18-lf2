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
  private baseApi: string = 'http://localhost:59063/api/';

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

  getSensor(type: string): Observable<Sensor> {
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
  /*
    getTrainer(id: string): Observable<Trainer> {
      const authToken = localStorage.getItem('access_token');
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);
      let options = new RequestOptions({ headers: headers });
  
      return this.http.get(this.baseApi + 'trainer/user/' + id, options)
        .map(res => res.json())
        .catch(this.handleError);
    }
  
    getPokemonFromTrainer(): Observable<Pokemon[]> {
      const authToken = localStorage.getItem('access_token');
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);
      let options = new RequestOptions({ headers: headers });
  
      return this.http.get(this.baseApi + 'trainer/user/', options)
        .map(res => res.json())
        .catch(this.handleError);
    }
  
    createTrainer(userId: string, name: string, caught: number = 0): Observable<Trainer> {
      let body = JSON.stringify({ name, caught, userId });
      const headers = new Headers();
      const authToken = localStorage.getItem('access_token');
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);
      let options = new RequestOptions({ headers: headers });
  
      return this.http.post(this.baseApi + 'trainer', body, options)
        .map(res => res.json())
        .catch(this.handleError);
    }
  
    addPokemon(pokemon: PokemonInfo) {
      const trainerId = Number(localStorage.getItem('trainer_id'));
      const pokemonId: number = pokemon.pokemonId;
      const spriteImg: string = pokemon.spriteImg;
      const img: string = pokemon.img;
      const name: string = pokemon.name;
      const description: string = pokemon.description;
      const habitat: string = pokemon.habitat;
      const weight: number = pokemon.weight;
      const height: number = pokemon.height;
      const generation: string = pokemon.generation;
      const species: string = pokemon.species;
      let types: any;
      if (pokemon.types.length == 2) {
        types = pokemon.types[0].type.name + ',' + pokemon.types[1].type.name;
      } else {
        types = pokemon.types[0].type.name;
      }
  
      let body = JSON.stringify({ pokemonId, spriteImg, img, name, description, habitat, weight, height, generation, species, types, trainerId });
      const headers = new Headers();
      const authToken = localStorage.getItem('access_token');
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);
      let options = new RequestOptions({ headers: headers });
  
      return this.http.post(this.baseApi + 'pokemon', body, options)
        .map(res => res.json())
        .catch(this.handleError);
    }
  
    addTeam(name: string): Observable<Team> {
      const trainerId = localStorage.getItem('trainer_id');
      const authToken = localStorage.getItem('access_token');
      let body = JSON.stringify({ trainerId, name });
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);
      let options = new RequestOptions({ headers: headers });
  
      return this.http.post(this.baseApi + 'team', body, options)
        .map(res => res.json())
        .catch(this.handleError);
    }
  
    deleteTeam(id: number): Observable<Team> {
      const authToken = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);
      let options = new RequestOptions({ headers: headers });
  
      return this.http.delete(this.baseApi + 'team/' + id, options)
        .map(res => res.json())
        .catch(this.handleError);
    }
  
    addPokemonToTeam(teamId: number, pokemonId: number) {
      const authToken = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);
      let options = new RequestOptions({ headers: headers });
  
      return this.http.put(this.baseApi + 'team/' + teamId + '/add/' + pokemonId, options)
        .map(res => res.json())
        .catch(this.handleError);
    }
  
    removePokemonFromTeam(teamId: number, pokemonId: number) {
      const authToken = localStorage.getItem('access_token');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);
      let options = new RequestOptions({ headers: headers });
  
      return this.http.put(this.baseApi + 'team/' + teamId + '/remove/' + pokemonId, options)
        .map(res => res.json())
        .catch(this.handleError);
    }*/
}