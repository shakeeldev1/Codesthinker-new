export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string; // Acts as Company Name
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ServiceInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resumeName: string;
  createdAt: string;
  jobPostingId?: string;
}

export interface InternshipApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resumeName: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  isRoot?: boolean;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  category: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salaryMin?: number;
  salaryMax?: number;
  salaryVisible: boolean;
  deadline?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: { applications: number };
}

export type TabType = 'overview' | 'contacts' | 'services' | 'jobs' | 'internships' | 'users' | 'jobPostings' | 'settings';

export const ALL_PERMISSIONS = [
  { key: 'view_contacts', label: 'View Contacts' },
  { key: 'view_services', label: 'View Services' },
  { key: 'view_jobs', label: 'View Jobs' },
  { key: 'view_internships', label: 'View Internships' },
  { key: 'delete_records', label: 'Delete Records' },
  { key: 'manage_users', label: 'Manage Users' },
] as const;

export const ROLE_COLORS: Record<string, string> = {
  super_admin: 'text-orange-600 bg-orange-50 border-orange-200',
  editor: 'text-blue-600 bg-blue-50 border-blue-200',
  viewer: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  custom: 'text-violet-600 bg-violet-50 border-violet-200',
};
