import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Driver} from '../models/driver';

@Injectable()
export class DriverService {

  private readonly driversUrl: string;

  constructor(private http: HttpClient) {
    this.driversUrl = 'http://localhost:8080/drivers';
  }

  public findById(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.driversUrl}/${driverId}`);
  }

  public getFreeDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.driversUrl}/free`);
  }

  public getDrivers(searchString: string, page: number, size: number): Observable<Driver[]> {
    const params = new HttpParams()
      .set('text', searchString)
      .set('page', String(page))
      .set('size', String(size));
    return this.http.get<Driver[]>(`${this.driversUrl}/search`, {params});
  }

  public isDriverLicenseExist(driverLicense: string): Observable<boolean> {
    const params = new HttpParams()
      .set('driver-license', String(driverLicense));
    return this.http.get<boolean>(`${this.driversUrl}/check`, {params});
  }

  public save(driver: Driver): Observable<boolean> {
    return this.http.post<boolean>(this.driversUrl, driver);
  }

  public update(driver: Driver): Observable<boolean> {
    return this.http.put<boolean>(this.driversUrl, driver);
  }
}
