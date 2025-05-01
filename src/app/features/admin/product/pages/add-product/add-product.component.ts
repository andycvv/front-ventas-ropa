import { Category, Product } from '../../../../../core/models/entities.interface';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../../../../core/services/category.service';
import { ProductService } from '../../../../../core/services/product.service';
import { Router } from '@angular/router';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { mostrarAlertaSuccess } from '../../../../../shared/functions/alerts';

@Component({
  selector: 'app-add-product',
  imports: [
    FormsModule, 
    InputGroupModule, 
    InputGroupAddonModule, 
    InputTextModule, 
    SelectModule, 
    InputNumberModule,
    TextareaModule,
    ButtonModule,
    ProductFormComponent
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories.filter(category => category.enabled);
    });
  }

  createProduct(product: Product) {
    this.productService.save(product).subscribe(() => {
      this.router.navigate(['/admin/productos']);
      mostrarAlertaSuccess("Se creó el producto correctamente");
    });
  }

  cancel() {
    this.router.navigate(['/admin/productos']);
  }
}
