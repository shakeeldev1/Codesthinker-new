import React from 'react';
import { AlertCircle, RefreshCw, Trash2 } from 'lucide-react';
import type { JobPosting } from '../../../types/admin';

interface DeleteJobPostingConfirmModalProps {
  deleteJobPostingConfirm: JobPosting | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteJobPostingConfirmModal: React.FC<DeleteJobPostingConfirmModalProps> = ({
  deleteJobPostingConfirm,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  if (!deleteJobPostingConfirm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center gap-3 text-red-655 mb-3">
          <AlertCircle className="w-6 h-6 shrink-0 text-red-650" />
          <h3 className="font-bold text-base text-slate-900">Delete Job Posting</h3>
        </div>
        <p className="text-slate-500 text-sm mb-6 font-medium">
          Are you sure you want to delete <span className="text-slate-850 font-bold">{deleteJobPostingConfirm.title}</span>? All applications linked to this role will remain, but the listing will be permanently removed.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-slate-505 hover:text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 bg-red-655 hover:bg-red-500 text-black border text-sm font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete Role
          </button>
        </div>
      </div>
    </div>
  );
};
