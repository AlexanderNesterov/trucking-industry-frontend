import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private cityUrl = 'http://localhost:8080/cities';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<City[]> {
    return this.http.get<City[]>(this.cityUrl);
  }
}
