import React, { useState, useEffect } from 'react';
import { X, RefreshCw, AlertCircle, Save } from 'lucide-react';
import type { TabType } from '../../../types/admin';

interface EditSubmissionModalProps {
  isOpen: boolean;
  type: TabType;
  item: any;
  onClose: () => void;
  onSave: (type: TabType, id: string, updatedData: any) => Promise<void>;
}

export const EditSubmissionModal: React.FC<EditSubmissionModalProps> = ({
  isOpen,
  type,
  item,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setFormData({
        fullName: item.fullName || item.firstName || '',
        email: item.email || '',
        phone: item.phone || '',
        position: item.position || item.service || '',
        coverLetter: item.coverLetter || '',
      });
      setError('');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email) {
      setError('Full name and Email are required.');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(type, item.id, formData);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save updates');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 font-sans animate-fade-in">
      <div className="w-full max-w-lg bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-150 flex justify-between items-center bg-slate-50/60">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base font-outfit">
              Edit {type === 'jobs' ? 'Job Application' : type === 'internships' ? 'Internship Application' : 'Submission'}
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">Record ID: {item.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl p-3.5 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Applicant Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Position Applied For
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Cover Letter / Application Notes
            </label>
            <textarea
              rows={3}
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Candidate cover letter or internal notes..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#08061E] hover:bg-slate-800 text-amber-400 text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#08061E]/15 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-amber-400" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
