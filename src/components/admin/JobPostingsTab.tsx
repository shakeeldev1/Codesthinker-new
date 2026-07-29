import React from 'react';
import { Plus, CheckCircle2, Users, Edit2, Trash2, Download, Eye } from 'lucide-react';
import type { JobPosting, JobApplication } from '../../types/admin';
import { formatDate } from '../../utils/adminHelpers';

interface JobPostingsTabProps {
  jobPostings: JobPosting[];
  jobs: JobApplication[];
  isLoading: boolean;
  jobPostingActionSuccess: string;
  expandedJobPostingId: string | null;
  setExpandedJobPostingId: (id: string | null) => void;
  onCreateJobPostingClick: () => void;
  onEditJobPostingClick: (posting: JobPosting) => void;
  onDeleteJobPostingClick: (posting: JobPosting) => void;
  onDownloadResume: (type: string, id: string, filename: string) => void;
  onViewApplication?: (app: JobApplication) => void;
  onEditApplication?: (app: JobApplication) => void;
  onDeleteApplication?: (id: string) => void;
}

export const JobPostingsTab: React.FC<JobPostingsTabProps> = ({
  jobPostings,
  jobs,
  isLoading,
  jobPostingActionSuccess,
  expandedJobPostingId,
  setExpandedJobPostingId,
  onCreateJobPostingClick,
  onEditJobPostingClick,
  onDeleteJobPostingClick,
  onDownloadResume,
  onViewApplication,
  onEditApplication,
  onDeleteApplication,
}) => {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
        <div>
          <h3 className="text-slate-900 font-black text-sm font-outfit">Careers & Job Postings</h3>
          <p className="text-slate-500 text-xs mt-0.5">Publish and manage job openings on the client career portal.</p>
        </div>
        <button
          onClick={onCreateJobPostingClick}
          className="flex items-center gap-2 bg-[#08061E] hover:bg-slate-800 text-amber-400 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#08061E]/15 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          Create Job Posting
        </button>
      </div>

      {/* Success banner */}
      {jobPostingActionSuccess && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl px-4 py-3 shadow-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {jobPostingActionSuccess}
        </div>
      )}

      {/* Job Postings Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
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
            <tbody className="divide-y divide-slate-150 text-xs">
              {jobPostings.map((posting) => (
                <React.Fragment key={posting.id}>
                  <tr className={`transition-all border-b border-slate-150 ${expandedJobPostingId === posting.id ? 'bg-amber-50/30' : 'hover:bg-slate-50/80'}`}>
                    <td className="py-4 px-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 text-sm">{posting.title}</p>
                          {posting.isFeatured && (
                            <span className="text-[9px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">
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
                      <button
                        onClick={() => setExpandedJobPostingId(expandedJobPostingId === posting.id ? null : posting.id)}
                        className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg transition-all"
                      >
                        <Users className="w-3.5 h-3.5" />
                        {posting._count?.applications ?? 0} Applicants
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      {posting.isActive ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Closed
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEditJobPostingClick(posting)}
                          title="Edit posting"
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteJobPostingClick(posting)}
                          title="Delete posting"
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Applicants sub-row */}
                  {expandedJobPostingId === posting.id && (
                    <tr className="bg-slate-50/80">
                      <td colSpan={6} className="p-4 border-b border-slate-200">
                        <div className="space-y-3">
                          <h5 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2">
                            <Users className="w-3.5 h-3.5" />
                            Direct Applicants for {posting.title}
                          </h5>
                          {jobs.filter(j => j.jobPostingId === posting.id).length === 0 ? (
                            <p className="text-xs text-slate-500 italic">No applicants for this specific opening yet.</p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {jobs.filter(j => j.jobPostingId === posting.id).map(app => (
                                <div key={app.id} className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex justify-between items-center text-xs shadow-xs">
                                  <div>
                                    <p className="font-bold text-slate-900">{app.fullName}</p>
                                    <p className="text-slate-500 text-[11px] mt-0.5">{app.email} • {app.phone}</p>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {app.resumeName && (
                                      <button
                                        onClick={() => onDownloadResume('jobs', app.id, app.resumeName)}
                                        className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg"
                                      >
                                        <Download className="w-3 h-3" /> Resume
                                      </button>
                                    )}
                                    {onViewApplication && (
                                      <button
                                        onClick={() => onViewApplication(app)}
                                        title="View Details"
                                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    {onEditApplication && (
                                      <button
                                        onClick={() => onEditApplication(app)}
                                        title="Edit Application"
                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    {onDeleteApplication && (
                                      <button
                                        onClick={() => onDeleteApplication(app.id)}
                                        title="Delete Record"
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {jobPostings.length === 0 && !isLoading && (
            <div className="text-center py-16 text-slate-400 text-xs font-medium">
              No job postings created yet. Click "Create Job Posting" to add one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
