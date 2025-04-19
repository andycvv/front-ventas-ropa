import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../../../shared/components/table/table.component";
import { Category } from '../../../../../core/models/entities.interface';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  imports: [TableComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  filteredCategories: Category[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => this.filteredCategories = categories);
  }

  addCategory() {
    this.router.navigate(['/admin/categorias/crear']);
  }
}
