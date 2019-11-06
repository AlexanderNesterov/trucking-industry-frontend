import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cargo} from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private cargoUrl: string;

  constructor(private http: HttpClient) {
    this.cargoUrl = 'http://localhost:8080/cargo';
  }

  public findAll(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.cargoUrl, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public addCargo(cargo: Cargo) {
    return this.http.post(this.cargoUrl, cargo, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public getCargoByDriverId(driverId: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.cargoUrl}/for_driver/${driverId}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public setAcceptStatus(cargoId: number, driverId: number) {
    return this.http.put(`${this.cargoUrl}/set_accept_status/${cargoId}/${driverId}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public setRefuseStatus(cargoId: number, driverId: number) {
    return this.http.put(`${this.cargoUrl}/set_refuse_status/${cargoId}/${driverId}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  public setDeliverStatus(cargoId: number, driverId: number) {
    return this.http.put(`${this.cargoUrl}/set_deliver_status/${cargoId}/${driverId}`, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
