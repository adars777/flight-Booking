import { Component } from '@angular/core';
import { gsap } from 'gsap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

   ngAfterViewInit():void{
    gsap.to("img",{
      delay:0.5,
      duration:5,
     transform:"translateX(95vw)",
      repeat: -1,
      ease:"none"
    })
  }
  
}
