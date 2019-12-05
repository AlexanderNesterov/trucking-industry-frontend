import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Manager} from '../models/manager';

@Injectable()
export class ManagerService {

  private managersUrl: string;

  constructor(private http: HttpClient) {
    this.managersUrl = 'http://localhost:8080/managers';
  }

  public findAll(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.managersUrl);
  }

  public findById(managerId: number): Observable<Manager> {
    return this.http.get<Manager>(`${this.managersUrl}/${managerId}`);
  }

  public save(manager: Manager): Observable<boolean> {
    return this.http.post<boolean>(this.managersUrl, manager);
  }

  public update(manager: Manager): Observable<boolean> {
    return this.http.put<boolean>(this.managersUrl, manager);
  }
}
