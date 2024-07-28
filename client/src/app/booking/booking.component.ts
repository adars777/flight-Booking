
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService, private authService: AuthService) {}

  // ngOnInit() {
  //   const userId = this.getUserId();
  //   if (userId) {
  //     this.bookingService.getUserBookings().subscribe((data: any) => {
  //       this.bookings = data;
  //     }, error => {
  //       console.error('Error loading bookings:', error);
  //     });
  //   }
  // }


  ngOnInit(): void {
    this.bookingService.getUserBookings().subscribe(
      (data: any[]) => {
        this.bookings = data;
      },
      error => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  
  getUserId() {
    const token = this.authService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id;
    }
    return null;
  }
}
