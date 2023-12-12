import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiServiceService {
  api_url: string = 'http://localhost:8001';
  _http: HttpClient = inject(HttpClient);

  loginUser(obj: { user_email: string; password: string }): Observable<any> {
    return this._http.post(this.api_url + '/auth/login', obj);
  }

  registerUser(obj: {
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_phone: number;
    password: string;
  }): Observable<any> {
    return this._http.post(this.api_url + '/auth/signup', obj);
  }
}
