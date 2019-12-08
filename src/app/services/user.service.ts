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
}
