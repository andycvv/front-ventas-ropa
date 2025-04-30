import { Component } from '@angular/core';
import { CartService } from '../../../../../core/services/cart.service';
import { OrderService } from '../../../../../core/services/order.service';
import { Inventory, OrderDetail } from '../../../../../core/models/entities.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  public cartItems: OrderDetail[] = []
  public totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.items.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  increaseQuantity(item: OrderDetail) {
    item.quantity++;
    this.calculateTotalPrice();
  }
  
  decreaseQuantity(item: OrderDetail) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.inventory.product.price * item.quantity);
    }, 0);
  }

  payOrder() {
    this.router.navigate(["/checkout"])
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id)
  }
}
