import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () => import('./product/products.routes').then(m => m.routes)
  }
]