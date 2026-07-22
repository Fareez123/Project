import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DashboardStatistic {
  label: string;
  value: number;
  description: string;
  type: 'default' | 'pending' | 'approved' | 'rejected';
}

interface RecentRequest {
  id: string;
  title: string;
  type: string;
  requester: string;
  submittedDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  statistics: DashboardStatistic[] = [
    {
      label: 'Total Requests',
      value: 124,
      description: 'All requests in the system',
      type: 'default'
    },
    {
      label: 'Pending Approval',
      value: 18,
      description: 'Waiting for review',
      type: 'pending'
    },
    {
      label: 'Approved',
      value: 92,
      description: 'Successfully approved',
      type: 'approved'
    },
    {
      label: 'Rejected',
      value: 14,
      description: 'Requests not approved',
      type: 'rejected'
    }
  ];

  recentRequests: RecentRequest[] = [
    {
      id: 'REQ-2026-001',
      title: 'Finance System Access',
      type: 'System Access',
      requester: 'Ahmad Firdaus',
      submittedDate: '10 July 2026',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: 'REQ-2026-002',
      title: 'New Office Laptop',
      type: 'Equipment',
      requester: 'Siti Aisyah',
      submittedDate: '9 July 2026',
      priority: 'Medium',
      status: 'Approved'
    },
    {
      id: 'REQ-2026-003',
      title: 'Air Conditioner Maintenance',
      type: 'Maintenance',
      requester: 'Daniel Lee',
      submittedDate: '8 July 2026',
      priority: 'Low',
      status: 'Rejected'
    }
  ];

  getStatusClass(status: RecentRequest['status']): string {
    return `status-badge status-${status.toLowerCase()}`;
  }

  getPriorityClass(priority: RecentRequest['priority']): string {
    return `priority-badge priority-${priority.toLowerCase()}`;
  }

  getStatisticClass(type: DashboardStatistic['type']): string {
    return `statistic-card statistic-card--${type}`;
  }
}