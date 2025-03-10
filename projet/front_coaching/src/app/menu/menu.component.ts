import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
