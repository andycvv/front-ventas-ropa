import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as string[];
  const userRole = authService.getUserRole();

  if (expectedRoles.includes(userRole || '')) {
    return true;
  } else {
    if (userRole === 'CLIENTE') {
      router.navigate(['/']);
    } else {
      router.navigate(['/admin']);
    }
    return false;
  }
};
