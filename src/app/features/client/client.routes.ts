import { Routes } from "@angular/router";
import { CheckoutPageComponent } from "./checkout/pages/checkout-page/checkout-page.component";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./product/products.routes').then(m => m.routes)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes').then(m => m.routes)
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  }
]