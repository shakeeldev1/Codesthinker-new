import React from 'react';
import Button from '../common/Button';

const ApplyForInternshipForm: React.FC = () => {
  const inputStyle = "w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm";
  const labelStyle = "block text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] mb-2 ml-1";

  return (
    <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative group hover:border-amber-500/30 transition-colors duration-500">
      {/* Form Content */}
      <form className="p-8 md:p-10 flex-1 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em]">Summer 2024 Program</span>
          </span>
          <h2 className="text-3xl font-bold text-white mt-3">Shape Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Future</span></h2>
        </div>
        
        <div className="space-y-1">
          <label className={labelStyle}>Full Name</label>
          <input 
            type="text" 
            placeholder="Your full name" 
            className={inputStyle}
          />
        </div>

        <div className="space-y-1">
          <label className={labelStyle}>Email Address</label>
          <input 
            type="email" 
            placeholder="you@example.com" 
            className={inputStyle}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className={labelStyle}>Phone Number</label>
            <input 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              className={inputStyle}
            />
          </div>
          <div className="space-y-1">
            <label className={labelStyle}>Position</label>
            <select className={`${inputStyle} cursor-pointer`}>
              <option className="bg-[#0a0835]">Frontend Developer</option>
              <option className="bg-[#0a0835]">Backend Developer</option>
              <option className="bg-[#0a0835]">Full Stack Developer</option>
            </select>
          </div>
        </div>

        {/* Enhanced Upload Box */}
        <div className="space-y-1">
          <label className={labelStyle}>Upload Resume</label>
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent flex flex-col items-center justify-center hover:border-amber-500/50 hover:from-amber-500/10 transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📄</span>
            </div>
            <p className="text-sm text-white/60 font-medium">PDF, DOCX, or RTF</p>
            <p className="text-xs text-white/30 mt-1">Maximum file size: 5MB</p>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full mt-6 py-5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 text-[#07051D] font-black text-lg uppercase tracking-tighter hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-amber-500/20"
        >
          Apply for Internship
        </button>
      </form>

      {/* Right Panel - Hidden on mobile */}
      <div className="hidden md:flex w-1/3 bg-gradient-to-br from-white/5 to-white/[0.02] border-l border-white/10 p-10 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-4xl font-black leading-tight mb-5">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Journey</span>
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">
            Connect with industry experts, work on real projects, and accelerate your career growth with our mentorship program.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyForInternshipForm;