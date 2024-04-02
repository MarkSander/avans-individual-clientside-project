/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class UserService {
  endpoint = 'http://localhost:3000/api/user';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get all items.
   *
   * @options options - optional URL queryparam options
   */
  public list(): Observable<IUser[]> {
    console.log(`list ${this.endpoint}`);

    return this.http.get<ApiResponse<IUser[]>>(this.endpoint).pipe(
      map((response: any) => response.results as IUser[]),
      tap(console.log),
      catchError(this.handleError)
    );
  }

  /**
   * Get a single item from the service.
   *
   */
  public getOne(id: string | null, options?: any): Observable<IUser> {
    console.log(`read ${this.endpoint}`);
    return this.http
      .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  public edit(user: IUser, options?: any): Observable<IUser> {
    console.log(`edit ${this.endpoint}`);
    return this.http
      .put<ApiResponse<IUser>>(`${this.endpoint}/${user._id}`, user, {
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  public delete(id: string) {
    console.log(`delete ${this.endpoint}`);
    return this.http
      .delete<ApiResponse<void>>(`${this.endpoint}/${id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }
  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in CardService', error);

    return throwError(() => new Error(error.message));
  }
}