import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-client-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {
  items: MenuItem[] | undefined;
  userInitial = 'D'
  showUserMenu = false

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {

  }
}
