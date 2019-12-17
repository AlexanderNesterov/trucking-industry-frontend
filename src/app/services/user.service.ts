import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/trucking-industry/users';

  constructor(private http: HttpClient) {
  }

  public isLoginExists(login: string): Observable<boolean> {
    const params = new HttpParams()
      .set('login', String(login));
    return this.http.get<boolean>(`${this.usersUrl}/check`, {params});
  }

  public unlockAccount(userId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.usersUrl}/unlock/${userId}`, null);
  }

  public changePassword(login: string, currentPassword: string, newPassword: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.usersUrl}/password`, {login, currentPassword, newPassword});
  }
}
