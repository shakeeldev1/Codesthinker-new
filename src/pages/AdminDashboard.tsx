import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { 
  LayoutDashboard, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  Download, 
  Eye, 
  Trash2, 
  LogOut, 
  Lock, 
  User,
  Users,
  Search, 
  RefreshCw, 
  Calendar, 
  Building, 
  DollarSign, 
  Clock, 
  FileText, 
  X, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Plus,
  Edit2,
  ShieldCheck,
  ShieldOff,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

// Interfaces for backend models
interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string; // Acts as Company Name
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface ServiceInquiry {
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

interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resumeName: string;
  createdAt: string;
  jobPostingId?: string;
}

interface InternshipApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resumeName: string;
  createdAt: string;
}

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  isRoot?: boolean;
}

const ALL_PERMISSIONS = [
  { key: 'view_contacts', label: 'View Contacts' },
  { key: 'view_services', label: 'View Services' },
  { key: 'view_jobs', label: 'View Jobs' },
  { key: 'view_internships', label: 'View Internships' },
  { key: 'delete_records', label: 'Delete Records' },
  { key: 'manage_users', label: 'Manage Users' },
];

const ROLE_COLORS: Record<string, string> = {
  super_admin: 'text-orange-600 bg-orange-50 border-orange-200',
  editor: 'text-blue-600 bg-blue-50 border-blue-200',
  viewer: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  custom: 'text-violet-600 bg-violet-50 border-violet-200',
};

interface JobPosting {
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

type TabType = 'overview' | 'contacts' | 'services' | 'jobs' | 'internships' | 'users' | 'jobPostings';

export default function AdminDashboard() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Current user permissions (set after login)
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string>('super_admin');

  // Nav state
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();
  const activeTab: TabType = (tab as TabType) || 'overview';
  
  const setActiveTab = (newTab: TabType) => {
    navigate(`/admin/${newTab}`);
  };

  const [expandedJobPostingId, setExpandedJobPostingId] = useState<string | null>(null);
  
