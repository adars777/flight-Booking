import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://flight-booking-ofs4.onrender.com/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    console.log(credentials)
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // if (response.token) {
          // alert(response.token)
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        // }
      })
    );
  }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  // isAdmin(): boolean {
  //   const userJson = localStorage.getItem('user');
  //   if (userJson) {
  //     const user = JSON.parse(userJson);
  //     return user && user.is_admin;
  //   }
  //   return false;
  // }

  // logout(): void {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.router.navigate(['/login']);
  // }

  isLoggedIn(): boolean {
    // Check if the user is logged in (e.g., check if a valid JWT token is present in local storage)
    const token = localStorage.getItem('token');
    return !!token; // Returns true if the token is not null or empty
  }

  isAdmin(): boolean {
    // Check if the user is an admin (e.g., decode the JWT token and check the user's role)
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    // Decode the token and check the role (assuming the token payload has a 'role' field)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'admin';
  }

  logout(): void {
    // Remove the token from local storage and navigate to the login page
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }



  getUser(): any {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
  getUserId(): number {
    const user = this.getUser();
    return user ? user.id : null;
  }
}
