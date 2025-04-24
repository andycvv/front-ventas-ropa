import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./product/products.routes').then(m => m.routes)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes').then(m => m.routes)
  }
]