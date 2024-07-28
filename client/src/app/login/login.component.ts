// import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   credentials = {
//     email: '',
//     password: ''
//   };

//   constructor(private authService: AuthService, private router: Router) {}

//   login() {
//     this.authService.login(this.credentials).subscribe(
//       () => {
//         this.router.navigate(['/search']);
//       },
//       (error) => {
//         console.error('Login error', error);
//       }
//     );
//   }
// }

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        alert(response.message)
        // Redirect to the search page on successful login
        this.router.navigate(['/search']);
      },
      (error) => {
        // Handle login error
        console.error('Login error', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }
}
