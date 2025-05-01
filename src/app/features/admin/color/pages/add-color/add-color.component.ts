import { Component } from '@angular/core';
import { ColorFormComponent } from "../../components/color-form/color-form.component";
import { ColorService } from '../../../../../core/services/color.service';
import { Color } from '../../../../../core/models/entities.interface';
import { Router } from '@angular/router';
import { mostrarAlertaSuccess } from '../../../../../shared/functions/alerts';

@Component({
  selector: 'app-add-color',
  imports: [ColorFormComponent],
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.css'
})
export class AddColorComponent {
  constructor(
    private colorService: ColorService,
    private router: Router
  ) { }

  createColor(color: Color) {
    this.colorService.save(color).subscribe(() => {
      this.router.navigate(['/admin/colores']);
      mostrarAlertaSuccess("Se creó el color correctamente");
    });
  }

  cancel() {
    this.router.navigate(['/admin/colores']);
  }
}
