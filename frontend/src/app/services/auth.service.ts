import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/login`, loginData, {headers: headers, withCredentials: true}).pipe(
      tap((response: any) => {
        // Handle successful login response
        console.log(response)
        this.setSession(response);
      })
    );
  }

  private setSession(authResult: any): void {
    // Store authentication data (e.g., tokens)
    localStorage.setItem('access_token', authResult.token);
    // You can store other data as needed
  }

  logout(): void {
    // Remove session data
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
