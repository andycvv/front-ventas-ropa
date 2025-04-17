import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, DrawerModule, ButtonModule, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  collapsed = false;

  menuItems: any[] = [
    { icon: 'pi pi-home', name: 'Panel', path: '/dashboard' },
    { icon: 'pi pi-box', name: 'Productos', path: '/bookmarks' },
    { icon: 'pi pi-tag', name: 'Categorías', path: '/reports' },
    { icon: 'pi pi-palette', name: 'Colores', path: '/reports' },
    { icon: 'pi pi-file', name: 'Tallas', path: '/reports' },
    { icon: 'pi pi-map', name: 'Inventario', path: '/reports' },
    { icon: 'pi pi-gift', name: 'Pedidos', path: '/reports' },
    { icon: 'pi pi-users', name: 'Usuarios', path: '/reports' },
  ];

  user = {
    name: 'Andy Vargas',
    role: 'Admin',
  }

  logout() {
    console.log('Logout clicked');
  }
}