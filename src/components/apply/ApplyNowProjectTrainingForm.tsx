import React from 'react';
import Button from '../common/Button';

const ApplyNowProjectTrainingForm: React.FC = () => {
  const inputBase = "w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm";
  const labelBase = "block text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] mb-2 ml-1";

  return (
    <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-black/40 relative overflow-hidden group hover:border-amber-500/30 transition-colors duration-500">
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className={labelBase}>Full Name</label>
            <input 
              type="text" 
              placeholder="Alex Johnson" 
              required 
              className={inputBase}
            />
          </div>
          <div className="space-y-1">
            <label className={labelBase}>Email Address</label>
            <input 
              type="email" 
              placeholder="alex@company.com" 
              required 
              className={inputBase}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className={labelBase}>Phone Number</label>
            <input 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              required 
              className={inputBase}
            />
          </div>
          <div className="space-y-1">
            <label className={labelBase}>Training Interest</label>
            <select className={`${inputBase} appearance-none cursor-pointer`}>
              <option className="bg-[#0a0835]">Full Stack Web Development</option>
              <option className="bg-[#0a0835]">Data Science & ML</option>
              <option className="bg-[#0a0835]">UI/UX Strategy</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelBase}>Project Vision / Message</label>
          <textarea 
            rows={3} 
            placeholder="Tell us what you want to build and your career goals..." 
            className={`${inputBase} resize-none`}
          />
        </div>

        <div className="flex justify-center pt-2">
          <Button 
            text="Submit Application" 
            size="lg" 
            className="w-full max-w-md py-4 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow" 
          />
        </div>
      </form>
    </div>
  );
};

export default ApplyNowProjectTrainingForm;