import React from 'react';
import GlobalServiceCard1 from './GlobalServiceCard1';

interface Technology {
  name: string;
  category: string;
  icon: string;
}

interface TechMarqueeProps {
  technologies: Technology[];
  speed?: number; // duration in seconds
}

const TechMarquee: React.FC<TechMarqueeProps> = ({ technologies, speed = 30 }) => {
  return (
    <div className="relative flex overflow-x-hidden w-full group py-4">
      {/* Edge Fade Masks for a seamless look */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track Container */}
      <div 
        className="flex animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {/* We map twice (2 sets) to ensure the track seamlessly loops when translating -50% */}
        {[...Array(2)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex gap-4 sm:gap-6 px-2 sm:px-3">
            {technologies.map((tech, idx) => (
              <div key={`${arrayIndex}-${idx}`} className="w-[280px] sm:w-[320px] flex-shrink-0">
                <GlobalServiceCard1
                  icon={tech.icon}
                  name={tech.name}
                  category={tech.category}
                  theme="light"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
