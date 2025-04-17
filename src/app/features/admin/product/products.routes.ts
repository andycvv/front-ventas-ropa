import { Routes } from "@angular/router";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { AddProductComponent } from "./pages/add-product/add-product.component";
import { EditProductComponent } from "./pages/edit-product/edit-product.component";

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'crear',
    component: AddProductComponent
  },
  {
    path: 'editar',
    component: EditProductComponent
  }
]