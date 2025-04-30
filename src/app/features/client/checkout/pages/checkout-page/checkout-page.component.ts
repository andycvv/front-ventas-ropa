import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../../core/services/cart.service';
import { Address, Inventory, OrderDetail, Payment } from '../../../../../core/models/entities.interface';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AccordionModule } from 'primeng/accordion';
import { Router, RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { OrderService } from '../../../../../core/services/order.service';
import { mostrarAlertaSuccess } from '../../../../../shared/functions/alerts';

@Component({
  selector: 'app-checkout-page',
  imports: [
    StepperModule, 
    ButtonModule, 
    FormsModule, 
    InputTextModule, 
    IftaLabelModule, 
    AccordionModule,
    RouterLink,
    SlicePipe
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {
  // cart
  cartItems: OrderDetail[] = [];
  totalAmount: number = 0;
  
  // address
  address!: Address;
  
  // payment
  payment: Payment = {
    transactionId: '2938749823192731231',
    paymentMethod: 'TARJETA',
    paymentStatus: 'EXITOSO',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.items.subscribe(items => {
      this.cartItems = items;
      this.totalAmount = items.reduce((amount, item) => {
        return amount + (item.price * item.quantity)
      }, 0);
    });

    this.address = {
      country: 'Perú',
      city: '',
      street: '',
      zipCode: ''
    };
  }

  isSubmitDisabled() {
    const isAddressValid =
      this.address.city && this.address.street && this.address.zipCode &&
      this.address.city.length >= 2 && this.address.street.length >= 3 && /^[0-9]{5}$/.test(this.address.zipCode);
  
    const isPaymentValid =
      this.payment.cardNumber && this.payment.expiryDate && this.payment.cvv &&
      /^[0-9]{16}$/.test(this.payment.cardNumber) &&
      /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.payment.expiryDate) &&
      /^[0-9]{3}$/.test(this.payment.cvv);
  
    return !(isAddressValid && isPaymentValid);
  }

  payOrder() {
    this.orderService.save({
      user: {
        id: this.authService.getUserId()
      },
      totalAmount: this.totalAmount,
      status: "PAGADO",
      orderDetails: [...this.cartItems].map(detail => ({
        ...detail,
        inventory: { id: detail.inventory.id } as unknown as Inventory
      })),
      address: { ...this.address },
      payments: [{ ...this.payment }]
    }).subscribe(() => {
      this.cartService.clearCart();

      mostrarAlertaSuccess("Venta creada correctamente");

      this.router.navigate(["/cart"])
    })
  } 
}
