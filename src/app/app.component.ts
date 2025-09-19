import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ActionBarComponent } from './header/action-bar/action-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, ActionBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(router:Router){

  }
  title = 'maTools';
}
