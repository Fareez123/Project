import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type NetworkTab =
  | 'connections'
  | 'requests'
  | 'suggested';

type ConnectionPurpose =
  | 'Collaboration'
  | 'Skill Exchange'
  | 'Advice'
  | 'Mentorship'
  | 'I can help';

type RequestStatus =
  | 'Pending'
  | 'Accepted'
  | 'Declined';

interface NetworkConnection {
  id: number;

  personId: number;

  name: string;
  role: string;
  location: string;

  purpose: ConnectionPurpose;

  connectedSince: string;

  match: number;

  offers: string[];
  wants: string[];

  sharedGoal: string;

  collaboration?: string;

  collaborationId?: number;

  online: boolean;
}

interface NetworkRequest {
  id: number;

  personId: number;

  name: string;
  role: string;
  location: string;

  purpose: ConnectionPurpose;

  match: number;

  message: string;

  offers: string[];
  wants: string[];

  sharedGoal: string;

  status: RequestStatus;
}

interface SuggestedConnection {
  id: number;

  personId: number;

  name: string;
  role: string;
  location: string;

  match: number;

  reason: string;

  offers: string[];
  wants: string[];

  sharedGoal: string;

  availableFor: string[];

  connected: boolean;
}

@Component({
  selector: 'app-network',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './network.html',
  styleUrl: './network.css'
})
export class Network {

  activeTab: NetworkTab =
    'connections';

  searchQuery = '';

  actionMessage = '';

  connections: NetworkConnection[] = [
    {
      id: 1,

      personId: 1,

      name:
        'Amir Hakim',

      role:
        'Junior DevOps Engineer',

      location:
        'Kuala Lumpur, Malaysia',

      purpose:
        'Skill Exchange',

      connectedSince:
        'August 2026',

      match: 96,

      offers: [
        'Docker',
        'CI/CD',
        'Linux'
      ],

      wants: [
        'Angular',
        'TypeScript'
      ],

      sharedGoal:
        'Build and deploy production-ready applications.',

      collaboration:
        'Angular ↔ Docker Skill Exchange',

      collaborationId: 102,

      online: true
    },

    {
      id: 2,

      personId: 2,

      name:
        'Sarah Lim',

      role:
        'Backend Developer',

      location:
        'Selangor, Malaysia',

      purpose:
        'Collaboration',

      connectedSince:
        'August 2026',

      match: 91,

      offers: [
        'Spring Boot',
        'AWS',
        'PostgreSQL'
      ],

      wants: [
        'Angular',
        'TypeScript'
      ],

      sharedGoal:
        'Build stronger full-stack portfolio projects.',

      online: false
    },

    {
      id: 3,

      personId: 4,

      name:
        'Nur Aina',

      role:
        'Fresh Graduate Software Developer',

      location:
        'Selangor, Malaysia',

      purpose:
        'I can help',

      connectedSince:
        'July 2026',

      match: 84,

      offers: [
        'Java',
        'Spring Boot'
      ],

      wants: [
        'Testing',
        'Code Review'
      ],

      sharedGoal:
        'Improve backend development through practical project work.',

      collaboration:
        'Spring Boot Authentication Review',

      collaborationId: 103,

      online: true
    }
  ];

  requests: NetworkRequest[] = [
    {
      id: 101,

      personId: 3,

      name:
        'Daniel Tan',

      role:
        'Software Engineer',

      location:
        'Kuala Lumpur, Malaysia',

      purpose:
        'Collaboration',

      match: 87,

      message:
        'I am working on improving a CI/CD pipeline for a Spring Boot project. I think your Java and API experience could be useful, and I can help you gain more exposure to GitHub Actions.',

      offers: [
        'GitHub Actions',
        'CI/CD',
        'Testing'
      ],

      wants: [
        'Spring Boot',
        'REST API'
      ],

      sharedGoal:
        'Build stronger deployment and backend engineering experience.',

      status:
        'Pending'
    },

    {
      id: 102,

      personId: 5,

      name:
        'Jason Wong',

      role:
        'Cloud Engineer',

      location:
        'Kuala Lumpur, Malaysia',

      purpose:
        'Skill Exchange',

      match: 82,

      message:
        'I can share some cloud deployment fundamentals. I am interested in learning more about Angular frontend development through a small practical project.',

      offers: [
        'Cloud',
        'Docker',
        'Deployment'
      ],

      wants: [
        'Angular',
        'Frontend Development'
      ],

      sharedGoal:
        'Learn through building and deploying a small full-stack application.',

      status:
        'Pending'
    }
  ];

