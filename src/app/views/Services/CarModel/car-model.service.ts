import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IAddCarModel,
  ICarModel,
  IEditCarModel,
} from '../../Interface/interface';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarModelService {
  public carModels$!: Observable<ICarModel[]>;
  constructor(private http: HttpClient) {}

  getCarModels(refresh: boolean): Observable<ICarModel[]> {
    if (!this.carModels$ || refresh) {
      this.carModels$ = this.refreshCarModels().pipe(shareReplay(1));
    }
    return this.carModels$;
  }

  refreshCarModels(): Observable<ICarModel[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/CarModels`;
    return this.http.get<ICarModel[]>(API_URL);
  }

  getCarModel(carModelId: number): Observable<ICarModel> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/CarModels/${carModelId}`;
    return this.http.get<ICarModel>(API_URL);
  }

  addCarModel(carObject: IAddCarModel): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/CarModels`;
    return this.http.post<any>(API_URL, carObject);
  }

  updateCarModel(carObject: IEditCarModel): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/CarModels/${carObject.id}`;
    return this.http.post<any>(API_URL, carObject);
  }
}
