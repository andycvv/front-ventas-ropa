import { Component, OnInit } from '@angular/core';
import { ColorFormComponent } from "../../components/color-form/color-form.component";
import { Color } from '../../../../../core/models/entities.interface';
import { ColorService } from '../../../../../core/services/color.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mostrarAlertaSuccess } from '../../../../../shared/functions/alerts';

@Component({
  selector: 'app-edit-color',
  imports: [ColorFormComponent],
  templateUrl: './edit-color.component.html',
  styleUrl: './edit-color.component.css'
})
export class EditColorComponent implements OnInit {
  public color!: Color

  constructor(
    private colorService: ColorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/admin/colores']);
      return;
    }

    this.colorService.getById(parseInt(id)).subscribe((color) => {
      this.color = {
        id: color.id,
        name: color.name,
        code: color.code,
        enabled: color.enabled
      }
    });
  }

  cancel() {
    this.router.navigate(['/admin/colores']);
  }

  editColor(color: Color) {
    this.colorService.save(color).subscribe(() => {
      this.router.navigate(['/admin/colores']);
      mostrarAlertaSuccess("Se actualizó el color correctamente");
    });
  }
  
}
