import React from 'react';
import { X, AlertCircle, ShieldCheck, ShieldOff, RefreshCw } from 'lucide-react';
import { type AdminUser, ALL_PERMISSIONS, ROLE_COLORS } from '../../../types/admin';

interface UserFormModalProps {
  showUserModal: boolean;
  editingUser: AdminUser | null;
  userForm: {
    username: string;
    email: string;
    password: string;
    role: string;
    permissions: string[];
  };
  setUserForm: React.Dispatch<React.SetStateAction<{
    username: string;
    email: string;
    password: string;
    role: string;
    permissions: string[];
  }>>;
  userFormError: string;
  isSavingUser: boolean;
  onClose: () => void;
  onSave: () => void;
  handleRoleChange: (role: string) => void;
  togglePermission: (perm: string) => void;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  showUserModal,
  editingUser,
  userForm,
  setUserForm,
  userFormError,
  isSavingUser,
  onClose,
  onSave,
  handleRoleChange,
  togglePermission,
}) => {
  if (!showUserModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {editingUser ? 'Edit Admin User' : 'Create New Admin User'}
            </h3>
            <p className="text-xs text-slate-550 mt-0.5">
              {editingUser ? `Editing: ${editingUser.username}` : 'Add a new sub-administrator'}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {userFormError && (
            <div className="bg-red-50 border border-red-200 text-red-650 text-xs rounded-lg p-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {userFormError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1.5">Username</label>
              <input
                type="text" 
                value={userForm.username}
                onChange={e => setUserForm(f => ({ ...f, username: e.target.value }))}
                placeholder="e.g. john_admin"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email" 
                value={userForm.email}
                onChange={e => setUserForm(f => ({ ...f, email: e.target.value }))}
                placeholder="admin@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-1.5">
              {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
            </label>
            <input
              type="password" 
              value={userForm.password}
              onChange={e => setUserForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              autoComplete="new-password"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-2">Role</label>
            <div className="grid grid-cols-2 gap-2">
              {['super_admin', 'editor', 'viewer', 'custom'].map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    userForm.role === role
                      ? `${ROLE_COLORS[role]} border-current`
                      : 'border-slate-200 text-slate-500 hover:border-slate-350 hover:bg-slate-50'
                  }`}
                >
                  {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-655 uppercase tracking-wider mb-2">
              Permissions
              <span className="ml-2 text-[9px] text-slate-450 normal-case font-bold">(auto-set by role, or customize)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ALL_PERMISSIONS.map(({ key, label }) => {
                const checked = userForm.permissions.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => togglePermission(key)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                      checked
                        ? 'bg-orange-50 border-orange-200 text-orange-650 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-350 hover:bg-slate-100'
                    }`}
                  >
                    {checked ? <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-orange-655" /> : <ShieldOff className="w-3.5 h-3.5 shrink-0" />}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-slate-500 hover:text-slate-800 text-sm font-medium rounded-xl hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSavingUser}
            className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/10 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 cursor-pointer"
          >
            {isSavingUser ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
            {editingUser ? 'Save Changes' : 'Create User'}
          </button>
        </div>
      </div>
    </div>
  );
};
