import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Manager} from '../models/manager';

@Injectable()
export class ManagerService {

  private managersUrl: string;

  constructor(private http: HttpClient) {
    this.managersUrl = 'http://localhost:8080/trucking-industry/managers';
  }

  public getManagers(searchString: string, page: number, size: number): Observable<Manager[]> {
    const params = new HttpParams()
      .set('text', searchString)
      .set('page', String(page))
      .set('size', String(size));
    return this.http.get<Manager[]>(`${this.managersUrl}/search`, {params});
  }

  public blockAccount(userId: number, managerId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.managersUrl}/block/${userId}/${managerId}`, null);
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
