import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let cookieService = inject(CookieService);
  let status = cookieService.get('user') ? true : false;
  return status;
};
