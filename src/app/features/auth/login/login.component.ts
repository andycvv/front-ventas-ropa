import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../core/services/auth.service';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule, 
    InputGroupModule, 
    InputGroupAddonModule, 
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    Message
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  public existsError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ingresar() {
    this.authService.login(this.email, this.password).subscribe({
      next: (data) => {
        localStorage.setItem('username', data.username!)
        if (this.authService.getUserRole() === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/'])
        }
      },
      error: () => {
        this.existsError = true;
      }
    });
  }
}
