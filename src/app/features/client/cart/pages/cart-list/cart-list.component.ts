import { Component } from '@angular/core';
import { CartService } from '../../../../../core/services/cart.service';
import { OrderService } from '../../../../../core/services/order.service';
import { Inventory, OrderDetail } from '../../../../../core/models/entities.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [CommonModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  public cartItems: OrderDetail[] = []
  public totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.items.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.inventory.product.price * item.quantity);
    }, 0);
  }

  createOrder() {
    // console.log({
    //   user: {
    //     id: 1
    //   },
    //   totalAmount: this.totalPrice,
    //   status: "PAGADO",
    //   orderDetails: [...this.cartItems].map(detail => ({
    //     ...detail,
    //     inventory: {
    //       id: detail.inventory.id
    //     }
    //   }))
    // })
    this.orderService.save({
      user: {
        id: 1
      },
      totalAmount: this.totalPrice,
      status: "PAGADO",
      orderDetails: [...this.cartItems].map(detail => ({
        ...detail,
        inventory: { id: detail.inventory.id } as unknown as Inventory
      }))
    }).subscribe(() => this.router.navigate(["/"]))
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id)
  }
}
