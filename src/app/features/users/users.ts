import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type UserRole =
  | 'Administrator'
  | 'Approver'
  | 'Requester'
  | 'Support Agent';

type UserStatus = 'Active' | 'Inactive' | 'Invited';

type NotificationType = 'success' | 'warning';

interface FlowDeskUser {
  id: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
}

interface NewUserForm {
  name: string;
  email: string;
  department: string;
  role: UserRole | '';
}

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  searchTerm = '';
  selectedRole = '';
  selectedDepartment = '';
  selectedStatus = '';

  isUserModalOpen = false;

  notificationTitle = '';
  notificationMessage = '';
  notificationType: NotificationType = 'success';

  newUser: NewUserForm = this.createEmptyUserForm();

  users: FlowDeskUser[] = [
    {
      id: 'USR-001',
      name: 'Muhammad Fareez',
      email: 'fareez@flowdesk.com',
      department: 'Information Technology',
      role: 'Administrator',
      status: 'Active',
      lastActive: 'Today, 2:35 PM'
    },
    {
      id: 'USR-002',
      name: 'Aisyah Rahman',
      email: 'aisyah.rahman@flowdesk.com',
      department: 'Finance',
      role: 'Approver',
      status: 'Active',
      lastActive: 'Today, 11:20 AM'
    },
    {
      id: 'USR-003',
      name: 'Daniel Lee',
      email: 'daniel.lee@flowdesk.com',
      department: 'Operations',
      role: 'Requester',
      status: 'Active',
      lastActive: 'Yesterday, 4:15 PM'
    },
    {
      id: 'USR-004',
      name: 'Nur Izzati',
      email: 'nur.izzati@flowdesk.com',
      department: 'Information Technology',
      role: 'Support Agent',
      status: 'Active',
      lastActive: 'Yesterday, 9:40 AM'
    },
    {
      id: 'USR-005',
      name: 'Amir Hakim',
      email: 'amir.hakim@flowdesk.com',
      department: 'Project Management',
      role: 'Approver',
      status: 'Invited',
      lastActive: 'Never'
    },
    {
      id: 'USR-006',
      name: 'Siti Aminah',
      email: 'siti.aminah@flowdesk.com',
      department: 'Human Resources',
      role: 'Requester',
      status: 'Inactive',
      lastActive: '10 Jul 2026'
    },
    {
      id: 'USR-007',
      name: 'Jason Wong',
      email: 'jason.wong@flowdesk.com',
      department: 'Administration',
      role: 'Requester',
      status: 'Invited',
      lastActive: 'Never'
    }
  ];

  get filteredUsers(): FlowDeskUser[] {
    const searchValue = this.searchTerm.trim().toLowerCase();

    return this.users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.department.toLowerCase().includes(searchValue) ||
        user.id.toLowerCase().includes(searchValue);

      const matchesRole =
        !this.selectedRole ||
        user.role === this.selectedRole;

      const matchesDepartment =
        !this.selectedDepartment ||
        user.department === this.selectedDepartment;

      const matchesStatus =
        !this.selectedStatus ||
        user.status === this.selectedStatus;

      return (
        matchesSearch &&
        matchesRole &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }

  openUserModal(): void {
    this.newUser = this.createEmptyUserForm();
    this.isUserModalOpen = true;
  }

  closeUserModal(): void {
    this.isUserModalOpen = false;
    this.newUser = this.createEmptyUserForm();
  }

  addUser(): void {
    const name = this.newUser.name.trim();
    const email = this.newUser.email.trim().toLowerCase();

    if (
      !name ||
      !email ||
      !this.newUser.department ||
      !this.newUser.role
    ) {
      return;
    }

    const emailAlreadyExists = this.users.some(
      (user) => user.email.toLowerCase() === email
    );

    if (emailAlreadyExists) {
      this.showNotification(
        'User already exists',
        'An account with this email address already exists.',
        'warning'
      );

      return;
    }

    const user: FlowDeskUser = {
      id: this.generateUserId(),
      name,
      email,
      department: this.newUser.department,
      role: this.newUser.role,
      status: 'Invited',
      lastActive: 'Never'
    };

    this.users = [user, ...this.users];

    this.closeUserModal();

    this.showNotification(
      'User added',
      `An account invitation has been sent to ${user.email}.`,
      'success'
    );
  }

  updateUserRole(
    user: FlowDeskUser,
    role: UserRole
  ): void {
    if (user.role === role) {
      return;
    }

    user.role = role;

    this.showNotification(
      'Role updated',
      `${user.name} is now assigned the ${role} role.`,
      'success'
    );
  }

  toggleUserStatus(user: FlowDeskUser): void {
    if (user.status === 'Active') {
      user.status = 'Inactive';

      this.showNotification(
        'Account deactivated',
        `${user.name} can no longer access FlowDesk.`,
        'warning'
      );

      return;
    }

    user.status = 'Active';
    user.lastActive =
      user.lastActive === 'Never'
        ? 'Not signed in yet'
        : user.lastActive;

    this.showNotification(
      'Account activated',
      `${user.name} can now access FlowDesk.`,
      'success'
    );
  }

  resendInvitation(user: FlowDeskUser): void {
    this.showNotification(
      'Invitation sent',
      `A new invitation has been sent to ${user.email}.`,
      'success'
    );
  }

  getStatusActionLabel(user: FlowDeskUser): string {
    if (user.status === 'Active') {
      return 'Deactivate';
    }

    return 'Activate';
  }

  getUserCount(status: UserStatus): number {
    return this.users.filter(
      (user) => user.status === status
    ).length;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  getRoleClass(role: UserRole): string {
    const classes: Record<UserRole, string> = {
      Administrator: 'role-badge role-badge--administrator',
      Approver: 'role-badge role-badge--approver',
      Requester: 'role-badge role-badge--requester',
      'Support Agent': 'role-badge role-badge--support'
    };

    return classes[role];
  }

  getStatusClass(status: UserStatus): string {
    const classes: Record<UserStatus, string> = {
      Active: 'status-badge status-badge--active',
      Invited: 'status-badge status-badge--invited',
      Inactive: 'status-badge status-badge--inactive'
    };

    return classes[status];
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedRole = '';
    this.selectedDepartment = '';
    this.selectedStatus = '';
  }

  hasActiveFilters(): boolean {
    return Boolean(
      this.searchTerm ||
      this.selectedRole ||
      this.selectedDepartment ||
      this.selectedStatus
    );
  }

  closeNotification(): void {
    this.notificationTitle = '';
    this.notificationMessage = '';
  }

  private createEmptyUserForm(): NewUserForm {
    return {
      name: '',
      email: '',
      department: '',
      role: ''
    };
  }

  private generateUserId(): string {
    const highestId = this.users.reduce((highest, user) => {
      const numericId = Number(user.id.replace('USR-', ''));

      return Number.isNaN(numericId)
        ? highest
        : Math.max(highest, numericId);
    }, 0);

    return `USR-${String(highestId + 1).padStart(3, '0')}`;
  }

  private showNotification(
    title: string,
    message: string,
    type: NotificationType
  ): void {
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.notificationType = type;
  }
}