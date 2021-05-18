import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Access-Control-Allow-Origin', '*');
    httpHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    httpHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
    httpHeaders.append('Access-Control-Allow-Credentials', 'true');
    return this.http.get<any>(this.apiUrl, {params, headers: httpHeaders});
  }
}
