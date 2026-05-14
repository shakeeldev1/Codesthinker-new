import React from 'react';
import ApplyNowProjectTrainingForm from '../components/apply/ApplyNowProjectTrainingForm';

const ApplyNowProjectTraining: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07051D] via-[#0c0838] to-[#07051D] text-white relative overflow-hidden font-sans">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-radial from-amber-500/12 via-transparent to-transparent rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-blue-600/12 via-transparent to-transparent rounded-full blur-[120px] animate-pulse-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-indigo-500/8 via-transparent to-transparent rounded-full blur-[160px]" />
      </div>

      {/* Subtle Grid Pattern */}
      <svg
        className="absolute inset-0 pointer-events-none z-0"
        width="1440"
        height="1200"
        viewBox="0 0 1440 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.06 }}
      >
        <defs>
          <pattern id="grid-apply-training" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F59C24" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="1440" height="1200" fill="url(#grid-apply-training)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Form Section */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="mb-14 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 mb-5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">Limited Seats Available</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Skills</span>
              </h1>
              <p className="text-gray-300 text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join our elite Project Training program. Gain hands on experience with industry mentors and cutting-edge tech stacks.
              </p>
            </div>
            <ApplyNowProjectTrainingForm />
          </div>

          {/* Right Column: Visual Grid */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            {/* Primary Visual */}
            <div className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 hover:shadow-amber-500/10 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
                alt="Interactive training session" 
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07051D] via-[#07051D]/60 via-60% to-transparent flex items-end p-8">
                <div>
                  <span className="bg-gradient-to-r from-amber-500 to-amber-400 text-[#07051D] px-4 py-1.5 rounded-full text-[10px] font-black mb-3 inline-block shadow-lg uppercase tracking-wider">
                    Live 1-on-1 Mentorship
                  </span>
                  <h3 className="text-2xl font-bold text-white">Interactive Learning</h3>
                </div>
              </div>
            </div>

            {/* Secondary Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center mb-4 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">▶</span>
                </div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-200 relative">Curriculum</h4>
              </div>
              <div className="group relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">★</span>
                </div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-200 relative">Success Stories</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplyNowProjectTraining;