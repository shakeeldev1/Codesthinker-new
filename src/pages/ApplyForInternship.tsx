import React from 'react';
import ApplyForInternshipForm from '../components/apply/ApplyForInternshipForm';

const ApplyForInternship: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07051D] via-[#0d1060] to-[#07051D] text-white font-sans selection:bg-amber-500/30">
      {/* Light Grid Background */}
      <svg
        className="fixed inset-0 pointer-events-none z-0"
        width="1440"
        height="1200"
        viewBox="0 0 1440 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.08 }}
      >
        <defs>
          <pattern id="grid-intern" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#F59C24" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1440" height="1200" fill="url(#grid-intern)" />
      </svg>

      {/* Multi-Layer Animated Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-gradient-radial from-blue-900/25 via-transparent to-transparent rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-radial from-amber-900/15 via-transparent to-transparent rounded-full blur-[140px] animate-pulse-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-indigo-500/6 via-transparent to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Application Form */}
          <div className="lg:col-span-7">
            <ApplyForInternshipForm />
          </div>

          {/* Right: Visual Content */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hero Team Image */}
            <div className="relative group overflow-hidden rounded-3xl border border-white/10 shadow-2xl hover:shadow-amber-500/10 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Collaborative team environment" 
                className="w-full h-[360px] object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-8">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Meet Our Team</h3>
                    <p className="text-sm text-gray-300">Collaborative culture</p>
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all">→</span>
                </div>
              </div>
            </div>

            {/* Bottom Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative aspect-video bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center p-5 text-center hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-3 text-amber-400 group-hover:scale-110 transition-transform">▶</div>
                <p className="relative text-xs font-semibold uppercase tracking-wider text-gray-200">Culture Video</p>
              </div>
              <div className="group relative aspect-video bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center p-5 text-center hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-3 text-blue-400 group-hover:scale-110 transition-transform">▶</div>
                <p className="relative text-xs font-semibold uppercase tracking-wider text-gray-200">Intern Stories</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplyForInternship;