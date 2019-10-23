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
    return this.http.get<Driver[]>(this.driversUrl, { headers : new HttpHeaders().set('Content-Type', 'application/json') });
  }
}
