import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IApiData } from '../../Interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public contacts$!: Observable<IApiData[]>;
  constructor(private http: HttpClient) {}

  getContacts(refresh: boolean): Observable<IApiData[]> {
    if (!this.contacts$ || refresh) {
      this.contacts$ = this.refreshContacts().pipe(shareReplay(1));
    }
    return this.contacts$;
  }

  refreshContacts(): Observable<IApiData[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/Contacts`;
    return this.http.get<IApiData[]>(API_URL);
  }

  
}
