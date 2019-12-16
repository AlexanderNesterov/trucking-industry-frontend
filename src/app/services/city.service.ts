import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private cityUrl = 'http://localhost:8080/trucking-industry/cities';
  private apiUrl = 'http://geodb-free-service.wirefreethought.com/v1/geo/cities';

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<City[]> {
    return this.http.get<City[]>(this.cityUrl);
  }

  public save(city: City): Observable<boolean> {
    return this.http.post<boolean>(this.cityUrl, city);
  }

  public getCityFromApi(name: string): Observable<any> {
    const params = new HttpParams()
      .set('namePrefix', name);
    return this.http.get<any>(this.apiUrl, {params});
  }
}
