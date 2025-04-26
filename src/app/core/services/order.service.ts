import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/entities.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/order'

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Order[]>(this.apiUrl)
  }

  save(order: Order) {
    return this.http.post<void>(this.apiUrl, order)
  }

  getById(id: number) {
    return this.http.get<Order>(this.apiUrl + `/${id}`)
  }

  updateState(order: Order) {
    return this.http.post<void>(this.apiUrl + '/state', order)
  }
}
