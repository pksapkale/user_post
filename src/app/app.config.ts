import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),
  ],
};
