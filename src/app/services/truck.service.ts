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

  public findAll(): Observable<Truck[]> {
    return this.http.get<Truck[]>(this.trucksUrl);
  }

  public getFreeTrucks(weight: number): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.trucksUrl}/free/${weight}`);
  }

  public save(truck: Truck) {
    return this.http.post(this.trucksUrl, truck);
  }

  public update(truck: Truck) {
    return this.http.put(this.trucksUrl, truck);
  }
}
