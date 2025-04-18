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
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from '../../../../../core/models/entities.interface';

@Component({
  selector: 'app-edit-product',
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
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  id: number = 0;
  name: string = '';
  price: string = '0.00';
  description: string = '';
  
  categories: Category[] = [];
  selectedCategory: Category | null = null;

  status: boolean = false;
  selectedStatus: { label: string; value: boolean } | null = null;
  states = [
    { label: 'Habilitado', value: true },
    { label: 'Deshabilitado', value: false }
  ]

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
      this.name = product.name;
      this.price = product.price.toString();
      this.description = product.description;
      this.selectedStatus = product.enabled ? this.states[0] : this.states[1];
      this.selectedCategory = product.category;
    });
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  editarProducto() {
    this.productService.save({
      id: this.id,
      name: this.name,
      price: parseFloat(this.price),
      description: this.description,
      enabled: this.selectedStatus?.value || false,
      category: this.selectedCategory || {  id: 0, name: '' }
    }).subscribe(() => this.router.navigate(['/admin/productos']))
  }

  cancel() {
    this.router.navigate(['/admin/productos']);
  }
}
