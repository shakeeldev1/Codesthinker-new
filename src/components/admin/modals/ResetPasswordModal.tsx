import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ResetPasswordModalProps {
  showResetPassword: string | null;
  newPassword: string;
  setNewPassword: (val: string) => void;
  isResettingPw: boolean;
  onClose: () => void;
  onReset: () => void;
}

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  showResetPassword,
  newPassword,
  setNewPassword,
  isResettingPw,
  onClose,
  onReset,
}) => {
  if (!showResetPassword) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl p-6">
        <h3 className="font-bold text-slate-900 text-base mb-1">Reset Password</h3>
        <p className="text-slate-500 text-xs mb-5 font-medium">Enter a new password for this admin user. Must be at least 8 characters.</p>
        <input
          type="password" 
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="New password (min. 8 chars)"
          autoComplete="new-password"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all mb-5"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-100 transition-all">
            Cancel
          </button>
          <button
            onClick={onReset}
            disabled={isResettingPw}
            className="px-5 py-2.5 bg-[#F69A20] hover:bg-[#e08914] text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-orange-500/10 cursor-pointer"
          >
            {isResettingPw ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};
