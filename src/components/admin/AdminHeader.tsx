import React from 'react';
import { RefreshCw, Menu } from 'lucide-react';
import type { TabType } from '../../types/admin';

interface AdminHeaderProps {
  activeTab: TabType;
  fetchOverview: () => void;
  fetchTabData: (tab: TabType) => void;
  onOpenMobileSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  fetchOverview,
  fetchTabData,
  onOpenMobileSidebar,
}) => {
  const handleRefresh = () => {
    fetchOverview();
    if (activeTab !== 'overview' && activeTab !== 'settings') {
      fetchTabData(activeTab);
    }
  };

  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case 'overview': return 'Overview & Analytics';
      case 'contacts': return 'Contact Inquiries';
      case 'services': return 'Service Requests';
      case 'jobs': return 'Job Applications';
      case 'internships': return 'Internship Applications';
      case 'users': return 'Admin User Management';
      case 'jobPostings': return 'Job Postings Portal';
      case 'settings': return 'Dashboard Settings';
      default: return 'Control Panel';
    }
  };

  return (
    <header className="h-16 lg:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        {onOpenMobileSidebar && (
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl lg:hidden border border-slate-200"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <h1 className="text-base sm:text-lg font-black text-slate-900 capitalize flex items-center gap-2 font-outfit tracking-tight">
          {getTabTitle(activeTab)}
          {activeTab !== 'overview' && activeTab !== 'settings' && (
            <span className="hidden sm:inline-block text-[10px] font-extrabold bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-md uppercase tracking-wider">
              Listings
            </span>
          )}
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={handleRefresh}
          title="Refresh Data"
          className="p-2 sm:p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
        <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
        <div className="hidden sm:block text-xs font-semibold text-slate-500">
          System Date: <span className="font-bold text-slate-800">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </header>
  );
};
