import { Injectable } from '@angular/core';
import { IAddClient, IApiData, IClient } from '../../Interface/interface';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
public client$!: Observable<IApiData[]>;
  constructor(
    private http: HttpClient
  ) { }

  getClients(refresh: boolean): Observable<IApiData[]> {
    if (!this.client$ || refresh) {
      this.client$ = this.refreshClients().pipe(
        shareReplay(1)
      );
    }
    return this.client$;
  }

  refreshClients(): Observable<IApiData[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/clients`;
    return this.http.get<IApiData[]>(API_URL);
  }

  addClient(clientObject: IAddClient): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/Clients`;
    return this.http.post<any>(API_URL, clientObject);
  }

  updateClient(clientObject: IClient): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/Clients/${clientObject.id}`;
    return this.http.put<any>(API_URL, clientObject);
  }

}
