import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

type RequestStatus =
  | 'Open'
  | 'Pending Approval'
  | 'In Progress'
  | 'Resolved'
  | 'Closed'
  | 'Rejected';

type RequestPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

type AttachmentType = 'image' | 'pdf' | 'document';

type ActivityType =
  | 'created'
  | 'approval'
  | 'assigned'
  | 'progress'
  | 'comment'
  | 'resolved'
  | 'cancelled';

type NotificationType = 'success' | 'warning';

interface RequestAttachment {
  name: string;
  type: AttachmentType;
  size: string;
  uploadedDate: string;
}

interface RequestActivity {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  actor: string;
  date: string;
}

interface RequestComment {
  id: number;
  author: string;
  role: string;
  message: string;
  date: string;
}

interface RequestProgress {
  label: string;
  date: string;
  completed: boolean;
  current: boolean;
}

interface Requester {
  name: string;
  email: string;
  position: string;
  department: string;
  employeeId: string;
}

interface RequestApproval {
  status: 'Pending' | 'Approved' | 'Rejected' | 'Not Required';
  approver: string;
  decisionDate: string;
  comment: string;
}

interface ServiceRequestDetails {
  id: string;
  title: string;
  type: string;
  department: string;
  location: string;
  requiredDate: string;
  submittedDate: string;
  updatedDate: string;
  priority: RequestPriority;
  status: RequestStatus;
  assignedTeam: string;
  assignedAgent: string;
  expectedResolution: string;
  description: string;
  requester: Requester;
  approval: RequestApproval;
  attachments: RequestAttachment[];
  activities: RequestActivity[];
  progress: RequestProgress[];
}

@Component({
  selector: 'app-request-details',
  imports: [FormsModule, RouterLink],
  templateUrl: './request-details.html',
  styleUrl: './request-details.css'
})
export class RequestDetails {
  private readonly route = inject(ActivatedRoute);

  readonly requestId =
    this.route.snapshot.paramMap.get('id') ?? 'REQ-2026-0018';

  request: ServiceRequestDetails =
    this.getRequestById(this.requestId);

  newComment = '';

  comments: RequestComment[] = [
    {
      id: 1,
      author: 'Nur Izzati',
      role: 'Support Agent',
      message:
        'We have reviewed the issue and are checking the account configuration with the email administration team.',
      date: '18 Jul 2026, 10:15 AM'
    },
    {
      id: 2,
      author: 'Muhammad Fareez',
      role: 'Requester',
      message:
        'The issue is still occurring. I have also tested it using another browser and received the same error.',
      date: '18 Jul 2026, 11:05 AM'
    }
  ];

  isCancelConfirmationOpen = false;

  notificationTitle = '';
  notificationMessage = '';
  notificationType: NotificationType = 'success';

  get canEditRequest(): boolean {
    return (
      this.request.status === 'Open' ||
      this.request.status === 'Pending Approval'
    );
  }

  get canCancelRequest(): boolean {
    return ![
      'Resolved',
      'Closed',
      'Rejected'
    ].includes(this.request.status);
  }

  addComment(): void {
    const message = this.newComment.trim();

    if (!message) {
      return;
    }

    const comment: RequestComment = {
      id: Date.now(),
      author: 'Muhammad Fareez',
      role: 'Requester',
      message,
      date: 'Just now'
    };

    this.comments = [...this.comments, comment];

    this.request.activities = [
      ...this.request.activities,
      {
        id: Date.now() + 1,
        type: 'comment',
        title: 'Comment added',
        description: message,
        actor: 'Muhammad Fareez',
        date: 'Just now'
      }
    ];

    this.request.updatedDate = 'Just now';
    this.newComment = '';

    this.showNotification(
      'Comment posted',
      'Your comment has been added to the request.',
      'success'
    );
  }

  editRequest(): void {
    this.showNotification(
      'Edit request',
      'Connect this action to your request edit route or form.',
      'success'
    );
  }

  openCancelConfirmation(): void {
    this.isCancelConfirmationOpen = true;
  }

  closeCancelConfirmation(): void {
    this.isCancelConfirmationOpen = false;
  }

  cancelRequest(): void {
    this.request.status = 'Closed';
    this.request.updatedDate = 'Just now';

    this.request.activities = [
      ...this.request.activities,
      {
        id: Date.now(),
        type: 'cancelled',
        title: 'Request cancelled',
        description:
          'The requester cancelled this request. No further action is required.',
        actor: 'Muhammad Fareez',
        date: 'Just now'
      }
    ];

    this.request.progress = this.request.progress.map((step) => ({
      ...step,
      current: false
    }));

    this.closeCancelConfirmation();

    this.showNotification(
      'Request cancelled',
      `${this.request.id} has been cancelled successfully.`,
      'warning'
    );
  }

  viewAttachment(attachment: RequestAttachment): void {
    this.showNotification(
      'Attachment selected',
      `${attachment.name} would open using your file service or API.`,
      'success'
    );
  }

