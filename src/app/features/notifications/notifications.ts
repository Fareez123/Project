import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type NotificationFilter =
  | 'all'
  | 'unread';

type NotificationType =
  | 'Network'
  | 'Collaboration'
  | 'Workspace'
  | 'Evidence'
  | 'Verification'
  | 'Match';

interface CareerNotification {
  id: number;

  type: NotificationType;

  title: string;

  message: string;

  time: string;

  read: boolean;

  route: string;

  actorName?: string;

  actionLabel: string;
}

@Component({
  selector: 'app-notifications',
  imports: [
    RouterLink
  ],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications {

  activeFilter: NotificationFilter =
    'all';

  notifications: CareerNotification[] = [
    {
      id: 1,

      type: 'Network',

      title:
        'New connection request',

      message:
        'Daniel Tan wants to connect with you for Collaboration. You both share an interest in Spring Boot and CI/CD.',

      time:
        '10 minutes ago',

      read: false,

      route:
        '/network',

      actorName:
        'Daniel Tan',

      actionLabel:
        'Review request'
    },

    {
      id: 2,

      type: 'Workspace',

      title:
        'Amir updated a collaboration task',

      message:
        'Dockerise frontend was moved to In Progress in Expense Management Platform.',

      time:
        '45 minutes ago',

      read: false,

      route:
        '/collaborate/101',

      actorName:
        'Amir Hakim',

      actionLabel:
        'Open workspace'
    },

    {
      id: 3,

      type: 'Evidence',

      title:
        'New collaboration evidence added',

      message:
        'Amir added Docker Configuration as evidence in Expense Management Platform.',

      time:
        '2 hours ago',

      read: false,

      route:
        '/collaborate/101',

      actorName:
        'Amir Hakim',

      actionLabel:
        'View evidence'
    },

    {
      id: 4,

      type: 'Match',

      title:
        'New 92% mutual match',

      message:
        'Jason Wong can help with Docker and cloud deployment while looking to improve his Angular skills.',

      time:
        '3 hours ago',

      read: false,

      route:
        '/discover',

      actorName:
        'Jason Wong',

      actionLabel:
        'View match'
    },

    {
      id: 5,

      type: 'Verification',

      title:
        'Peer verification available',

      message:
        'Spring Boot Authentication Review has been completed. You can now verify Nur Aina’s contribution and demonstrated skills.',

      time:
        'Yesterday',

      read: false,

      route:
        '/collaborate/103',

      actorName:
        'Nur Aina',

      actionLabel:
        'Start verification'
    },

    {
      id: 6,

      type: 'Network',

      title:
        'Connection accepted',

      message:
        'Sarah Lim accepted your connection request. You can now collaborate, exchange skills or message each other.',

      time:
        'Yesterday',

      read: true,

      route:
        '/people/2',

      actorName:
        'Sarah Lim',

      actionLabel:
        'View profile'
    },

    {
      id: 7,

      type: 'Collaboration',

      title:
        'Collaboration interest received',

      message:
        'Someone is interested in joining your Portfolio Analytics Dashboard collaboration opportunity.',

      time:
        '2 days ago',

      read: true,

      route:
        '/collaborate',

      actionLabel:
        'View collaboration'
    },

    {
      id: 8,

      type: 'Workspace',

      title:
        'Milestone completed',

      message:
        'Connect REST APIs was completed in Expense Management Platform. Your collaboration progress has increased.',

      time:
        '3 days ago',

      read: true,

      route:
        '/collaborate/101',

      actionLabel:
        'Open workspace'
    }
  ];

  get unreadCount(): number {

    return this.notifications.filter(
      (notification) =>
        !notification.read
    ).length;
  }

  get readCount(): number {

    return this.notifications.filter(
      (notification) =>
        notification.read
    ).length;
  }

  get filteredNotifications():
    CareerNotification[] {

    if (
      this.activeFilter === 'unread'
    ) {

      return this.notifications.filter(
        (notification) =>
          !notification.read
      );
    }

    return this.notifications;
  }

  setFilter(
    filter: NotificationFilter
  ): void {

    this.activeFilter = filter;
  }

  markAsRead(
    notification: CareerNotification
  ): void {

    notification.read = true;
  }

  toggleRead(
    notification: CareerNotification
  ): void {

    notification.read =
      !notification.read;
  }

  markAllAsRead(): void {

    this.notifications.forEach(
      (notification) => {

        notification.read = true;
      }
    );
  }

  deleteNotification(
    notification:
      CareerNotification
  ): void {

    this.notifications =
      this.notifications.filter(
        (item) =>
          item.id !== notification.id
      );
  }

  clearReadNotifications(): void {

    this.notifications =
      this.notifications.filter(
        (notification) =>
          !notification.read
      );
  }

  getInitials(
    name?: string
  ): string {

    if (!name) {
      return 'CF';
    }

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(
        (word) =>
          word.charAt(0)
      )
      .join('')
      .toUpperCase();
  }

  getTypeIcon(
    type: NotificationType
  ): string {

    switch (type) {

      case 'Network':
        return '⌁';

      case 'Collaboration':
        return '◇';

      case 'Workspace':
        return '✓';

      case 'Evidence':
        return '▤';

      case 'Verification':
        return '★';

      case 'Match':
        return '◎';

      default:
        return '◇';
    }
  }

  getTypeClass(
    type: NotificationType
  ): string {

    switch (type) {

      case 'Network':
        return (
          'notification-type ' +
          'notification-type--network'
        );

      case 'Collaboration':
        return (
          'notification-type ' +
          'notification-type--collaboration'
        );

      case 'Workspace':
        return (
          'notification-type ' +
          'notification-type--workspace'
        );

      case 'Evidence':
        return (
          'notification-type ' +
          'notification-type--evidence'
        );

      case 'Verification':
        return (
          'notification-type ' +
          'notification-type--verification'
        );

      case 'Match':
        return (
          'notification-type ' +
          'notification-type--match'
        );

      default:
        return 'notification-type';
    }
  }
}