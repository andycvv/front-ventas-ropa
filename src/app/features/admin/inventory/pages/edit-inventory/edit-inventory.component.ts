import { Component } from '@angular/core';
import { InventoryFormComponent } from "../../components/inventory-form/inventory-form.component";
import { Color, Inventory, Product, Size } from '../../../../../core/models/entities.interface';
import { InventoryService } from '../../../../../core/services/inventory.service';
import { ProductService } from '../../../../../core/services/product.service';
import { SizeService } from '../../../../../core/services/size.service';
import { ColorService } from '../../../../../core/services/color.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-inventory',
  imports: [InventoryFormComponent],
  templateUrl: './edit-inventory.component.html',
  styleUrl: './edit-inventory.component.css'
})
export class EditInventoryComponent {
  inventory!: Inventory
  products: Product[] = [];
  sizes: Size[] = [];
  colors: Color[] = [];

  constructor(
    private inventoryService: InventoryService,
    private productService: ProductService,
    private sizeService: SizeService,
    private colorService: ColorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe(products => this.products = products.filter(p => p.enabled));
    this.sizeService.getAll().subscribe(sizes => this.sizes = sizes.filter(s => s.enabled));
    this.colorService.getAll().subscribe(colors => this.colors = colors.filter(c => c.enabled));

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.inventoryService.getById(id).subscribe(inventory => {
          this.inventory = {
            ...inventory,
            product: inventory.product,
            size: inventory.size,
            color: inventory.color,
            imageProducts: inventory.imageProducts ?? [],
            stock: inventory.stock,
            enabled: inventory.enabled
          }
        });
      }
    });

  }

  editInventory(inventory: Inventory) {
    console.log(inventory);
    this.inventoryService.save(inventory).subscribe(() => this.router.navigate(['/admin/inventarios']));
  }

  cancel() {
    this.router.navigate(['/admin/inventarios']);
  }
}