  suggestions: SuggestedConnection[] = [
    {
      id: 201,

      personId: 5,

      name:
        'Jason Wong',

      role:
        'Cloud Engineer',

      location:
        'Kuala Lumpur, Malaysia',

      match: 82,

      reason:
        'Jason can help with cloud deployment while you can help with Angular development.',

      offers: [
        'AWS',
        'Docker',
        'Cloud Deployment'
      ],

      wants: [
        'Angular',
        'TypeScript'
      ],

      sharedGoal:
        'Deploy production-ready full-stack applications.',

      availableFor: [
        'Skill Exchange',
        'Collaboration'
      ],

      connected: false
    },

    {
      id: 202,

      personId: 6,

      name:
        'Aisyah Rahman',

      role:
        'Junior QA Engineer',

      location:
        'Selangor, Malaysia',

      match: 80,

      reason:
        'You share an interest in software quality and could exchange development and testing knowledge.',

      offers: [
        'Software Testing',
        'Test Cases',
        'API Testing'
      ],

      wants: [
        'Java',
        'Spring Boot'
      ],

      sharedGoal:
        'Improve software quality through stronger development and testing practices.',

      availableFor: [
        'Skill Exchange',
        'I can help'
      ],

      connected: false
    },

    {
      id: 203,

      personId: 7,

      name:
        'Adam Lee',

      role:
        'Junior Full Stack Developer',

      location:
        'Petaling Jaya, Malaysia',

      match: 76,

      reason:
        'You both work with Angular and Spring Boot and are looking to build stronger portfolio projects.',

      offers: [
        'Angular',
        'JavaScript',
        'UI Development'
      ],

      wants: [
        'Spring Boot',
        'Database Design'
      ],

      sharedGoal:
        'Build production-style portfolio applications.',

      availableFor: [
        'Collaboration',
        'Advice'
      ],

      connected: false
    }
  ];

  get pendingRequestCount():
    number {

    return this.requests.filter(
      (request) =>
        request.status === 'Pending'
    ).length;
  }

  get filteredConnections():
    NetworkConnection[] {

    const query =
      this.searchQuery
        .trim()
        .toLowerCase();

    if (!query) {
      return this.connections;
    }

    return this.connections.filter(
      (connection) => {

        return (
          connection.name
            .toLowerCase()
            .includes(query) ||

          connection.role
            .toLowerCase()
            .includes(query) ||

          connection.purpose
            .toLowerCase()
            .includes(query) ||

          connection.offers.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(query)
          ) ||

          connection.wants.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(query)
          )
        );
      }
    );
  }

  get filteredSuggestions():
    SuggestedConnection[] {

    const query =
      this.searchQuery
        .trim()
        .toLowerCase();

    if (!query) {
      return this.suggestions;
    }

    return this.suggestions.filter(
      (suggestion) => {

        return (
          suggestion.name
            .toLowerCase()
            .includes(query) ||

          suggestion.role
            .toLowerCase()
            .includes(query) ||

          suggestion.offers.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(query)
          ) ||

          suggestion.wants.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(query)
          )
        );
      }
    );
  }

  setTab(
    tab: NetworkTab
  ): void {

    this.activeTab = tab;

    this.searchQuery = '';

    this.actionMessage = '';
  }

  acceptRequest(
    request: NetworkRequest
  ): void {

    if (
      request.status !== 'Pending'
    ) {
      return;
    }

    request.status = 'Accepted';

    this.connections.unshift({
      id:
        Date.now(),

      personId:
        request.personId,

      name:
        request.name,

      role:
        request.role,

      location:
        request.location,

      purpose:
        request.purpose,

      connectedSince:
        'August 2026',

      match:
        request.match,

      offers:
        request.offers,

      wants:
        request.wants,

      sharedGoal:
        request.sharedGoal,

      online:
        false
    });

    this.actionMessage =
      `You are now connected with ${request.name}.`;
  }

  declineRequest(
    request: NetworkRequest
  ): void {

    if (
      request.status !== 'Pending'
    ) {
      return;
    }

    request.status = 'Declined';

    this.actionMessage =
      `You declined ${request.name}'s connection request.`;
  }

  connectSuggestion(
    suggestion:
      SuggestedConnection
  ): void {

    if (suggestion.connected) {
      return;
    }

    suggestion.connected = true;

    this.actionMessage =
      `Connection request sent to ${suggestion.name}.`;
  }

  removeConnection(
    connection:
      NetworkConnection
  ): void {

    this.connections =
      this.connections.filter(
        (item) =>
          item.id !== connection.id
      );

    this.actionMessage =
      `${connection.name} was removed from your network.`;
  }

  messagePerson(
    name: string
  ): void {

    this.actionMessage =
      `Messaging with ${name} will be added in a later step.`;
  }

  clearSearch(): void {

    this.searchQuery = '';
  }

  getInitials(
    name: string
  ): string {

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

  getRequestStatusClass(
    status: RequestStatus
  ): string {

    if (
      status === 'Accepted'
    ) {
      return (
        'request-status ' +
        'request-status--accepted'
      );
    }

    if (
      status === 'Declined'
    ) {
      return (
        'request-status ' +
        'request-status--declined'
      );
    }

    return (
      'request-status ' +
      'request-status--pending'
    );
  }
}