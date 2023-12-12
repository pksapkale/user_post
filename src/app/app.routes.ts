import { Routes } from '@angular/router';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((p) => p.HomeModule),
  },
  {
    path: 'dashboard',
    canActivate: [authGuardGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(p => p.DashboardModule)
  }
];
