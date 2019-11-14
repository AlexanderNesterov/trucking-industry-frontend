import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Driver} from '../models/driver';

@Injectable()
export class DriverService {

  private driversUrl: string;

  constructor(private http: HttpClient) {
    this.driversUrl = 'http://localhost:8080/drivers';
  }

  public findAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.driversUrl);
  }

  public getFreeDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.driversUrl}/free`);
  }

  public save(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.driversUrl, driver);
  }

  public update(driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(this.driversUrl, driver);
  }

  public findById(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.driversUrl}/${driverId}`);
  }
}
