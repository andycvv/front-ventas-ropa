import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-client-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent implements OnInit {
  items: MenuItem[] | undefined;
  username = ''
  showUserMenu = false;
  cartItemCount = 0;

  isLogged = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn()
    this.username = this.authService.getUsername() ?? ''
    this.cartService.items.subscribe(items => this.cartItemCount = items.length)
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}
