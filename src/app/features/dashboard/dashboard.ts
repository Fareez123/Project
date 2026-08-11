import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type FeedTab =
  | 'recommended'
  | 'latest';

interface CurrentUser {
  name: string;
  firstName: string;
  role: string;
  location: string;
  bio: string;
  profileStrength: number;
  projects: number;
  verifiedSkills: number;
  collaborators: number;
}

interface CareerIntent {
  title: string;
  description: string;
  offers: string[];
  wants: string[];
  matches: number;
}

interface MutualMatch {
  id: number;
  name: string;
  firstName: string;
  role: string;
  location: string;
  match: number;
  description: string;
  youOffer: string;
  theyOffer: string;
  sharedGoal: string;
  createdOrder: number;
}

interface CollaborationOpportunity {
  id: number;
  owner: string;
  ownerRole: string;
  title: string;
  description: string;
  lookingFor: string;
  commitment: string;
  level: string;
  match: number;
  skills: string[];
  saved: boolean;
}

interface SuggestedPerson {
  id: number;
  name: string;
  role: string;
  match: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  activeFeedTab: FeedTab =
    'recommended';

  currentUser: CurrentUser = {
    name: 'Muhammad Fareez',
    firstName: 'Fareez',
    role: 'Junior Software Developer',
    location: 'Selangor, Malaysia',
    bio:
      'Building full-stack applications and growing my backend engineering skills.',
    profileStrength: 82,
    projects: 5,
    verifiedSkills: 8,
    collaborators: 7
  };

  currentIntent: CareerIntent = {
    title:
      'Build and deploy a production-ready backend project',

    description:
      'I want to gain practical deployment experience by building something real with people who have complementary skills.',

    offers: [
      'Angular',
      'Java',
      'Spring Boot'
    ],

    wants: [
      'Docker',
      'CI/CD',
      'Cloud'
    ],

    matches: 14
  };

  mutualMatches: MutualMatch[] = [
    {
      id: 1,
      name: 'Amir Hakim',
      firstName: 'Amir',
      role: 'Junior DevOps Engineer',
      location: 'Kuala Lumpur, Malaysia',
      match: 96,

      description:
        'Amir wants more frontend experience while you are looking to strengthen your deployment skills.',

      youOffer:
        'Angular',

      theyOffer:
        'Docker & CI/CD',

      sharedGoal:
        'Build and deploy a full-stack application',

      createdOrder: 2
    },

    {
      id: 2,
      name: 'Sarah Lim',
      firstName: 'Sarah',
      role: 'Backend Developer',
      location: 'Selangor, Malaysia',
      match: 91,

      description:
        'Sarah is looking for someone with Angular experience and can help you gain exposure to cloud deployment.',

      youOffer:
        'Angular',

      theyOffer:
        'AWS Deployment',

      sharedGoal:
        'Build production-ready software together',

      createdOrder: 3
    },

    {
      id: 3,
      name: 'Daniel Tan',
      firstName: 'Daniel',
      role: 'Junior Software Engineer',
      location: 'Penang, Malaysia',
      match: 87,

      description:
        'Daniel is strengthening his testing knowledge while you are looking to gain more CI/CD experience.',

      youOffer:
        'Software Testing',

      theyOffer:
        'GitHub Actions',

      sharedGoal:
        'Improve practical software engineering skills',

      createdOrder: 1
    }
  ];

  collaborationOpportunities:
    CollaborationOpportunity[] = [
      {
        id: 101,

        owner:
          'Jason Wong',

        ownerRole:
          'Junior Backend Developer',

        title:
          'Build a portfolio analytics platform',

        description:
          'I am building a platform that helps developers understand their project portfolio and I need someone to help create the Angular frontend.',

        lookingFor:
          'Angular Developer',

        commitment:
          '3–4 hrs / week',

        level:
          'Junior friendly',

        match:
          94,

        skills: [
          'Angular',
          'TypeScript',
          'REST API',
          'Spring Boot'
        ],

        saved:
          false
      }
    ];

  suggestedPeople: SuggestedPerson[] = [
    {
      id: 10,
      name: 'Amir Hakim',
      role: 'Junior DevOps Engineer',
      match: 96
    },

    {
      id: 11,
      name: 'Sarah Lim',
      role: 'Backend Developer',
      match: 91
    },

    {
      id: 12,
      name: 'Jason Wong',
      role: 'Cloud Engineer',
      match: 88
    },

    {
      id: 13,
      name: 'Nur Izzati',
      role: 'Software Engineer',
      match: 85
    }
  ];

  get displayedMatches(): MutualMatch[] {
    if (
      this.activeFeedTab ===
      'recommended'
    ) {
      return [
        ...this.mutualMatches
      ].sort(
        (first, second) =>
          second.match -
          first.match
      );
    }

    return [
      ...this.mutualMatches
    ].sort(
      (first, second) =>
        second.createdOrder -
        first.createdOrder
    );
  }

  setFeedTab(
    tab: FeedTab
  ): void {
    this.activeFeedTab = tab;
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

  connectWithPerson(
    match: MutualMatch
  ): void {
    console.log(
      'Connect with:',
      match.name
    );

    /*
     * Later:
     *
     * Open the "Connect with Purpose"
     * modal here.
     */
  }

  quickConnect(
    person: SuggestedPerson
  ): void {
    console.log(
      'Quick connect:',
      person.name
    );

    /*
     * Later this should open the same
     * connection-purpose modal.
     */
  }

  toggleSaveOpportunity(
    opportunity:
      CollaborationOpportunity
  ): void {
    opportunity.saved =
      !opportunity.saved;
  }
}