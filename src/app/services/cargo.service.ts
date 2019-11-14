import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
    return this.http.get<Cargo[]>(this.cargoUrl);
  }

  public addCargo(cargo: Cargo) {
    return this.http.post(this.cargoUrl, cargo);
  }

  public getCargoByDriverId(driverId: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.cargoUrl}/for-driver/${driverId}`);
  }

  public setAcceptStatus(cargoId: number, driverId: number) {
    // @ts-ignore
    return this.http.put(`${this.cargoUrl}/set-accept-status/${cargoId}/${driverId}`);
  }

  public setRefuseStatus(cargoId: number, driverId: number) {
    // @ts-ignore
    return this.http.put(`${this.cargoUrl}/set-refuse-status/${cargoId}/${driverId}`);
  }

  public setDeliverStatus(cargoId: number, driverId: number) {
    // @ts-ignore
    return this.http.put(`${this.cargoUrl}/set-deliver-status/${cargoId}/${driverId}`);
  }
}
