import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Discover } from './features/discover/discover';
import { Collaborate } from './features/collaborate/collaborate';
import { CollaborateWorkspace } from './features/collaborate-workspace/collaborate-workspace';
import { Profile } from './features/profile/profile';
import { PersonProfile } from './features/person-profile/person-profile';

import { MainLayout } from './layouts/main-layout/main-layout';

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
        path: 'discover',
        component: Discover
      },
      {
        path: 'collaborate',
        component: Collaborate
      },
      {
        path: 'collaborate/:id',
        component: CollaborateWorkspace
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'people/:id',
        component: PersonProfile
      }
    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];