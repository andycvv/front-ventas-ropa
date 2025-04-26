import { Component, OnInit } from '@angular/core';
import { ProductPreview } from '../../../../../core/models/previews.interface';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  public productPreviews: ProductPreview[] = [];
  
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getAllPreview()
      .subscribe(products => this.productPreviews = products);
  }
}
