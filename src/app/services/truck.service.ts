import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Truck} from '../models/truck';

@Injectable()
export class TruckService {

  private trucksUrl: string;

  constructor(private http: HttpClient) {
    this.trucksUrl = 'http://localhost:8080/trucks';
  }

  public findAll(): Observable<Truck[]> {
    return this.http.get<Truck[]>(this.trucksUrl, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getFreeTrucks(weight: number): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.trucksUrl}/free/${weight}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(truck: Truck) {
    return this.http.post(this.trucksUrl, truck, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
