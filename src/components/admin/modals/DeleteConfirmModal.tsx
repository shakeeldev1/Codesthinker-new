import React from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import type { TabType } from '../../../types/admin';

interface DeleteConfirmModalProps {
  deleteConfirmItem: {
    type: TabType;
    id: string;
  } | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  deleteConfirmItem,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  if (!deleteConfirmItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans animate-fade-in">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 relative">
        <div className="text-center">
          <div className="inline-flex p-3 bg-red-50 rounded-full text-red-650 mb-4 border border-red-200">
            <Trash2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Permanently delete log?</h3>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            This action is immediate and cannot be undone. The database record will be permanently deleted.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-2.5">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-slate-100 hover:bg-red-500 text-black font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-lg shadow-red-600/10 flex items-center gap-1 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <RefreshCw className="w-3 animate-spin" />
                Deleting...
              </>
            ) : (
              'Confirm Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
