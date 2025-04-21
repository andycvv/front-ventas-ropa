import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () => import('./product/products.routes').then(m => m.routes)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./category/categories.routes').then(m => m.routes)
  },
  {
    path: 'colores',
    loadChildren: () => import('./color/colors.routes').then(m => m.routes)
  },
  {
    path: 'tallas',
    loadChildren: () => import('./size/sizes.routes').then(m => m.routes)
  },
  {
    path: 'inventarios',
    loadChildren: () => import('./inventory/inventories.routes').then(m => m.routes)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./order/orders.routes').then(m => m.routes)
  }
]