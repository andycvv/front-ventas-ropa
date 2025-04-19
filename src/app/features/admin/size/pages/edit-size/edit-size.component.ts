import { Component, OnInit } from '@angular/core';
import { SizeService } from '../../../../../core/services/size.service';
import { Size } from '../../../../../core/models/entities.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SizeFormComponent } from "../../components/size-form/size-form.component";

@Component({
  selector: 'app-edit-size',
  imports: [SizeFormComponent],
  templateUrl: './edit-size.component.html',
  styleUrl: './edit-size.component.css'
})
export class EditSizeComponent implements OnInit {
  public size!: Size
  
  constructor(
    private sizeService: SizeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/admin/tallas']);
      return;
    }
    
    this.sizeService.getById(parseInt(id)).subscribe(size => {
      this.size = {
        ...size,
        id: size.id,
        value: size.value,
        enabled: size.enabled
      }
    });
  }

  createSize(size: Size) {
    this.sizeService.save(size).subscribe(() => this.router.navigate(['/admin/tallas']));
  }

  cancel() {
    this.router.navigate(['/admin/tallas'])
  }
}
