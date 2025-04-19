import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '../models/entities.interface';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/inventory'

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Inventory[]>(this.apiUrl)
  }

  save(inventory: Inventory) {
    return this.http.post<void>(this.apiUrl, inventory)
  }

  getById(id: number) {
    return this.http.get<Inventory>(this.apiUrl + `/${id}`)
  }
}
