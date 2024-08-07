// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl : string = 'https:/localhost:3000/'; // Use your server's URL

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/login`)
      .pipe(
        catchError(this.handleError)
      );
  }

    // Handle any errors from the API
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error); // for demo purposes only
    throw error;
  }


}