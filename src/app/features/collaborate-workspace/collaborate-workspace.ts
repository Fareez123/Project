import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

type WorkspaceTab =
  | 'overview'
  | 'tasks'
  | 'evidence'
  | 'activity';

type CollaborationType =
  | 'Project Collaboration'
  | 'Skill Exchange'
  | 'Micro Collaboration';

type CollaborationStatus =
  | 'In Progress'
  | 'Completed';

type TaskStatus =
  | 'To Do'
  | 'In Progress'
  | 'Completed';

type EvidenceType =
  | 'Code'
  | 'Document'
  | 'Link'
  | 'Review'
  | 'Deployment';

interface WorkspaceMember {
  id: number;
  name: string;
  role: string;
  projectRole: string;
}

interface WorkspaceTask {
  id: number;
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
  skill: string;
}

interface WorkspaceEvidence {
  id: number;
  title: string;
  description: string;
  type: EvidenceType;
  addedBy: string;
  date: string;
  skills: string[];
  link?: string;
}

interface WorkspaceActivity {
  id: number;
  user: string;
  action: string;
  target?: string;
  time: string;
}

interface Workspace {
  id: number;

  title: string;
  type: CollaborationType;
  status: CollaborationStatus;

  description: string;

  goal: string;

  commitment: string;
  startedDate: string;

  skills: string[];

  members: WorkspaceMember[];

  currentMilestone: string;

  tasks: WorkspaceTask[];

  evidence: WorkspaceEvidence[];

  activity: WorkspaceActivity[];
}

interface EvidenceForm {
  title: string;
  description: string;
  type: EvidenceType;
  skills: string;
  link: string;
}

@Component({
  selector: 'app-collaborate-workspace',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './collaborate-workspace.html',
  styleUrl: './collaborate-workspace.css'
})
export class CollaborateWorkspace {
  private readonly route =
    inject(ActivatedRoute);

  activeTab: WorkspaceTab =
    'overview';

  isEvidenceModalOpen = false;

  completionMessage = '';

  evidenceTypes: EvidenceType[] = [
    'Code',
    'Document',
    'Link',
    'Review',
    'Deployment'
  ];

  evidenceForm: EvidenceForm = {
    title: '',
    description: '',
    type: 'Code',
    skills: '',
    link: ''
  };

