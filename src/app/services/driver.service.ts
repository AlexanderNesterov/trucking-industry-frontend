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

  public save(driver: Driver): Observable<boolean> {
    return this.http.post<boolean>(this.driversUrl, driver);
  }

  public update(driver: Driver): Observable<boolean> {
    return this.http.put<boolean>(this.driversUrl, driver);
  }

  public findById(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.driversUrl}/${driverId}`);
  }
}
