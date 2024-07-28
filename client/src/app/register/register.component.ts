import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // user = {
  //   username: '',
  //   email: '',
  //   password: ''
  // };

  // constructor(private authService: AuthService, private router: Router) {}

  // register() {
  //   this.authService.register(this.user).subscribe(
  //     () => {
  //       this.router.navigate(['/login']);
  //     },
  //     (error) => {
  //       console.error('Registration error', error);
  //     }
  //   );
  // }

  credentials = {username:'', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.credentials).subscribe(
      () => {
        // Redirect to the search page on successful register
        this.router.navigate(['/search']);
      },
      (error) => {
        // Handle register error
        console.error('Register error', error);
        alert('Register failed. Please check your credentials and try again.');
      }
    );
  }
}
