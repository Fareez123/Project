import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  // Authentication
  {
    path: 'login',
    component: Login
  },

  // CareerFlow application
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      }
    ]
  },

  // Default
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Unknown URL
  {
    path: '**',
    redirectTo: 'login'
  }
];