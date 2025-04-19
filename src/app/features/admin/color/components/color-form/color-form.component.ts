import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { Color } from '../../../../../core/models/entities.interface';
import { ColorPicker } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-color-form',
  imports: [FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    ColorPicker
  ],
  templateUrl: './color-form.component.html',
  styleUrl: './color-form.component.css'
})
export class ColorFormComponent {
  @Input() color: Partial<Color> = {};
  @Input() showStatusToggle: boolean = false;
  @Input() submitLabel: string = 'Guardar';
  @Input() loading: boolean = false;

  @Output() formSubmit = new EventEmitter<Color>();
  @Output() cancel = new EventEmitter<void>();

  name: string = '';
  code: string = '#000000';
  selectedStatus: { label: string; value: boolean } | null = null;

  states = [
    { label: 'Habilitado', value: true },
    { label: 'Deshabilitado', value: false },
  ];

  ngOnInit(): void {
    console.log(this.color);
    this.name = this.color.name || '';
    this.code = this.color.code || '#000000';
    this.selectedStatus = this.color.enabled != null
      ? (this.color.enabled ? this.states[0] : this.states[1])
      : this.states[0];
  }

  submit() {
    const newColor: Color = {
      ...this.color,
      name: this.name,
      code: this.code,
      enabled: this.selectedStatus?.value ?? true
    };

    this.formSubmit.emit(newColor);
  }

  onCancel() {
    this.cancel.emit();
  }
}
