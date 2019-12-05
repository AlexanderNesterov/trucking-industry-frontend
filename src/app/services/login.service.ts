import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {tap} from 'rxjs/operators';

export interface TokenPair {
  authToken: string;
}

export interface UserCredentials {
  login: string;
  password: string;
}

@Injectable()
export class LoginService {

  private loginUrl: string;

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/login';
  }

  public login(user: UserCredentials): Observable<any> {
    return this.http.post<TokenPair>(this.loginUrl, user).pipe(
      tap(authTokenRaw => {
        localStorage.setItem('authToken', authTokenRaw);
        const authToken = jwt_decode(authTokenRaw);
        localStorage.setItem('userId', authToken.userId);
        localStorage.setItem('driverId', authToken.driverId);
        localStorage.setItem('managerId', authToken.managerId);
        localStorage.setItem('role', authToken.role);
        localStorage.setItem('login', authToken.sub);
      })
    );
  }
}
