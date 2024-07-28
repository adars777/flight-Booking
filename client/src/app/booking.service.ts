import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:8081/bookings';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createBooking(booking: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    // console.log(headers)
    // console.log(booking)
    return this.http.post(`${this.baseUrl}/`, booking, { headers });
  }



  getUserBookings(): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    return this.http.get<any[]>(`${this.baseUrl}/mybooking`, { headers });
  }

  getAllBookings(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    return this.http.get(`${this.baseUrl}/mybooking`, { headers });
  }

  cancelBooking(bookingId: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    return this.http.delete(`${this.baseUrl}/cancel/${bookingId}`, { headers });
  }

  updateBooking(bookingId: number, booking: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    return this.http.put(`${this.baseUrl}/update/${bookingId}`, booking, {
      headers,
    });
  }
}
