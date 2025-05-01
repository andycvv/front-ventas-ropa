import { Component } from '@angular/core';
import { SizeFormComponent } from "../../components/size-form/size-form.component";
import { Size } from '../../../../../core/models/entities.interface';
import { SizeService } from '../../../../../core/services/size.service';
import { Router } from '@angular/router';
import { mostrarAlertaSuccess } from '../../../../../shared/functions/alerts';

@Component({
  selector: 'app-add-size',
  imports: [SizeFormComponent],
  templateUrl: './add-size.component.html',
  styleUrl: './add-size.component.css'
})
export class AddSizeComponent {
  constructor(
    private sizeService: SizeService,
    private router: Router
  ) { }

  createSize(size: Size) {
    this.sizeService.save(size).subscribe(() => {
      this.router.navigate(['/admin/tallas']);
      mostrarAlertaSuccess("Se creó la talla correctamente");
    });
  }

  cancel() {
    this.router.navigate(['/admin/tallas'])
  }
}
