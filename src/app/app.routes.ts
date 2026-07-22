import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { RequestList } from './features/requests/request-list/request-list';
import { CreateRequest } from './features/requests/create-request/create-request';
import { RequestDetails } from './features/requests/request-details/request-details';
import { Approvals } from './features/approvals/approvals';
import { Users } from './features/users/users';
import { Reports } from './features/reports/reports';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'requests',
        component: RequestList
      },
      {
        path: 'requests/create',
        component: CreateRequest
      },
      {
        path: 'requests/:id',
        component: RequestDetails
      },
      {
        path: 'approvals',
        component: Approvals
      },
      {
        path: 'users',
        component: Users
      },
      {
        path: 'reports',
        component: Reports
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];