import { Component, CUSTOM_ELEMENTS_SCHEMA, model } from '@angular/core';
import { Color, ImageProduct, Inventory } from '../../../../../core/models/entities.interface';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../../../../core/services/inventory.service';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { CartService } from '../../../../../core/services/cart.service';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, GalleriaModule, Message],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailComponent {
  productInventories: Inventory[] = [];
  selectedInventory!: Inventory;
  productName = '';
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  images: string[] = [];

  mostrarAlerta = false;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.inventoryService.getAll().subscribe(inventories => {
      this.productInventories = inventories.filter(inv => inv.product && inv.product.id === productId && inv.enabled);
      this.selectedInventory = inventories[0] || null;
      this.productName = this.productInventories[0]?.product.name || '';
      this.selectedColor = this.productInventories[0]?.color.name || null;
      this.updateImages();
    });
  }

  onAddToCart(inventory: Inventory) {
    this.cartService.addToCart({
      inventory: inventory,
      quantity: 1,
      price: inventory.product.price
    });

    this.mostrarAlerta = !this.mostrarAlerta;
  }

  updateImages() {
    const colorInventory = this.productInventories.find(inv => inv.color.name === this.selectedColor);
    this.images = colorInventory?.imageProducts.map(img => img.url || '') || []; 
  }

  getAvailableColors(): Color[] {
    const uniqueColorsMap = new Map<number, Color>();

    this.productInventories.forEach(inv => {
      if (!uniqueColorsMap.has(inv.color.id!)) {
        uniqueColorsMap.set(inv.color.id!, inv.color);
      }
    });
  
    return Array.from(uniqueColorsMap.values());
  }

  getAvailableSizes(): string[] {
    return this.productInventories
      .filter(inv => inv.color.name === this.selectedColor)
      .map(inv => inv.size.value || '');
  }

  onSelectColor(color: string) {
    this.selectedColor = color;
    this.selectedSize = null;
    this.selectedInventory = this.productInventories.find(inv => inv.color.name === color)!;
    this.updateImages();
  }

  onSelectSize(size: string) {
    this.selectedSize = size;
    this.selectedInventory = this.productInventories.find(
      inv => inv.color.name === this.selectedColor && inv.size.value === size
    )!;
  }

  getAvailableStock(): number {
    const inv = this.productInventories.find(
      inv => inv.color.name === this.selectedColor && inv.size.value === this.selectedSize
    );
    return inv?.stock || 0;
  }
}
