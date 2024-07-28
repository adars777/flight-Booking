// import { Component } from '@angular/core';
// import { FlightService } from '../flight.service';
// import { BookingService } from '../booking.service';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-flight-search',
//   templateUrl: './flight-search.component.html',
//   styleUrls: ['./flight-search.component.css']
// })
// export class FlightSearchComponent {
//   displayedColumns: string[] = ['flightNumber', 'source', 'destination', 'departureTime', 'actions'];

//   searchCriteria = { source: '', destination: '', travel_date: '' };
//   flights = [];

//   constructor(
//     private flightService: FlightService,
//     private bookingService: BookingService,
//     private authService: AuthService
//   ) {}

//   searchFlights() {
//     this.flightService.searchFlights(this.searchCriteria).subscribe((data: any) => {
//       this.flights = data;
//     });
//   }

//   bookFlight(flightId: number) {
//     const booking = {
//       user_id: this.getUserId(),
//       flight_id: flightId,
//       booking_date: new Date().toISOString().split('T')[0], // Today's date
//       status: 'confirmed',
//       payment_method: 'credit_card',
//       payment_status: 'paid'
//     };
//     this.bookingService.createBooking(booking).subscribe(() => {
//       alert('Booking successful!');
//     });
//   }

//   getUserId() {
//     // Decode JWT token to get user ID
//     const token = this.authService.getToken();
//     if (token) {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.user_id;
//     }
//     return null;
//   }
// }

import { Component } from '@angular/core';
import { FlightService } from '../flight.service';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  searchCriteria = { source: '', destination: '', travel_date: '' };
  flights: any[] = [];
  displayedColumns: string[] = ['flightNumber', 'source', 'destination', 'departureTime', 'actions'];

  constructor(
    private flightService: FlightService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  searchFlights() {
    this.flightService.searchFlights(this.searchCriteria).subscribe((data: any) => {
      this.flights = data;
    }, error => {
      console.error('Error fetching flights:', error);
    });
  }

  bookFlight(flight: any) {
    const booking = {
      // user_id: this.getUserId(),
      flight_id: flight.id,
      booking_date: new Date().toISOString().split('T')[0], // Today's date
      status: 'confirmed',
      payment_method: 'credit_card',
      payment_details: 'paid'
    };
    this.bookingService.createBooking(booking).subscribe(() => {
      alert('Booking successful!');
    }, error => {
      console.error('Error booking flight:', error);
      alert('Booking failed. Please try again.');
    });
  }

  getUserId() {
    const user = this.authService.getUserId();
    return user
    // if (token) {
    //   const payload = JSON.parse(atob(token.split('.')[1]));
    //   return payload.user_id;
    // }
    // return null;
  }
}
