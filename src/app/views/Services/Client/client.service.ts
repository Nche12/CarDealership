import { Injectable } from '@angular/core';
import { IClient } from '../../Interface/interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
public client$!: Observable<IClient[]>;
  constructor(
    private http: HttpClient
  ) { }

  getClients(refresh: boolean): Observable<IClient[]> {
    if (this.client$ || refresh) {
      this.client$ = this.refreshClients();
    }
    return this.client$;
  }

  refreshClients(): Observable<IClient[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    let API_URL = `${userApiUrl}/clients`;
    return this.http.get<IClient[]>(API_URL);
  }

}
