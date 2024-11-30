import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'frontend'
  showMenu = false
  showProfileMenu = false


  showHideMenu(){
    this.showMenu = !this.showMenu
  }
  showHideProfileMenu(){
    this.showProfileMenu = !this.showProfileMenu
  }
}
