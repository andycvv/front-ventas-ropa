import { Routes } from "@angular/router";
import { ColorListComponent } from "./pages/color-list/color-list.component";
import { AddColorComponent } from "./pages/add-color/add-color.component";
import { EditColorComponent } from "./pages/edit-color/edit-color.component";

export const routes: Routes = [
  {
    path: '',
    component: ColorListComponent
  },
  {
    path: 'crear',
    component: AddColorComponent
  },
  {
    path: 'editar/:id',
    component: EditColorComponent
  }
]