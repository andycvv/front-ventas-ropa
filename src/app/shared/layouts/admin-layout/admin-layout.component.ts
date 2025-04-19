import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, DrawerModule, ButtonModule, CommonModule, RouterLink],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  collapsed = false;

  menuItems: any[] = [
    { icon: 'pi pi-home', name: 'Panel', path: '/admin' },
    { icon: 'pi pi-box', name: 'Productos', path: 'productos' },
    { icon: 'pi pi-tag', name: 'Categorías', path: 'categorias' },
    { icon: 'pi pi-palette', name: 'Colores', path: 'colores' },
    { icon: 'pi pi-file', name: 'Tallas', path: 'tallas' },
    { icon: 'pi pi-map', name: 'Inventarios', path: 'inventarios' },
    { icon: 'pi pi-gift', name: 'Pedidos', path: 'pedidos' },
    { icon: 'pi pi-users', name: 'Usuarios', path: 'usuarios' },
  ];

  user = {
    name: 'Andy Vargas',
    role: 'Admin',
  }

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.collapsed = window.innerWidth < 768;
  }

  logout() {
    console.log('Logout clicked');
  }
}