  closeNotification(): void {
    this.notificationTitle = '';
    this.notificationMessage = '';
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
      'Pending Approval': 'status-badge status-badge--pending',
      'In Progress': 'status-badge status-badge--progress',
      Resolved: 'status-badge status-badge--resolved',
      Closed: 'status-badge status-badge--closed',
      Rejected: 'status-badge status-badge--rejected'
    };

    return classes[status];
  }

  getStatusDescription(status: RequestStatus): string {
    const descriptions: Record<RequestStatus, string> = {
      Open: 'Your request has been submitted and is waiting for assignment.',
      'Pending Approval':
        'Your request is waiting for a decision from the assigned approver.',
      'In Progress':
        'The support team is currently investigating and processing your request.',
      Resolved:
        'The support team has completed the work required for this request.',
      Closed:
        'This request is closed and no further action is currently being taken.',
      Rejected:
        'This request was not approved. Review the approval comment for more information.'
    };

    return descriptions[status];
  }

  getAttachmentLabel(type: AttachmentType): string {
    const labels: Record<AttachmentType, string> = {
      image: 'IMG',
      pdf: 'PDF',
      document: 'DOC'
    };

    return labels[type];
  }

  getAttachmentIconClass(type: AttachmentType): string {
    return `attachment-icon attachment-icon--${type}`;
  }

  getActivityIcon(type: ActivityType): string {
    const icons: Record<ActivityType, string> = {
      created: '+',
      approval: '✓',
      assigned: '→',
      progress: '•',
      comment: 'C',
      resolved: '✓',
      cancelled: '×'
    };

    return icons[type];
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

  private getRequestById(
    requestId: string
  ): ServiceRequestDetails {
    return {
      id: requestId,
      title: 'Unable to access company email',
      type: 'IT Support',
      department: 'Information Technology',
      location:
        'Level 4, Information Technology Department, Workstation IT-08',
      requiredDate: '19 Jul 2026',
      submittedDate: '15 Jul 2026, 9:32 AM',
      updatedDate: '18 Jul 2026, 11:05 AM',
      priority: 'High',
      status: 'In Progress',
      assignedTeam: 'IT Service Desk',
      assignedAgent: 'Nur Izzati',
      expectedResolution: '19 Jul 2026, 5:00 PM',
      description:
        'I am unable to access my company email account through the web portal and desktop application. The system displays an authentication error even though the password is correct. The issue started on the morning of 15 July 2026. I have restarted the laptop, cleared the browser cache, and attempted to sign in using another browser, but the issue remains.',
      requester: {
        name: 'Muhammad Fareez',
        email: 'fareez@flowdesk.com',
        position: 'Software Developer',
        department: 'Information Technology',
        employeeId: 'EMP-2026-014'
      },
      approval: {
        status: 'Approved',
        approver: 'Aisyah Rahman',
        decisionDate: '16 Jul 2026, 10:20 AM',
        comment:
          'Approved due to the request affecting access to an essential business communication system.'
      },
      attachments: [
        {
          name: 'email-authentication-error.png',
          type: 'image',
          size: '428 KB',
          uploadedDate: '15 Jul 2026'
        },
        {
          name: 'troubleshooting-details.pdf',
          type: 'pdf',
          size: '184 KB',
          uploadedDate: '15 Jul 2026'
        }
      ],
      activities: [
        {
          id: 1,
          type: 'created',
          title: 'Request submitted',
          description:
            'The request was submitted with high priority for IT Support.',
          actor: 'Muhammad Fareez',
          date: '15 Jul 2026, 9:32 AM'
        },
        {
          id: 2,
          type: 'approval',
          title: 'Request approved',
          description:
            'The request was reviewed and approved for processing.',
          actor: 'Aisyah Rahman',
          date: '16 Jul 2026, 10:20 AM'
        },
        {
          id: 3,
          type: 'assigned',
          title: 'Support agent assigned',
          description:
            'The request was assigned to Nur Izzati from the IT Service Desk.',
          actor: 'FlowDesk System',
          date: '16 Jul 2026, 10:35 AM'
        },
        {
          id: 4,
          type: 'progress',
          title: 'Investigation started',
          description:
            'The support team started reviewing the account authentication configuration.',
          actor: 'Nur Izzati',
          date: '17 Jul 2026, 9:10 AM'
        },
        {
          id: 5,
          type: 'comment',
          title: 'Additional information provided',
          description:
            'The requester confirmed that the problem also occurs in another browser.',
          actor: 'Muhammad Fareez',
          date: '18 Jul 2026, 11:05 AM'
        }
      ],
      progress: [
        {
          label: 'Request Submitted',
          date: '15 Jul 2026',
          completed: true,
          current: false
        },
        {
          label: 'Approval Completed',
          date: '16 Jul 2026',
          completed: true,
          current: false
        },
        {
          label: 'In Progress',
          date: '17 Jul 2026',
          completed: false,
          current: true
        },
        {
          label: 'Resolved',
          date: 'Pending',
          completed: false,
          current: false
        }
      ]
    };
  }
}