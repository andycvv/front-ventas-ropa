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
    ButtonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  name: string = '';

  price: string = '0.00';

  selectedCategory: Category | null = null;

  description: string = '';

  categories: Category[] = [
    {id: 1, name: 'Category 1'},
    {id: 2, name: 'Category 2'},
  ];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
    });
  }

  createProduct() {
    const product: Product = {
      name: this.name,
      price: parseFloat(this.price || '0'),
      description: this.description,
      enabled: true,
      category: this.selectedCategory || { id: 0, name: '' },
    };

    this.productService.save(product).subscribe(() => this.router.navigate(['/admin/productos']));
  }

  cancel() {
    this.router.navigate(['/admin/productos']);
  }
}
