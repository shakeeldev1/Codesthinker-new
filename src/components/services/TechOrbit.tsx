import React from 'react';

interface Technology {
  name: string;
  category: string;
  icon: string;
}

interface TechOrbitProps {
  technologies: Technology[];
}

const TechOrbit: React.FC<TechOrbitProps> = ({ technologies }) => {
  return (
    <div className="relative w-full py-12">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-2xl h-full bg-gradient-to-b from-amber-500/5 to-transparent blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-4 md:gap-6 px-4 max-w-7xl mx-auto">
        {technologies.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white/60 backdrop-blur-xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(245,158,11,0.12)] hover:border-amber-400/30 rounded-2xl p-5 w-[260px] md:w-[300px] transition-all duration-300 cursor-default hover:-translate-y-1"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 shrink-0 shadow-sm">
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-7 h-7 md:w-8 md:h-8 object-contain opacity-100"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-black text-gray-900 truncate">
                {tech.name}
              </span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-0.5 truncate">
                {tech.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechOrbit;
