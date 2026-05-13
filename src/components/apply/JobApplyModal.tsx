import React from 'react';

interface JobApplyModalProps {
  jobTitle: string;
  open: boolean;
  onClose: () => void;
}

const JobApplyModal: React.FC<JobApplyModalProps> = ({ jobTitle, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-fade-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Apply for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">{jobTitle}</span>
          </h2>
          <button
            className="text-gray-400 hover:text-amber-500 text-2xl font-bold transition-colors hover:rotate-90 duration-300"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form className="p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all hover:border-amber-300"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all hover:border-amber-300"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
            <input 
              type="tel" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all hover:border-amber-300"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Resume / CV</label>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 file:bg-gradient-to-r file:from-amber-500 file:to-amber-400 file:text-[#07051d] file:font-bold file:rounded file:px-4 file:py-2 file:mr-4 file:cursor-pointer hover:file:bg-amber-500 transition-all"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-[#07051d] font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplyModal;
