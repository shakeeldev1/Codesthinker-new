import React from 'react';
import { FaGlobe, FaStar } from 'react-icons/fa';
import JobBoardList from '../components/apply/JobBoardList';

// --- Modern Job Board Page with Dynamic Background and Animations ---

const JobBoard: React.FC = () => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#02010a] text-white relative overflow-x-hidden">
      
      {/* Dynamic Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:200px_200px]" style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
      </div>

      {/* Animated Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-[100px] animate-float-delayed pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      {/* Particle System */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${10 + Math.random() * 15}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24">
        
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 mb-6 backdrop-blur-sm animate-in fade-in-down">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">We're Hiring</span>
          </div>
          
          {/* Main Heading with Gradient */}
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Current{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                Openings
              </span>
              {/* Animated underline */}
              <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 400 20" fill="none">
                <path d="M0 10 Q100 20 200 10 Q300 0 400 10" stroke="url(#gradient)" strokeWidth="3" fill="none" strokeLinecap="round">
                  <animate attributeName="stroke-dasharray" from="0 800" to="800 800" dur="2s" fill="freeze" />
                </path>
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
          
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Build the future with us. Explore our latest opportunities and find a role that matches your ambition and expertise.
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-white/50">5 open positions</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <FaGlobe className="text-sm text-white/50" />
              <span className="text-sm text-white/50">100% remote</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <FaStar className="text-sm text-white/50" />
              <span className="text-sm text-white/50">Top-tier benefits</span>
            </div>
          </div>
        </div>

        {/* Job Board List */}
        <JobBoardList />
        
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
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        .animate-in {
          animation: fade-in-down 0.6s ease-out forwards;
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

export default JobBoard;