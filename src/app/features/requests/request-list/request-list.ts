import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type RequestStatus =
  | 'Open'
  | 'In Progress'
  | 'Pending Approval'
  | 'Resolved'
  | 'Closed'
  | 'Rejected';

type RequestPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

interface ServiceRequest {
  id: string;
  title: string;
  type: string;
  submittedDate: string;
  updatedDate: string;
  priority: RequestPriority;
  status: RequestStatus;
}

@Component({
  selector: 'app-request-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './request-list.html',
  styleUrl: './request-list.css'
})
export class RequestList {
  searchTerm = '';
  selectedStatus = '';
  selectedType = '';
  selectedPriority = '';

  currentPage = 1;
  readonly pageSize = 5;

  readonly requests: ServiceRequest[] = [
    {
      id: 'REQ-2026-0024',
      title: 'Unable to connect to the office Wi-Fi',
      type: 'IT Support',
      submittedDate: '18 Jul 2026',
      updatedDate: '18 Jul 2026',
      priority: 'High',
      status: 'Open'
    },
    {
      id: 'REQ-2026-0022',
      title: 'Request access to the finance reporting system',
      type: 'Access Request',
      submittedDate: '17 Jul 2026',
      updatedDate: '18 Jul 2026',
      priority: 'Medium',
      status: 'Pending Approval'
    },
    {
      id: 'REQ-2026-0018',
      title: 'Unable to access company email',
      type: 'IT Support',
      submittedDate: '15 Jul 2026',
      updatedDate: '18 Jul 2026',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: 'REQ-2026-0017',
      title: 'Replacement laptop charger required',
      type: 'Equipment Request',
      submittedDate: '14 Jul 2026',
      updatedDate: '16 Jul 2026',
      priority: 'Low',
      status: 'Resolved'
    },
    {
      id: 'REQ-2026-0015',
      title: 'Install development tools on company laptop',
      type: 'IT Support',
      submittedDate: '12 Jul 2026',
      updatedDate: '14 Jul 2026',
      priority: 'Medium',
      status: 'Resolved'
    },
    {
      id: 'REQ-2026-0013',
      title: 'Meeting room projector is not working',
      type: 'Facility Request',
      submittedDate: '10 Jul 2026',
      updatedDate: '11 Jul 2026',
      priority: 'High',
      status: 'Closed'
    },
    {
      id: 'REQ-2026-0011',
      title: 'Request additional monitor for workstation',
      type: 'Equipment Request',
      submittedDate: '8 Jul 2026',
      updatedDate: '9 Jul 2026',
      priority: 'Medium',
      status: 'Rejected'
    },
    {
      id: 'REQ-2026-0009',
      title: 'Update contact details in employee portal',
      type: 'General Request',
      submittedDate: '5 Jul 2026',
      updatedDate: '6 Jul 2026',
      priority: 'Low',
      status: 'Resolved'
    },
    {
      id: 'REQ-2026-0007',
      title: 'Unable to print documents from office printer',
      type: 'IT Support',
      submittedDate: '2 Jul 2026',
      updatedDate: '4 Jul 2026',
      priority: 'Medium',
      status: 'Closed'
    },
    {
      id: 'REQ-2026-0004',
      title: 'Request access to shared project folder',
      type: 'Access Request',
      submittedDate: '28 Jun 2026',
      updatedDate: '30 Jun 2026',
      priority: 'Medium',
      status: 'Resolved'
    }
  ];

  get filteredRequests(): ServiceRequest[] {
    const searchValue = this.searchTerm.trim().toLowerCase();

    return this.requests.filter((request) => {
      const matchesSearch =
        !searchValue ||
        request.id.toLowerCase().includes(searchValue) ||
        request.title.toLowerCase().includes(searchValue) ||
        request.type.toLowerCase().includes(searchValue);

      const matchesStatus =
        !this.selectedStatus ||
        request.status === this.selectedStatus;

      const matchesType =
        !this.selectedType ||
        request.type === this.selectedType;

      const matchesPriority =
        !this.selectedPriority ||
        request.priority === this.selectedPriority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPriority
      );
    });
  }

  get paginatedRequests(): ServiceRequest[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;

    return this.filteredRequests.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  get totalPages(): number {
    return Math.max(
      1,
      Math.ceil(this.filteredRequests.length / this.pageSize)
    );
  }

  get pageNumbers(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  get firstDisplayedItem(): number {
    if (this.filteredRequests.length === 0) {
      return 0;
    }

    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get lastDisplayedItem(): number {
    return Math.min(
      this.currentPage * this.pageSize,
      this.filteredRequests.length
    );
  }

  onFiltersChanged(): void {
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedType = '';
    this.selectedPriority = '';
    this.currentPage = 1;
  }

  hasActiveFilters(): boolean {
    return Boolean(
      this.searchTerm ||
      this.selectedStatus ||
      this.selectedType ||
      this.selectedPriority
    );
  }

  getRequestCount(status: RequestStatus): number {
    return this.requests.filter(
      (request) => request.status === status
    ).length;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
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

  getStatusClass(status: RequestStatus): string {
    const classes: Record<RequestStatus, string> = {
      Open: 'status-badge status-badge--open',
      'In Progress': 'status-badge status-badge--progress',
      'Pending Approval': 'status-badge status-badge--pending',
      Resolved: 'status-badge status-badge--resolved',
      Closed: 'status-badge status-badge--closed',
      Rejected: 'status-badge status-badge--rejected'
    };

    return classes[status];
  }
}