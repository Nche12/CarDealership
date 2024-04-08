import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdPlatform } from '../../Interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdPlatformService {

  public adPlatform$!: Observable<IAdPlatform[]>;

  constructor(
    private http: HttpClient
  ) { }

  getAdPlatform(refresh: boolean): Observable<IAdPlatform[]> {
    if (this.adPlatform$ || refresh) {
      this.adPlatform$ = this.refreshAdPlatform();
    }
    return this.adPlatform$;
  }

  refreshAdPlatform(): Observable<IAdPlatform[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/AdvertPlatform`;
    return this.http.get<IAdPlatform[]>(API_URL);
  }
}
