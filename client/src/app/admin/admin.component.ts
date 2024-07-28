

import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newFlight = {
    airline: '',
    flight_number: '',
    departure_city: '',
    arrival_city: '',
    departure_time: '',
    arrival_time: '',
    price: 0,
    available_seats: 0
  };
  flights: any[] = [];
  bookings: any[] = [];
  displayedColumns: string[] = [
    'airline', 'flight_number', 'departure_city', 'arrival_city', 
    'departure_time', 'arrival_time', 'price', 'available_seats'
  ];
  bookingDisplayedColumns: string[] = ['user_id', 'flight_id', 'booking_date', 'status'];

  constructor(private flightService: FlightService, private bookingService: BookingService) {}

  ngOnInit() {
    this.loadFlights();
    this.loadBookings();
  }

  addFlight() {
    this.flightService.addFlight(this.newFlight).subscribe(() => {
      this.loadFlights();
      this.resetNewFlightForm();
    }, error => {
      console.error('Error adding flight:', error);
    });
  }

  loadFlights() {
    this.flightService.getAllFlights().subscribe((data: any) => {
      this.flights = data;
    }, error => {
      console.error('Error loading flights:', error);
    });
  }

  loadBookings() {
    this.bookingService.getAllBookings().subscribe((data: any) => {
      this.bookings = data;
    }, error => {
      console.error('Error loading bookings:', error);
    });
  }

  resetNewFlightForm() {
    this.newFlight = {
      airline: '',
      flight_number: '',
      departure_city: '',
      arrival_city: '',
      departure_time: '',
      arrival_time: '',
      price: 0,
      available_seats: 0
    };
  }
}
