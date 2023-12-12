import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiServiceService {
  api_url: string = 'http://localhost:8001';
  _http: HttpClient = inject(HttpClient);

  createProduct(obj: any): Observable<any> {
    return this._http.post(this.api_url + '/product/create_product', obj);
  }

  get_products_connected_user(obj: any): Observable<any> {
    return this._http.get(this.api_url + '/product/get_products_connected_user', { params: obj });
  }

  get_products_current_user(obj: any): Observable<any> {
    return this._http.get(this.api_url + '/product/get_products_current_user', { params: obj });
  }

  get_user_list(): Observable<any> {
    return this._http.get(this.api_url + '/user/get_user_list');
  }
  
  connect_user(obj: any) : Observable<any> {
    return this._http.post(this.api_url + '/user/connect_user', obj);
  }
}
