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

  purpose: string;

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

  actionMessage = '';

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

      collaboratorId: 1,

      collaborator:
        'Amir Hakim',

      collaboratorRole:
        'Junior DevOps Engineer',

      description:
        'Building and deploying a full-stack expense management application using Angular, Spring Boot and Docker.',

      status:
        'In Progress',

      progress: 70,

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

      collaboratorId: 1,

      collaborator:
        'Amir Hakim',

      collaboratorRole:
        'Junior DevOps Engineer',

      description:
        'A practical skill exchange where you share Angular knowledge while learning Docker and deployment fundamentals.',

      status:
        'In Progress',

      progress: 50,

      yourRole:
        'Angular Guide',

      collaboratorRoleInProject:
        'Docker Guide',

      nextMilestone:
        'Dockerise an Angular application together',

      skills: [
        'Angular',
        'TypeScript',
        'Docker'
      ],

      sessionsCompleted: 2,
      totalSessions: 4,

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

      collaboratorId: 4,

      collaborator:
        'Nur Aina',

      collaboratorRole:
        'Fresh Graduate Software Developer',

      description:
        'Reviewed a Spring Boot JWT authentication implementation and provided practical code feedback.',

      status:
        'Completed',

      progress: 100,

      yourRole:
        'Code Reviewer',

      collaboratorRoleInProject:
        'Backend Developer',

      nextMilestone:
        'Collaboration completed',

      skills: [
        'Java',
        'Spring Boot',
        'JWT',
        'Code Review'
      ]
    }
  ];

  opportunities: CollaborationOpportunity[] = [
    {
      id: 201,

      ownerId: 2,

      owner:
        'Sarah Lim',

      ownerRole:
        'Backend Developer',

      title:
        'Portfolio Analytics Dashboard',

      description:
        'Looking for someone interested in building the Angular frontend for a portfolio analytics application.',

      match: 94,

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
        'Spring Boot',
        'PostgreSQL'
      ],

      interestedPeople: 4,

      saved: false,

      applied: false
    },

    {
      id: 202,

      ownerId: 1,

      owner:
        'Amir Hakim',

      ownerRole:
        'Junior DevOps Engineer',

      title:
        'Deploy a Full-Stack Application with Docker',

      description:
        'Learn deployment together by containerising an Angular and Spring Boot application with Docker.',

      match: 92,

      type:
        'Skill Exchange',

      lookingFor:
        'Angular / Java Developer',

      commitment:
        '2 hrs / week',

      experienceLevel:
        'Beginner friendly',

      skills: [
        'Docker',
        'Angular',
        'Spring Boot'
      ],

      interestedPeople: 6,

      saved: false,

      applied: false
    },

    {
      id: 203,

      ownerId: 3,

      owner:
        'Daniel Tan',

      ownerRole:
        'Software Engineer',

      title:
        'Spring Boot CI/CD Setup Review',

      description:
        'A short collaboration to review and improve a GitHub Actions pipeline for a Spring Boot application.',

      match: 87,

      type:
        'Micro Collaboration',

      lookingFor:
        'Java Developer',

      commitment:
        '30–60 minutes',

      experienceLevel:
        'Junior friendly',

      skills: [
        'Spring Boot',
        'GitHub Actions',
        'CI/CD'
      ],

      interestedPeople: 3,

      saved: false,

      applied: false
    }
  ];

  requests: CollaborationRequest[] = [
    {
      id: 301,

      personId: 2,

      name:
        'Sarah Lim',

      role:
        'Backend Developer',

      match: 91,

      purpose:
        'Skill Exchange',

      message:
        'I can help you with Spring Boot and AWS. I am currently improving my Angular skills and think we could help each other.',

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

      personId: 3,

      name:
        'Daniel Tan',

      role:
        'Software Engineer',

      match: 87,

      purpose:
        'Collaboration',

      message:
        'Would you be interested in working on a small CI/CD project together? I can help with the pipeline while you handle the Spring Boot side.',

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

    const query =
      this.searchQuery
        .trim()
        .toLowerCase();

    return this.opportunities.filter(
      (opportunity) => {

        const matchesSearch =
          !query ||
          opportunity.title
            .toLowerCase()
            .includes(query) ||
          opportunity.owner
            .toLowerCase()
            .includes(query) ||
          opportunity.description
            .toLowerCase()
            .includes(query) ||
          opportunity.skills.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(query)
          );

        const matchesType =
          !this.selectedType ||
          opportunity.type ===
            this.selectedType;

        return (
          matchesSearch &&
          matchesType
        );
      }
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
    this.actionMessage = '';
  }

  toggleSaveOpportunity(
    opportunity: CollaborationOpportunity
  ): void {

    opportunity.saved =
      !opportunity.saved;
  }

  applyToOpportunity(
    opportunity: CollaborationOpportunity
  ): void {

    if (opportunity.applied) {
      return;
    }

    opportunity.applied = true;

    opportunity.interestedPeople++;

    this.actionMessage =
      `Your interest in "${opportunity.title}" has been sent.`;
  }

  acceptRequest(
    request: CollaborationRequest
  ): void {

    request.status = 'Accepted';

    this.actionMessage =
      `You accepted ${request.name}'s collaboration request.`;
  }

  declineRequest(
    request: CollaborationRequest
  ): void {

    request.status = 'Declined';

    this.actionMessage =
      `You declined ${request.name}'s collaboration request.`;
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
    status: CollaborationStatus
  ): string {

    return status === 'Completed'
      ? 'status-badge status-badge--completed'
      : 'status-badge status-badge--progress';
  }

  getRequestStatusClass(
    status: RequestStatus
  ): string {

    if (status === 'Accepted') {
      return (
        'request-status ' +
        'request-status--accepted'
      );
    }

    if (status === 'Declined') {
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

  getTypeClass(
    type: CollaborationType
  ): string {

    if (
      type === 'Skill Exchange'
    ) {
      return (
        'type-badge ' +
        'type-badge--exchange'
      );
    }

    if (
      type === 'Micro Collaboration'
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