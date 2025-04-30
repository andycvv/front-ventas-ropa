import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

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
    { icon: 'pi pi-gift', name: 'Ventas', path: 'ventas' }
  ];

  username: string = ''
  role: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername()!
    this.role = this.authService.getUserRole()!;
    this.onResize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.collapsed = window.innerWidth < 768;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}