import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Truck} from '../models/truck';

@Injectable()
export class TruckService {

  private trucksUrl: string;

  constructor(private http: HttpClient) {
    this.trucksUrl = 'http://localhost:8080/trucks';
  }

  public findById(truckId: number): Observable<Truck> {
    return this.http.get<Truck>(`${this.trucksUrl}/${truckId}`);
  }

  public findAll(page: number, pageSize: number): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.trucksUrl}?page=${page}&size=${pageSize}`);
  }

  public getFreeTrucks(weight: number): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.trucksUrl}/free/${weight}`);
  }

  public getTrucksBySearch(text: string): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.trucksUrl}/search/${text}`);
  }

  public save(truck: Truck): Observable<boolean> {
    return this.http.post<boolean>(this.trucksUrl, truck);
  }

  public update(truck: Truck): Observable<boolean> {
    return this.http.put<boolean>(this.trucksUrl, truck);
  }
}
