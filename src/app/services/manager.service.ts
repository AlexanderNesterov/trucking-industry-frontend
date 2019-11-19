import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Driver} from '../models/driver';
import {User} from '../models/user';

@Injectable()
export class ManagerService {

  private managersUrl: string;

  constructor(private http: HttpClient) {
    this.managersUrl = 'http://localhost:8080/managers';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.managersUrl);
  }

  public findById(managerId: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.managersUrl}/${managerId}`);
  }

  public save(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.managersUrl, user);
  }

  public update(user: User): Observable<boolean> {
    return this.http.put<boolean>(this.managersUrl, user);
  }
}
