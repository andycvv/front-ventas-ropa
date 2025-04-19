import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../../shared/components/table/table.component";
import { Size } from '../../../../../core/models/entities.interface';
import { SizeService } from '../../../../../core/services/size.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-size-list',
  imports: [TableComponent],
  templateUrl: './size-list.component.html',
  styleUrl: './size-list.component.css'
})
export class SizeListComponent implements OnInit {
  public sizes: Size[] = [];

  constructor(
    private sizeService: SizeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sizeService.getAll().subscribe(sizes => this.sizes = sizes)
  }

  addSize() {
    this.router.navigate(['/admin/tallas/crear'])
  }
}
