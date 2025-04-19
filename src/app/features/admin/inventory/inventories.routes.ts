import { Routes } from "@angular/router";
import { InventoryListComponent } from "./pages/inventory-list/inventory-list.component";
import { AddInventoryComponent } from "./pages/add-inventory/add-inventory.component";
import { EditInventoryComponent } from "./pages/edit-inventory/edit-inventory.component";

export const routes: Routes = [
  {
    path: '',
    component: InventoryListComponent
  },
  {
    path: 'crear',
    component: AddInventoryComponent
  },
  {
    path: 'editar/:id',
    component: EditInventoryComponent
  }
]