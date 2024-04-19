import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IColour } from '../../Interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ColourService {
  public colour$!: Observable<IColour[]>;
  constructor(private http: HttpClient) {}

  getColours(refresh: boolean): Observable<IColour[]> {
    if (!this.colour$ || refresh) {
      this.colour$ = this.refreshColours().pipe(
        shareReplay(1)
      );
    }
    return this.colour$;
  }

  refreshColours(): Observable<IColour[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarColours`;
    return this.http.get<IColour[]>(API_URL);
  }
}
