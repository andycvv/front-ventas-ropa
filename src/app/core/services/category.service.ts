import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/entities.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/category';

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Category[]>(this.apiUrl);
  }

  save(category: Category) {
    return this.http.post<Category>(this.apiUrl, category);
  }

  getById(id: number) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
}
