import { Component } from '@angular/core';
import { CategoryFormComponent } from "../../components/category-form/category-form.component";
import { Category } from '../../../../../core/models/entities.interface';
import { CategoryService } from '../../../../../core/services/category.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [CategoryFormComponent],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  public category!: Category
  private id!: number;
  
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = parseInt(id || '0');
    if (!id) {
      this.router.navigate(['/admin/categorias']);
      return;
    }

    this.categoryService.getById(parseInt(id)).subscribe((category) => {
      this.category = {
        id: category.id,
        name: category.name,
        enabled: category.enabled
      }
    });
  }

  editCategory(category: Category) {
    this.categoryService.save(category).subscribe(() => this.router.navigate(['/admin/categorias']));
  }

  cancel() {
    this.router.navigate(['/admin/categorias']);
  }
}
