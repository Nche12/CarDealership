import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IAddCarModel,
  IApiData,
  IEditCarModel,
} from '../../Interface/interface';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarModelService {
  public carModels$!: Observable<IApiData[]>;
  constructor(private http: HttpClient) {}

  getCarModels(refresh: boolean): Observable<IApiData[]> {
    if (!this.carModels$ || refresh) {
      this.carModels$ = this.refreshCarModels().pipe(shareReplay(1));
    }
    return this.carModels$;
  }

  refreshCarModels(): Observable<IApiData[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/CarModels`;
    return this.http.get<IApiData[]>(API_URL);
  }

  getCarModel(carModelId: number): Observable<IApiData> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/CarModels/${carModelId}`;
    return this.http.get<IApiData>(API_URL);
  }

  addCarModel(carObject: IAddCarModel): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/CarModels`;
    return this.http.post<any>(API_URL, carObject);
  }

  updateCarModel(carObject: IEditCarModel): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/CarModels/${carObject.id}`;
    return this.http.put<any>(API_URL, carObject);
  }

}
