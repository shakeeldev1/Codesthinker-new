import React, { useState } from 'react';
import { X, DollarSign, Clock, FileText, Download, Loader2 } from 'lucide-react';
import type { TabType } from '../../../types/admin';
import { formatDate } from '../../../utils/adminHelpers';

interface DetailModalProps {
  selectedItem: {
    type: TabType;
    data: any;
  } | null;
  onClose: () => void;
  onDownloadResume: (type: string, id: string, filename: string) => Promise<void> | void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  selectedItem,
  onClose,
  onDownloadResume,
}) => {
  // Download loading state
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans animate-fade-in">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base font-outfit">Submission Details</h3>
            <span className="text-[10px] text-[#863bff] font-bold">Record ID: {selectedItem.data.id}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {selectedItem.type === 'contacts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">First Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.firstName}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Company / Last Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.lastName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</span>
                  <p className="font-bold text-blue-600 text-sm mt-1 break-all">{selectedItem.data.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Phone Number</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.phone}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Message Body</span>
                <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">{selectedItem.data.message}</p>
              </div>
            </div>
          )}

          {selectedItem.type === 'services' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Client Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.fullName}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Company & Role</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.companyName} ({selectedItem.data.jobTitle})</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</span>
                  <p className="font-bold text-blue-600 text-sm mt-1 break-all">{selectedItem.data.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Phone Number</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#863bff]" />
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Requested Service</span>
                    <span className="text-xs font-bold text-slate-900">{selectedItem.data.serviceNeeded}</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Budget Range</span>
                    <span className="text-xs font-bold text-slate-900">{selectedItem.data.budget}</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 block uppercase">Project Timeline</span>
                    <span className="text-xs font-bold text-slate-900">{selectedItem.data.timeline}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Project Brief</span>
                <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">{selectedItem.data.projectDetails}</p>
              </div>
            </div>
          )}

          {(selectedItem.type === 'jobs' || selectedItem.type === 'internships') && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Applicant Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.fullName}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Contact Phone</span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedItem.data.phone}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address</span>
                <p className="font-bold text-blue-600 text-sm mt-1">{selectedItem.data.email}</p>
              </div>

              {selectedItem.data.linkedinUrl && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Portfolio / Social Links</span>
                  <a 
                    href={selectedItem.data.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-blue-600 hover:underline text-xs mt-1 block truncate"
                  >
                    {selectedItem.data.linkedinUrl}
                  </a>
                </div>
              )}

              {selectedItem.data.resumeName && (
                <div className="bg-[#863bff]/10 p-4 rounded-2xl border border-[#863bff]/20 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-[#863bff] uppercase tracking-wider block">Attached CV Document</span>
                    <p className="font-bold text-slate-900 text-xs mt-0.5">{selectedItem.data.resumeName}</p>
                  </div>
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#863bff] hover:bg-[#7e14ff] disabled:opacity-75 disabled:cursor-not-allowed px-4 py-2 rounded-xl transition-all shadow-md shadow-[#863bff]/20"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Downloading...
                      </>
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

          <div className="pt-2 text-right text-[11px] text-slate-400 border-t border-slate-100">
            Submitted on: <span className="font-bold text-slate-600">{formatDate(selectedItem.data.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};