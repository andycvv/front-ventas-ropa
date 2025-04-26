import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CLIENTE'] },
    children: [
      {
        path: '',
        loadChildren: () => import('./features/client/client.routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'auth',
    component: ClientLayoutComponent,
    loadChildren: () => import("./features/auth/auth.routes").then(m => m.routes)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: '',
        loadChildren: () => import("./features/admin/admin.routes").then(m => m.routes)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
