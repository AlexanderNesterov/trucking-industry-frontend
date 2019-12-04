import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cargo} from '../models/cargo';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl: string;

  constructor(private http: HttpClient) {
    this.orderUrl = 'http://localhost:8080/order';
  }

  public findById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.orderUrl}/${orderId}`);
  }

  public findAll(page: number, pageSize: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.orderUrl}?page=${page}&size=${pageSize}`);
  }

  public getOrdersBySearch(text: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.orderUrl}/search/${text}`);
  }

  public addOrder(order: Order): Observable<boolean> {
    return this.http.post<boolean>(this.orderUrl, order);
  }

  public updateOrder(order: Order): Observable<boolean> {
    return this.http.put<boolean>(this.orderUrl, order);
  }

  public getOrderByDriverId(driverId: number): Observable<Order> {
    return this.http.get<Order>(`${this.orderUrl}/for-driver/${driverId}`);
  }

  public setAcceptStatus(orderId: number, driverId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.orderUrl}/set-accept-status/${orderId}/${driverId}`, null);
  }

  public setRefuseStatus(orderId: number, driverId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.orderUrl}/set-refuse-status/${orderId}/${driverId}`, null);
  }

  public setCancelStatus(orderId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.orderUrl}/set-cancel-status/${orderId}`, null);
  }
}
