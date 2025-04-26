import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Basic ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
