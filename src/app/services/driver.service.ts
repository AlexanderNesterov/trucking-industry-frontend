import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Driver} from '../models/driver';

@Injectable()
export class DriverService {

  private driversUrl: string;

  constructor(private http: HttpClient) {
    this.driversUrl = 'http://localhost:8080/drivers';
  }

  public findAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.driversUrl, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getFreeDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.driversUrl}/free`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public save(driver: Driver) {
    return this.http.post(this.driversUrl, driver, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public update(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(this.driversUrl, driver, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public findById(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.driversUrl}/${driverId}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
