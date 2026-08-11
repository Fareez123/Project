import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

type ConnectionPurpose =
  | 'Collaboration'
  | 'Skill Exchange'
  | 'I can help'
  | 'Advice'
  | 'Mentorship';

interface PersonSkill {
  name: string;
  evidence: string;
  verificationCount: number;
  level: 'Strong' | 'Growing' | 'Developing';
}

interface PersonProject {
  id: number;
  title: string;
  description: string;
  skills: string[];
  status: 'Completed' | 'In Progress';
}

interface PersonCollaboration {
  id: number;
  title: string;
  collaborator: string;
  type: string;
  status: 'Completed' | 'In Progress';
  skills: string[];
}

interface PersonExperience {
  company: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
}

interface PersonEducation {
  institution: string;
  qualification: string;
  duration: string;
}

interface PersonProfileData {
  id: number;

  name: string;
  firstName: string;

  role: string;
  location: string;

  about: string;

  availability: string[];

  match: number;

  currentGoal: string;
  goalDescription: string;

  theyOffer: string[];
  theyWant: string[];

  sharedGoal: string;

  profileStrength: number;

  projectsCompleted: number;
  verifiedSkills: number;
  collaborators: number;
  peopleHelped: number;

  skills: PersonSkill[];
  projects: PersonProject[];
  collaborations: PersonCollaboration[];
  experiences: PersonExperience[];
  education: PersonEducation[];
}

@Component({
  selector: 'app-person-profile',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './person-profile.html',
  styleUrl: './person-profile.css'
})
export class PersonProfile {
  private readonly route =
    inject(ActivatedRoute);

  isConnectModalOpen = false;

  selectedPurpose:
    ConnectionPurpose | '' = '';

  connectionMessage = '';

  requestSent = false;

  connectionPurposes:
    ConnectionPurpose[] = [
      'Collaboration',
      'Skill Exchange',
      'I can help',
      'Advice',
      'Mentorship'
    ];

