import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICarModel } from '../../Interface/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  constructor(
    private http: HttpClient
  ) { }

  getCarModel() : Observable<ICarModel[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/CarModels`;
    return this.http.get<ICarModel[]>(API_URL);
  }
}
