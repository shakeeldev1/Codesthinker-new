import React from 'react';
import { Mail, FileText, Briefcase, GraduationCap, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import type { TabType } from '../../types/admin';

interface OverviewTabProps {
  stats: {
    contacts: number;
    serviceInquiries: number;
    jobApplications: number;
    internshipApplications: number;
  };
  setActiveTab: (tab: TabType) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  stats,
  setActiveTab,
}) => {
  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-extrabold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Control Center Active
          </div>
          <h3 className="text-xl font-black text-slate-900 font-outfit tracking-tight">Welcome back, Administrator</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Live overview of Code's Thinker client submission telemetry and active career applications.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          System Operational
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Contact Form Submissions */}
        <div 
          onClick={() => setActiveTab('contacts')}
          className="bg-white border border-slate-200/80 hover:border-blue-500/40 p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">Inquiries</span>
          </div>
          <div className="mt-5">
            <h4 className="text-3xl font-black text-slate-900 tracking-tight font-outfit">{stats.contacts}</h4>
            <p className="text-slate-500 text-xs mt-1 font-semibold">Contact Submissions</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">
            <span>View Submissions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Project Inquiries */}
        <div 
          onClick={() => setActiveTab('services')}
          className="bg-white border border-slate-200/80 hover:border-purple-500/40 p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">Services</span>
          </div>
          <div className="mt-5">
            <h4 className="text-3xl font-black text-slate-900 tracking-tight font-outfit">{stats.serviceInquiries}</h4>
            <p className="text-slate-500 text-xs mt-1 font-semibold">Service Requests</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-purple-600 font-bold group-hover:translate-x-0.5 transition-transform">
            <span>View Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Full-Time Applications */}
        <div 
          onClick={() => setActiveTab('jobs')}
          className="bg-white border border-slate-200/80 hover:border-amber-500/40 p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Careers</span>
          </div>
          <div className="mt-5">
            <h4 className="text-3xl font-black text-slate-900 tracking-tight font-outfit">{stats.jobApplications}</h4>
            <p className="text-slate-500 text-xs mt-1 font-semibold">Job Applications</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-amber-600 font-bold group-hover:translate-x-0.5 transition-transform">
            <span>View Candidates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Internship Applications */}
        <div 
          onClick={() => setActiveTab('internships')}
          className="bg-white border border-slate-200/80 hover:border-emerald-500/40 p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Interns</span>
          </div>
          <div className="mt-5">
            <h4 className="text-3xl font-black text-slate-900 tracking-tight font-outfit">{stats.internshipApplications}</h4>
            <p className="text-slate-500 text-xs mt-1 font-semibold">Intern Applications</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">
            <span>View Applicants</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Operational Guidelines */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-500" />
          System Operational Guidelines:
        </h4>
        <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside">
          <li>Form submissions are received and ingested dynamically from client portal components.</li>
          <li>Job & Internship applications carry PDF/Doc resume binary files stored directly in the database.</li>
          <li>Select any sidebar section or click a card above to inspect tabular details.</li>
          <li>Deleting entries will remove records permanently. Handle with appropriate authorization.</li>
        </ul>
      </div>
    </div>
  );
};
