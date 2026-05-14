import React from 'react';
import { motion } from 'framer-motion';
import { Presentation, Rocket, ThumbsUp } from 'lucide-react';

interface FeatureCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const featuresData: FeatureCard[] = [
  {
    id: 1,
    icon: <Presentation className="w-8 h-8 text-[#0C1F3D]" />,
    title: 'Perfect Business Solutions',
    description: 'When an unknown printer took a galley type book.',
  },
  {
    id: 2,
    icon: <Rocket className="w-8 h-8 text-[#0C1F3D]" />,
    title: 'Growth Strategy & Scale',
    description: 'Accelerate your roadmap with high-performing dedicated development frameworks.',
  },
  {
    id: 3,
    icon: <ThumbsUp className="w-8 h-8 text-[#0C1F3D]" />,
    title: 'Top Tier Quality Assurance',
    description: 'Delivering pixel-perfect products optimized for conversions and stability.',
  },
];

const BusinessFeatures: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="bg- py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              variants={fadeInUp}
              className="p-6 shadow-xl relative group flex items-start cursor-pointer gap-5 min-h-[140px] overflow-hidden transition-all duration-300 border-t-4 bg-white text-slate-800 border-transparent hover:border-[#FE9E00] hover:shadow-2xl"
            >
              {/* Sliding Background Layer (Bottom to Top) - Applied to ALL cards */}
              <div className="absolute inset-0 bg-[#0C1F3D] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />

              {/* Brand Colored Icon Container */}
              <div className="flex-shrink-0 bg-[#FE9E00] p-3 text-slate-900 shadow-md relative z-10">
                {feature.icon}
              </div>

              {/* Content Container */}
              <div className="space-y-2 pt-1 relative z-10">
                <h3 className="text-lg font-extrabold leading-snug tracking-tight transition-colors duration-300 text-[#0C1F3D] group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed transition-colors duration-300 text-slate-500 group-hover:text-slate-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessFeatures;