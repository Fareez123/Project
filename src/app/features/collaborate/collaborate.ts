import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type CollaborateTab =
  | 'my'
  | 'opportunities'
  | 'requests';

type CollaborationType =
  | 'Project Collaboration'
  | 'Skill Exchange'
  | 'Micro Collaboration';

type CollaborationStatus =
  | 'In Progress'
  | 'Completed';

type RequestStatus =
  | 'Pending'
  | 'Accepted'
  | 'Declined';

interface Collaboration {
  id: number;

  title: string;
  type: CollaborationType;

  collaboratorId: number;
  collaborator: string;
  collaboratorRole: string;

  description: string;

  status: CollaborationStatus;

  progress: number;

  yourRole: string;
  collaboratorRoleInProject: string;

  nextMilestone: string;

  skills: string[];

  sessionsCompleted?: number;
  totalSessions?: number;

  youTeach?: string;
  youLearn?: string;
}

interface CollaborationOpportunity {
  id: number;

  ownerId: number;
  owner: string;
  ownerRole: string;

  title: string;
  description: string;

  match: number;

  type: CollaborationType;

  lookingFor: string;
  commitment: string;
  experienceLevel: string;

  skills: string[];

  interestedPeople: number;

  saved: boolean;
  applied: boolean;
}

interface CollaborationRequest {
  id: number;

  personId: number;

  name: string;
  role: string;

  match: number;

  purpose:
    | 'Collaboration'
    | 'Skill Exchange'
    | 'I can help'
    | 'Advice'
    | 'Mentorship';

  message: string;

  offers: string[];
  wants: string[];

  status: RequestStatus;
}

@Component({
  selector: 'app-collaborate',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './collaborate.html',
  styleUrl: './collaborate.css'
})
export class Collaborate {
  activeTab: CollaborateTab = 'my';

  searchQuery = '';

  selectedType = '';

  workspaceMessage = '';

  collaborationTypes: CollaborationType[] = [
    'Project Collaboration',
    'Skill Exchange',
    'Micro Collaboration'
  ];

  collaborations: Collaboration[] = [
    {
      id: 101,

      title:
        'Expense Management Platform',

      type:
        'Project Collaboration',

      collaboratorId:
        1,

      collaborator:
        'Amir Hakim',

      collaboratorRole:
        'Junior DevOps Engineer',

      description:
        'Building a full-stack expense management application while combining frontend, backend and deployment experience.',

      status:
        'In Progress',

      progress:
        70,

      yourRole:
        'Frontend & API Integration',

      collaboratorRoleInProject:
        'DevOps & Deployment',

      nextMilestone:
        'Containerise the application using Docker',

      skills: [
        'Angular',
        'Spring Boot',
        'Docker',
        'REST API'
      ]
    },

    {
      id: 102,

      title:
        'Angular ↔ Docker Skill Exchange',

      type:
        'Skill Exchange',

      collaboratorId:
        1,

      collaborator:
        'Amir Hakim',

      collaboratorRole:
        'Junior DevOps Engineer',

      description:
        'A structured skill exchange where both participants teach a practical skill and complete exercises together.',

      status:
        'In Progress',

      progress:
        50,

      yourRole:
        'Angular Guide',

      collaboratorRoleInProject:
        'Docker Guide',

      nextMilestone:
        'Dockerise an Angular application together',

      skills: [
        'Angular',
        'Docker',
        'TypeScript'
      ],

      sessionsCompleted:
        2,

      totalSessions:
        4,

      youTeach:
        'Angular',

      youLearn:
        'Docker'
    },

    {
      id: 103,

      title:
        'Spring Boot Authentication Review',

      type:
        'Micro Collaboration',

      collaboratorId:
        4,

      collaborator:
        'Nur Aina',

      collaboratorRole:
        'Junior Software Developer',

      description:
        'Reviewed a Spring Boot JWT authentication implementation and provided feedback on controller and service structure.',

      status:
        'Completed',

      progress:
        100,

      yourRole:
        'Code Reviewer',

      collaboratorRoleInProject:
        'Backend Developer',

      nextMilestone:
        'Completed — peer verification available',

      skills: [
        'Java',
        'Spring Boot',
        'JWT',
        'Code Review'
      ]
    }
  ];

