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

  public findById(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.driversUrl}/${driverId}`);
  }

  public findAll(page: number, size: number): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.driversUrl}?page=${page}&size=${size}`);
  }

  public getFreeDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.driversUrl}/free`);
  }

  public getDriversBySearch(text: string): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.driversUrl}/search/${text}`);
  }

  public save(driver: Driver): Observable<boolean> {
    return this.http.post<boolean>(this.driversUrl, driver);
  }

  public update(driver: Driver): Observable<boolean> {
    return this.http.put<boolean>(this.driversUrl, driver);
  }
}
