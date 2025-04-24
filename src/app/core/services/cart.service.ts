import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderDetail } from '../models/entities.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: OrderDetail[] = [];

  private _items: BehaviorSubject<OrderDetail[]>;

  constructor() {
    this._items = new BehaviorSubject<OrderDetail[]>([]);
  }

  get items() {
    return this._items.asObservable();
  }

  addToCart(item: OrderDetail) {
    const itemExists = this.cartItems.some(cartItem => cartItem.inventory.id === item.inventory.id)

    if (!itemExists) {
      this.cartItems.push(item);
      this._items.next(this.cartItems)
      return;
    }
      
    this.cartItems = this.cartItems.map(cartItem => {
      if (cartItem.inventory.id === item.inventory.id) return {
        ...cartItem,
        quantity: cartItem.quantity + 1
      };

      return cartItem;
    })

    this._items.next(this.cartItems);
  }

  removeFromCart(inventoryId: number) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.inventory.id !== inventoryId);
    this._items.next(this.cartItems);
  }
}
