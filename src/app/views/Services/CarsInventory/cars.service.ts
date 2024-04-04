import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiData } from '../../Interface/interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  public inventory$!: Observable<IApiData[]>;
  constructor(private http: HttpClient) {}

  getInventory(refresh: boolean): Observable<IApiData[]> {
    if (this.inventory$ || refresh) {
      this.inventory$ = this.refreshInventory();
    }
    return this.inventory$;
  }

  refreshInventory(): Observable<IApiData[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/cars`;
    return this.http.get<IApiData[]>(API_URL);
  }
}
