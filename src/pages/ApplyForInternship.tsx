import React, { useEffect, useState } from 'react';
import { FaTrophy, FaStar, FaGraduationCap } from 'react-icons/fa';
import ApplyForInternshipForm from '../components/apply/ApplyForInternshipForm';

// --- Modern Layout with mouse tracking, particle effects, and advanced animations ---

const ApplyForInternship: React.FC = () => {
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
    <div className="min-h-screen bg-[#02010a] text-white relative overflow-x-hidden font-sans selection:bg-amber-500/30">
      
      {/* Dynamic gradient background that follows mouse */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.12), transparent 70%)`,
        }}
      />
      
      {/* Animated grid background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b10_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b10_1px,transparent_1px)] bg-[size:200px_200px]" style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
      </div>
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-[100px] animate-float-delayed pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${12 + Math.random() * 18}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Form Section */}
          <div className="lg:col-span-7">
            <ApplyForInternshipForm />
          </div>

          {/* Right Column - Visual Content */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hero Team Image with glass effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                  alt="Collaborative team environment" 
                  className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02010a] via-[#02010a]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-sm text-amber-400 mb-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <span>Live cohort starting June 2024</span>
                  </div>
                  <h3 className="text-xl font-bold">Join our internship program</h3>
                  <p className="text-white/60 text-sm">Work with industry leaders</p>
                </div>
              </div>
            </div>

            {/* Interactive Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Culture Video Card */}
              <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-3 text-amber-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">Culture Video</h4>
                  <p className="text-white/40 text-xs">See what it's like</p>
                </div>
              </div>

              {/* Intern Stories Card */}
              <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-3 text-blue-400 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-14c2.21 0 4 1.79 4 4h-8c0-2.21 1.79-4 4-4zm8 10h-2c0 3.31-2.69 6-6 6s-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">Intern Stories</h4>
                  <p className="text-white/40 text-xs">Success journeys</p>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 py-3 text-xs text-white/30 border-t border-white/5">
              <span className="flex items-center gap-1"><FaTrophy /> Top rated program</span>
              <span className="flex items-center gap-1"><FaStar /> 4.9/5 from interns</span>
              <span className="flex items-center gap-1"><FaGraduationCap /> 500+ alumni</span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-3deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes float-particle {
          0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20vh) translateX(80px) rotate(360deg); opacity: 0; }
        }
        @keyframes slide-down {
          from { transform: translateY(-1rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
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

export default ApplyForInternship;