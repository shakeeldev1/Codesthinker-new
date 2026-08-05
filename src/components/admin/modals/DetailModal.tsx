import React, { useState } from 'react';
import { X, DollarSign, Clock, FileText, Download, Loader2, Edit2 } from 'lucide-react';
import type { TabType } from '../../../types/admin';
import { formatDate } from '../../../utils/adminHelpers';

interface DetailModalProps {
  selectedItem: {
    type: TabType;
    data: any;
  } | null;
  onClose: () => void;
  onDownloadResume: (type: string, id: string, filename: string) => Promise<void> | void;
  onEditItem?: (item: any) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  selectedItem,
  onClose,
  onDownloadResume,
  onEditItem,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!selectedItem) return null;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await onDownloadResume(
        selectedItem.type,
        selectedItem.data.id,
        selectedItem.data.resumeName
      );
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // --- AUTO-DETECT COVER LETTER / MESSAGE TEXT ---
  const getCoverLetterText = (data: any): string => {
    if (!data) return 'No cover letter or message provided.';

    // 1. Direct key match configuration
    const directMatch =
      data.coverLetter ||
      data.cover_letter ||
      data.message ||
      data.messageBody ||
      data.projectDetails ||
      data.project_details ||
      data.coverLetterOrMessage ||
      data.description ||
      data.notes ||
      data.msg;

    if (directMatch && typeof directMatch === 'string' && directMatch.trim().length > 0) {
      return directMatch;
    }

    // 2. Strict Backup Fallback Scanner
    const ignoredKeys = [
      'id', 'name', 'fullname', 'firstname', 'lastname', 
      'email', 'phone', 'phonenumber', 'position', 
      'appliedposition', 'resumename', 'createdat', 
      'updatedat', 'service', 'budget', 'timeline', 
      'linkedinurl', 'portfoliourl', 'links', 'status',
      'company', 'companyname', 'jobtitle', 'subject'
    ];
    
    let longestText = '';
    
    Object.keys(data).forEach((key) => {
      if (!ignoredKeys.includes(key.toLowerCase())) {
        const val = data[key];
        if (typeof val === 'string' && val.trim().length > longestText.length) {
          if (!val.startsWith('http') && val.trim().length > 10) {
            longestText = val;
          }
        }
      }
    });

    return longestText.trim() || 'No cover letter or message provided.';
  };

  const coverLetterContent = getCoverLetterText(selectedItem.data);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans animate-fade-in">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Submission Details</h3>
            <span className="text-[10px] text-[#863bff] font-bold">Record ID: {selectedItem.data.id}</span>
          </div>
          <div className="flex items-center gap-2">
            {onEditItem && (
              <button
                onClick={() => {
                  onClose();
                  onEditItem(selectedItem.data);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 text-xs font-bold rounded-xl transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {/* CONTACTS TAB VIEW */}
          {selectedItem.type === 'contacts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.firstName || selectedItem.data.fullName || selectedItem.data.name}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Company</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.lastName || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</span>
                  <p className="font-bold text-blue-600 text-sm mt-1 break-all">{selectedItem.data.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Phone Number</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.phone || selectedItem.data.phoneNumber}</p>
                </div>
              </div>

              {selectedItem.data.subject && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Subject</span>
                  <p className="font-bold text-slate-900 text-xs mt-1">{selectedItem.data.subject}</p>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Message Body</span>
                <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">{coverLetterContent}</p>
              </div>
            </div>
          )}

          {/* SERVICES TAB VIEW */}
          {selectedItem.type === 'services' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Client Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.fullName || selectedItem.data.name || selectedItem.data.firstName}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Company & Role</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">
                    {selectedItem.data.company || selectedItem.data.companyName || 'N/A'}
                    {selectedItem.data.jobTitle ? ` (${selectedItem.data.jobTitle})` : ''}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</span>
                  <p className="font-bold text-blue-600 text-sm mt-1 break-all">{selectedItem.data.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Phone Number</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.phone || selectedItem.data.phoneNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#863bff]" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Requested Service</span>
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {selectedItem.data.service || selectedItem.data.serviceNeeded || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Budget Range</span>
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {selectedItem.data.budget || selectedItem.data.budgetRange || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Project Timeline</span>
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      {selectedItem.data.timeline || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Project Brief</span>
                <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">{coverLetterContent}</p>
              </div>
            </div>
          )}

          {/* JOBS & INTERNSHIPS TAB VIEW */}
          {(selectedItem.type === 'jobs' || selectedItem.type === 'internships') && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Applicant Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.fullName || selectedItem.data.name || selectedItem.data.firstName}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Position Applied For</span>
                  <p className="font-bold text-amber-700 text-sm mt-1">{selectedItem.data.position || 'General Application'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</span>
                  <p className="font-bold text-blue-600 text-sm mt-1 break-all">{selectedItem.data.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Contact Phone</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.phone || selectedItem.data.phoneNumber}</p>
                </div>
              </div>

              {selectedItem.data.coverLetter && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Cover Letter</span>
                  <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">{selectedItem.data.coverLetter}</p>
                </div>
              )}

              {(selectedItem.data.linkedinUrl || selectedItem.data.portfolioUrl || selectedItem.data.links) && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Portfolio / Social Links</span>
                  <a
                    href={selectedItem.data.linkedinUrl || selectedItem.data.portfolioUrl || selectedItem.data.links}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-blue-600 hover:underline text-xs mt-1 block truncate"
                  >
                    {selectedItem.data.linkedinUrl || selectedItem.data.portfolioUrl || selectedItem.data.links}
                  </a>
                </div>
              )}

              {/* Cover Letter Box (Hidden only for internships) */}
              {selectedItem.type !== 'internships' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Cover Letter / Message</span>
                  <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">{coverLetterContent}</p>
                </div>
              )}

              {selectedItem.data.resumeName && (
                <div className="bg-[#863bff]/10 p-4 rounded-2xl border border-[#863bff]/20 flex justify-between items-center">
                  <div className="min-w-0 flex-1 mr-3">
                    <span className="text-[10px] font-bold text-[#863bff]/100 uppercase tracking-wider block">Attached CV Document</span>
                    <p className="font-bold text-slate-900 text-xs mt-0.5 truncate">{selectedItem.data.resumeName}</p>
                  </div>
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#863bff] hover:bg-[#7e14ff] disabled:opacity-75 disabled:cursor-not-allowed px-4 py-2 rounded-xl transition-all shadow-md shadow-[#863bff]/20 shrink-0"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Downloading...
                      </                    >
                    ) : (
                      <>
                        <Download className="w-4 h-4" /> Download
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer Timestamp */}
          <div className="pt-2 text-right text-[11px] text-slate-400 border-t border-slate-100">
            Submitted on: <span className="font-bold text-slate-600">{formatDate(selectedItem.data.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};