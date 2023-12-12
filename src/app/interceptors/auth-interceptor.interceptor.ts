import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let cookieService: any = inject(CookieService);
  let user = cookieService.get('user');
  if (user) {
    let token = JSON.parse(user).token;
    let authReq: any;
    authReq = req.clone({
      headers: req.headers.set(`Authorization`, `${token}`),
    });
    return next(authReq);
  } else {
    return next(req);
  }
};
