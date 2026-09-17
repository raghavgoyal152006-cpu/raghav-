export type UserRole = 'customer' | 'advisor' | 'business' | 'admin';

export type KycStatus = 'pending' | 'in_progress' | 'verified' | 'rejected';

export interface KycData {
  panNumber: string;
  panName: string;
  aadhaarNumber: string;
  aadhaarVerified: boolean;
  ckycNumber?: string;
  documentType: 'aadhaar' | 'passport' | 'voter_id' | 'driving_license';
  documentNumber: string;
  documentFileName?: string;
  ocrMatchScore?: number;
  livenessVerified: boolean;
  verifiedAt?: string;
  address?: string;
}

export interface UserNotification {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'claim' | 'renewal' | 'kyc' | 'system';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  avatarInitials: string;
  kycStatus: KycStatus;
  kycData: KycData;
  unreadNotifications: UserNotification[];
}

export type ProductType = 'health' | 'auto' | 'life' | 'home' | 'travel' | 'business' | 'device';

export interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  premiumMonthly: number;
  premiumAnnual: number;
  deductible: string;
  coverageAmount: string;
  coverageRaw: number;
  claimSupport: string;
  networkSize: string;
  features: string[];
  exclusions: string[];
  settlementRatio: string;
  insurerName: string;
  insurerRating: number;
}

export interface ProductComparisonData {
  category: ProductType;
  label: string;
  icon: string;
  metrics: {
    premiumScore: number; // 0-100
    deductibleScore: number;
    coverageScore: number;
    claimSupportScore: number;
    networkScore: number;
    flexibilityScore: number;
    confidenceScore: number;
  };
  tiers: PlanTier[];
}

export interface Policy {
  id: string;
  policyNumber: string;
  title: string;
  type: ProductType;
  insurer: string;
  coverageAmount: string;
  premiumPaid: string;
  frequency: 'monthly' | 'annual';
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expiring_soon' | 'renewed' | 'expired';
  nominee: string;
  cashlessHospitalCount?: number;
  downloadUrl?: string;
  idCardNumber: string;
}

export interface ClaimRecord {
  id: string;
  claimNumber: string;
  policyNumber: string;
  policyType: ProductType;
  insurer: string;
  claimantName: string;
  incidentType: string;
  incidentDate: string;
  claimAmount: string;
  approvedAmount?: string;
  status: 'registered' | 'documents_received' | 'under_assessment' | 'approved' | 'settled' | 'rejected';
  currentStep: number; // 1 to 5
  lastUpdated: string;
  documents: { name: string; size: string; status: 'verified' | 'pending' }[];
  timeline: { step: string; timestamp: string; note: string; completed: boolean }[];
}

export interface RecommendationProfile {
  age: number;
  cityTier: 'tier1' | 'tier2' | 'tier3';
  familyMembers: number;
  annualIncome: string;
  riskTolerance: 'low' | 'moderate' | 'high';
  hasVehicle: boolean;
  preExistingConditions: boolean;
  smoker: boolean;
}

export interface RecommendationResult {
  confidenceScore: number;
  recommendedCategory: ProductType;
  recommendedSumInsured: string;
  recommendedDeductible: string;
  estimatedMonthlyPremium: string;
  keyBenefits: string[];
  importantExclusions: string[];
  rationale: string;
}
