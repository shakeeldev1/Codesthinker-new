import React, { useState } from 'react';
import { User, Shield, RefreshCw, TableProperties, Globe, Activity, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { ROLE_COLORS } from '../../types/admin';
import { API_BASE_URL } from '../../config';

interface SettingsTabProps {
  currentUsername: string;
  userRole: string;
  userPermissions: string[];
  refreshInterval: number; // in seconds (0 = disabled)
  setRefreshInterval: (interval: number) => void;
  density: 'compact' | 'comfortable';
  setDensity: (density: 'compact' | 'comfortable') => void;
  apiConnected: boolean;
  onRefreshStats: () => Promise<void>;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  currentUsername,
  userRole,
  userPermissions,
  refreshInterval,
  setRefreshInterval,
  density,
  setDensity,
  apiConnected,
  onRefreshStats,
}) => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'failed' | null>(null);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      await onRefreshStats();
      setTestResult('success');
    } catch {
      setTestResult('failed');
    } finally {
      setIsTesting(false);
      setTimeout(() => setTestResult(null), 4000);
    }
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      
      {/* Settings Header banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <h3 className="text-lg font-black text-slate-900 font-outfit">Dashboard Settings</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Configure system auto-refresh rates, view layout densities, and inspect current session properties.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`w-2.5 h-2.5 rounded-full ${apiConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
          <span className={`text-xs font-bold ${apiConnected ? 'text-emerald-700' : 'text-red-600'}`}>
            {apiConnected ? 'API Connected' : 'API Disconnected'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Profile Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-6">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4.5 h-4.5 text-amber-500" />
            Administrator Profile
          </h4>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Username</span>
                <span className="text-slate-900 text-sm font-bold mt-1 block truncate">
                  {currentUsername || 'Root Admin'}
                </span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Role</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mt-1 rounded border inline-block ${ROLE_COLORS[userRole] || ROLE_COLORS['viewer']}`}>
                  {userRole.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                Active Session Permissions
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {userPermissions.map((perm) => (
                  <span 
                    key={perm} 
                    className="text-[10px] font-semibold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-500 inline-block"></span>
                    {perm.replace(/_/g, ' ')}
                  </span>
                ))}
                {userPermissions.length === 0 && (
                  <span className="text-xs text-slate-400 italic">No permissions loaded</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-6">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <RefreshCw className="w-4.5 h-4.5 text-amber-500" />
            Dashboard Preferences
          </h4>

          <div className="space-y-6">
            {/* Auto Refresh Setting */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live Data Auto-Refresh
              </label>
              <p className="text-xs text-slate-500">
                How frequently the dashboard polls for new data in the background.
              </p>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[
                  { value: 0, label: 'Off' },
                  { value: 30, label: '30s' },
                  { value: 60, label: '1 min' },
                  { value: 300, label: '5 min' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRefreshInterval(opt.value)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      refreshInterval === opt.value
                        ? 'bg-[#08061E] border-[#08061E] text-amber-400 shadow-md shadow-[#08061E]/15'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {refreshInterval > 0 && (
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Auto-refreshing every {refreshInterval < 60 ? `${refreshInterval} seconds` : `${refreshInterval / 60} minute${refreshInterval > 60 ? 's' : ''}`}
                </p>
              )}
            </div>

            {/* Density Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <TableProperties className="w-4 h-4 text-amber-500" />
                Table Row Density
              </label>
              <p className="text-xs text-slate-500">
                Adjust vertical spacing in submission tables. Compact fits more rows on screen.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { value: 'comfortable', label: 'Comfortable View', desc: 'More padding' },
                  { value: 'compact', label: 'Compact View', desc: 'More rows' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDensity(opt.value as 'compact' | 'comfortable')}
                    className={`px-3 py-3 rounded-xl text-xs font-bold border transition-all text-left ${
                      density === opt.value
                        ? 'bg-[#08061E] border-[#08061E] text-amber-400 shadow-md shadow-[#08061E]/15'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                  >
                    <div>{opt.label}</div>
                    <div className={`text-[10px] mt-0.5 ${density === opt.value ? 'text-amber-200' : 'text-slate-400'}`}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Connection Diagnostics Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="w-4.5 h-4.5 text-amber-500" />
          Backend Connection Diagnostics
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">API Base URL</span>
            <span className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl block break-all">
              {API_BASE_URL || window.location.origin}
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Server Status</span>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold ${
              apiConnected 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {apiConnected
                ? <CheckCircle2 className="w-4 h-4" />
                : <XCircle className="w-4 h-4" />
              }
              {apiConnected ? 'Connected & Active' : 'Disconnected'}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Manual Check</span>
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-60 disabled:cursor-not-allowed border border-slate-200 px-4 py-2 rounded-xl transition-all"
            >
              {isTesting
                ? <><Loader2 className="w-4 h-4 animate-spin text-amber-500" /> Testing...</>
                : testResult === 'success'
                ? <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> <span className="text-emerald-600">Connection OK</span></>
                : testResult === 'failed'
                ? <><XCircle className="w-4 h-4 text-red-600" /> <span className="text-red-600">Failed</span></>
                : <><Activity className="w-4 h-4 text-amber-500" /> Test Connection</>
              }
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};
