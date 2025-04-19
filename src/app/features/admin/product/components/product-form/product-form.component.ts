import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

import { Category, Product } from '../../../../../core/models/entities.interface';

@Component({
  selector: 'app-product-form',
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Input() product: Partial<Product> = {};
  @Input() categories: Category[] = [];
  @Input() showStatusToggle: boolean = false;
  @Input() submitLabel: string = 'Guardar';
  @Input() loading: boolean = false;

  @Output() formSubmit = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  name: string = '';
  price: string = '0.00';
  description: string = '';
  selectedCategory?: Category;
  selectedStatus: { label: string; value: boolean } | null = null;

  states = [
    { label: 'Habilitado', value: true },
    { label: 'Deshabilitado', value: false },
  ];

  ngOnInit(): void {
    this.name = this.product.name || '';
    this.price = this.product.price?.toString() || '0.00';
    this.description = this.product.description || '';
    this.selectedCategory = this.product.category;
    this.selectedStatus = this.product.enabled != null
      ? (this.product.enabled ? this.states[0] : this.states[1])
      : this.states[0];
  }

  submit() {
    if (!this.selectedCategory) return;

    const newProduct: Product = {
      ...this.product,
      name: this.name,
      price: parseFloat(this.price),
      description: this.description,
      category: this.selectedCategory,
      enabled: this.selectedStatus?.value ?? true,
    };

    this.formSubmit.emit(newProduct);
  }

  onCancel() {
    this.cancel.emit();
  }
}
