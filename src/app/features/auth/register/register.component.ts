import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule, 
    InputGroupModule, 
    InputGroupAddonModule, 
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public username: string = '';
  public password: string = '';
  public email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar() {
    this.authService.register({
      email: this.email,
      password: this.password,
      username: this.username
    }).subscribe({
      next: (() => {
        this.authService.login(this.email, this.password).subscribe({
          next: () => {
            if (this.authService.getUserRole() === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/'])
            }
          },
          error: () => {
            alert('Correo o contraseña incorrectos');
          }
        })
      }),
      error: () => {
        alert('Error al registrar el usuario.');
      }
    })
  }
}
