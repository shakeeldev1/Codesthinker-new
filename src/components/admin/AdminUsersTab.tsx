import React from 'react';
import { Plus, CheckCircle2, Edit2, KeyRound, Trash2 } from 'lucide-react';
import { type AdminUser, ROLE_COLORS } from '../../types/admin';
import { formatDate } from '../../utils/adminHelpers';

interface AdminUsersTabProps {
  adminUsers: AdminUser[];
  isLoading: boolean;
  userActionSuccess: string;
  onAddUserClick: () => void;
  onEditUserClick: (user: AdminUser) => void;
  onResetPasswordClick: (userId: string) => void;
  onDeleteUserClick: (user: AdminUser) => void;
}

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({
  adminUsers,
  isLoading,
  userActionSuccess,
  onAddUserClick,
  onEditUserClick,
  onResetPasswordClick,
  onDeleteUserClick,
}) => {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
        <div>
          <h3 className="text-slate-900 font-black text-sm font-outfit">Admin User Access</h3>
          <p className="text-slate-500 text-xs mt-0.5">Control administrative accounts and RBAC permissions.</p>
        </div>
        <button
          onClick={onAddUserClick}
          className="flex items-center gap-2 bg-[#08061E] hover:bg-slate-800 text-amber-400 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#08061E]/15 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          Add New Admin
        </button>
      </div>

      {/* Success banner */}
      {userActionSuccess && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl px-4 py-3 shadow-sm">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {userActionSuccess}
        </div>
      )}

      {/* Users Table Wrapper */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto w-full">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/60 whitespace-nowrap">
                  <th className="py-4 px-6">User</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Permissions</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Created</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-xs">
                {adminUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-all whitespace-nowrap">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#08061E] text-amber-400 flex items-center justify-center font-black text-xs uppercase border border-slate-200 shadow-xs shrink-0">
                          {user.username[0]}
                        </div>
                        <div className="max-w-[200px] truncate">
                          <p className="font-bold text-slate-900 text-sm truncate">{user.username}</p>
                          <p className="text-slate-500 text-xs truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 vertical-align-middle">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border inline-block whitespace-nowrap ${ROLE_COLORS[user.role] || ROLE_COLORS['viewer']}`}>
                        {user.role.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 max-w-xs">
                        {user.permissions.slice(0, 3).map(p => (
                          <span key={p} className="text-[9px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap">
                            {p.replace(/_/g, ' ')}
                          </span>
                        ))}
                        {user.permissions.length > 3 && (
                          <span className="text-[9px] text-amber-600 font-bold whitespace-nowrap shrink-0">+{user.permissions.length - 3} more</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {user.isActive ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {user.isRoot ? 'System Root' : formatDate(user.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEditUserClick(user)}
                          title="Edit user"
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onResetPasswordClick(user.id)}
                          title="Reset password"
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteUserClick(user)}
                          title="Delete user"
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {adminUsers.length === 0 && !isLoading && (
              <div className="text-center py-16 text-slate-400 text-xs font-medium">
                No sub-admin accounts configured yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};