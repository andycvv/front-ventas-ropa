import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../core/services/product.service';
import { Product } from '../../../../../core/models/entities.interface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Tag } from 'primeng/tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    Tag
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private products: Product[] = [];
  public filteredProducts: Product[] = [];

  statusOptions = [
    { label: 'Todos', value: null },
    { label: 'Habilitados', value: true },
    { label: 'Deshabilitados', value: false }
  ];
  selectedStatus: boolean | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  filterProductsByStatus() {
    if (this.selectedStatus === null) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.enabled === this.selectedStatus);
    }
  }

  addProduct() {
    this.router.navigate(['/admin/productos/crear']);
  }

  editProduct(id: number) {
    this.router.navigate(['/admin/productos/editar', id]);
  }
}
