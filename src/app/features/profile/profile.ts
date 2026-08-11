import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface SkillEvidence {
  name: string;
  evidence: string;
  verificationCount: number;
  level: 'Strong' | 'Growing' | 'Developing';
}

interface Project {
  id: number;
  title: string;
  description: string;
  skills: string[];
  status: 'Completed' | 'In Progress';
}

interface Collaboration {
  id: number;
  title: string;
  collaborator: string;
  type: string;
  status: 'Completed' | 'In Progress';
  skills: string[];
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
}

interface Education {
  institution: string;
  qualification: string;
  duration: string;
}

interface Certification {
  name: string;
  issuer: string;
  verified: boolean;
}

interface ProfileEditForm {
  name: string;
  role: string;
  location: string;
  about: string;
}

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  profileStrength = 82;
  isEditing = false;

  profile = {
    name: 'Muhammad Fareez',
    role: 'Junior Software Developer',
    location: 'Selangor, Malaysia',

    about:
      'Information Systems graduate focused on building practical full-stack applications. I enjoy working with Java, Spring Boot and Angular, and I am currently strengthening my deployment and DevOps knowledge.',

    availability:
      'Open to collaboration',

    currentGoal:
      'Build and deploy a production-ready backend project',

    goalDescription:
      'Gain practical experience with Docker, CI/CD and cloud deployment by building real software with other developers.',

    offers: [
      'Angular',
      'Java',
      'Spring Boot',
      'SQL',
      'Software Testing'
    ],

    developing: [
      'Docker',
      'CI/CD',
      'Cloud Deployment'
    ]
  };

  editForm: ProfileEditForm = {
    name: this.profile.name,
    role: this.profile.role,
    location: this.profile.location,
    about: this.profile.about
  };

  skills: SkillEvidence[] = [
    {
      name: 'Angular',
      evidence: 'Used across 5 projects',
      verificationCount: 3,
      level: 'Strong'
    },
    {
      name: 'Java',
      evidence: 'Used across 4 projects',
      verificationCount: 3,
      level: 'Strong'
    },
    {
      name: 'Spring Boot',
      evidence: 'Used across 3 backend projects',
      verificationCount: 2,
      level: 'Strong'
    },
    {
      name: 'SQL',
      evidence: 'Oracle and MySQL project experience',
      verificationCount: 2,
      level: 'Growing'
    },
    {
      name: 'Docker',
      evidence: 'Currently building practical evidence',
      verificationCount: 0,
      level: 'Developing'
    }
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'CareerFlow',
      description:
        'Professional growth platform focused on mutual skill matching, collaboration and evidence-based profiles.',
      skills: [
        'Angular',
        'TypeScript',
        'Spring Boot',
        'SQL'
      ],
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'FlowDesk',
      description:
        'Service request management system featuring request workflows, approvals, reporting and user management.',
      skills: [
        'Angular',
        'Java',
        'Spring Boot',
        'REST API'
      ],
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Stock Control System',
      description:
        'Web-based stock management workflow designed around multi-level inventory operations.',
      skills: [
        'Angular',
        'Spring Boot',
        'MySQL'
      ],
      status: 'Completed'
    }
  ];

  collaborations: Collaboration[] = [
    {
      id: 101,
      title: 'Expense Management Platform',
      collaborator: 'Amir Hakim',
      type: 'Project Collaboration',
      status: 'In Progress',
      skills: [
        'Angular',
        'Spring Boot',
        'Docker'
      ]
    },
    {
      id: 102,
      title: 'Angular ↔ Docker Exchange',
      collaborator: 'Amir Hakim',
      type: 'Skill Exchange',
      status: 'In Progress',
      skills: [
        'Angular',
        'Docker'
      ]
    },
    {
      id: 103,
      title: 'Authentication API Review',
      collaborator: 'Nur Aina',
      type: 'Micro Collaboration',
      status: 'Completed',
      skills: [
        'Java',
        'Spring Boot',
        'Code Review'
      ]
    }
  ];

  experiences: Experience[] = [
    {
      company: 'HeiTech Padu Berhad',
      role: 'Software Development Intern',
      duration: '1 year',
      description:
        'Supported enterprise system implementation and development using Angular, Java, Spring Boot, Oracle Database and REST APIs.',
      skills: [
        'Angular',
        'Java',
        'Spring Boot',
        'Oracle',
        'REST API'
      ]
    }
  ];

  education: Education[] = [
    {
      institution: 'Universiti Teknologi MARA (UiTM)',
      qualification:
        'Bachelor of Information Systems (Hons.)',
      duration: 'Completed'
    }
  ];

  certifications: Certification[] = [
    {
      name: 'CPRE-FL',
      issuer: 'IREB',
      verified: true
    },
    {
      name: 'CTFL',
      issuer: 'ISTQB',
      verified: true
    }
  ];

  getInitials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  openEditProfile(): void {
    this.editForm = {
      name: this.profile.name,
      role: this.profile.role,
      location: this.profile.location,
      about: this.profile.about
    };

    this.isEditing = true;
  }

  closeEditProfile(): void {
    this.isEditing = false;
  }

  saveProfile(): void {
    this.profile.name = this.editForm.name.trim();
    this.profile.role = this.editForm.role.trim();
    this.profile.location = this.editForm.location.trim();
    this.profile.about = this.editForm.about.trim();

    this.isEditing = false;
  }

  getSkillLevelClass(
    level: SkillEvidence['level']
  ): string {
    return (
      'skill-level skill-level--' +
      level.toLowerCase()
    );
  }

  getStatusClass(
    status: 'Completed' | 'In Progress'
  ): string {
    return status === 'Completed'
      ? 'status-badge status-badge--completed'
      : 'status-badge status-badge--progress';
  }
}