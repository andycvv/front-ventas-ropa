import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Tag } from 'primeng/tag';
import { ColorPicker } from 'primeng/colorpicker';


@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    Tag,
    ColorPicker
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: { field: string, header: string }[] = [];
  @Input() baseEditRoute: string = '';
  @Input() showStatusFilter: boolean = true;
  @Input() showNameFilter: boolean = true;

  @Output() onAdd = new EventEmitter<void>();

  filteredData: any[] = [];
  selectedStatus: boolean | null = null;
  searchTerm: string = '';

  ngOnChanges() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredData = this.data.filter(item => {
      const matchesStatus = this.selectedStatus === null || item.enabled === this.selectedStatus;

      const matches = this.columns.some(column => {
        const value = this.getNestedValue(item, column.field);
        return typeof value === 'string' && value.toLowerCase().includes(this.searchTerm.toLowerCase());
      });

      return matchesStatus && matches;
    });
  }

  editItem(id: number) {
    window.location.href = `${this.baseEditRoute}/${id}`;
  }

  addItem() {
    this.onAdd.emit();
  }

  statusOptions = [
    { label: 'Todos', value: null },
    { label: 'Habilitados', value: true },
    { label: 'Deshabilitados', value: false }
  ];

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((obj, key) => obj && obj[key], obj);
  }
}
