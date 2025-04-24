import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/client/client.routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import("./features/auth/auth.routes").then(m => m.routes)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
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
