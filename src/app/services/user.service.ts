import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  public isLoginExists(login: string): Observable<boolean> {
    const params = new HttpParams()
      .set('login', String(login));
    return this.http.get<boolean>(`${this.usersUrl}/check`, {params});
  }

  public blockManagerAccount(userId: number, managerId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.usersUrl}/block-manager/${userId}/${managerId}`, null);
  }

  public unlockAccount(userId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.usersUrl}/unlock/${userId}`, null);
  }

  public changeAdminPassword(login: string, currentPassword: string, newPassword: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.usersUrl}/admin-password`, {login, currentPassword, newPassword});
  }

  public changeDriverPassword(login: string, currentPassword: string, newPassword: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.usersUrl}/driver-password`, {login, currentPassword, newPassword});
  }
}
