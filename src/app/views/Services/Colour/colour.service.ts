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
import { IApiData, IColour } from '../../Interface/interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ColourService {
  public colours$!: Observable<IApiData[]>;

  constructor(private http: HttpClient) {}

  getColours(refresh: boolean): Observable<IApiData[]> {
    if (!this.colours$ || refresh) {
      this.colours$ = this.refreshColours().pipe(shareReplay(1));
    }
    return this.colours$;
  }

  refreshColours(): Observable<IApiData[]> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarColours`;
    return this.http.get<IApiData[]>(API_URL);
  }

  addColour(colourObject: IColour): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarColours`;
    return this.http.post<any>(API_URL, colourObject);
  }

  updateColour(colourObject: IColour): Observable<any> {
    const userApiUrl = window.sessionStorage.getItem('userApiUrl');
    const API_URL = `${userApiUrl}/CarColours/${colourObject.id}`;
    return this.http.put<any>(API_URL, colourObject);
  }

  doesNameExist(makeString: string): Observable<boolean> {
    const colourToCheck$ = of(makeString);
    return colourToCheck$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((colourName: any) =>
        this.colours$.pipe(
          map((info: any) =>
            info.data.some(
              (colour: any) => colour.name.toLowerCase() === colourName.toLowerCase()
            )
          )
        )
      )
    );
  }
  
}
