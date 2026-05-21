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
    icon: <Presentation className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Perfect Business Solutions',
    description: 'When an unknown printer took a galley type book to make a type specimen.',
  },
  {
    id: 2,
    icon: <Rocket className="w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110" />,
    title: 'Growth Strategy & Scale',
    description: 'Accelerate your roadmap with high performing dedicated development frameworks.',
  },
  {
    id: 3,
    icon: <ThumbsUp className="w-7 h-7 md:w-8 md:h-8 transition transform duration-300 group-hover:scale-110" />,
    title: 'Top Tier Quality Assurance',
    description: 'Delivering pixel-perfect products optimized for conversions and stability.',
  },
];

const BusinessFeatures: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-full relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              variants={fadeInUp}
              className="px-5 py-2 rounded-2xl shadow-lg relative group flex flex-col sm:flex-row items-start cursor-pointer gap-5 overflow-hidden transition-all duration-300 bg-white border border-transparent hover:shadow-2xl"
            >
              {/* --- CHOREOGRAPHED LAYERS --- */}
              {/* Layer 1: Amber Wipe. Delays 150ms on enter, trails by 100ms on exit */}
              <div className="absolute inset-0 bg-[#08061E] translate-y-[101%] transition-transform duration-500 ease-in-out delay-100 group-hover:translate-y-0 group-hover:delay-150 z-0" />
              
              {/* Layer 2: Navy Wipe. Delays 250ms on enter, drops instantly on exit */}
              <div className="absolute inset-0 bg-[black] translate-y-[101%] transition-transform duration-500 ease-in-out delay-0 group-hover:translate-y-0 group-hover:delay-[250ms] z-10" />
              {/* --------------------------- */}

              {/* Icon Container */}
              <div className="flex-shrink-0 bg-[#08061E]/10 group-hover:bg-[#ffffff] text-[#08061E] group-hover:text-[#08061E] p-3.5 md:p-4 rounded-xl shadow-sm relative z-20 transition-colors duration-300 delay-0 group-hover:delay-300">
                {feature.icon}
              </div>

              {/* Content Container */}
              <div className="space-y-2.5 pt-1 relative z-20">
                <h3 className="text-xl font-extrabold leading-snug tracking-tight text-[#0C1F3D] group-hover:text-white transition-colors duration-300 delay-0 group-hover:delay-300">
                  {feature.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-slate-500 group-hover:text-slate-300 transition-colors duration-300 delay-0 group-hover:delay-300">
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