  // Data state
  const [stats, setStats] = useState({
    contacts: 0,
    serviceInquiries: 0,
    jobApplications: 0,
    internshipApplications: 0,
  });
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [services, setServices] = useState<ServiceInquiry[]>([]);
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [internships, setInternships] = useState<InternshipApplication[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  
  // Loading & searching state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Detail Modal state
  const [selectedItem, setSelectedItem] = useState<{
    type: TabType;
    data: any;
  } | null>(null);

  // Delete Confirm state
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{
    type: TabType;
    id: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // User Management Modal state
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [userForm, setUserForm] = useState({
    username: '', email: '', password: '', role: 'viewer', permissions: [] as string[],
  });
  const [isSavingUser, setIsSavingUser] = useState<boolean>(false);
  const [userFormError, setUserFormError] = useState<string>('');
  const [userActionSuccess, setUserActionSuccess] = useState<string>('');
  const [showResetPassword, setShowResetPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const [isResettingPw, setIsResettingPw] = useState<boolean>(false);
  const [deleteUserConfirm, setDeleteUserConfirm] = useState<AdminUser | null>(null);

  // Job Posting Modal state
  const [showJobPostingModal, setShowJobPostingModal] = useState<boolean>(false);
  const [editingJobPosting, setEditingJobPosting] = useState<JobPosting | null>(null);
  const [jobPostingForm, setJobPostingForm] = useState({
    title: '',
    department: 'Engineering',
    category: 'full-time',
    location: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    salaryMin: '',
    salaryMax: '',
    salaryVisible: false,
    deadline: '',
    isActive: true,
    isFeatured: false,
  });
  const [isSavingJobPosting, setIsSavingJobPosting] = useState<boolean>(false);
  const [jobPostingFormError, setJobPostingFormError] = useState<string>('');
  const [jobPostingActionSuccess, setJobPostingActionSuccess] = useState<string>('');
  const [deleteJobPostingConfirm, setDeleteJobPostingConfirm] = useState<JobPosting | null>(null);

  // Check login on mount by attempting to fetch overview stats
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/admin/overview`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data.counts);
          if (data.user) {
            setUserPermissions(data.user.permissions || []);
            setUserRole(data.user.role || 'viewer');
          }
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuthStatus();
  }, []);

  // Fetch overview stats and list data when tab or auth changes
  useEffect(() => {
    if (isAuthenticated && !isCheckingAuth) {
      fetchOverview();
      fetchTabData(activeTab);
    }
  }, [isAuthenticated, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: usernameInput, password: passwordInput, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Invalid credentials.');
      }

      // Store permissions from the login response
      setUserPermissions(data.permissions || []);
      setUserRole(data.role || 'viewer');
      setIsAuthenticated(true);
      setUsernameInput('');
      setPasswordInput('');
    } catch (err: any) {
      setLoginError(err.message || 'Connection error. Please check backend server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/v1/admin/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Error logging out from backend:', err);
    } finally {
      setIsAuthenticated(false);
      setActiveTab('overview');
      setUserPermissions([]);
      setUserRole('super_admin');
      setContacts([]);
      setServices([]);
      setJobs([]);
      setInternships([]);
      setAdminUsers([]);
      setJobPostings([]);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/overview`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data.counts);
        if (data.user) {
          setUserPermissions(data.user.permissions || []);
          setUserRole(data.user.role || 'viewer');
        }
      }
    } catch (err) {
      console.error('Error fetching overview counts:', err);
    }
  };

  const fetchTabData = async (tab: TabType) => {
    if (tab === 'overview') return;
    setIsLoading(true);
    try {
      let endpoint = '';
      if (tab === 'contacts') endpoint = '/api/v1/admin/contacts';
      else if (tab === 'services') endpoint = '/api/v1/admin/services';
      else if (tab === 'jobs') endpoint = '/api/v1/admin/jobs';
      else if (tab === 'internships') endpoint = '/api/v1/admin/internships';
      else if (tab === 'users') endpoint = '/api/v1/admin/users';
      else if (tab === 'jobPostings') endpoint = '/api/v1/admin/job-postings';

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        if (tab === 'contacts') setContacts(result.data);
        else if (tab === 'services') setServices(result.data);
        else if (tab === 'jobs') setJobs(result.data);
        else if (tab === 'internships') setInternships(result.data);
        else if (tab === 'users') setAdminUsers(result.data);
        else if (tab === 'jobPostings') {
          setJobPostings(result.data);
          // Fetch job applications asynchronously so it doesn't block the UI loading spinner
          fetch(`${API_BASE_URL}/api/v1/admin/jobs`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                setJobs(data.data);
              }
            })
            .catch(err => console.error('Failed to load job applications for accordion', err));
        }
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error(`Error fetching ${tab} data:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!deleteConfirmItem) return;
    setIsDeleting(true);
    const { type, id } = deleteConfirmItem;

    try {
      let endpoint = '';
      if (type === 'contacts') endpoint = `/api/v1/admin/contacts/${id}`;
      else if (type === 'services') endpoint = `/api/v1/admin/services/${id}`;
      else if (type === 'jobs') endpoint = `/api/v1/admin/jobs/${id}`;
      else if (type === 'internships') endpoint = `/api/v1/admin/internships/${id}`;

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remove from local list state
        if (type === 'contacts') setContacts(contacts.filter(item => item.id !== id));
        else if (type === 'services') setServices(services.filter(item => item.id !== id));
        else if (type === 'jobs') setJobs(jobs.filter(item => item.id !== id));
        else if (type === 'internships') setInternships(internships.filter(item => item.id !== id));
        
        // Refresh counts and close details if deleting same item
        fetchOverview();
        if (selectedItem && selectedItem.data.id === id) {
          setSelectedItem(null);
        }
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error(`Error deleting ${type} item:`, err);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmItem(null);
    }
  };

  const handleDownloadResume = async (type: string, id: string, filename: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/resumes/${type}/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to download resume');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading resume:', err);
      alert('Failed to download resume. Please try again.');
    }
  };

  // --- User Management Handlers ---

  const openCreateUserModal = () => {
    setEditingUser(null);
    setUserForm({ username: '', email: '', password: '', role: 'viewer', permissions: [] });
    setUserFormError('');
    setUserActionSuccess('');
    setShowUserModal(true);
  };

  const openEditUserModal = (user: AdminUser) => {
    setEditingUser(user);
    setUserForm({ username: user.username, email: user.email, password: '', role: user.role, permissions: user.permissions });
    setUserFormError('');
    setUserActionSuccess('');
    setShowUserModal(true);
  };

  const handleRoleChange = (role: string) => {
    const presets: Record<string, string[]> = {
      super_admin: ['view_contacts','view_services','view_jobs','view_internships','delete_records','manage_users'],
      editor: ['view_contacts','view_services','view_jobs','view_internships','delete_records'],
      viewer: ['view_contacts','view_services','view_jobs','view_internships'],
      custom: userForm.permissions,
    };
    setUserForm(f => ({ ...f, role, permissions: presets[role] || [] }));
  };

  const togglePermission = (perm: string) => {
    setUserForm(f => ({
      ...f,
      role: 'custom',
      permissions: f.permissions.includes(perm)
        ? f.permissions.filter(p => p !== perm)
        : [...f.permissions, perm],
    }));
  };

  const handleSaveUser = async () => {
    setUserFormError('');
    if (!userForm.username || !userForm.email || (!editingUser && !userForm.password)) {
      setUserFormError('Username, email, and password are required.');
      return;
    }
    setIsSavingUser(true);
    try {
      const url = editingUser
        ? `${API_BASE_URL}/api/v1/admin/users/${editingUser.id}`
        : `${API_BASE_URL}/api/v1/admin/users`;
      const method = editingUser ? 'PUT' : 'POST';
      const body: any = { username: userForm.username, email: userForm.email, role: userForm.role, permissions: userForm.permissions };
      if (!editingUser || userForm.password) body.password = userForm.password;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save user');

      setShowUserModal(false);
      setUserActionSuccess(editingUser ? 'User updated successfully!' : 'User created successfully!');
      fetchTabData('users');
      setTimeout(() => setUserActionSuccess(''), 4000);
    } catch (err: any) {
      setUserFormError(err.message);
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUserConfirm) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/admin/users/${deleteUserConfirm.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete user');
      setAdminUsers(prev => prev.filter(u => u.id !== deleteUserConfirm.id));
      setDeleteUserConfirm(null);
      setUserActionSuccess('User deleted successfully!');
      setTimeout(() => setUserActionSuccess(''), 4000);
    } catch (err: any) {
      setUserActionSuccess('');
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!showResetPassword || !newPassword) return;
    if (newPassword.length < 8) { alert('Password must be at least 8 characters'); return; }
    setIsResettingPw(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/admin/users/${showResetPassword}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to reset password');
      setShowResetPassword(null);
      setNewPassword('');
      setUserActionSuccess('Password reset successfully!');
      setTimeout(() => setUserActionSuccess(''), 4000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsResettingPw(false);
    }
  };

  // --- Job Posting Management Handlers ---

  const openCreateJobPostingModal = () => {
    setEditingJobPosting(null);
    setJobPostingForm({
      title: '',
      department: 'Engineering',
      category: 'full-time',
      location: 'On-site',
      description: '',
      requirements: '',
      responsibilities: '',
      benefits: '',
      salaryMin: '',
      salaryMax: '',
      salaryVisible: false,
      deadline: '',
      isActive: true,
      isFeatured: false,
    });
    setJobPostingFormError('');
    setJobPostingActionSuccess('');
    setShowJobPostingModal(true);
  };

  const openEditJobPostingModal = (posting: JobPosting) => {
    setEditingJobPosting(posting);
    setJobPostingForm({
      title: posting.title,
      department: posting.department,
      category: posting.category,
      location: posting.location,
      description: posting.description,
      requirements: posting.requirements.join('\n'),
      responsibilities: posting.responsibilities.join('\n'),
      benefits: posting.benefits.join('\n'),
      salaryMin: posting.salaryMin ? String(posting.salaryMin) : '',
      salaryMax: posting.salaryMax ? String(posting.salaryMax) : '',
      salaryVisible: posting.salaryVisible,
      deadline: posting.deadline ? posting.deadline.substring(0, 10) : '',
      isActive: posting.isActive,
      isFeatured: posting.isFeatured,
    });
    setJobPostingFormError('');
    setJobPostingActionSuccess('');
    setShowJobPostingModal(true);
  };

  const handleSaveJobPosting = async () => {
    setJobPostingFormError('');
    if (!jobPostingForm.title || !jobPostingForm.department || !jobPostingForm.location || !jobPostingForm.description) {
      setJobPostingFormError('Title, Department, Location, and Description are required.');
      return;
    }
    setIsSavingJobPosting(true);
    try {
      const url = editingJobPosting
        ? `${API_BASE_URL}/api/v1/admin/job-postings/${editingJobPosting.id}`
        : `${API_BASE_URL}/api/v1/admin/job-postings`;
      const method = editingJobPosting ? 'PUT' : 'POST';

      const parseList = (str: string) => str.split('\n').map(s => s.trim()).filter(s => s.length > 0);

      const body = {
        title: jobPostingForm.title,
        department: jobPostingForm.department,
        category: jobPostingForm.category,
        location: jobPostingForm.location,
        description: jobPostingForm.description,
        requirements: parseList(jobPostingForm.requirements),
        responsibilities: parseList(jobPostingForm.responsibilities),
        benefits: parseList(jobPostingForm.benefits),
        salaryMin: jobPostingForm.salaryMin ? Number(jobPostingForm.salaryMin) : null,
        salaryMax: jobPostingForm.salaryMax ? Number(jobPostingForm.salaryMax) : null,
        salaryVisible: jobPostingForm.salaryVisible,
        deadline: jobPostingForm.deadline || null,
        isActive: jobPostingForm.isActive,
        isFeatured: jobPostingForm.isFeatured,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save job posting');

      setShowJobPostingModal(false);
      setJobPostingActionSuccess(editingJobPosting ? 'Job posting updated successfully!' : 'Job posting created successfully!');
      fetchTabData('jobPostings');
      fetchOverview(); // Refresh overview counts
      setTimeout(() => setJobPostingActionSuccess(''), 4000);
    } catch (err: any) {
      setJobPostingFormError(err.message);
    } finally {
      setIsSavingJobPosting(false);
    }
  };

  const handleDeleteJobPosting = async () => {
    if (!deleteJobPostingConfirm) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/admin/job-postings/${deleteJobPostingConfirm.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete job posting');
      setJobPostings(prev => prev.filter(p => p.id !== deleteJobPostingConfirm.id));
      setDeleteJobPostingConfirm(null);
      setJobPostingActionSuccess('Job posting deleted successfully!');
      fetchOverview(); // Refresh overview counts
      setTimeout(() => setJobPostingActionSuccess(''), 4000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render checking auth spinner
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 text-slate-500 font-sans">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-sm">Verifying secure administrator session...</p>
      </div>
    );
  }

  // Render Login UI
  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans"
        style={{
          backgroundImage: 'radial-gradient(circle at top right, rgba(246, 154, 32, 0.05), transparent), radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.03), transparent)'
        }}
      >
        {/* Decorative dynamic circles */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl shadow-xl p-8 relative z-10 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-gradient-to-tr from-orange-600 to-orange-500 rounded-xl shadow-lg shadow-orange-500/10 text-white mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Code's Thinker</h1>
            <p className="text-slate-500 text-sm mt-1">Authorized Admin Dashboard Login</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 flex items-start gap-2.5 mb-6">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter admin username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center cursor-pointer select-none text-xs text-slate-500 hover:text-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 rounded border-slate-350 bg-white text-orange-500 focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer"
                />
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-medium rounded-xl py-3 text-sm transition-all focus:outline-none shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter lists based on search query
  const getFilteredData = () => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      if (activeTab === 'contacts') return contacts;
      if (activeTab === 'services') return services;
      if (activeTab === 'jobs') return jobs;
      if (activeTab === 'internships') return internships;
      return [];
    }

    if (activeTab === 'contacts') {
      return contacts.filter(
        item =>
          item.firstName.toLowerCase().includes(q) ||
          item.lastName.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.subject.toLowerCase().includes(q) ||
          item.message.toLowerCase().includes(q)
      );
    }
    if (activeTab === 'services') {
      return services.filter(
        item =>
          item.fullName.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.company.toLowerCase().includes(q) ||
          item.service.toLowerCase().includes(q) ||
          item.message.toLowerCase().includes(q)
      );
    }
    if (activeTab === 'jobs') {
      return jobs.filter(
        item =>
          item.fullName.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.position.toLowerCase().includes(q) ||
          item.resumeName.toLowerCase().includes(q)
      );
    }
    if (activeTab === 'internships') {
      return internships.filter(
        item =>
          item.fullName.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.position.toLowerCase().includes(q) ||
          item.resumeName.toLowerCase().includes(q)
      );
    }
    return [];
  };

  const filteredItems = getFilteredData();

  // Render Dashboard UI
  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div className="flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-md shadow-orange-600/20">
              C
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">Code's Thinker</h2>
              <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Admin Panel</span>
            </div>
          </div>
 
          {/* Navigation Items */}
          <nav className="p-4 space-y-1 font-medium">
            <button
              onClick={() => { setActiveTab('overview'); setSearchQuery(''); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              Overview
            </button>
 
            <div className="h-px bg-slate-200 my-4 mx-2"></div>
            
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mb-2">Form Submissions</p>
 
            <button
              onClick={() => { setActiveTab('contacts'); setSearchQuery(''); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'contacts'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5" />
                Contact Inquiries
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'contacts' ? 'bg-orange-700/80 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {stats.contacts}
              </span>
            </button>
 
            <button
              onClick={() => { setActiveTab('services'); setSearchQuery(''); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'services'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <FileText className="w-4.5 h-4.5" />
                Service Requests
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'services' ? 'bg-orange-700/80 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {stats.serviceInquiries}
              </span>
            </button>
 
            <button
              onClick={() => { setActiveTab('jobs'); setSearchQuery(''); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'jobs'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <Briefcase className="w-4.5 h-4.5" />
                Job Applications
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'jobs' ? 'bg-orange-700/80 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {stats.jobApplications}
              </span>
            </button>
 
            <button
              onClick={() => { setActiveTab('internships'); setSearchQuery(''); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'internships'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <GraduationCap className="w-4.5 h-4.5" />
                Internships
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'internships' ? 'bg-orange-700/80 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {stats.internshipApplications}
              </span>
            </button>
 
            {/* Users tab - only visible to users with manage_users permission */}
            {userPermissions.includes('manage_users') && (
              <>
                <div className="h-px bg-slate-200 my-4 mx-2"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mb-2">Administration</p>
                <button
                  onClick={() => { setActiveTab('users'); setSearchQuery(''); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'users'
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Users className="w-4.5 h-4.5" />
                    Admin Users
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeTab === 'users' ? 'bg-orange-700/80 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {adminUsers.length}
                  </span>
                </button>
 
                <button
                  onClick={() => { setActiveTab('jobPostings'); setSearchQuery(''); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold mt-1.5 transition-all ${
                    activeTab === 'jobPostings'
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Briefcase className="w-4.5 h-4.5" />
                    Job Postings
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeTab === 'jobPostings' ? 'bg-orange-700/80 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {jobPostings.length}
                  </span>
                </button>
              </>
            )}
          </nav>
        </div>
 
        {/* Sidebar Footer Profile */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-slate-350 font-bold text-xs uppercase">
                A
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-800 truncate">Administrator</p>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${ROLE_COLORS[userRole] || ROLE_COLORS['viewer']}`}>
                  {userRole.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-h-screen overflow-x-hidden bg-slate-50">
        
        {/* Header bar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-800 capitalize flex items-center gap-2">
              {activeTab === 'overview' ? 'Overview' : activeTab.replace(/([A-Z])/g, ' $1')}
              {activeTab !== 'overview' && (
                <span className="text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md">
                  Listings
                </span>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                fetchOverview();
                if (activeTab !== 'overview') fetchTabData(activeTab);
              }}
              title="Refresh Data"
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all border border-slate-200"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="h-6 w-px bg-slate-250"></div>
            <div className="text-xs font-medium text-slate-500">
              System Time: <span className="font-semibold text-slate-700">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-grow p-8">
          {/* 1. OVERVIEW VIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Top Greeting Card */}
              <div 
                className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm"
                style={{
                  backgroundImage: 'linear-gradient(to right, #ffffff, rgba(244, 155, 33, 0.02))'
                }}
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Welcome back, Administrator</h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xl">
                    Here's what's happening with Code's Thinker user form submissions. Monitor, review and clean up logs efficiently.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-orange-600 font-semibold bg-orange-50 border border-orange-200/60 px-3 py-1.5 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Live Updates
                </div>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Contacts Card */}
                <div 
                  onClick={() => setActiveTab('contacts')}
                  className="bg-white border border-slate-200/80 hover:border-blue-500/30 p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-650 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">Inquiries</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-2xl font-bold text-slate-900 tracking-tight">{stats.contacts}</h4>
                    <p className="text-slate-500 text-xs mt-1">Contact Form Submissions</p>
                  </div>
                </div>

                {/* Services Card */}
                <div 
                  onClick={() => setActiveTab('services')}
                  className="bg-white border border-slate-200/80 hover:border-violet-500/30 p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-violet-500/10 rounded-xl text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded">Services</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-2xl font-bold text-slate-900 tracking-tight">{stats.serviceInquiries}</h4>
                    <p className="text-slate-500 text-xs mt-1">Project Inquiry Requests</p>
                  </div>
                </div>

                {/* Job Applications Card */}
                <div 
                  onClick={() => setActiveTab('jobs')}
                  className="bg-white border border-slate-200/80 hover:border-amber-500/30 p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">Careers</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-2xl font-bold text-slate-900 tracking-tight">{stats.jobApplications}</h4>
                    <p className="text-slate-500 text-xs mt-1">Full-Time Applications</p>
                  </div>
                </div>

                {/* Internship Applications Card */}
                <div 
                  onClick={() => setActiveTab('internships')}
                  className="bg-white border border-slate-200/80 hover:border-emerald-500/30 p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Interns</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-2xl font-bold text-slate-900 tracking-tight">{stats.internshipApplications}</h4>
                    <p className="text-slate-500 text-xs mt-1">Internship Submissions</p>
                  </div>
                </div>

              </div>

              {/* Informative instructions banner */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-slate-800 mb-2">Operational Guidelines:</h4>
                <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside">
                  <li>Form submissions are mapped dynamically directly from client page components.</li>
                  <li>Job and Internship applications carry PDF/Doc resume binary files stored directly in PostgreSQL database.</li>
                  <li>Clicking a category on the left sidebar opens complete tabular listings with full details.</li>
                  <li>Deleting records will wipe them permanently from DB storage. Use with care.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 2. SUBMISSIONS LISTS */}
          {activeTab !== 'overview' && activeTab !== 'users' && (
            <div className="space-y-6 animate-fade-in">
              {/* Table search & statistics toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                
                {/* Search box */}
                <div className="relative flex-grow max-w-md">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search logs by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Count summary and loading */}
                <div className="flex items-center gap-3 text-xs text-slate-500 select-none font-medium">
                  {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />}
                  <span>Found {filteredItems.length} records</span>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {isLoading ? (
                  <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-500">
                    <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                    <p className="text-sm">Fetching list from secure database...</p>
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="p-20 flex flex-col items-center justify-center gap-3 text-slate-400">
                    <AlertCircle className="w-10 h-10 text-slate-350" />
                    <p className="text-sm font-bold text-slate-700">No submissions matching criteria found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/60">
                          <th className="py-4.5 px-6">Name</th>
                          <th className="py-4.5 px-6">Contact info</th>
                          {activeTab === 'contacts' && <th className="py-4.5 px-6">Subject</th>}
                          {activeTab === 'services' && (
                            <>
                              <th className="py-4.5 px-6">Company</th>
                              <th className="py-4.5 px-6">Requested Service</th>
                            </>
                          )}
                          {(activeTab === 'jobs' || activeTab === 'internships') && <th className="py-4.5 px-6">Position</th>}
                          <th className="py-4.5 px-6">Submitted At</th>
                          <th className="py-4.5 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-sm">
                        {filteredItems.map((item: any) => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-all border-b border-slate-150">
                            {/* Column 1: Name */}
                            <td className="py-4 px-6 font-semibold text-slate-800">
                              {activeTab === 'contacts' 
                                ? `${item.firstName} ${item.lastName}` 
                                : item.fullName}
                            </td>

                            {/* Column 2: Contact Info */}
                            <td className="py-4 px-6 text-xs text-slate-650">
                              <div className="flex flex-col gap-0.5">
                                <a href={`mailto:${item.email}`} className="hover:underline hover:text-orange-600 transition-all font-medium">{item.email}</a>
                                <a href={`tel:${item.phone}`} className="text-slate-500 hover:text-orange-600 transition-all">{item.phone}</a>
                              </div>
                            </td>

                            {/* Column 3: Custom Field based on tab */}
                            {activeTab === 'contacts' && (
                              <td className="py-4 px-6 text-slate-600 font-medium max-w-xs truncate">
                                {item.subject}
                              </td>
                            )}

                            {activeTab === 'services' && (
                              <>
                                <td className="py-4 px-6 text-slate-600">{item.company}</td>
                                <td className="py-4 px-6 text-slate-650">
                                  <span className="bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                    {item.service}
                                  </span>
                                </td>
                              </>
                            )}

                            {(activeTab === 'jobs' || activeTab === 'internships') && (
                              <td className="py-4 px-6 text-slate-650">
                                <span className="bg-blue-550/10 text-blue-600 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                  {item.position}
                                </span>
                              </td>
                            )}

                            {/* Column 4: Submitted At */}
                            <td className="py-4 px-6 text-xs text-slate-500 font-medium">
                              {formatDate(item.createdAt)}
                            </td>

                            {/* Column 5: Action buttons */}
                            <td className="py-4 px-6 text-right">
                              <div className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 p-1.5 rounded-xl">
                                
                                <button
                                  onClick={() => setSelectedItem({ type: activeTab, data: item })}
                                  title="View Details"
                                  className="p-2 text-slate-500 hover:text-orange-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                {(activeTab === 'jobs' || activeTab === 'internships') && (
                                  <button
                                    onClick={() => handleDownloadResume(activeTab, item.id, item.resumeName)}
                                    title={`Download resume: ${item.resumeName}`}
                                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white hover:shadow-sm rounded-lg transition-all flex items-center justify-center cursor-pointer"
                                  >
                                    <Download className="w-4 h-4" />
                                  </button>
                                )}

                                <button
                                  onClick={() => setDeleteConfirmItem({ type: activeTab, id: item.id })}
                                  title="Delete log"
                                  className="p-2 text-slate-500 hover:text-red-650 hover:bg-red-50 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>

                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. USERS MANAGEMENT VIEW */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fade-in">
              {/* Header with action */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div>
                  <h3 className="text-slate-900 font-bold text-sm">Admin Users</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Manage who has access to this dashboard and what they can do.</p>
                </div>
                <button
                  onClick={openCreateUserModal}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  Add New Admin
                </button>
              </div>

              {/* Success message */}
              {userActionSuccess && (
                <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {userActionSuccess}
                </div>
              )}

              {/* Users Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/60">
                        <th className="py-4 px-6">User</th>
                        <th className="py-4 px-6">Role</th>
                        <th className="py-4 px-6">Permissions</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Created</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-sm">
                      {adminUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-all border-b border-slate-150">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-650 font-bold text-xs uppercase border border-slate-250">
                                {user.username[0]}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-800 text-sm">{user.username}</p>
                                <p className="text-xs text-slate-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border ${ROLE_COLORS[user.role] || ROLE_COLORS['viewer']}`}>
                              {user.role.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {user.permissions.slice(0, 3).map(p => (
                                <span key={p} className="text-[9px] font-semibold bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                                  {p.replace('_', ' ')}
                                </span>
                              ))}
                              {user.permissions.length > 3 && (
                                <span className="text-[9px] text-slate-500 font-medium">+{user.permissions.length - 3} more</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {user.isActive ? (
                              <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Active
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-xs text-slate-500">
                            {user.isRoot ? 'System' : formatDate(user.createdAt)}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-1">
                              {!user.isRoot && (
                                <>
                                  <button
                                    onClick={() => openEditUserModal(user)}
                                    title="Edit user"
                                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => { setShowResetPassword(user.id); setNewPassword(''); }}
                                    title="Reset password"
                                    className="p-2 text-slate-500 hover:text-violet-650 hover:bg-violet-50 rounded-lg transition-all"
                                  >
                                    <KeyRound className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteUserConfirm(user)}
                                    title="Delete user"
                                    className="p-2 text-slate-500 hover:text-red-650 hover:bg-red-50 rounded-lg transition-all"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                              {user.isRoot && (
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider px-2">Root — Protected</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {adminUsers.length === 0 && !isLoading && (
                    <div className="text-center py-16 text-slate-500 text-sm">
                      No admin users created yet. Click "Add New Admin" to create one.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. JOB POSTINGS MANAGEMENT VIEW */}
          {activeTab === 'jobPostings' && (
            <div className="space-y-6 animate-fade-in">
              {/* Header with action */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div>
                  <h3 className="text-slate-900 font-bold text-sm">Job Postings</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Publish and manage job opportunities on the careers portal.</p>
                </div>
                <button
                  onClick={openCreateJobPostingModal}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  Create Job Posting
                </button>
              </div>

              {/* Success message */}
              {jobPostingActionSuccess && (
                <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {jobPostingActionSuccess}
                </div>
              )}

              {/* Job Postings Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/60">
                        <th className="py-4 px-6">Job Details</th>
                        <th className="py-4 px-6">Department</th>
                        <th className="py-4 px-6">Type & Location</th>
                        <th className="py-4 px-6">Applications</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-sm">
                      {jobPostings.map((posting) => (
                        <React.Fragment key={posting.id}>
                        <tr className={`transition-all border-b border-slate-150 ${expandedJobPostingId === posting.id ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}>
                          <td className="py-4 px-6">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-slate-800 text-sm">{posting.title}</p>
                                {posting.isFeatured && (
                                  <span className="text-[9px] font-bold bg-orange-50 text-orange-650 border border-orange-200 px-1.5 py-0.5 rounded">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Created: {formatDate(posting.createdAt)}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-xs text-slate-700 font-semibold">{posting.department}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs text-slate-700 font-semibold capitalize">{posting.category.replace('-', ' ')}</span>
                              <span className="text-[10px] text-slate-500">{posting.location}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg">
                              {posting._count?.applications ?? 0} applied
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            {posting.isActive ? (
                              <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Active / Live
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                Archived
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setExpandedJobPostingId(expandedJobPostingId === posting.id ? null : posting.id)}
                                title="View applications"
                                className={`p-2 rounded-lg transition-all ${expandedJobPostingId === posting.id ? 'text-orange-600 bg-orange-50' : 'text-slate-500 hover:text-orange-600 hover:bg-orange-50'}`}
                              >
                                <Users className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => openEditJobPostingModal(posting)}
                                title="Edit job posting"
                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteJobPostingConfirm(posting)}
                                title="Delete job posting"
                                className="p-2 text-slate-500 hover:text-red-650 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedJobPostingId === posting.id && (
                          <tr className="bg-slate-50/50 border-b border-slate-200">
                            <td colSpan={6} className="p-0">
                              <div className="p-6 pt-2 animate-fade-in">
                                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-orange-500" />
                                    Applicants for {posting.title}
                                  </h4>
                                  {jobs.filter(app => app.jobPostingId === posting.id).length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {jobs.filter(app => app.jobPostingId === posting.id).map(app => (
                                        <div key={app.id} className="flex items-start justify-between p-3 border border-slate-150 rounded-lg bg-slate-50 hover:bg-white transition-all">
                                          <div>
                                            <p className="text-sm font-bold text-slate-900">{app.fullName}</p>
                                            <div className="text-xs text-slate-500 mt-1 flex flex-col gap-0.5">
                                              <a href={`mailto:${app.email}`} className="hover:text-orange-600">{app.email}</a>
                                              <a href={`tel:${app.phone}`} className="hover:text-orange-600">{app.phone}</a>
                                            </div>
                                          </div>
                                          <button
                                            onClick={() => handleDownloadResume('jobs', app.id, app.resumeName)}
                                            className="px-3 py-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-all flex items-center gap-1"
                                          >
                                            <Download className="w-3 h-3" /> Resume
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-sm text-slate-500 text-center py-6">
                                      No applications received for this position yet.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                  {jobPostings.length === 0 && !isLoading && (
                    <div className="text-center py-16 text-slate-500 text-sm">
                      No job postings created yet. Click "Create Job Posting" to publish your first role.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* CREATE / EDIT USER MODAL */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{editingUser ? 'Edit Admin User' : 'Create New Admin User'}</h3>
                <p className="text-xs text-slate-550 mt-0.5">{editingUser ? `Editing: ${editingUser.username}` : 'Add a new sub-administrator'}</p>
              </div>
              <button onClick={() => setShowUserModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {userFormError && (
                <div className="bg-red-50 border border-red-200 text-red-650 text-xs rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {userFormError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">Username</label>
                  <input
                    type="text" value={userForm.username}
                    onChange={e => setUserForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="e.g. john_admin"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email" value={userForm.email}
                    onChange={e => setUserForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="admin@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">
                  {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
                </label>
                <input
                  type="password" value={userForm.password}
                  onChange={e => setUserForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-2">Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {['super_admin', 'editor', 'viewer', 'custom'].map(role => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        userForm.role === role
                          ? `${ROLE_COLORS[role]} border-current`
                          : 'border-slate-200 text-slate-500 hover:border-slate-350 hover:bg-slate-55'
                      }`}
                    >
                      {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-2">
                  Permissions
                  <span className="ml-2 text-[9px] text-slate-450 normal-case font-bold">(auto-set by role, or customize)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_PERMISSIONS.map(({ key, label }) => {
                    const checked = userForm.permissions.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => togglePermission(key)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                          checked
                            ? 'bg-orange-50 border-orange-200 text-orange-600 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-350 hover:bg-slate-100'
                        }`}
                      >
                        {checked ? <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-orange-650" /> : <ShieldOff className="w-3.5 h-3.5 shrink-0" />}
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                disabled={isSavingUser}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/10 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
              >
                {isSavingUser ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                {editingUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {showResetPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl p-6">
            <h3 className="font-bold text-slate-900 text-base mb-1">Reset Password</h3>
            <p className="text-slate-500 text-xs mb-5 font-medium">Enter a new password for this admin user. Must be at least 8 characters.</p>
            <input
              type="password" value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="New password (min. 8 chars)"
              autoComplete="new-password"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all mb-5"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowResetPassword(null)} className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-100 transition-all">
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={isResettingPw}
                className="px-5 py-2.5 bg-[#F69A20] hover:bg-[#e08914] text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-orange-500/10"
              >
                {isResettingPw ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE USER CONFIRM MODAL */}
      {deleteUserConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-base">Delete Admin User</h3>
            </div>
            <p className="text-slate-500 text-sm mb-6 font-medium">
              Are you sure you want to delete <span className="text-slate-850 font-bold">{deleteUserConfirm.username}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteUserConfirm(null)} className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-100 transition-all">
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-red-650 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT JOB POSTING MODAL */}
      {showJobPostingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {editingJobPosting ? 'Edit Job Posting' : 'Create Job Posting'}
                </h3>
                <p className="text-xs text-slate-555 mt-0.5">
                  {editingJobPosting ? `Editing: ${editingJobPosting.title}` : 'Publish a new role on the careers board'}
                </p>
              </div>
              <button
                onClick={() => setShowJobPostingModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {jobPostingFormError && (
                <div className="bg-red-55/10 border border-red-200 text-red-650 text-xs rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {jobPostingFormError}
                </div>
              )}

              {/* Title & Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">Job Title</label>
                  <input
                    type="text"
                    value={jobPostingForm.title}
                    onChange={e => setJobPostingForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Senior Full-Stack Engineer"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">Department</label>
                  <select
                    value={jobPostingForm.department}
                    onChange={e => setJobPostingForm(f => ({ ...f, department: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  >
                    {['Engineering', 'Design', 'Marketing', 'Sales', 'Product', 'Human Resources', 'Operations'].map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={jobPostingForm.category}
                    onChange={e => setJobPostingForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="remote">Remote</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1.5">Location</label>
                  <input
                    type="text"
                    value={jobPostingForm.location}
                    onChange={e => setJobPostingForm(f => ({ ...f, location: e.target.value }))}
                    placeholder="e.g. New York, NY (Hybrid)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Salary & Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">Min Salary</label>
                  <input
                    type="number"
                    value={jobPostingForm.salaryMin}
                    onChange={e => setJobPostingForm(f => ({ ...f, salaryMin: e.target.value }))}
                    placeholder="Min (e.g. 80000)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">Max Salary</label>
                  <input
                    type="number"
                    value={jobPostingForm.salaryMax}
                    onChange={e => setJobPostingForm(f => ({ ...f, salaryMax: e.target.value }))}
                    placeholder="Max (e.g. 120000)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1.5">Application Deadline</label>
                  <input
                    type="date"
                    value={jobPostingForm.deadline}
                    onChange={e => setJobPostingForm(f => ({ ...f, deadline: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={jobPostingForm.salaryVisible}
                    onChange={e => setJobPostingForm(f => ({ ...f, salaryVisible: e.target.checked }))}
                    className="accent-orange-500"
                  />
                  <span className="text-xs text-slate-650 font-bold uppercase tracking-wider">Show Salary Publicly</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={jobPostingForm.isFeatured}
                    onChange={e => setJobPostingForm(f => ({ ...f, isFeatured: e.target.checked }))}
                    className="accent-orange-500"
                  />
                  <span className="text-xs text-slate-650 font-bold uppercase tracking-wider">Featured Role</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={jobPostingForm.isActive}
                    onChange={e => setJobPostingForm(f => ({ ...f, isActive: e.target.checked }))}
                    className="accent-orange-500"
                  />
                  <span className="text-xs text-slate-650 font-bold uppercase tracking-wider">Publish / Active</span>
                </label>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">Job Description</label>
                <textarea
                  value={jobPostingForm.description}
                  onChange={e => setJobPostingForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Outline the scope, team dynamics and role overview..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-sans"
                />
              </div>

              {/* Requirements & Responsibilities & Benefits */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">
                    Requirements <span className="text-[10px] text-slate-500 normal-case font-bold">(One requirement per line)</span>
                  </label>
                  <textarea
                    value={jobPostingForm.requirements}
                    onChange={e => setJobPostingForm(f => ({ ...f, requirements: e.target.value }))}
                    placeholder="e.g. 5+ years of React experience&#10;Strong understanding of CSS & layout designs&#10;Degree in CS or equivalent experience"
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">
                    Responsibilities <span className="text-[10px] text-slate-500 normal-case font-bold">(One responsibility per line)</span>
                  </label>
                  <textarea
                    value={jobPostingForm.responsibilities}
                    onChange={e => setJobPostingForm(f => ({ ...f, responsibilities: e.target.value }))}
                    placeholder="e.g. Deliver performant web apps&#10;Review code submitted by peer engineers&#10;Collaborate with product designers"
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-650 uppercase tracking-wider mb-1.5">
                    Benefits & Perks <span className="text-[10px] text-slate-500 normal-case font-bold">(One benefit per line)</span>
                  </label>
                  <textarea
                    value={jobPostingForm.benefits}
                    onChange={e => setJobPostingForm(f => ({ ...f, benefits: e.target.value }))}
                    placeholder="e.g. Competitive equity packages&#10;Health & dental coverage&#10;Flexible PTO and remote setup allowance"
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
              <button
                onClick={() => setShowJobPostingModal(false)}
                className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveJobPosting}
                disabled={isSavingJobPosting}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/10 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
              >
                {isSavingJobPosting ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                {editingJobPosting ? 'Save Changes' : 'Publish Job'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE JOB POSTING CONFIRM MODAL */}
      {deleteJobPostingConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center gap-3 text-red-650 mb-3">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-base">Delete Job Posting</h3>
            </div>
            <p className="text-slate-500 text-sm mb-6 font-medium">
              Are you sure you want to delete <span className="text-slate-850 font-bold">{deleteJobPostingConfirm.title}</span>? All applications linked to this role will remain, but the listing will be permanently removed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteJobPostingConfirm(null)}
                className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteJobPosting}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-red-650 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DETAIL OVERLAY MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans animate-fade-in">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Submission Details</h3>
                <span className="text-[10px] text-slate-500 font-medium">ID: {selectedItem.data.id}</span>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Basic metadata cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider">Full Name</span>
                  <span className="text-slate-850 text-sm font-bold mt-1 block">
                    {selectedItem.type === 'contacts' 
                      ? `${selectedItem.data.firstName} ${selectedItem.data.lastName}` 
                      : selectedItem.data.fullName}
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider">Date/Time</span>
                  <span className="text-slate-700 text-xs font-semibold mt-1.5 block">
                    {formatDate(selectedItem.data.createdAt)}
                  </span>
                </div>
              </div>

              {/* Contact info card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                <span className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider">Contact Channels</span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-450 font-bold">Email Address</span>
                    <a href={`mailto:${selectedItem.data.email}`} className="font-semibold text-orange-655 hover:underline">{selectedItem.data.email}</a>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-450 font-bold">Phone Number</span>
                    <a href={`tel:${selectedItem.data.phone}`} className="font-semibold hover:text-orange-600 transition-all">{selectedItem.data.phone}</a>
                  </div>
                </div>
              </div>

              {/* Tab specific properties */}
              {selectedItem.type === 'contacts' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-455 uppercase block tracking-wider mb-1">Subject</span>
                    <span className="text-slate-800 text-sm font-semibold">{selectedItem.data.subject}</span>
                  </div>
                </div>
              )}

              {selectedItem.type === 'services' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-455 uppercase block tracking-wider">Company</span>
                      <span className="text-slate-800 text-xs font-bold mt-1.5 block">{selectedItem.data.company}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-455 uppercase block tracking-wider">Budget Limit</span>
                      <span className="text-green-600 text-xs font-bold mt-1.5 block flex items-center gap-0.5">
                        <DollarSign className="w-3.5 h-3.5 shrink-0 text-green-500" />
                        {selectedItem.data.budget || 'Not specified'}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-455 uppercase block tracking-wider">Timeline</span>
                      <span className="text-slate-700 text-xs font-semibold mt-1.5 block flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        {selectedItem.data.timeline || 'Not specified'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider mb-1.5">Requested Service</span>
                    <span className="bg-orange-50 text-orange-600 border border-orange-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      {selectedItem.data.service}
                    </span>
                  </div>
                </div>
              )}

              {(selectedItem.type === 'jobs' || selectedItem.type === 'internships') && (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider">Position Applied For</span>
                      <span className="bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-semibold inline-block">
                        {selectedItem.data.position}
                      </span>
                    </div>
                  </div>

                  {selectedItem.data.coverLetter && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider mb-2">Cover Letter / Note</span>
                      <div className="text-slate-700 text-xs leading-relaxed whitespace-pre-line bg-white border border-slate-200 p-3 rounded-lg overflow-y-auto max-h-[150px]">
                        {selectedItem.data.coverLetter}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden max-w-[280px]">
                        <span className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider">Uploaded Resume File</span>
                        <span className="text-slate-800 text-xs font-semibold truncate block mt-0.5">{selectedItem.data.resumeName}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadResume(selectedItem.type, selectedItem.data.id, selectedItem.data.resumeName)}
                      className="bg-blue-600 hover:bg-blue-550 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-blue-500/10"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download file
                    </button>
                  </div>
                </div>
              )}

              {/* Message body (if present) */}
              {selectedItem.data.message && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-450 uppercase block tracking-wider mb-2">Message Body</span>
                  <div className="text-slate-750 text-xs leading-relaxed whitespace-pre-line bg-white border border-slate-200 p-3 rounded-lg overflow-y-auto max-h-[150px]">
                    {selectedItem.data.message}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-2 shrink-0">
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                Close details
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 4. DELETE CONFIRMATION OVERLAY MODAL */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans animate-fade-in">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 relative">
            <div className="text-center">
              <div className="inline-flex p-3 bg-red-50 rounded-full text-red-650 mb-4 border border-red-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Permanently delete log?</h3>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                This action is immediate and cannot be undone. The database record will be permanently deleted.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                disabled={isDeleting}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteItem}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-lg shadow-red-600/10 flex items-center gap-1"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Confirm Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
