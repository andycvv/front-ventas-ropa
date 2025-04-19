import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { Color, ImageProduct, Inventory, Product, Size } from '../../../../../core/models/entities.interface';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Image } from 'primeng/image';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-inventory-form',
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    InputText,
    Image,
    IftaLabelModule,
    InputTextModule,
    InputGroup,
    InputGroupAddon,
    SelectModule
  ],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.css'
})
export class InventoryFormComponent {
  @Input() inventory?: Inventory;
  @Input() products: Product[] = [];
  @Input() sizes: Size[] = [];
  @Input() colors: Color[] = [];
  @Input() submitLabel = 'Guardar';
  @Input() loading = false;
  @Input() showStatusToggle: boolean = false;

  @Output() formSubmit = new EventEmitter<Inventory>();
  @Output() cancel = new EventEmitter<void>();

  stock: number = 0;
  selectedStatus: { label: string; value: boolean } | null = null;

  states = [
    { label: 'Habilitado', value: true },
    { label: 'Deshabilitado', value: false },
  ];

  selectedProduct?: Product;
  selectedSize?: Size;
  selectedColor?: Color;

  imageUrl: string = '';
  imageProducts: ImageProduct[] = [];

  ngOnInit() {
    if (this.inventory) {
      this.stock = this.inventory.stock ?? 0;

      this.selectedStatus = this.inventory.enabled != null
      ? (this.inventory.enabled ? this.states[0] : this.states[1])
      : this.states[0];

      this.selectedProduct = this.inventory.product;
      this.selectedSize = this.inventory.size;
      this.selectedColor = this.inventory.color;
      this.imageProducts = this.inventory.imageProducts ?? [];
    }
  }

  addImage() {
    if (this.imageUrl.trim()) {
      this.imageProducts.push({ url: this.imageUrl });
      this.imageUrl = '';
    }
  }

  removeImage(index: number) {
    this.imageProducts.splice(index, 1);
  }

  submit() {
    const inventory: Inventory = {
      id: this.inventory?.id,
      stock: this.stock,
      enabled: this.selectedStatus?.value ?? true,
      product: this.selectedProduct!,
      size: this.selectedSize!,
      color: this.selectedColor!,
      imageProducts: this.imageProducts,
    };
    this.formSubmit.emit(inventory);
  }
}
