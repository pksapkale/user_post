import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashMainComponent } from './dash-main/dash-main.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ConnectUserComponent } from './connect-user/connect-user.component';

const routes: Routes = [
  {
    path: ':user_id',
    component: DashMainComponent,
  },
  {
    path: ':user_id/create-product',
    component: CreateProductComponent,
  },
  {
    path: ':user_id/connect-user',
    component: ConnectUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
