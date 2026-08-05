import React from 'react';
import { X, Briefcase, MapPin, DollarSign, Calendar, CheckCircle2, Award, Clock } from 'lucide-react';
import type { JobPosting } from '../../../types/admin';

interface ViewJobPostingModalProps {
  posting: JobPosting | null;
  onClose: () => void;
  onEdit: (posting: JobPosting) => void;
}

export const ViewJobPostingModal: React.FC<ViewJobPostingModalProps> = ({
  posting,
  onClose,
  onEdit,
}) => {
  if (!posting) return null;

  const requirements = Array.isArray(posting.requirements) ? posting.requirements : [];
  const responsibilities = Array.isArray(posting.responsibilities) ? posting.responsibilities : [];
  const benefits = Array.isArray(posting.benefits) ? posting.benefits : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex flex-wrap justify-between items-start gap-3 bg-slate-50/80">
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-200">
                {posting.department}
              </span>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {posting.category}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                posting.isActive ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'
              }`}>
                {posting.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-tight">
              {posting.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onClose();
                onEdit(posting);
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-xs"
            >
              Edit Role
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</p>
                <p className="text-xs font-semibold text-slate-800">{posting.location || 'Not specified'}</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Salary Range</p>
                <p className="text-xs font-semibold text-slate-800">
                  {posting.salaryMin || posting.salaryMax
                    ? `$${posting.salaryMin?.toLocaleString() || 0} - $${posting.salaryMax?.toLocaleString() || 0}`
                    : 'Undisclosed'}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deadline</p>
                <p className="text-xs font-semibold text-slate-800">
                  {posting.deadline ? new Date(posting.deadline).toLocaleDateString() : 'No deadline'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-600" /> Description
            </h4>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {posting.description || 'No description provided.'}
            </div>
          </div>

          {/* Requirements */}
          {requirements.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Requirements
              </h4>
              <ul className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-sm text-slate-700">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Responsibilities */}
          {responsibilities.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" /> Responsibilities
              </h4>
              <ul className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-sm text-slate-700">
                {responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" /> Benefits & Perks
              </h4>
              <ul className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-sm text-slate-700">
                {benefits.map((ben, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
