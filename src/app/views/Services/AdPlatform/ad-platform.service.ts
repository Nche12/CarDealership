import { Injectable } from '@angular/core';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import {
  IAdPlatform,
  IAddAdPlatform,
  IApiData,
} from '../../Interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdPlatformService {
  public adPlatforms$!: Observable<IApiData[]>;

  constructor(private http: HttpClient) {}

  getAdPlatform(refresh: boolean): Observable<IApiData[]> {
    if (!this.adPlatforms$ || refresh) {
      this.adPlatforms$ = this.refreshAdPlatform().pipe(shareReplay(1));
    }
    return this.adPlatforms$;
  }

  refreshAdPlatform(): Observable<IApiData[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/AdvertPlatform`;
    return this.http.get<IApiData[]>(API_URL);
  }

  addAdPlatform(platformObject: IAddAdPlatform): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/AdvertPlatform`;
    return this.http.post<any>(API_URL, platformObject);
  }

  updateAdPlatform(platformObject: IAdPlatform): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/AdvertPlatform/${platformObject.id}`;
    return this.http.put<any>(API_URL, platformObject);
  }

}
