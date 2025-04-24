import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../../core/services/inventory.service';
import { Inventory } from '../../../../../core/models/entities.interface';
import { ProductPreview } from '../../../../../core/models/previews.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  public productPreviews: ProductPreview[] = [];
  
  constructor(
    private inventoryService: InventoryService,
  ) {}

  ngOnInit(): void {
    this.inventoryService.getAll().subscribe((inventories: Inventory[]) => {
      const grouped = new Map<number, ProductPreview>();
  
      for (const inv of inventories.filter(inv => inv.enabled)) {
        const productId = inv.product.id!;
        if (!grouped.has(productId)) {
          grouped.set(productId, {
            product: inv.product,
            images: [],
            colors: [],
          });
        }
  
        const preview = grouped.get(productId)!;
  
        // Agregamos imagen si no existe ya
        inv.imageProducts.forEach(img => {
          if (img.url && !preview.images.includes(img.url)) {
            preview.images.push(img.url);
          }
        });
  
        // Agregamos color si no existe ya
        if (inv.color?.name && !preview.colors.includes(inv.color.name)) {
          preview.colors.push(inv.color.name);
        }
      }
  
      this.productPreviews = Array.from(grouped.values());
    });
  }
}
