import React from 'react';
import { Lock, User, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

interface LoginViewProps {
  usernameInput: string;
  setUsernameInput: (val: string) => void;
  passwordInput: string;
  setPasswordInput: (val: string) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  loginError: string;
  isLoggingIn: boolean;
  handleLogin: (e: React.FormEvent) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  usernameInput,
  setUsernameInput,
  passwordInput,
  setPasswordInput,
  rememberMe,
  setRememberMe,
  loginError,
  isLoggingIn,
  handleLogin,
}) => {
  return (
    <div 
      className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans"
      style={{
        backgroundImage: 'radial-gradient(circle at top right, rgba(244, 155, 33, 0.08), transparent 40%), radial-gradient(circle at bottom left, rgba(8, 6, 30, 0.05), transparent 40%)'
      }}
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#08061E]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl shadow-xl p-8 relative z-10 transition-all duration-300">
        
        {/* Header with Official Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-[#08061E] rounded-2xl shadow-lg shadow-[#08061E]/15 text-white mb-4">
            <img src="/logo-blue.webp" alt="Code's Thinker Logo" className="h-8 w-auto object-contain" />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight font-outfit">Code's Thinker</h1>
          <p className="text-slate-500 text-xs mt-1 font-medium">Enterprise Management Portal</p>
        </div>

        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-xl p-3.5 flex items-start gap-2.5 mb-6">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Admin Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer select-none text-xs text-slate-600 hover:text-slate-900 transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 w-4 h-4 rounded border-slate-300 bg-slate-50 text-[#08061E] focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer accent-[#08061E]"
              />
              Remember session
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-[#08061E] hover:bg-slate-800 text-amber-400 font-bold rounded-xl py-3.5 text-sm transition-all focus:outline-none shadow-lg shadow-[#08061E]/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoggingIn ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                Authenticating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                Access Portal
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
