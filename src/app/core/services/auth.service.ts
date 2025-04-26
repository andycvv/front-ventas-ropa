import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/entities.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/auth'

  constructor(
    private http: HttpClient
  ) { }

  public login(email: string, password: string): Observable<User> {
    const token = btoa(`${email}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + token
    });

    return this.http.get<User>(this.apiUrl + '/getMyUser', { headers }).pipe(
      tap(user => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', user.role!.name!)
        localStorage.setItem('username', user.username!)
        localStorage.setItem('userId', user.id!.toString())
      }),
      catchError(() => {
        return throwError(() => new Error('Credenciales incorrectas'));
      })
    )
  }

  public register(user: User) {
    return this.http.post<User>(this.apiUrl + '/register', user)
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders(token ? { 'Authorization': 'Basic ' + token } : {});
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserId() {
    return parseInt(localStorage.getItem('userId')!)
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUsername(): string | null {
    return localStorage.getItem('username')
  }
}
