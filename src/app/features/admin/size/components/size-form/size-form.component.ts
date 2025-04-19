import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { Size } from '../../../../../core/models/entities.interface';

@Component({
  selector: 'app-size-form',
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
  templateUrl: './size-form.component.html',
  styleUrl: './size-form.component.css'
})
export class SizeFormComponent {
    @Input() size: Partial<Size> = {};
    @Input() showStatusToggle: boolean = false;
    @Input() submitLabel: string = 'Guardar';
    @Input() loading: boolean = false;
  
    @Output() formSubmit = new EventEmitter<Size>();
    @Output() cancel = new EventEmitter<void>();
  
    value: string = '';
    selectedStatus: { label: string; value: boolean } | null = null;
  
    states = [
      { label: 'Habilitado', value: true },
      { label: 'Deshabilitado', value: false },
    ];
  
    ngOnInit(): void {
      this.value = this.size.value || '';
      
      this.selectedStatus = this.size.enabled != null
        ? (this.size.enabled ? this.states[0] : this.states[1])
        : this.states[0];
    }
  
    submit() {
      const newCategory: Size = {
        ...this.size,
        value: this.value,
        enabled: this.selectedStatus?.value ?? true,
      };
  
      this.formSubmit.emit(newCategory);
    }
  
    onCancel() {
      this.cancel.emit();
    }
}
