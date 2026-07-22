import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ReportPeriod = '6' | '9' | '12';

type Department =
  | 'All Departments'
  | 'Information Technology'
  | 'Finance'
  | 'Human Resources'
  | 'Operations'
  | 'Administration';

interface MonthlyReport {
  label: string;
  shortLabel: string;
  submitted: number;
  resolved: number;
  overdue: number;
  averageResolutionHours: number;
  slaRate: number;
}

interface ReportSummary {
  submitted: number;
  resolved: number;
  pending: number;
  overdue: number;
  averageResolutionHours: number;
  slaRate: number;
}

interface StatusReport {
  label: string;
  value: number;
  type: 'resolved' | 'progress' | 'open' | 'cancelled';
}

interface CategoryReport {
  label: string;
  value: number;
  type: 'support' | 'access' | 'equipment' | 'facility' | 'general';
  icon: string;
}

interface SlaReport {
  label: string;
  target: string;
  met: number;
  missed: number;
  compliance: number;
}

@Component({
  selector: 'app-reports',
  imports: [FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {
  selectedPeriod: ReportPeriod = '6';
  selectedDepartment: Department = 'All Departments';

  generatedAt = this.formatGeneratedDate(new Date());

  notificationMessage = '';

  readonly departments: Department[] = [
    'All Departments',
    'Information Technology',
    'Finance',
    'Human Resources',
    'Operations',
    'Administration'
  ];

  private readonly departmentFactors: Record<Department, number> = {
    'All Departments': 1,
    'Information Technology': 0.42,
    Finance: 0.18,
    'Human Resources': 0.13,
    Operations: 0.17,
    Administration: 0.1
  };

  private readonly monthlyData: MonthlyReport[] = [
    {
      label: 'August 2025',
      shortLabel: 'Aug',
      submitted: 48,
      resolved: 43,
      overdue: 3,
      averageResolutionHours: 20.4,
      slaRate: 89
    },
    {
      label: 'September 2025',
      shortLabel: 'Sep',
      submitted: 54,
      resolved: 50,
      overdue: 2,
      averageResolutionHours: 18.8,
      slaRate: 91
    },
    {
      label: 'October 2025',
      shortLabel: 'Oct',
      submitted: 61,
      resolved: 56,
      overdue: 4,
      averageResolutionHours: 19.2,
      slaRate: 90
    },
    {
      label: 'November 2025',
      shortLabel: 'Nov',
      submitted: 58,
      resolved: 55,
      overdue: 2,
      averageResolutionHours: 17.5,
      slaRate: 93
    },
    {
      label: 'December 2025',
      shortLabel: 'Dec',
      submitted: 45,
      resolved: 42,
      overdue: 2,
      averageResolutionHours: 16.9,
      slaRate: 94
    },
    {
      label: 'January 2026',
      shortLabel: 'Jan',
      submitted: 66,
      resolved: 60,
      overdue: 4,
      averageResolutionHours: 18.1,
      slaRate: 92
    },
    {
      label: 'February 2026',
      shortLabel: 'Feb',
      submitted: 63,
      resolved: 59,
      overdue: 3,
      averageResolutionHours: 17.3,
      slaRate: 93
    },
    {
      label: 'March 2026',
      shortLabel: 'Mar',
      submitted: 72,
      resolved: 67,
      overdue: 3,
      averageResolutionHours: 16.5,
      slaRate: 94
    },
    {
      label: 'April 2026',
      shortLabel: 'Apr',
      submitted: 69,
      resolved: 65,
      overdue: 2,
      averageResolutionHours: 15.9,
      slaRate: 95
    },
    {
      label: 'May 2026',
      shortLabel: 'May',
      submitted: 78,
      resolved: 72,
      overdue: 4,
      averageResolutionHours: 16.2,
      slaRate: 94
    },
    {
      label: 'June 2026',
      shortLabel: 'Jun',
      submitted: 82,
      resolved: 77,
      overdue: 3,
      averageResolutionHours: 15.1,
      slaRate: 96
    },
    {
      label: 'July 2026',
      shortLabel: 'Jul',
      submitted: 76,
      resolved: 71,
      overdue: 3,
      averageResolutionHours: 14.8,
      slaRate: 96
    }
  ];

  private readonly baseCategories = [
    {
      label: 'IT Support',
      share: 0.34,
      type: 'support' as const,
      icon: 'IT'
    },
    {
      label: 'Access Requests',
      share: 0.24,
      type: 'access' as const,
      icon: 'A'
    },
    {
      label: 'Equipment Requests',
      share: 0.18,
      type: 'equipment' as const,
      icon: 'E'
    },
    {
      label: 'Facility Requests',
      share: 0.14,
      type: 'facility' as const,
      icon: 'F'
    },
    {
      label: 'General Requests',
      share: 0.1,
      type: 'general' as const,
      icon: 'G'
    }
  ];

  get periodLabel(): string {
    return `last ${this.selectedPeriod} months`;
  }

  get filteredMonthlyData(): MonthlyReport[] {
    const period = Number(this.selectedPeriod);
    const factor = this.departmentFactors[this.selectedDepartment];

    return this.monthlyData
      .slice(-period)
      .map((month) => ({
        ...month,
        submitted: this.scaleValue(month.submitted, factor),
        resolved: this.scaleValue(month.resolved, factor),
        overdue: this.scaleValue(month.overdue, factor, true),
        averageResolutionHours:
          this.selectedDepartment === 'All Departments'
            ? month.averageResolutionHours
            : Number(
                (
                  month.averageResolutionHours *
                  this.getResolutionFactor()
                ).toFixed(1)
              ),
        slaRate: Math.min(
          99,
          Math.max(
            75,
            month.slaRate + this.getSlaAdjustment()
          )
        )
      }));
  }

  get summary(): ReportSummary {
    const data = this.filteredMonthlyData;

    const submitted = data.reduce(
      (total, month) => total + month.submitted,
      0
    );

    const resolved = data.reduce(
      (total, month) => total + month.resolved,
      0
    );

    const overdue = data.reduce(
      (total, month) => total + month.overdue,
      0
    );

    const averageResolutionHours =
      data.length === 0
        ? 0
        : data.reduce(
            (total, month) =>
              total + month.averageResolutionHours,
            0
          ) / data.length;

    const slaRate =
      data.length === 0
        ? 0
        : Math.round(
            data.reduce(
              (total, month) => total + month.slaRate,
              0
            ) / data.length
          );

    return {
      submitted,
      resolved,
      pending: Math.max(0, submitted - resolved),
      overdue,
      averageResolutionHours:
        Number(averageResolutionHours.toFixed(1)),
      slaRate
    };
  }

  get chartMaximum(): number {
    const highestValue = Math.max(
      ...this.filteredMonthlyData.flatMap((month) => [
        month.submitted,
        month.resolved
      ]),
      1
    );

    return Math.ceil(highestValue / 10) * 10;
  }

  get categoryData(): CategoryReport[] {
    const submitted = this.summary.submitted;
    let assigned = 0;

    return this.baseCategories.map((category, index) => {
      const isLast = index === this.baseCategories.length - 1;

      const value = isLast
        ? Math.max(0, submitted - assigned)
        : Math.round(submitted * category.share);

      assigned += value;

      return {
        label: category.label,
        value,
        type: category.type,
        icon: category.icon
      };
    });
  }

  get statusData(): StatusReport[] {
    const total = this.summary.submitted;
    const resolved = this.summary.resolved;
    const unresolved = Math.max(0, total - resolved);

    const cancelled = Math.round(total * 0.03);
    const inProgress = Math.max(
      0,
      Math.round(unresolved * 0.6)
    );

    const open = Math.max(
      0,
      total - resolved - inProgress - cancelled
    );

    return [
      {
        label: 'Resolved',
        value: resolved,
        type: 'resolved'
      },
      {
        label: 'In Progress',
        value: inProgress,
        type: 'progress'
      },
      {
        label: 'Open',
        value: open,
        type: 'open'
      },
      {
        label: 'Cancelled',
        value: cancelled,
        type: 'cancelled'
      }
    ];
  }

  get statusPercentages(): {
    resolved: number;
    inProgress: number;
    open: number;
  } {
    const resolved =
      this.statusData.find(
        (status) => status.type === 'resolved'
      )?.value ?? 0;

    const inProgress =
      this.statusData.find(
        (status) => status.type === 'progress'
      )?.value ?? 0;

    const open =
      this.statusData.find(
        (status) => status.type === 'open'
      )?.value ?? 0;

    return {
      resolved: this.getPercentage(
        resolved,
        this.summary.submitted
      ),
      inProgress: this.getPercentage(
        inProgress,
        this.summary.submitted
      ),
      open: this.getPercentage(
        open,
        this.summary.submitted
      )
    };
  }

  get scaledSlaItems(): SlaReport[] {
    const total = Math.max(1, this.summary.submitted);

    const firstResponseCompliance = Math.min(
      99,
      this.summary.slaRate + 2
    );

    const resolutionCompliance = this.summary.slaRate;

    const urgentCompliance = Math.max(
      80,
      this.summary.slaRate - 3
    );

    return [
      this.createSlaItem(
        'First Response',
        'Target: within 4 hours',
        firstResponseCompliance,
        total
      ),
      this.createSlaItem(
        'Request Resolution',
        'Target: within 2 business days',
        resolutionCompliance,
        total
      ),
      this.createSlaItem(
        'Urgent Requests',
        'Target: within 8 hours',
        urgentCompliance,
        Math.max(1, Math.round(total * 0.18))
      )
    ];
  }

  getBarHeight(value: number): number {
    if (value <= 0) {
      return 0;
    }

    return Math.max(
      5,
      Math.round((value / this.chartMaximum) * 100)
    );
  }

  getAxisValue(multiplier: number): number {
    return Math.round(this.chartMaximum * multiplier);
  }

  getPendingCount(month: MonthlyReport): number {
    return Math.max(
      0,
      month.submitted - month.resolved
    );
  }

  getPercentage(value: number, total: number): number {
    if (total <= 0) {
      return 0;
    }

    return Math.round((value / total) * 100);
  }

  formatHours(hours: number): string {
    if (hours < 24) {
      return `${hours.toFixed(1)} hrs`;
    }

    return `${(hours / 24).toFixed(1)} days`;
  }

  getSlaClass(rate: number): string {
    if (rate >= 95) {
      return 'sla-badge sla-badge--excellent';
    }

    if (rate >= 90) {
      return 'sla-badge sla-badge--good';
    }

    return 'sla-badge sla-badge--warning';
  }

  generateReport(): void {
    this.generatedAt = this.formatGeneratedDate(new Date());

    this.notificationMessage =
      `${this.selectedDepartment} report for the ` +
      `${this.periodLabel} was generated successfully.`;
  }

  downloadCsv(): void {
    const heading = [
      'Month',
      'Department',
      'Submitted',
      'Resolved',
      'Pending',
      'Overdue',
      'Average Resolution Hours',
      'SLA Compliance'
    ];

    const rows = this.filteredMonthlyData.map((month) => [
      month.label,
      this.selectedDepartment,
      month.submitted,
      month.resolved,
      this.getPendingCount(month),
      month.overdue,
      month.averageResolutionHours,
      `${month.slaRate}%`
    ]);

    const csv = [heading, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(',')
      )
      .join('\n');

    const file = new Blob([csv], {
      type: 'text/csv;charset=utf-8'
    });

    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download =
      `flowdesk-report-${this.selectedPeriod}-months.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(downloadUrl);
  }

  closeNotification(): void {
    this.notificationMessage = '';
  }

  private scaleValue(
    value: number,
    factor: number,
    allowZero = false
  ): number {
    const scaledValue = Math.round(value * factor);

    if (allowZero) {
      return Math.max(0, scaledValue);
    }

    return Math.max(1, scaledValue);
  }

  private getResolutionFactor(): number {
    const factors: Record<Department, number> = {
      'All Departments': 1,
      'Information Technology': 0.92,
      Finance: 1.04,
      'Human Resources': 1.08,
      Operations: 1.12,
      Administration: 1.02
    };

    return factors[this.selectedDepartment];
  }

  private getSlaAdjustment(): number {
    const adjustments: Record<Department, number> = {
      'All Departments': 0,
      'Information Technology': 2,
      Finance: 0,
      'Human Resources': -1,
      Operations: -2,
      Administration: 1
    };

    return adjustments[this.selectedDepartment];
  }

  private createSlaItem(
    label: string,
    target: string,
    compliance: number,
    total: number
  ): SlaReport {
    const met = Math.round(
      total * (compliance / 100)
    );

    return {
      label,
      target,
      met,
      missed: Math.max(0, total - met),
      compliance
    };
  }

  private formatGeneratedDate(date: Date): string {
    return new Intl.DateTimeFormat('en-MY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  }
}