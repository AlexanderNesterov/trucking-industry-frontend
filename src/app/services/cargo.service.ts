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

  public findById(cargoId: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.cargoUrl}/${cargoId}`);
  }

  public findAll(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.cargoUrl);
  }

  public addCargo(cargo: Cargo): Observable<boolean> {
    return this.http.post<boolean>(this.cargoUrl, cargo);
  }

 public updateCargo(cargo: Cargo): Observable<boolean> {
    return this.http.put<boolean>(this.cargoUrl, cargo);
 }
 //

  public getCargoByDriverId(driverId: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.cargoUrl}/for-driver/${driverId}`);
  }

  public setAcceptStatus(cargoId: number, driverId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.cargoUrl}/set-accept-status/${cargoId}/${driverId}`, null);
  }

  public setRefuseStatus(cargoId: number, driverId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.cargoUrl}/set-refuse-status/${cargoId}/${driverId}`, null);
  }

  public setDeliverStatus(cargoId: number, driverId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.cargoUrl}/set-deliver-status/${cargoId}/${driverId}`, null);
  }
}
