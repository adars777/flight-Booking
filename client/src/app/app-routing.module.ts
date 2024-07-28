import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { BookingComponent } from './booking/booking.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'flights', component: FlightSearchComponent },
  { path: 'bookings', component: BookingComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
