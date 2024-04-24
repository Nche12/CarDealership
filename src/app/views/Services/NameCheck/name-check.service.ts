import { Injectable } from '@angular/core';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameCheckService {

  constructor() { }

  doesNameExist(checkString: string, streamArray$: Observable<any>): Observable<boolean> {
    const stringToCheck$ = of(checkString.trim());
    return stringToCheck$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: any) =>
        streamArray$ ? streamArray$.pipe(
          map((data: any) =>
            data.some(
              (obj: any) => obj.name.toLowerCase() === name.toLowerCase()
            )
          )
        ) : throwError('Array is Undefined!')
      )
    );
  }

}
