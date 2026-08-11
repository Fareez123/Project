import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type DiscoverTab =
  | 'recommended'
  | 'people'
  | 'collaborations'
  | 'mentors';

type ExperienceLevel =
  | 'Student'
  | 'Fresh Graduate'
  | 'Junior'
  | 'Mid-level';

interface PersonSkill {
  name: string;
  type: 'offer' | 'learn';
}

interface DiscoverPerson {
  id: number;
  name: string;
  role: string;
  location: string;
  experienceLevel: ExperienceLevel;

  match: number;

  bio: string;

  offers: string[];
  wants: string[];

  sharedGoal: string;

  availableFor: string[];

  connected: boolean;
}

interface CollaborationOpportunity {
  id: number;

  owner: string;
  ownerRole: string;

  title: string;
  description: string;

  match: number;

  commitment: string;
  experienceLevel: string;

  skills: string[];

  applicants: number;

  saved: boolean;
}

@Component({
  selector: 'app-discover',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './discover.html',
  styleUrl: './discover.css'
})
export class Discover {
  activeTab: DiscoverTab = 'recommended';

  searchQuery = '';

  selectedSkill = '';
  selectedLevel = '';
  selectedLocation = '';

  showFilters = false;

  skills = [
    'Angular',
    'Java',
    'Spring Boot',
    'Docker',
    'AWS',
    'CI/CD',
    'SQL',
    'React',
    'Node.js',
    'Testing'
  ];

  experienceLevels: ExperienceLevel[] = [
    'Student',
    'Fresh Graduate',
    'Junior',
    'Mid-level'
  ];

  people: DiscoverPerson[] = [
    {
      id: 1,
      name: 'Amir Hakim',
      role: 'Junior DevOps Engineer',
      location: 'Kuala Lumpur, Malaysia',
      experienceLevel: 'Junior',
      match: 96,

      bio:
        'Learning frontend development while working with Docker, CI/CD and cloud deployment.',

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
        'Build and deploy a production-ready full-stack application',

      availableFor: [
        'Collaboration',
        'Skill Exchange'
      ],

      connected: false
    },

    {
      id: 2,
      name: 'Sarah Lim',
      role: 'Backend Developer',
      location: 'Selangor, Malaysia',
      experienceLevel: 'Junior',
      match: 91,

      bio:
        'Backend developer interested in cloud deployment and building complete products with frontend developers.',

      offers: [
        'Spring Boot',
        'AWS',
        'PostgreSQL'
      ],

      wants: [
        'Angular',
        'UI Development'
      ],

      sharedGoal:
        'Build production-ready applications with stronger frontend experience',

      availableFor: [
        'Collaboration',
        'Micro Collaboration'
      ],

      connected: false
    },

    {
      id: 3,
      name: 'Daniel Tan',
      role: 'Software Engineer',
      location: 'Penang, Malaysia',
      experienceLevel: 'Junior',
      match: 87,

      bio:
        'Interested in software quality, automation and helping junior developers improve engineering practices.',

      offers: [
        'GitHub Actions',
        'Testing',
        'Code Review'
      ],

      wants: [
        'Spring Boot',
        'API Design'
      ],

      sharedGoal:
        'Improve practical software engineering and delivery skills',

      availableFor: [
        'Skill Exchange',
        'Mentoring'
      ],

      connected: false
    },

    {
      id: 4,
      name: 'Nur Aina',
      role: 'Fresh Graduate Software Developer',
      location: 'Johor Bahru, Malaysia',
      experienceLevel: 'Fresh Graduate',
      match: 84,

      bio:
        'Fresh graduate building portfolio projects and looking for experience collaborating with other developers.',

      offers: [
        'Java',
        'Testing',
        'SQL'
      ],

      wants: [
        'Angular',
        'Docker'
      ],

      sharedGoal:
        'Build stronger full-stack project experience',

      availableFor: [
        'Collaboration',
        'Micro Collaboration'
      ],

      connected: false
    },

    {
      id: 5,
      name: 'Jason Wong',
      role: 'Cloud Engineer',
      location: 'Kuala Lumpur, Malaysia',
      experienceLevel: 'Mid-level',
      match: 78,

      bio:
        'Cloud engineer interested in mentoring developers who want practical AWS and deployment experience.',

      offers: [
        'AWS',
        'Docker',
        'Cloud Deployment'
      ],

      wants: [
        'Mentoring Experience'
      ],

      sharedGoal:
        'Help junior developers deploy their first production application',

      availableFor: [
        'Mentoring'
      ],

      connected: false
    }
  ];

  collaborations: CollaborationOpportunity[] = [
    {
      id: 101,

      owner: 'Aina Rahman',
      ownerRole: 'Junior Backend Developer',

      title:
        'Build a personal finance management platform',

      description:
        'Looking for an Angular developer to help build a responsive frontend while I develop the Spring Boot backend.',

      match: 94,

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

      applicants: 3,

      saved: false
    },

    {
      id: 102,

      owner: 'Hakim Zain',
      ownerRole: 'Fresh Graduate',

      title:
        'Deploy a full-stack application with Docker',

      description:
        'Looking for another junior developer to build and deploy a small application together while learning Docker.',

      match: 91,

      commitment:
        '2–3 hrs / week',

      experienceLevel:
        'Beginner friendly',

      skills: [
        'Docker',
        'Java',
        'Angular'
      ],

      applicants: 5,

      saved: false
    }
  ];

  get filteredPeople(): DiscoverPerson[] {
    const search =
      this.searchQuery
        .trim()
        .toLowerCase();

    return this.people
      .filter((person) => {
        const matchesSearch =
          !search ||
          person.name
            .toLowerCase()
            .includes(search) ||
          person.role
            .toLowerCase()
            .includes(search) ||
          person.offers.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(search)
          ) ||
          person.wants.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(search)
          );

        const matchesSkill =
          !this.selectedSkill ||
          person.offers.includes(
            this.selectedSkill
          ) ||
          person.wants.includes(
            this.selectedSkill
          );

        const matchesLevel =
          !this.selectedLevel ||
          person.experienceLevel ===
            this.selectedLevel;

        const matchesLocation =
          !this.selectedLocation ||
          person.location
            .toLowerCase()
            .includes(
              this.selectedLocation
                .toLowerCase()
            );

        return (
          matchesSearch &&
          matchesSkill &&
          matchesLevel &&
          matchesLocation
        );
      })
      .sort(
        (first, second) =>
          second.match - first.match
      );
  }

  setTab(
    tab: DiscoverTab
  ): void {
    this.activeTab = tab;
  }

  toggleFilters(): void {
    this.showFilters =
      !this.showFilters;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedSkill = '';
    this.selectedLevel = '';
    this.selectedLocation = '';
  }

  connect(
    person: DiscoverPerson
  ): void {
    person.connected =
      !person.connected;
  }

  toggleSaveCollaboration(
    collaboration:
      CollaborationOpportunity
  ): void {
    collaboration.saved =
      !collaboration.saved;
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
}