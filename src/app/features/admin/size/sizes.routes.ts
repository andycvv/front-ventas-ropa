import { Routes } from "@angular/router";
import { SizeListComponent } from "./pages/size-list/size-list.component";
import { AddSizeComponent } from "./pages/add-size/add-size.component";
import { EditSizeComponent } from "./pages/edit-size/edit-size.component";

export const routes: Routes = [
  {
    path: '',
    component: SizeListComponent
  },
  {
    path: 'crear',
    component: AddSizeComponent
  },
  {
    path: 'editar/:id',
    component: EditSizeComponent
  }
]