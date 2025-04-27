import { Component, OnInit } from '@angular/core';
import { ProductPreview } from '../../../../../core/models/previews.interface';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../../core/services/product.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, ButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  public productPreviews: ProductPreview[] = [];
  public selectedGender: string = 'Todos';
  public genders = [
    { label: 'Todos', value: '' },
    { label: 'Hombre', value: 'Hombre' },
    { label: 'Mujer', value: 'Mujer' },
    { label: 'Niño', value: 'Niño' },
    { label: 'Niña', value: 'Niña' }
  ];
  
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(gender?: string) {
    this.selectedGender = gender || 'Todos';
    this.productService.getAllPreview()
    .subscribe(products => this.productPreviews = products.filter(p => gender ? p.gender === gender : p));
  }
}
