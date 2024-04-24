import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  shareReplay
} from 'rxjs';
import { IAddFrequency, IApiData, IFrequency } from '../../Interface/interface';

@Injectable({
  providedIn: 'root',
})
export class FrequencyService {
  public frequencies$!: Observable<IApiData>;

  constructor(private http: HttpClient) {}

  getFrequencies(refresh: boolean): Observable<IApiData> {
    if (!this.frequencies$ || refresh) {
      this.frequencies$ = this.refreshFrequencies().pipe(shareReplay(1));
    }
    return this.frequencies$;
  }

  refreshFrequencies(): Observable<IApiData> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/Frequency`;
    return this.http.get<IApiData>(API_URL);
  }

  addFrequency(colourObject: IAddFrequency): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/Frequency`;
    return this.http.post<any>(API_URL, colourObject);
  }

  updateFrequency(frequencyObject: IFrequency): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/Frequency/${frequencyObject.id}`;
    return this.http.put<any>(API_URL, frequencyObject);
  }

}
