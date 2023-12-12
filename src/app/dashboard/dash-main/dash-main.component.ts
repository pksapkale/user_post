import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardApiServiceService } from '../services/dashboard-api-service.service';
import { AuthHelperServiceService } from '../../home/services/auth-helper-service.service';

@Component({
  selector: 'app-dash-main',
  standalone: true,
  imports: [],
  templateUrl: './dash-main.component.html',
  styleUrl: './dash-main.component.css'
})
export class DashMainComponent implements OnInit {
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _dashboardService: DashboardApiServiceService = inject(DashboardApiServiceService);
  _authHelperService: AuthHelperServiceService = inject(AuthHelperServiceService);

  userId: any = 0;
  productListConnectedUser: any = [];
  productListCurrentUser: any = [];

  ngOnInit(): void {
    this.userId = this._route.snapshot.params['user_id'];
    this.getProductList();
  }

  async getProductList() {
    try {
      await this.getProductForCurrentUser();
      await this.getProductForConnectedUser();
    }
    catch(error) {
      console.log(`Error in {getProductList}, ERROR ----->>>>> `, error);
    }
  }

  getProductForCurrentUser() {
    return new Promise((res, rej) => {
      let obj = {
        user_id: this.userId
      }
      this._dashboardService.get_products_current_user(obj).subscribe({
        next: data => {
          if (data.status) {
            this.productListCurrentUser = data.data;
            res(true);
          }
          else {
            console.log('Error in {getProductForCurrentUser} in {dash-main-component}');
            rej();
          }
        },
        error: err => {
          console.log('Error in {getProductForCurrentUser} in {dash-main-component}, ERROR ----->>>>> ', err);
          rej(err);
        }
      })
    })
  }

  getProductForConnectedUser() {
    let obj = {
      user_id: this.userId
    }
    return new Promise((res, rej) => {
      this._dashboardService.get_products_connected_user(obj).subscribe({
        next: data => {
          if (data.status) {
            this.productListConnectedUser = data.data;
            res(true);
          }
          else {
            console.log('Error in {getProductForConnectedUser} in {dash-main-component}');
            rej();
          }
        },
        error: err => {
          console.log('Error in {getProductForConnectedUser} in {dash-main-component}, ERROR ----->>>>> ', err);
          rej(err);
        }
      })
    })
  }

  logOut() {
    this._authHelperService.logOutuser();
  }

  jumpToRoute(route: string) {
    this._router.navigateByUrl(`/dashboard/${this.userId}/${route}`);
  }
}
