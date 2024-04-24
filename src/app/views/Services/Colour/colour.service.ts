import { Injectable } from '@angular/core';
import {
  Observable,
  shareReplay,
} from 'rxjs';
import { IAddColour, IApiData, IColour } from '../../Interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ColourService {
  public colours$!: Observable<IApiData>;

  constructor(private http: HttpClient) {}

  getColours(refresh: boolean): Observable<IApiData> {
    if (!this.colours$ || refresh) {
      this.colours$ = this.refreshColours().pipe(shareReplay(1));
    }
    return this.colours$;
  }

  refreshColours(): Observable<IApiData> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarColours`;
    return this.http.get<IApiData>(API_URL);
  }

  addColour(colourObject: IAddColour): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarColours`;
    return this.http.post<any>(API_URL, colourObject);
  }

  updateColour(colourObject: IColour): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarColours/${colourObject.id}`;
    return this.http.put<any>(API_URL, colourObject);
  }
  
}
