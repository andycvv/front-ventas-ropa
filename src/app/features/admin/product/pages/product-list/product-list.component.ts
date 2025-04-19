import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../core/services/product.service';
import { Product } from '../../../../../core/models/entities.interface';
import { Router } from '@angular/router';
import { TableComponent } from "../../../../../shared/components/table/table.component";

@Component({
  selector: 'app-product-list',
  imports: [
    TableComponent
],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  addProduct() {
    this.router.navigate(['/admin/productos/crear']);
  }

  editProduct(id: number) {
    this.router.navigate(['/admin/productos/editar', id]);
  }
}
