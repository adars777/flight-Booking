import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private baseUrl = 'http://localhost:8081/flights';

  constructor(private http: HttpClient, private authService:AuthService) {}

  // searchFlights(criteria: any) {
  //   console.log(`${this.baseUrl}/search`, { params: criteria })
  //   return this.http.get(`${this.baseUrl}/search`, { params: criteria });
  // }

  searchFlights(criteria: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    console.log(headers)
    return this.http.get(`${this.baseUrl}/search`, { headers, params: criteria });
  }



  addFlight(flight: any) {
    return this.http.post(`${this.baseUrl}`, flight);
  }

  getAllFlights() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get(`http://localhost:8081/admin/allflights`,{headers});
  }
}
