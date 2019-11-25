import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, filter, tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq = req.clone(
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    );

    if (cloneReq.url.includes('/login')) {
      return next.handle(req).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 403) {
            return throwError(err);
          }
        }));
    } else {
      cloneReq = req.clone(
        {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`)}
      );

      return next.handle(cloneReq).pipe(
        catchError(err => {

          if (err instanceof HttpErrorResponse && err.status === 401) {
            localStorage.clear();
            this.router.navigate(['/login']);
            return throwError(err);
          }

          return throwError(err);
        })
      );
    }
  }
}
