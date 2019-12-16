import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  cargoUrl: string;

  constructor(private http: HttpClient) {
    this.cargoUrl = 'http://localhost:8080/trucking-industry/cargo';
  }

  public setDeliveredStatus(cargoId: number, orderId: number, driverId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.cargoUrl}/set-deliver-status/${cargoId}/${orderId}/${driverId}`, null);
  }
}
