import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

  private cityUrl = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities';

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq = req.clone(
      {headers: new HttpHeaders().set('Content-Type', 'application/json')}
    );

    if (cloneReq.url.includes('/login')) {
      return next.handle(req).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse && (err.status === 403 || err.status === 401)) {
            return throwError(err);
          }
        }));
    } else {
      cloneReq = req.clone(
        {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`)}
      );

      return next.handle(cloneReq).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 401 || err.statusText === 'Unknown Error') {
            if (err.url !== this.cityUrl) {
              localStorage.clear();
              this.router.navigate(['/login']);
            }
          }
          console.log('++++');
          return throwError(err);
        })
      );
    }
  }
}
