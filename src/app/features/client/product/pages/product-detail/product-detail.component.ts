import { Component, CUSTOM_ELEMENTS_SCHEMA, model } from '@angular/core';
import { Color, ImageProduct, Inventory } from '../../../../../core/models/entities.interface';
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { CartService } from '../../../../../core/services/cart.service';
import { Message } from 'primeng/message';
import { ProductDetail } from '../../../../../core/models/previews.interface';
import { ProductService } from '../../../../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [GalleriaModule, Message],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailComponent {
  productDetail!: ProductDetail
  selectedColor!: string;
  selectedSize: string | null = null;
  selectedInventory!: Inventory;

  images: string[] = [];

  mostrarAlerta = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getDetailById(productId).subscribe(detail => {
      this.productDetail = detail;
      this.selectedColor = detail.inventories[0].color.name!;
      this.selectedInventory = detail.inventories[0];

      this.updateImages();
    });
  }

  onAddToCart(inventory: Inventory) {
    this.cartService.addToCart({
      inventory: inventory,
      quantity: 1,
      price: inventory.product.price
    });

    this.mostrarAlerta = true;
    setTimeout(() => this.mostrarAlerta = false, 3000);
  }

  updateImages() {
    const inv = this.productDetail.inventories.find(inv => inv.color.name === this.selectedColor)
    this.images = inv!.imageProducts.map(img => img.url!);
  }

  getAvailableColors(): Color[] {
    return this.productDetail.inventories.reduce((colors: Color[], inv) => {
      if (!colors.some(c => c.id === inv.color.id)) {
        colors.push(inv.color);
      }
      return colors;
    }, []);
  }

  getAvailableSizes(): string[] {
    return this.productDetail.inventories
      .filter(inv => inv.color.name === this.selectedColor)
      .map(inv => inv.size.value!)
  }

  onSelectColor(color: string) {
    this.selectedColor = color;
    this.selectedSize = null;
    this.selectedInventory = this.productDetail.inventories.find(inv => inv.color.name === color)!
    this.updateImages();
  }

  onSelectSize(size: string) {
    this.selectedSize = size;
    this.selectedInventory = this.productDetail.inventories.find(
      inv => inv.color.name === this.selectedColor && inv.size.value === size
    )!;
  }

  getAvailableStock(): number {
    const inv = this.productDetail.inventories.find(
      inv => inv.color.name === this.selectedColor && inv.size.value === this.selectedSize
    );
    return inv?.stock || 0;
  }
}
