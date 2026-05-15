import React, { useEffect, useState } from 'react';
import { FaFire, FaStar, FaUsers, FaRocket, FaGraduationCap, FaFolderOpen, FaHandshake, FaBriefcase, FaCheckCircle, FaBullseye, FaCalendarAlt } from 'react-icons/fa';
import ApplyNowProjectTrainingForm from '../components/apply/ApplyNowProjectTrainingForm';

// --- Modern Layout with mouse tracking, particle effects, and advanced animations ---

const ApplyNowProjectTraining: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#02010a] text-white relative overflow-x-hidden font-sans">
      
      {/* Dynamic gradient background that follows mouse */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.15), transparent 60%)`,
        }}
      />
      
      {/* Animated grid background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b15_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b15_1px,transparent_1px)] bg-[size:300px_300px]" style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
      </div>
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-[100px] animate-float-delayed pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${15 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* Hero Section with modern split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Form Area */}
          <div className="lg:col-span-7 space-y-8">
            {/* Badge with glow effect */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/30 backdrop-blur-sm shadow-lg shadow-amber-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1"><FaFire className="inline" /> Only 12 Seats Left</span>
            </div>
            
            {/* Main heading with gradient and animation */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight">
                <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                  Master Modern
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent animate-gradient">
                    Development
                  </span>
                  {/* Underline animation */}
                  <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 400 20" fill="none">
                    <path d="M0 10 Q100 20 200 10 Q300 0 400 10" stroke="url(#gradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="50%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              
              <p className="text-gray-300 text-lg lg:text-xl leading-relaxed max-w-lg">
                Join an elite cohort of developers. Get 1-on-1 mentorship, build production-ready projects, and land your dream job.
              </p>
            </div>
            
            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                  <FaStar className="text-2xl text-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">4.96</div>
                  <div className="text-xs text-white/40">from 1,284 reviews</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <FaUsers className="text-2xl text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3,200+</div>
                  <div className="text-xs text-white/40">graduates placed</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                  <FaRocket className="text-2xl text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">94%</div>
                  <div className="text-xs text-white/40">job placement rate</div>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <ApplyNowProjectTrainingForm />
          </div>

          {/* Right Column - Visual Experience */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main showcase card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-[320px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02010a] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-sm text-amber-400 mb-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <span>Live mentorship session</span>
                  </div>
                  <h3 className="text-xl font-bold">Real-time code reviews</h3>
                  <p className="text-white/60 text-sm">Industry experts guide you every step</p>
                </div>
              </div>
            </div>

            {/* Feature grid with modern cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <FaGraduationCap className="text-3xl mb-3 text-amber-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-sm mb-1">Expert Mentors</h4>
                  <p className="text-white/40 text-xs">FAANG engineers</p>
                </div>
              </div>
              <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <FaFolderOpen className="text-3xl mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-sm mb-1">Real Projects</h4>
                  <p className="text-white/40 text-xs">Portfolio Ready</p>
                </div>
              </div>
              <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <FaHandshake className="text-3xl mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-sm mb-1">Peer Network</h4>
                  <p className="text-white/40 text-xs">Global community</p>
                </div>
              </div>
              <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <FaBriefcase className="text-3xl mb-3 text-green-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-sm mb-1">Job Support</h4>
                  <p className="text-white/40 text-xs">Resume & interview prep</p>
                </div>
              </div>
            </div>
            
            {/* Trust badge */}
            <div className="flex items-center justify-center gap-4 py-4 text-xs text-white/40 border-t border-white/5">
              <span className="flex items-center gap-1"><FaCheckCircle /> No upfront payment</span>
              <span className="flex items-center gap-1"><FaBullseye /> Money-back guarantee</span>
              <span className="flex items-center gap-1"><FaCalendarAlt /> Start in 2 weeks</span>
            </div>
          </div>
          
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes float-particle {
          0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 14s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        @keyframes slide-down {
          from { transform: translateY(-1rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ApplyNowProjectTraining;