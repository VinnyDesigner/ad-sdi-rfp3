export type UserRole = 'public' | 'steward' | 'partner';

export interface UserPersona {
  id: string;
  name: string;
  roleTitle: string;
  entity: string;
  role: UserRole;
  avatarText: string;
  email: string;
}

export type Classification = 'Open' | 'Shared – Government' | 'Restricted' | 'Confidential' | 'FGDS – Fundamental';
export type Audience = 'Public' | 'Government Only' | 'Approved Partners' | 'Internal';
export type QualityStatus = 'Passed' | 'Review Required' | 'Action Needed';

export interface DatasetItem {
  id: string;
  title: string;
  titleAr?: string;
  slug: string;
  publisher: string;
  publisherCode: string;
  description: string;
  descriptionAr?: string;
  classification: Classification;
  audience: Audience;
  qualityStatus: QualityStatus;
  format: string[];
  serviceTypes: string[];
  theme: string;
  updatedAt: string;
  featuresCount?: number;
  crs?: string;
  extent?: string;
  license?: string;
  stewardName?: string;
  coordinates?: [number, number]; // lat, lng
  bounds?: [[number, number], [number, number]];
  isBookmarked?: boolean;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  image?: string;
  provider: string;
  providerType: 'Government entity' | 'Approved partner';
  category: 'Datasets' | 'Services & APIs' | 'AI outputs' | 'Imagery';
  classification: Classification;
  audience: Audience;
  license: 'Government-only' | 'Commercial' | 'Open';
  accessModel: 'Included' | 'Subscription' | 'Pay-per-use';
  theme: string;
  description: string;
  coverage: string;
  formats: string[];
  updateFrequency: string;
  sla: string;
  subscribersCount?: number;
  apiCallsMonthly?: string;
  plans: {
    name: string;
    tier: string;
    description: string;
  }[];
}

export interface PublishingSubmission {
  id: string;
  item: string;
  type: string;
  entity: string;
  targetAudience: Audience;
  stage: 'Provider onboarding' | 'Submitted' | 'Quality gateway' | 'Classification & audience' | 'Custodian approval' | 'Published';
  qualityResult: 'Passed (100%)' | 'Warnings (94%)' | 'Pending Checks' | 'Failed Topology';
  waitingDays: number;
  submittedBy: string;
  submittedDate: string;
  version: string;
  summary: string;
  validationChecks: {
    name: string;
    status: 'pass' | 'warning' | 'fail';
    detail: string;
  }[];
}

export interface EntitlementItem {
  id: string;
  productId: string;
  productName: string;
  provider: string;
  plan: string;
  status: 'Active' | 'Pending' | 'Expiring';
  apiKey: string;
  usageThisMonth: number;
  usageLimit: number;
  renewsOn: string;
}

export interface ProgrammeRisk {
  id: string;
  code: string;
  title: string;
  owner: string;
  severity: 'High' | 'Medium' | 'Low';
  trend: 'increasing' | 'stable' | 'decreasing';
  mitigation: string;
}
