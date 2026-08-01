import React from 'react';
import { 
  LayoutDashboard, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Users, 
  LogOut,
  Settings,
  ChevronRight,
  X
} from 'lucide-react';
import { type TabType, ROLE_COLORS } from '../../types/admin';

interface AdminSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  setSearchQuery: (query: string) => void;
  stats: {
    contacts: number;
    serviceInquiries: number;
    jobApplications: number;
    internshipApplications: number;
  };
  adminUsersLength: number;
  jobPostingsLength: number;
  userPermissions: string[];
  userRole: string;
  handleLogout: () => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  setSearchQuery,
  stats,
  adminUsersLength,
  jobPostingsLength,
  userPermissions,
  userRole,
  handleLogout,
  isMobileOpen = false,
  setIsMobileOpen,
}) => {
  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setSearchQuery('');
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sticky Fixed Height Desktop Sidebar + Responsive Mobile Drawer */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-slate-200 
        flex flex-col justify-between shrink-0 text-slate-700 font-sans shadow-sm
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Scrollable Container with Hidden Scrollbar */}
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
          
          {/* Brand Header */}
          <div className="sticky top-0 z-10 p-5 border-b border-slate-150 flex items-center justify-between bg-white/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-blue.png" 
                alt="Code's Thinker Logo" 
                className="h-9 w-auto object-contain" 
              />
              <span className="text-[11px] text-amber-600 bg-amber-50 border border-amber-200 uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full">
                Admin
              </span>
            </div>

            {/* Mobile Close Button */}
            {setIsMobileOpen && (
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 lg:hidden rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1 font-semibold flex-1">
            
            <button
              onClick={() => handleTabClick('overview')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#08061E] text-white shadow-md shadow-[#08061E]/15'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <LayoutDashboard className="w-4.5 h-4.5 text-amber-500" />
                Overview
              </span>
              {activeTab === 'overview' && <ChevronRight className="w-4 h-4 text-amber-400" />}
            </button>

            <div className="h-px bg-slate-200 my-4 mx-2"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-2">Form Submissions</p>

            <button
              onClick={() => handleTabClick('contacts')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'contacts'
                  ? 'bg-[#08061E] text-white shadow-md shadow-[#08061E]/15'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-blue-500" />
                Contact Inquiries
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                activeTab === 'contacts' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {stats.contacts}
              </span>
            </button>

            <button
              onClick={() => handleTabClick('services')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'services'
                  ? 'bg-[#08061E] text-white shadow-md shadow-[#08061E]/15'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <FileText className="w-4.5 h-4.5 text-purple-500" />
                Service Requests
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                activeTab === 'services' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {stats.serviceInquiries}
              </span>
            </button>

            <button
              onClick={() => handleTabClick('jobs')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'jobs'
                  ? 'bg-[#08061E] text-white shadow-md shadow-[#08061E]/15'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <Briefcase className="w-4.5 h-4.5 text-amber-500" />
                Job Applications
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                activeTab === 'jobs' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {stats.jobApplications}
              </span>
            </button>

            <button
              onClick={() => handleTabClick('internships')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'internships'
                  ? 'bg-[#08061E] text-white shadow-md shadow-[#08061E]/15'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <GraduationCap className="w-4.5 h-4.5 text-emerald-500" />
                Internships
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                activeTab === 'internships' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {stats.internshipApplications}
              </span>
            </button>

            {userPermissions.includes('manage_users') && (
              <>
                <div className="h-px bg-slate-200 my-4 mx-2"></div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-2">Management</p>
                
                <button
                  onClick={() => handleTabClick('users')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'users'
                      ? 'bg-[#08061E] text-white shadow-md shadow-[#08061E]/15'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Users className="w-4.5 h-4.5 text-indigo-500" />
                    Admin Users
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    activeTab === 'users' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {adminUsersLength}
                  </span>
                </button>

                <button
                  onClick={() => handleTabClick('jobPostings')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all mt-1 ${
                    activeTab === 'jobPostings'
                      ? 'bg-[#08061E] text-white shadow-md shadow-[#08061E]/15'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Briefcase className="w-4.5 h-4.5 text-amber-500" />
                    Job Postings
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    activeTab === 'jobPostings' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {jobPostingsLength}
                  </span>
                </button>
              </>
            )}

            <div className="h-px bg-slate-200 my-4 mx-2"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-2">Preferences</p>
            <button
              onClick={() => handleTabClick('settings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#08061E] text-white shadow-md shadow-[#08061E]/15'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-3">
                <Settings className="w-4.5 h-4.5 text-slate-500" />
                Settings
              </span>
              {activeTab === 'settings' && <ChevronRight className="w-4 h-4 text-amber-400" />}
            </button>
          </nav>
        </div>

        {/* User Session Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#08061E] text-amber-400 flex items-center justify-center font-black text-sm uppercase shadow-sm shrink-0">
                A
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">Administrator</p>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border inline-block truncate ${ROLE_COLORS[userRole] || ROLE_COLORS['viewer']}`}>
                  {userRole.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all shrink-0"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};