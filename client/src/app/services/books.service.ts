import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Book } from '../search-results/search-results.component';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  userBooks(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/login`, loginData, {headers: headers, withCredentials: true}).pipe(
      tap((response: any) => {
        // Handle successful login response
        console.log(response)
      })
    );

  }

  search(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/search?q=Dune`)
  }
}