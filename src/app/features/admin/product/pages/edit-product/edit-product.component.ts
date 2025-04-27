import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../core/services/category.service';
import { ProductService } from '../../../../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from '../../../../../core/models/entities.interface';
import { ProductFormComponent } from "../../components/product-form/product-form.component";

@Component({
  selector: 'app-edit-product',
  imports: [
    ProductFormComponent
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  public product!: Product

  id: number = 0;
  
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(id || '0');
    if (!id) {
      this.router.navigate(['/admin/products']);
      return;
    }

    this.productService.getById(parseInt(id)).subscribe((product) => {
      this.product = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        gender: product.gender,
        enabled: product.enabled,
        category: product.category
      }
    });

    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories.filter(category => category.enabled);
    });
  }

  editarProducto(product: Product) {
    this.productService.save(product).subscribe(() => this.router.navigate(['/admin/productos']))
  }

  cancel() {
    this.router.navigate(['/admin/productos']);
  }
}
