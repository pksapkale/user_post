import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiServiceService } from './auth-api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthHelperServiceService {
  cookieService: CookieService = inject(CookieService);
  authApiService: AuthApiServiceService = inject(AuthApiServiceService);
  _router: Router = inject(Router);

  // For login user
  logInUser(obj: { user_email: string; password: string }) {
    this.authApiService.loginUser(obj).subscribe({
      next: data => {
        if(data.status) {
          console.log(data);
          let userDetails = JSON.stringify({user_id: data.data.user_id , token: data.data.token });
          this.cookieService.set('user', userDetails);
          this._router.navigateByUrl(`/dashboard/${data.data.user_id}`);
        }
        else {
          alert(data.message);
          console.log('Error in {logInUser} in {auth-helper-service}');
        }
      },
      error: err => {
        console.log('Error in {logInUser} in {auth-helper-service} ERROR ----->>>>>', err);
      }
    }); 
  }

  registerUser(obj: {  
    user_first_name: string,  
    user_last_name: string,
    user_email: string, 
    user_phone: number,
    password: string,
  }) {
    this.authApiService.registerUser(obj).subscribe({
      next: data => {
        if(data.status) {
          console.log(data);
          let userDetails = JSON.stringify({user_id: data.data.user_id , token: data.data.token });
          this.cookieService.set('user', userDetails);
          this._router.navigateByUrl(`/dashboard/${data.data.user_id}`);
        }
        else {
          alert(data.message);
          console.log('Error in {registerUser} in {auth-helper-service}');
        }
      },
      error: err => {
        console.log('Error in {registerUser} in {auth-helper-service} ERROR ----->>>>>', err);
      }
    }); 
  }

  // For logout uer
  logOutuser() {
    this.cookieService.delete('user', '/');
    this._router.navigateByUrl('/');
  }

  // For check token
  checkToken(): string {
    let isLoggedIn = this.cookieService.get('user');
    return isLoggedIn;
  }
 
}
