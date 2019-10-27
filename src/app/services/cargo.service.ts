import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cargo} from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private cargoUrl: string;

  constructor(private http: HttpClient) {
    this.cargoUrl = 'http://localhost:8080/cargo';
  }

  public findAll(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.cargoUrl, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
