import { LowerCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

type RequestPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

interface ApprovalRequest {
  id: string;
  title: string;
  requester: string;
  department: string;
  type: string;
  submittedDate: string;
  priority: RequestPriority;
  status: ApprovalStatus;
}

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [FormsModule, RouterLink, LowerCasePipe],
  templateUrl: './approvals.html',
  styleUrl: './approvals.css'
})
export class Approvals {
  searchTerm = '';
  selectedStatus = '';
  selectedType = '';
  selectedPriority = '';

  decisionMessage = '';
  decisionType: ApprovalStatus | '' = '';

  approvals: ApprovalRequest[] = [
    {
      id: 'REQ-2026-0021',
      title: 'Request administrator access for reporting system',
      requester: 'Aisyah Rahman',
      department: 'Finance',
      type: 'Access Request',
      submittedDate: '18 Jul 2026',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: 'REQ-2026-0020',
      title: 'Replacement laptop for damaged device',
      requester: 'Daniel Lee',
      department: 'Operations',
      type: 'Equipment Request',
      submittedDate: '18 Jul 2026',
      priority: 'Urgent',
      status: 'Pending'
    },
    {
      id: 'REQ-2026-0019',
      title: 'Install development tools on company laptop',
      requester: 'Nur Izzati',
      department: 'Information Technology',
      type: 'IT Support',
      submittedDate: '17 Jul 2026',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 'REQ-2026-0016',
      title: 'Access to shared project repository',
      requester: 'Amir Hakim',
      department: 'Project Management',
      type: 'Access Request',
      submittedDate: '15 Jul 2026',
      priority: 'Medium',
      status: 'Approved'
    },
    {
      id: 'REQ-2026-0013',
      title: 'Purchase an additional office monitor',
      requester: 'Siti Aminah',
      department: 'Human Resources',
      type: 'Equipment Request',
      submittedDate: '11 Jul 2026',
      priority: 'Low',
      status: 'Rejected'
    },
    {
      id: 'REQ-2026-0010',
      title: 'Meeting room air conditioning maintenance',
      requester: 'Jason Wong',
      department: 'Administration',
      type: 'Facility Request',
      submittedDate: '7 Jul 2026',
      priority: 'High',
      status: 'Approved'
    }
  ];

  get filteredApprovals(): ApprovalRequest[] {
    const searchValue = this.searchTerm.trim().toLowerCase();

    return this.approvals.filter((approval) => {
      const matchesSearch =
        !searchValue ||
        approval.id.toLowerCase().includes(searchValue) ||
        approval.title.toLowerCase().includes(searchValue) ||
        approval.requester.toLowerCase().includes(searchValue) ||
        approval.department.toLowerCase().includes(searchValue);

      const matchesStatus =
        !this.selectedStatus ||
        approval.status === this.selectedStatus;

      const matchesType =
        !this.selectedType ||
        approval.type === this.selectedType;

      const matchesPriority =
        !this.selectedPriority ||
        approval.priority === this.selectedPriority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPriority
      );
    });
  }

  getApprovalCount(status: ApprovalStatus): number {
    return this.approvals.filter(
      (approval) => approval.status === status
    ).length;
  }

  approveRequest(approval: ApprovalRequest): void {
    approval.status = 'Approved';

    this.decisionType = 'Approved';
    this.decisionMessage =
      `${approval.id} has been approved successfully.`;
  }

  rejectRequest(approval: ApprovalRequest): void {
    approval.status = 'Rejected';

    this.decisionType = 'Rejected';
    this.decisionMessage =
      `${approval.id} has been rejected.`;
  }

  closeNotification(): void {
    this.decisionMessage = '';
    this.decisionType = '';
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedType = '';
    this.selectedPriority = '';
  }

  hasActiveFilters(): boolean {
    return Boolean(
      this.searchTerm ||
      this.selectedStatus ||
      this.selectedType ||
      this.selectedPriority
    );
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  getPriorityClass(priority: RequestPriority): string {
    const classes: Record<RequestPriority, string> = {
      Low: 'priority-badge priority-badge--low',
      Medium: 'priority-badge priority-badge--medium',
      High: 'priority-badge priority-badge--high',
      Urgent: 'priority-badge priority-badge--urgent'
    };

    return classes[priority];
  }

  getApprovalStatusClass(status: ApprovalStatus): string {
    const classes: Record<ApprovalStatus, string> = {
      Pending: 'status-badge status-badge--pending',
      Approved: 'status-badge status-badge--approved',
      Rejected: 'status-badge status-badge--rejected'
    };

    return classes[status];
  }
}