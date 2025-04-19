import { Component } from '@angular/core';
import { CategoryFormComponent } from "../../components/category-form/category-form.component";
import { CategoryService } from '../../../../../core/services/category.service';
import { Router } from '@angular/router';
import { Category } from '../../../../../core/models/entities.interface';

@Component({
  selector: 'app-add-category',
  imports: [CategoryFormComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  createCategory(category: Category) {
    this.categoryService.save(category).subscribe(() => this.router.navigate(['/admin/categorias']));
  }

  cancel() {
    this.router.navigate(['/admin/categorias']);
  }
}
