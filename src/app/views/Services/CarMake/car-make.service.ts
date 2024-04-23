import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IAddCarMake,
  IAddCarModel,
  ICarMake,
  IEditCarModel,
} from '../../Interface/interface';
import {
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
export class CarMakeService {
  public carMakes$!: Observable<ICarMake[]>;

  constructor(private http: HttpClient) {}

  getCarMakes(refresh: boolean): Observable<ICarMake[]> {
    if (!this.carMakes$ || refresh) {
      this.carMakes$ = this.refreshCarMakes().pipe(shareReplay(1));
    }
    return this.carMakes$;
  }

  refreshCarMakes(): Observable<ICarMake[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarMakes`;
    return this.http.get<ICarMake[]>(API_URL);
  }

  addCarMake(carMakeObject: IAddCarMake): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarMakes`;
    return this.http.post<any>(API_URL, carMakeObject);
  }

  updateCarMake(carMakeObject: ICarMake): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarMakes/${carMakeObject.id}`;
    return this.http.put<any>(API_URL, carMakeObject);
  }

  doesNameExist(makeString: string): Observable<boolean> {
    const carModelToCheck$ = of(makeString);
    return carModelToCheck$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((make: any) =>
        this.carMakes$.pipe(
          map((info: any) =>
            info.data.some(
              (carModel: any) =>
                carModel.name.toLowerCase() === make.toLowerCase()
            )
          )
        )
      )
    );
  }
}
