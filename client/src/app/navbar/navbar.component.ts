import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust the import path as needed
import {gsap} from 'gsap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }

  ngAfterViewInit():void{
    gsap.from(".logo, li",{
      delay:0.2,
      duration:0.7,
      y:-50,
      opacity:0,
      stagger:0.3
    })
  }
}


