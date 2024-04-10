import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiData, ICarInventory, IEditCarInventory } from '../../Interface/interface';

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
    const API_URL = `${userApiUrl}/cars`;
    return this.http.get<IApiData[]>(API_URL);
  }

  saveCar(carObject: ICarInventory): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/cars`;
    return this.http.post<any>(API_URL, carObject);
  }

  getCar(carId: number): Observable<IApiData> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/cars/${carId}`;
    return this.http.get<IApiData>(API_URL);
  }

  updateCar(carObject: IEditCarInventory): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/cars/${carObject.id}`;
    return this.http.put<any>(API_URL, carObject);
  }
}
