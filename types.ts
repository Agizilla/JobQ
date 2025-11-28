
export enum UserType {
  NEW = 'NEW',
  EXISTING = 'EXISTING'
}

export enum JobType {
  CASHIER = 'Cashier',
  PETROL_ATTENDANT = 'Petrol Attendant',
  SECURITY = 'Security',
  CLEANER = 'Cleaner',
  DRIVER = 'Driver',
  WAITER = 'Waiter',
  RECEPTIONIST = 'Receptionist',
  OTHER = 'Other'
}

export enum Language {
  ENGLISH = 'en',
  ZULU = 'zu',
  XHOSA = 'xh',
  AFRIKAANS = 'af',
  SOTHO = 'st'
}

export enum ApplicationStatus {
  QUEUED = 'QUEUED',
  CONTACT_REVEALED = 'CONTACT_REVEALED',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  REJECTED = 'REJECTED'
}

export interface JobSeeker {
  id: string;
  name: string; // For display in portal
  hashedId: string; // Security requirement
  location: string;
  jobType: JobType;
  experience: string; // Display string e.g. "2 Years"
  experienceYears: number; // Numeric for filtering
  distance: string; // Calculated relative to employer
  signupDate: Date; // CRITICAL: Determines queue position
  isEmployed: boolean; // "Looking for something closer"
  criminalRecordClear: boolean;
  missedCallCount: number; // Penalizes position
  phoneNumber?: string; // Revealed only on request
  contactPreferenceTime?: string; // e.g. "Anytime" or "After 17:00"
  status: ApplicationStatus;
  avatarUrl?: string; // New field for profile picture
  
  // Extended Profile Details
  coreSkills: string[];
  lastJobTitle: string;
  lastEmployer: string;
}

export interface USSDState {
  step: number;
  inputBuffer: string;
  screenText: string;
  language: Language;
  userData: Partial<JobSeeker>;
}

export enum AppView {
  PLAN = 'PLAN',
  STACK = 'STACK',
  SIMULATOR = 'SIMULATOR',
  MOBILE_WEB = 'MOBILE_WEB',
  EMPLOYER_PORTAL = 'EMPLOYER_PORTAL',
  USSD_CODE = 'USSD_CODE',
  PRESENTATION = 'PRESENTATION',
  JOB_SEEKER_PORTAL = 'JOB_SEEKER_PORTAL',
  JOB_PROVIDER_PORTAL = 'JOB_PROVIDER_PORTAL',
  RECRUITER_PORTAL = 'RECRUITER_PORTAL',
  TECH_DOCS = 'TECH_DOCS'
}
