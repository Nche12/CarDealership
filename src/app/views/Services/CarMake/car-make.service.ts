import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICarMake } from '../../Interface/interface';
import { Observable, shareReplay } from 'rxjs';

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
}