  workspaces: Record<number, Workspace> = {
    101: {
      id: 101,

      title:
        'Expense Management Platform',

      type:
        'Project Collaboration',

      status:
        'In Progress',

      description:
        'Building a full-stack expense management application while combining frontend, backend and deployment experience.',

      goal:
        'Build and deploy a production-ready expense management platform using Angular, Spring Boot and Docker.',

      commitment:
        '3–4 hrs / week',

      startedDate:
        '5 August 2026',

      skills: [
        'Angular',
        'Spring Boot',
        'Docker',
        'REST API'
      ],

      members: [
        {
          id: 0,
          name: 'Muhammad Fareez',
          role: 'Junior Software Developer',
          projectRole:
            'Frontend & API Integration'
        },
        {
          id: 1,
          name: 'Amir Hakim',
          role: 'Junior DevOps Engineer',
          projectRole:
            'DevOps & Deployment'
        }
      ],

      currentMilestone:
        'Containerise the application using Docker',

      tasks: [
        {
          id: 1,
          title:
            'Build Angular dashboard',
          description:
            'Create the main expense dashboard and transaction views.',
          assignee:
            'Muhammad Fareez',
          status:
            'Completed',
          skill:
            'Angular'
        },
        {
          id: 2,
          title:
            'Connect REST APIs',
          description:
            'Integrate the Angular frontend with Spring Boot endpoints.',
          assignee:
            'Muhammad Fareez',
          status:
            'Completed',
          skill:
            'REST API'
        },
        {
          id: 3,
          title:
            'Dockerise frontend',
          description:
            'Create a Docker image for the Angular frontend.',
          assignee:
            'Amir Hakim',
          status:
            'In Progress',
          skill:
            'Docker'
        },
        {
          id: 4,
          title:
            'Dockerise backend',
          description:
            'Containerise the Spring Boot service.',
          assignee:
            'Amir Hakim',
          status:
            'In Progress',
          skill:
            'Docker'
        },
        {
          id: 5,
          title:
            'Deploy application',
          description:
            'Deploy the frontend and backend into a shared environment.',
          assignee:
            'Amir Hakim',
          status:
            'To Do',
          skill:
            'Deployment'
        }
      ],

      evidence: [
        {
          id: 1,
          title:
            'Angular Expense Dashboard',

          description:
            'Responsive dashboard and transaction management interface implemented in Angular.',

          type:
            'Code',

          addedBy:
            'Muhammad Fareez',

          date:
            '8 Aug 2026',

          skills: [
            'Angular',
            'TypeScript'
          ]
        },
        {
          id: 2,
          title:
            'Frontend API Integration',

          description:
            'Connected expense and transaction screens to backend REST endpoints.',

          type:
            'Code',

          addedBy:
            'Muhammad Fareez',

          date:
            '9 Aug 2026',

          skills: [
            'Angular',
            'REST API'
          ]
        },
        {
          id: 3,
          title:
            'Docker Configuration',

          description:
            'Initial Docker configuration for the application deployment environment.',

          type:
            'Deployment',

          addedBy:
            'Amir Hakim',

          date:
            '10 Aug 2026',

          skills: [
            'Docker'
          ]
        }
      ],

      activity: [
        {
          id: 1,
          user:
            'Amir Hakim',
          action:
            'started working on',
          target:
            'Dockerise frontend',
          time:
            '2 hours ago'
        },
        {
          id: 2,
          user:
            'Muhammad Fareez',
          action:
            'added evidence',
          target:
            'Frontend API Integration',
          time:
            'Yesterday'
        },
        {
          id: 3,
          user:
            'Muhammad Fareez',
          action:
            'completed',
          target:
            'Connect REST APIs',
          time:
            'Yesterday'
        },
        {
          id: 4,
          user:
            'Amir Hakim',
          action:
            'added deployment evidence',
          target:
            'Docker Configuration',
          time:
            '2 days ago'
        }
      ]
    },

    102: {
      id: 102,

      title:
        'Angular ↔ Docker Skill Exchange',

      type:
        'Skill Exchange',

      status:
        'In Progress',

      description:
        'A practical skill exchange where Fareez shares Angular knowledge while Amir teaches Docker and deployment fundamentals.',

      goal:
        'Complete a small application where both participants demonstrate the skill they are learning.',

      commitment:
        '2 hrs / week',

      startedDate:
        '2 August 2026',

      skills: [
        'Angular',
        'TypeScript',
        'Docker'
      ],

      members: [
        {
          id: 0,
          name: 'Muhammad Fareez',
          role: 'Junior Software Developer',
          projectRole:
            'Angular Guide'
        },
        {
          id: 1,
          name: 'Amir Hakim',
          role: 'Junior DevOps Engineer',
          projectRole:
            'Docker Guide'
        }
      ],

      currentMilestone:
        'Dockerise an Angular application together',

      tasks: [
        {
          id: 1,
          title:
            'Angular fundamentals session',
          description:
            'Explain component structure and Angular routing.',
          assignee:
            'Muhammad Fareez',
          status:
            'Completed',
          skill:
            'Angular'
        },
        {
          id: 2,
          title:
            'Docker fundamentals session',
          description:
            'Learn images, containers and Dockerfiles.',
          assignee:
            'Amir Hakim',
          status:
            'Completed',
          skill:
            'Docker'
        },
        {
          id: 3,
          title:
            'Dockerise Angular app',
          description:
            'Create a Dockerfile and run the application in a container.',
          assignee:
            'Muhammad Fareez',
          status:
            'In Progress',
          skill:
            'Docker'
        },
        {
          id: 4,
          title:
            'Build Angular feature',
          description:
            'Amir implements a small Angular feature independently.',
          assignee:
            'Amir Hakim',
          status:
            'To Do',
          skill:
            'Angular'
        }
      ],

      evidence: [
        {
          id: 1,
          title:
            'Angular Routing Exercise',

          description:
            'Completed Angular routing and navigation exercise.',

          type:
            'Code',

          addedBy:
            'Amir Hakim',

          date:
            '5 Aug 2026',

          skills: [
            'Angular'
          ]
        },
        {
          id: 2,
          title:
            'Docker Fundamentals Exercise',

          description:
            'Created and ran the first Docker container successfully.',

          type:
            'Deployment',

          addedBy:
            'Muhammad Fareez',

          date:
            '7 Aug 2026',

          skills: [
            'Docker'
          ]
        }
      ],

      activity: [
        {
          id: 1,
          user:
            'Muhammad Fareez',
          action:
            'started',
          target:
            'Dockerise Angular app',
          time:
            'Today'
        },
        {
          id: 2,
          user:
            'Amir Hakim',
          action:
            'completed',
          target:
            'Docker fundamentals session',
          time:
            '4 days ago'
        }
      ]
    },

    103: {
      id: 103,

      title:
        'Spring Boot Authentication Review',

      type:
        'Micro Collaboration',

      status:
        'Completed',

      description:
        'A short code review collaboration focused on JWT authentication and Spring Boot application structure.',

      goal:
        'Review the authentication implementation and provide actionable feedback.',

      commitment:
        '45 minutes',

      startedDate:
        '1 August 2026',

      skills: [
        'Java',
        'Spring Boot',
        'JWT',
        'Code Review'
      ],

      members: [
        {
          id: 0,
          name: 'Muhammad Fareez',
          role: 'Junior Software Developer',
          projectRole:
            'Code Reviewer'
        },
        {
          id: 4,
          name: 'Nur Aina',
          role: 'Junior Software Developer',
          projectRole:
            'Backend Developer'
        }
      ],

      currentMilestone:
        'Collaboration completed',

      tasks: [
        {
          id: 1,
          title:
            'Review controller',
          description:
            'Review authentication controller structure.',
          assignee:
            'Muhammad Fareez',
          status:
            'Completed',
          skill:
            'Spring Boot'
        },
        {
          id: 2,
          title:
            'Review JWT flow',
          description:
            'Review token generation and authentication logic.',
          assignee:
            'Muhammad Fareez',
          status:
            'Completed',
          skill:
            'JWT'
        }
      ],

      evidence: [
        {
          id: 1,
          title:
            'Authentication Code Review',

          description:
            'Completed review covering JWT flow, controller responsibilities and service separation.',

          type:
            'Review',

          addedBy:
            'Muhammad Fareez',

          date:
            '1 Aug 2026',

          skills: [
            'Java',
            'Spring Boot',
            'Code Review'
          ]
        }
      ],

      activity: [
        {
          id: 1,
          user:
            'Muhammad Fareez',
          action:
            'completed the collaboration',
          time:
            '1 Aug 2026'
        }
      ]
    }
  };

