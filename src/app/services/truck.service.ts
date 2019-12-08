import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Truck} from '../models/truck';

@Injectable()
export class TruckService {

  private readonly trucksUrl: string;

  constructor(private http: HttpClient) {
    this.trucksUrl = 'http://localhost:8080/trucks';
  }

  public findById(truckId: number): Observable<Truck> {
    return this.http.get<Truck>(`${this.trucksUrl}/${truckId}`);
  }

  public getFreeTrucks(weight: number): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.trucksUrl}/free/${weight}`);
  }

  public isRegistrationNumberExist(registrationNumber: string): Observable<boolean> {
    const params = new HttpParams()
      .set('registration-number', String(registrationNumber));
    return this.http.get<boolean>(`${this.trucksUrl}/check`, {params});
  }

  public getTrucks(searchString: string, page: number, size: number): Observable<Truck[]> {
    const params = new HttpParams()
      .set('text', searchString)
      .set('page', String(page))
      .set('size', String(size));
    return this.http.get<Truck[]>(`${this.trucksUrl}/search`, {params});
  }

  public save(truck: Truck): Observable<boolean> {
    return this.http.post<boolean>(this.trucksUrl, truck);
  }

  public update(truck: Truck): Observable<boolean> {
    return this.http.put<boolean>(this.trucksUrl, truck);
  }
}
