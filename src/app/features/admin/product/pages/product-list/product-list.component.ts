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
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-product-list',
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    Tag,
    InputText
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

  searchTerm: string = '';

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

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesStatus = this.selectedStatus === null || product.enabled === this.selectedStatus;
      const matchesName = this.searchTerm === '' || product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesStatus && matchesName;
    });
  }
  

  addProduct() {
    this.router.navigate(['/admin/productos/crear']);
  }

  editProduct(id: number) {
    this.router.navigate(['/admin/productos/editar', id]);
  }
}