  workspace: Workspace =
    this.workspaces[101];

  constructor() {
    this.route.paramMap.subscribe(
      (params) => {
        const id =
          Number(params.get('id'));

        this.workspace =
          this.workspaces[id] ??
          this.workspaces[101];
      }
    );
  }

  get progress(): number {
    if (
      this.workspace.tasks.length === 0
    ) {
      return 0;
    }

    const completed =
      this.workspace.tasks.filter(
        (task) =>
          task.status === 'Completed'
      ).length;

    return Math.round(
      (
        completed /
        this.workspace.tasks.length
      ) * 100
    );
  }

  get completedTasks(): number {
    return this.workspace.tasks.filter(
      (task) =>
        task.status === 'Completed'
    ).length;
  }

  get canCompleteCollaboration(): boolean {
    return (
      this.workspace.status !==
        'Completed' &&
      this.progress === 100
    );
  }

  setTab(
    tab: WorkspaceTab
  ): void {
    this.activeTab = tab;
  }

  cycleTaskStatus(
    task: WorkspaceTask
  ): void {
    if (
      this.workspace.status ===
      'Completed'
    ) {
      return;
    }

    if (
      task.status === 'To Do'
    ) {
      task.status =
        'In Progress';
    } else if (
      task.status ===
      'In Progress'
    ) {
      task.status =
        'Completed';
    } else {
      task.status =
        'To Do';
    }

    this.addActivity(
      'Muhammad Fareez',
      'updated task',
      `${task.title} → ${task.status}`
    );
  }

  openEvidenceModal(): void {
    this.evidenceForm = {
      title: '',
      description: '',
      type: 'Code',
      skills: '',
      link: ''
    };

    this.isEvidenceModalOpen = true;
  }

  closeEvidenceModal(): void {
    this.isEvidenceModalOpen = false;
  }

  addEvidence(): void {
    if (
      !this.evidenceForm.title.trim() ||
      !this.evidenceForm.description.trim()
    ) {
      return;
    }

    const parsedSkills =
      this.evidenceForm.skills
        .split(',')
        .map(
          (skill) =>
            skill.trim()
        )
        .filter(Boolean);

    const evidence:
      WorkspaceEvidence = {
        id:
          Date.now(),

        title:
          this.evidenceForm.title.trim(),

        description:
          this.evidenceForm.description.trim(),

        type:
          this.evidenceForm.type,

        addedBy:
          'Muhammad Fareez',

        date:
          'Today',

        skills:
          parsedSkills,

        link:
          this.evidenceForm.link.trim() ||
          undefined
      };

    this.workspace.evidence.unshift(
      evidence
    );

    this.addActivity(
      'Muhammad Fareez',
      'added evidence',
      evidence.title
    );

    this.isEvidenceModalOpen = false;

    this.activeTab = 'evidence';
  }

  completeCollaboration(): void {
    if (
      !this.canCompleteCollaboration
    ) {
      return;
    }

    this.workspace.status =
      'Completed';

    this.workspace.currentMilestone =
      'Collaboration completed — peer verification available';

    this.completionMessage =
      'Collaboration completed. You can now verify each other’s contributions and skills.';

    this.addActivity(
      'Muhammad Fareez',
      'completed the collaboration'
    );
  }

  addActivity(
    user: string,
    action: string,
    target?: string
  ): void {
    this.workspace.activity.unshift({
      id:
        Date.now(),

      user,
      action,
      target,
      time:
        'Just now'
    });
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

  getTaskStatusClass(
    status: TaskStatus
  ): string {
    if (
      status === 'Completed'
    ) {
      return (
        'task-status ' +
        'task-status--completed'
      );
    }

    if (
      status === 'In Progress'
    ) {
      return (
        'task-status ' +
        'task-status--progress'
      );
    }

    return (
      'task-status ' +
      'task-status--todo'
    );
  }

  getEvidenceIcon(
    type: EvidenceType
  ): string {
    switch (type) {
      case 'Code':
        return '</>';

      case 'Deployment':
        return '↑';

      case 'Review':
        return '✓';

      case 'Document':
        return '▤';

      case 'Link':
        return '↗';

      default:
        return '◇';
    }
  }
}