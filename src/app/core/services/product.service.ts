import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/entities.interface';
import { ProductDetail, ProductPreview } from '../models/previews.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/product';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  save(product: Product) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getAllPreview() {
    return this.http.get<ProductPreview[]>(this.apiUrl + '/preview');
  }

  getDetailById(id: number) {
    return this.http.get<ProductDetail>(this.apiUrl + `/detail/${id}`);
  }
}
