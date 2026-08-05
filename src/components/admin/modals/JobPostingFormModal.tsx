import React from 'react';
import { X, AlertCircle, RefreshCw } from 'lucide-react';
import type { JobPosting } from '../../../types/admin';

interface JobPostingFormModalProps {
  showJobPostingModal: boolean;
  editingJobPosting: JobPosting | null;
  jobPostingForm: {
    title: string;
    department: string;
    category: string;
    location: string;
    description: string;
    requirements: string;
    responsibilities: string;
    benefits: string;
    salaryMin: string;
    salaryMax: string;
    salaryVisible: boolean;
    deadline: string;
    isActive: boolean;
    isFeatured: boolean;
  };
  setJobPostingForm: React.Dispatch<React.SetStateAction<{
    title: string;
    department: string;
    category: string;
    location: string;
    description: string;
    requirements: string;
    responsibilities: string;
    benefits: string;
    salaryMin: string;
    salaryMax: string;
    salaryVisible: boolean;
    deadline: string;
    isActive: boolean;
    isFeatured: boolean;
  }>>;
  jobPostingFormError: string;
  isSavingJobPosting: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const JobPostingFormModal: React.FC<JobPostingFormModalProps> = ({
  showJobPostingModal,
  editingJobPosting,
  jobPostingForm,
  setJobPostingForm,
  jobPostingFormError,
  isSavingJobPosting,
  onClose,
  onSave,
}) => {
  if (!showJobPostingModal) return null;

  return (
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
            onClick={onClose}
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

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
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
            onClick={onClose}
            className="px-4 py-2.5 text-slate-505 hover:text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSavingJobPosting}
            className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/10 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 cursor-pointer"
          >
            {isSavingJobPosting ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
            {editingJobPosting ? 'Save Changes' : 'Publish Job'}
          </button>
        </div>
      </div>
    </div>
  );
};
