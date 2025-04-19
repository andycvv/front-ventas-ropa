import { Routes } from "@angular/router";
import { CategoryListComponent } from "./pages/category-list/category-list.component";
import { AddCategoryComponent } from "./pages/add-category/add-category.component";
import { EditCategoryComponent } from "./pages/edit-category/edit-category.component";

export const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'crear',
    component: AddCategoryComponent
  },
  {
    path: 'editar/:id',
    component: EditCategoryComponent
  }
]