  opportunities:
    CollaborationOpportunity[] = [
      {
        id: 201,

        ownerId:
          2,

        owner:
          'Sarah Lim',

        ownerRole:
          'Backend Developer',

        title:
          'Build a developer portfolio analytics platform',

        description:
          'I am building a backend service that analyses developer project data and I need someone to help create the Angular frontend.',

        match:
          94,

        type:
          'Project Collaboration',

        lookingFor:
          'Angular Developer',

        commitment:
          '3–4 hrs / week',

        experienceLevel:
          'Junior friendly',

        skills: [
          'Angular',
          'TypeScript',
          'Spring Boot',
          'REST API'
        ],

        interestedPeople:
          4,

        saved:
          false,

        applied:
          false
      },

      {
        id: 202,

        ownerId:
          5,

        owner:
          'Hakim Zain',

        ownerRole:
          'Fresh Graduate Developer',

        title:
          'Deploy a full-stack application with Docker',

        description:
          'Looking for another junior developer to build a Java and Angular application and deploy it using Docker.',

        match:
          92,

        type:
          'Skill Exchange',

        lookingFor:
          'Java / Angular Developer',

        commitment:
          '2–3 hrs / week',

        experienceLevel:
          'Beginner friendly',

        skills: [
          'Docker',
          'Java',
          'Angular',
          'Deployment'
        ],

        interestedPeople:
          6,

        saved:
          false,

        applied:
          false
      },

      {
        id: 203,

        ownerId:
          3,

        owner:
          'Daniel Tan',

        ownerRole:
          'Software Engineer',

        title:
          'Create a CI/CD workflow for a Spring Boot project',

        description:
          'A short collaboration focused on creating a GitHub Actions pipeline for testing and building a Spring Boot application.',

        match:
          87,

        type:
          'Micro Collaboration',

        lookingFor:
          'Spring Boot Developer',

        commitment:
          '1–2 hrs / week',

        experienceLevel:
          'Junior friendly',

        skills: [
          'Spring Boot',
          'GitHub Actions',
          'CI/CD',
          'Testing'
        ],

        interestedPeople:
          3,

        saved:
          false,

        applied:
          false
      }
    ];

  requests: CollaborationRequest[] = [
    {
      id: 301,

      personId:
        2,

      name:
        'Sarah Lim',

      role:
        'Backend Developer',

      match:
        91,

      purpose:
        'Skill Exchange',

      message:
        'I can help you gain practical AWS and backend deployment experience. I would also like to improve my Angular skills by building something small together.',

      offers: [
        'AWS',
        'Spring Boot',
        'PostgreSQL'
      ],

      wants: [
        'Angular',
        'TypeScript'
      ],

      status:
        'Pending'
    },

    {
      id: 302,

      personId:
        3,

      name:
        'Daniel Tan',

      role:
        'Software Engineer',

      match:
        87,

      purpose:
        'Collaboration',

      message:
        'I am working on a CI/CD practice project and think your Spring Boot experience would be useful. We could build the workflow together.',

      offers: [
        'GitHub Actions',
        'Testing'
      ],

      wants: [
        'Spring Boot',
        'API Development'
      ],

      status:
        'Pending'
    }
  ];

  get filteredOpportunities():
    CollaborationOpportunity[] {

    const search =
      this.searchQuery
        .trim()
        .toLowerCase();

    return this.opportunities
      .filter((opportunity) => {
        const matchesSearch =
          !search ||
          opportunity.title
            .toLowerCase()
            .includes(search) ||
          opportunity.description
            .toLowerCase()
            .includes(search) ||
          opportunity.owner
            .toLowerCase()
            .includes(search) ||
          opportunity.skills.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(search)
          );

        const matchesType =
          !this.selectedType ||
          opportunity.type ===
            this.selectedType;

        return (
          matchesSearch &&
          matchesType
        );
      })
      .sort(
        (first, second) =>
          second.match -
          first.match
      );
  }

  get pendingRequestsCount(): number {
    return this.requests.filter(
      (request) =>
        request.status === 'Pending'
    ).length;
  }

  setTab(
    tab: CollaborateTab
  ): void {
    this.activeTab = tab;
    this.workspaceMessage = '';
  }

  toggleSaveOpportunity(
    opportunity:
      CollaborationOpportunity
  ): void {
    opportunity.saved =
      !opportunity.saved;
  }

  applyToOpportunity(
    opportunity:
      CollaborationOpportunity
  ): void {
    if (opportunity.applied) {
      return;
    }

    opportunity.applied = true;

    opportunity.interestedPeople++;

    this.workspaceMessage =
      `Interest sent to ${opportunity.owner}.`;
  }

  acceptRequest(
    request:
      CollaborationRequest
  ): void {
    request.status =
      'Accepted';

    this.workspaceMessage =
      `You accepted ${request.name}'s request.`;
  }

  declineRequest(
    request:
      CollaborationRequest
  ): void {
    request.status =
      'Declined';

    this.workspaceMessage =
      `You declined ${request.name}'s request.`;
  }

  openWorkspace(
    collaboration:
      Collaboration
  ): void {
    this.workspaceMessage =
      `${collaboration.title} workspace will be built next.`;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedType = '';
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

  getStatusClass(
    status:
      CollaborationStatus
  ): string {
    return status === 'Completed'
      ? 'status-badge status-badge--completed'
      : 'status-badge status-badge--progress';
  }

  getRequestStatusClass(
    status:
      RequestStatus
  ): string {
    return (
      'request-status request-status--' +
      status.toLowerCase()
    );
  }

  getTypeClass(
    type:
      CollaborationType
  ): string {
    if (
      type ===
      'Skill Exchange'
    ) {
      return (
        'type-badge ' +
        'type-badge--exchange'
      );
    }

    if (
      type ===
      'Micro Collaboration'
    ) {
      return (
        'type-badge ' +
        'type-badge--micro'
      );
    }

    return (
      'type-badge ' +
      'type-badge--project'
    );
  }
}