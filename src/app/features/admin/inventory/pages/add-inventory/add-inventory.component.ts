import { Component } from '@angular/core';
import { InventoryFormComponent } from "../../components/inventory-form/inventory-form.component";
import { InventoryService } from '../../../../../core/services/inventory.service';
import { ProductService } from '../../../../../core/services/product.service';
import { SizeService } from '../../../../../core/services/size.service';
import { ColorService } from '../../../../../core/services/color.service';
import { Color, Inventory, Product, Size } from '../../../../../core/models/entities.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  imports: [InventoryFormComponent],
  templateUrl: './add-inventory.component.html',
  styleUrl: './add-inventory.component.css'
})
export class AddInventoryComponent {
  products: Product[] = []; // Assuming you have a Product model
  sizes: Size[] = []; // Assuming you have a Size model
  colors: Color[] = []; // Assuming you have a Color model

  constructor(
    private inventoryService: InventoryService,
    private productService: ProductService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe(products => this.products = products.filter(p => p.enabled));
    this.sizeService.getAll().subscribe(sizes => this.sizes = sizes.filter(s => s.enabled));
    this.colorService.getAll().subscribe(colors => this.colors = colors.filter(c => c.enabled));
  }

  addInventory(inventory: Inventory) {
    this.inventoryService.save(inventory).subscribe(() => this.router.navigate(['/admin/inventarios']));
  }

  cancel() {
    this.router.navigate(['/admin/inventarios']);
  }
}
