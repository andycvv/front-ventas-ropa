import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../core/services/order.service';
import { Order } from '../../../../../core/models/entities.interface';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { InputText } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-order-list',
  imports: [
    DropdownModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DatePipe,
    CurrencyPipe,
    BadgeModule,
    Tag,
    InputText,
    DatePicker
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  private orders: Order[] = []
  public filteredOrders: Order[] = []

  selectedStatus: { label: string; status: string } | null = null;
  searchTerm: string = '';
  dateRange: Date[] = [];

  states = [
    { label: 'Todos', value: null },
    { label: 'Pendiente', status: "PENDIENTE" },
    { label: 'Pagado', status: "PAGADO" },
    { label: 'Enviado', status: "ENVIADO" },
    { label: 'Entregado', status: "ENTREGADO" }
  ];
  
  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
      this.filteredOrders = orders;
    });
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  applyFilters() {
    this.filteredOrders = this.orders.filter(item => {
      const matchesStatus =
        this.selectedStatus === null || item.status === this.selectedStatus.status;

      const matchesUsername =
        !this.searchTerm || item.user.username.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesDate =
        !this.dateRange || this.dateRange.length < 2 ||
        (new Date(item.createdAt) >= this.dateRange[0] && new Date(item.createdAt) <= this.dateRange[1]);

      return matchesStatus && matchesUsername && matchesDate;
    });
  }

  resetFilters() {
    this.selectedStatus = null;
    this.searchTerm = '';
    this.dateRange = [];
    this.filteredOrders = [...this.orders];
    this.applyFilters();
  }
  

  updateOrderStatus(item: Order, status: string) {
    this.orderService.save({ ...item, status }).subscribe(() => {
      this.orderService.getAll().subscribe(orders => {
        this.orders = orders;
        this.filteredOrders = orders;
      });
    });
  }
}
