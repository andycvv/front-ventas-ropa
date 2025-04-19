import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../../shared/components/table/table.component";
import { InventoryService } from '../../../../../core/services/inventory.service';
import { Inventory } from '../../../../../core/models/entities.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  imports: [TableComponent],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements OnInit {
  public inventories: Inventory[] = []
  
  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inventoryService.getAll().subscribe(inventories => this.inventories = inventories)
  }

  addInventory() {
    this.router.navigate(['/admin/inventarios/crear'])
  }
}