  profiles: Record<
    number,
    PersonProfileData
  > = {
    1: {
      id: 1,

      name: 'Amir Hakim',
      firstName: 'Amir',

      role: 'Junior DevOps Engineer',
      location:
        'Kuala Lumpur, Malaysia',

      about:
        'Junior DevOps engineer focused on Docker, CI/CD and Linux environments. I enjoy helping developers understand deployment workflows while improving my frontend development skills.',

      availability: [
        'Project Collaboration',
        'Skill Exchange',
        'Micro Collaboration'
      ],

      match: 96,

      currentGoal:
        'Build and deploy a production-ready full-stack application',

      goalDescription:
        'I want to strengthen my frontend development experience while helping another developer gain practical deployment and DevOps exposure.',

      theyOffer: [
        'Docker',
        'CI/CD',
        'Linux',
        'GitHub Actions'
      ],

      theyWant: [
        'Angular',
        'TypeScript',
        'Frontend Development'
      ],

      sharedGoal:
        'Build and deploy a full-stack application together',

      profileStrength: 88,

      projectsCompleted: 6,
      verifiedSkills: 9,
      collaborators: 8,
      peopleHelped: 11,

      skills: [
        {
          name: 'Docker',
          evidence:
            'Used across 5 deployment projects',
          verificationCount: 4,
          level: 'Strong'
        },
        {
          name: 'CI/CD',
          evidence:
            'Built automated pipelines using GitHub Actions',
          verificationCount: 3,
          level: 'Strong'
        },
        {
          name: 'Linux',
          evidence:
            'Used for development and deployment environments',
          verificationCount: 4,
          level: 'Strong'
        },
        {
          name: 'GitHub Actions',
          evidence:
            'Automated build and deployment workflows',
          verificationCount: 2,
          level: 'Growing'
        },
        {
          name: 'Angular',
          evidence:
            'Currently developing frontend experience',
          verificationCount: 0,
          level: 'Developing'
        }
      ],

      projects: [
        {
          id: 201,

          title:
            'Containerised Spring Boot Platform',

          description:
            'Containerised a Spring Boot application with Docker and created an automated deployment workflow.',

          skills: [
            'Docker',
            'Spring Boot',
            'GitHub Actions'
          ],

          status: 'Completed'
        },

        {
          id: 202,

          title:
            'Cloud Deployment Playground',

          description:
            'Hands-on project for experimenting with deployment automation, Linux servers and application monitoring.',

          skills: [
            'Linux',
            'Docker',
            'CI/CD'
          ],

          status: 'In Progress'
        }
      ],

      collaborations: [
        {
          id: 301,

          title:
            'Expense Management Platform',

          collaborator:
            'Muhammad Fareez',

          type:
            'Project Collaboration',

          status:
            'In Progress',

          skills: [
            'Angular',
            'Spring Boot',
            'Docker'
          ]
        },

        {
          id: 302,

          title:
            'Docker Deployment Review',

          collaborator:
            'Sarah Lim',

          type:
            'Micro Collaboration',

          status:
            'Completed',

          skills: [
            'Docker',
            'Deployment',
            'Code Review'
          ]
        }
      ],

      experiences: [
        {
          company:
            'TechOps Solutions',

          role:
            'Junior DevOps Engineer',

          duration:
            '2026 – Present',

          description:
            'Supports application deployment, CI/CD pipelines, Linux environments and containerised development workflows.',

          skills: [
            'Docker',
            'Linux',
            'CI/CD',
            'GitHub Actions'
          ]
        }
      ],

      education: [
        {
          institution:
            'Universiti Teknologi Malaysia',

          qualification:
            'Bachelor of Computer Science',

          duration:
            'Completed'
        }
      ]
    },

    2: {
      id: 2,

      name: 'Sarah Lim',
      firstName: 'Sarah',

      role: 'Backend Developer',
      location:
        'Selangor, Malaysia',

      about:
        'Backend developer focused on Java, Spring Boot and cloud-based applications. I am interested in working with frontend developers to build complete products.',

      availability: [
        'Project Collaboration',
        'Micro Collaboration'
      ],

      match: 91,

      currentGoal:
        'Build production-ready software with stronger frontend integration',

      goalDescription:
        'I want to work on complete products and strengthen my understanding of frontend architecture while sharing backend and cloud knowledge.',

      theyOffer: [
        'Spring Boot',
        'AWS',
        'PostgreSQL',
        'REST API'
      ],

      theyWant: [
        'Angular',
        'TypeScript',
        'UI Development'
      ],

      sharedGoal:
        'Build production-ready software together',

      profileStrength: 84,

      projectsCompleted: 5,
      verifiedSkills: 8,
      collaborators: 6,
      peopleHelped: 8,

      skills: [
        {
          name: 'Spring Boot',
          evidence:
            'Used in multiple backend applications',
          verificationCount: 4,
          level: 'Strong'
        },
        {
          name: 'AWS',
          evidence:
            'Deployed applications using AWS services',
          verificationCount: 2,
          level: 'Growing'
        },
        {
          name: 'PostgreSQL',
          evidence:
            'Designed relational schemas and queries',
          verificationCount: 3,
          level: 'Strong'
        },
        {
          name: 'Angular',
          evidence:
            'Currently learning frontend development',
          verificationCount: 0,
          level: 'Developing'
        }
      ],

      projects: [
        {
          id: 203,

          title:
            'Backend Order Management API',

          description:
            'REST API for managing customer orders, authentication and transactional workflows.',

          skills: [
            'Java',
            'Spring Boot',
            'PostgreSQL'
          ],

          status: 'Completed'
        }
      ],

      collaborations: [
        {
          id: 303,

          title:
            'Cloud Deployment Review',

          collaborator:
            'Amir Hakim',

          type:
            'Skill Exchange',

          status:
            'Completed',

          skills: [
            'AWS',
            'Docker'
          ]
        }
      ],

      experiences: [
        {
          company:
            'Digital Systems Sdn Bhd',

          role:
            'Backend Developer',

          duration:
            '2025 – Present',

          description:
            'Develops backend services, REST APIs and relational data models using Java and Spring Boot.',

          skills: [
            'Java',
            'Spring Boot',
            'PostgreSQL',
            'AWS'
          ]
        }
      ],

      education: [
        {
          institution:
            'Universiti Malaya',

          qualification:
            'Bachelor of Computer Science',

          duration:
            'Completed'
        }
      ]
    }
  };

  person: PersonProfileData =
    this.profiles[1];

  constructor() {
    this.route.paramMap.subscribe(
      (params) => {
        const id =
          Number(
            params.get('id')
          );

        this.person =
          this.profiles[id] ??
          this.profiles[1];
      }
    );
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

  openConnectModal(): void {
    this.selectedPurpose = '';
    this.connectionMessage = '';
    this.isConnectModalOpen = true;
  }

  closeConnectModal(): void {
    this.isConnectModalOpen = false;
  }

  selectPurpose(
    purpose: ConnectionPurpose
  ): void {
    this.selectedPurpose = purpose;
  }

  sendConnectionRequest(): void {
    if (!this.selectedPurpose) {
      return;
    }

    this.requestSent = true;
    this.isConnectModalOpen = false;
  }

  getSkillLevelClass(
    level:
      PersonSkill['level']
  ): string {
    return (
      'skill-level skill-level--' +
      level.toLowerCase()
    );
  }

  getStatusClass(
    status:
      'Completed' |
      'In Progress'
  ): string {
    return status === 'Completed'
      ? 'status-badge status-badge--completed'
      : 'status-badge status-badge--progress';
  }
}