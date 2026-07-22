import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  exact: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: '▦',
      exact: true
    },
    {
      label: 'My Requests',
      route: '/requests',
      icon: '▤',
      exact: true
    },
    {
      label: 'Create Request',
      route: '/requests/create',
      icon: '+',
      exact: true
    },
    {
      label: 'Approvals',
      route: '/approvals',
      icon: '✓',
      exact: true
    },
    {
      label: 'User Management',
      route: '/users',
      icon: '👥',
      exact: true
    },
    {
      label: 'Reports',
      route: '/reports',
      icon: '▥',
      exact: true
    }
  ];
}