import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../config';

// Types & Config Constants
import type { 
  ContactSubmission, 
  ServiceInquiry, 
  JobApplication, 
  InternshipApplication, 
  AdminUser, 
  JobPosting, 
  TabType 
} from '../types/admin';

// Helpers
import { handleDownloadResume } from '../utils/adminHelpers';

// Subcomponents
import { LoginView } from '../components/admin/LoginView';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { OverviewTab } from '../components/admin/OverviewTab';
import { SubmissionsTab } from '../components/admin/SubmissionsTab';
import { AdminUsersTab } from '../components/admin/AdminUsersTab';
import { JobPostingsTab } from '../components/admin/JobPostingsTab';
import { SettingsTab } from '../components/admin/SettingsTab';

// Modals
import { DetailModal } from '../components/admin/modals/DetailModal';
import { DeleteConfirmModal } from '../components/admin/modals/DeleteConfirmModal';
import { UserFormModal } from '../components/admin/modals/UserFormModal';
import { ResetPasswordModal } from '../components/admin/modals/ResetPasswordModal';
import { DeleteUserConfirmModal } from '../components/admin/modals/DeleteUserConfirmModal';
import { JobPostingFormModal } from '../components/admin/modals/JobPostingFormModal';
import { DeleteJobPostingConfirmModal } from '../components/admin/modals/DeleteJobPostingConfirmModal';

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

  // Preferences state
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(() => {
    const saved = localStorage.getItem('admin_refresh_interval');
    return saved ? Number(saved) : 0; // default 0 (Disabled)
  });
  const [density, setDensity] = useState<'compact' | 'comfortable'>(() => {
    const saved = localStorage.getItem('admin_display_density');
    return (saved === 'compact' || saved === 'comfortable') ? saved : 'comfortable';
  });
  const [currentUsername, setCurrentUsername] = useState<string>('');
  const [apiConnected, setApiConnected] = useState<boolean>(true);

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
            setCurrentUsername(data.user.username || '');
          }
          setIsAuthenticated(true);
          setApiConnected(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        setIsAuthenticated(false);
        setApiConnected(false);
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

  // Auto refresh data fetching effect
  useEffect(() => {
    if (!isAuthenticated || isCheckingAuth || refreshInterval <= 0) return;
    
    const intervalId = setInterval(() => {
      fetchOverview();
      if (activeTab !== 'overview' && activeTab !== 'settings') {
        fetchTabData(activeTab);
      }
    }, refreshInterval * 1000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, isCheckingAuth, refreshInterval, activeTab]);

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
      setCurrentUsername(usernameInput);
      setIsAuthenticated(true);
      setApiConnected(true);
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
      setCurrentUsername('');
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
          setCurrentUsername(data.user.username || '');
        }
        setApiConnected(true);
      } else {
        setApiConnected(false);
      }
    } catch (err) {
      console.error('Error fetching overview counts:', err);
      setApiConnected(false);
    }
  };

  const fetchTabData = async (tab: TabType) => {
    if (tab === 'overview' || tab === 'settings') return;
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

  // Render checking auth spinner
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 text-slate-505 font-sans">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
        <p className="text-sm">Verifying secure administrator session...</p>
      </div>
    );
  }

  // Render Login UI
  if (!isAuthenticated) {
    return (
      <LoginView
        usernameInput={usernameInput}
        setUsernameInput={setUsernameInput}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        loginError={loginError}
        isLoggingIn={isLoggingIn}
        handleLogin={handleLogin}
      />
    );
  }

  // Render Dashboard UI
  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800 font-sans">
      
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSearchQuery={setSearchQuery}
        stats={stats}
        adminUsersLength={adminUsers.length}
        jobPostingsLength={jobPostings.length}
        userPermissions={userPermissions}
        userRole={userRole}
        handleLogout={handleLogout}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-h-screen overflow-x-hidden bg-slate-50 text-slate-800 w-full min-w-0">
        
        {/* Header bar */}
        <AdminHeader
          activeTab={activeTab}
          fetchOverview={fetchOverview}
          fetchTabData={fetchTabData}
          onOpenMobileSidebar={() => setIsMobileOpen(true)}
        />

        {/* Content Body */}
        <div className="flex-grow p-4 sm:p-6 lg:p-8">
          {/* 1. OVERVIEW VIEW */}
          {activeTab === 'overview' && (
            <OverviewTab
              stats={stats}
              setActiveTab={setActiveTab}
            />
          )}

          {/* 2. SUBMISSIONS LISTS */}
          {activeTab !== 'overview' && activeTab !== 'users' && activeTab !== 'jobPostings' && activeTab !== 'settings' && (
            <SubmissionsTab
              activeTab={activeTab}
              filteredItems={filteredItems}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoading={isLoading}
              onViewItem={(item) => setSelectedItem({ type: activeTab, data: item })}
              onDeleteItem={(id) => setDeleteConfirmItem({ type: activeTab, id })}
              onDownloadResume={handleDownloadResume}
              density={density}
            />
          )}

          {/* 3. USERS MANAGEMENT VIEW */}
          {activeTab === 'users' && (
            <AdminUsersTab
              adminUsers={adminUsers}
              isLoading={isLoading}
              userActionSuccess={userActionSuccess}
              onAddUserClick={openCreateUserModal}
              onEditUserClick={openEditUserModal}
              onResetPasswordClick={(userId) => { setShowResetPassword(userId); setNewPassword(''); }}
              onDeleteUserClick={(user) => setDeleteUserConfirm(user)}
            />
          )}

          {/* 4. JOB POSTINGS MANAGEMENT VIEW */}
          {activeTab === 'jobPostings' && (
            <JobPostingsTab
              jobPostings={jobPostings}
              jobs={jobs}
              isLoading={isLoading}
              jobPostingActionSuccess={jobPostingActionSuccess}
              expandedJobPostingId={expandedJobPostingId}
              setExpandedJobPostingId={setExpandedJobPostingId}
              onCreateJobPostingClick={openCreateJobPostingModal}
              onEditJobPostingClick={openEditJobPostingModal}
              onDeleteJobPostingClick={(posting) => setDeleteJobPostingConfirm(posting)}
              onDownloadResume={handleDownloadResume}
            />
          )}

          {/* 5. SETTINGS PREFERENCES VIEW */}
          {activeTab === 'settings' && (
            <SettingsTab
              currentUsername={currentUsername}
              userRole={userRole}
              userPermissions={userPermissions}
              refreshInterval={refreshInterval}
              setRefreshInterval={(val) => {
                setRefreshInterval(val);
                localStorage.setItem('admin_refresh_interval', String(val));
              }}
              density={density}
              setDensity={(val) => {
                setDensity(val);
                localStorage.setItem('admin_display_density', val);
              }}
              apiConnected={apiConnected}
              onRefreshStats={async () => {
                const res = await fetch(`${API_BASE_URL}/api/v1/admin/overview`, { credentials: 'include' });
                if (!res.ok) throw new Error('Connection failed');
                const data = await res.json();
                setStats(data.counts);
                setApiConnected(true);
              }}
            />
          )}

        </div>
      </main>

      {/* CREATE / EDIT USER MODAL */}
      <UserFormModal
        showUserModal={showUserModal}
        editingUser={editingUser}
        userForm={userForm}
        setUserForm={setUserForm}
        userFormError={userFormError}
        isSavingUser={isSavingUser}
        onClose={() => setShowUserModal(false)}
        onSave={handleSaveUser}
        handleRoleChange={handleRoleChange}
        togglePermission={togglePermission}
      />

      {/* RESET PASSWORD MODAL */}
      <ResetPasswordModal
        showResetPassword={showResetPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        isResettingPw={isResettingPw}
        onClose={() => setShowResetPassword(null)}
        onReset={handleResetPassword}
      />

      {/* DELETE USER CONFIRM MODAL */}
      <DeleteUserConfirmModal
        deleteUserConfirm={deleteUserConfirm}
        isDeleting={isDeleting}
        onClose={() => setDeleteUserConfirm(null)}
        onConfirm={handleDeleteUser}
      />

      {/* CREATE / EDIT JOB POSTING MODAL */}
      <JobPostingFormModal
        showJobPostingModal={showJobPostingModal}
        editingJobPosting={editingJobPosting}
        jobPostingForm={jobPostingForm}
        setJobPostingForm={setJobPostingForm}
        jobPostingFormError={jobPostingFormError}
        isSavingJobPosting={isSavingJobPosting}
        onClose={() => setShowJobPostingModal(false)}
        onSave={handleSaveJobPosting}
      />

      {/* DELETE JOB POSTING CONFIRM MODAL */}
      <DeleteJobPostingConfirmModal
        deleteJobPostingConfirm={deleteJobPostingConfirm}
        isDeleting={isDeleting}
        onClose={() => setDeleteJobPostingConfirm(null)}
        onConfirm={handleDeleteJobPosting}
      />

      {/* 3. DETAIL OVERLAY MODAL */}
      <DetailModal
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
        onDownloadResume={handleDownloadResume}
      />

      {/* 4. DELETE CONFIRMATION OVERLAY MODAL */}
      <DeleteConfirmModal
        deleteConfirmItem={deleteConfirmItem}
        isDeleting={isDeleting}
        onClose={() => setDeleteConfirmItem(null)}
        onConfirm={handleDeleteItem}
      />

    </div>
  );
}
