import { Component, OnInit } from '@angular/core';
import { Color } from '../../../../../core/models/entities.interface';
import { ColorService } from '../../../../../core/services/color.service';
import { TableComponent } from "../../../../../shared/components/table/table.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-list',
  imports: [TableComponent],
  templateUrl: './color-list.component.html',
  styleUrl: './color-list.component.css'
})
export class ColorListComponent implements OnInit {
  public colors: Color[] = []

  constructor(
    private colorService: ColorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.colorService.getAll().subscribe(colors => this.colors = colors);
  }

  addColor() {
    this.router.navigate(['/admin/colores/crear']);
  }
}
