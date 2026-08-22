import React from 'react';
import GlobalServiceCard1 from './GlobalServiceCard1';

interface Technology {
  name: string;
  category: string;
  icon: string;
}

interface TechMarqueeProps {
  technologies: Technology[];
}

const TechMarquee: React.FC<TechMarqueeProps> = ({ technologies }) => {
  return (
    <div className="relative w-full py-4">
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-2 sm:px-3 max-w-7xl mx-auto">
        {technologies.map((tech, idx) => (
          <div key={idx} className="w-[280px] sm:w-[320px] flex-shrink-0">
            <GlobalServiceCard1
              icon={tech.icon}
              name={tech.name}
              category={tech.category}
              theme="light"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
