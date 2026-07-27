import React from 'react';
import { motion } from 'framer-motion';

interface Technology {
  name: string;
  category: string;
  icon: string;
}

interface TechOrbitProps {
  technologies: Technology[];
}

const TechOrbit: React.FC<TechOrbitProps> = ({ technologies }) => {
  // Split technologies into two rows for the bi-directional marquee
  const half = Math.ceil(technologies.length / 2);
  const topRow = technologies.slice(0, half);
  const bottomRow = technologies.slice(half);

  // Helper function to render a track
  const renderTrack = (items: Technology[], reverse: boolean) => (
    <div className="relative flex overflow-hidden w-full group py-6">
      {/* Edge Fade Masks */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Content */}
      <div
        className={`flex whitespace-nowrap gap-6 md:gap-8 hover:[animation-play-state:paused] ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
        style={{ animationDuration: '40s' }}
      >
        {/* Render twice for seamless looping */}
        {[...Array(2)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex gap-6 md:gap-8 px-3 md:px-4 shrink-0">
            {items.map((tech, idx) => (
              <div
                key={`${arrayIndex}-${idx}`}
                className="group/card flex items-center gap-4 bg-white/60 backdrop-blur-xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(245,158,11,0.12)] hover:border-amber-400/30 rounded-2xl p-5 w-[260px] md:w-[300px] transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 group-hover/card:bg-white group-hover/card:scale-110 transition-all duration-300 shrink-0 shadow-sm">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-7 h-7 md:w-8 md:h-8 object-contain filter grayscale group-hover/card:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-black text-gray-900 truncate group-hover/card:text-amber-500 transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-0.5 truncate">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 py-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-2xl h-full bg-gradient-to-b from-amber-500/5 to-transparent blur-[100px] rounded-full" />
      </div>

      <div className="flex flex-col gap-2 relative z-10">
        {renderTrack(topRow, false)}
        {renderTrack(bottomRow, true)}
      </div>

      {/* Tailwind config requires defining animation-marquee in global css, but we can use style block for fallback if needed. */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TechOrbit;
