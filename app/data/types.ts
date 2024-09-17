export interface Metric {
  parentCommitmentId: string;
  serviceName: string;
  metricName: string;
  unitsCommitted: number;
  unitsUsed: number;
  utilization: number;
  unitCost: number;
  totalCostCommitted: number;
  totalCostUsed: number;
  status: "Active" | "Underutilized" | "Overutilized";
  actions: string[];
  license: string;
}

interface MonthlySpend {
  month: string;
  committedSpend: number;
  actualSpend: number;
}

export interface Commitment {
  id: string;
  name: string;
  createdDate: string;
  lastUpdatedDate: string;
  totalCommittedSpend: number;
  totalActualSpend: number;
  totalSavings: number;
  utilizationRate: number;
  metricsCommitted: string[];
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  remainingDuration: string;
  status: "Active" | "Near Expiry" | "Expired";
  actions: string[];
  metrics: Metric[];
  renewalOptions?: string;
  termsAndConditions?: string;
  services: string[];
  monthlySpend: MonthlySpend[];
}

export interface KeyMetrics {
  totalCommittedSpend: number;
  actualSpend: number;
  totalSavings: number;
  averageUtilizationRate: number;
  expiringCommitments: number;
}
