import React from 'react';
import { motion } from 'framer-motion';
import img from "../../../public/process.webp"

// --- Types ---
interface ProcessPoint {
  id: string;
  title: string;
  description: string;
}

// --- Static Data ---
const processPoints: ProcessPoint[] = [
  {
    id: '01',
    title: 'End to End Development',
    description: 'We handle everything from initial architecture to final deployment, ensuring a seamless and scalable product.',
  },
  {
    id: '02',
    title: 'Software IT Outsource',
    description: 'Extend your team with our expert developers to accelerate your roadmap and technical capabilities.',
  },
  {
    id: '03',
    title: 'Digital Marketing',
    description: 'Data-driven strategies designed to scale your brand and capture high-intent leads effectively.',
  },
];

const ProcessSection: React.FC = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-br from-slate-50 to-gray-100 py-16 px-4 sm:px-6 lg:py-24 lg:px-8 overflow-hidden font-sans">
      {/* Background Decor matching AboutUs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        
        {/* Left Side: Points */}
        <motion.div variants={fadeInLeft} className="flex flex-col justify-center space-y-10 order-2 lg:order-1">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-full px-4 py-1.5 w-fit">
              <div className="w-2 h-2 rounded-full bg-[#F69A20]"></div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                Execution Process
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Always{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
                <span className="text-[#F69A20]">Deliver </span>
              </span>{' '}
            
              More than you Expected
            </h2>
          </div>

          <div className="space-y-6">
            {processPoints.map((point) => (
              <div 
                key={point.id} 
                className="flex items-start gap-5 p-5 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex-shrink-0">
                  {/* Digital Rounded Box for Number matching AboutUs feature patterns */}
                  <div className="w-12 h-12 bg-gray-50 text-gray-900 group-hover:bg-gray-900 group-hover:text-white rounded-xl flex items-center justify-center font-extrabold text-base transition-colors duration-300 ring-1 ring-gray-200/50 group-hover:ring-gray-900 shadow-sm">
                    {point.id}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-900 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Image & Call to Action */}
        <motion.div variants={fadeInRight} className="relative w-full order-1 lg:order-2 flex flex-col">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 group aspect-[4/3] lg:aspect-auto lg:h-[550px]">
            <img 
              src={img}
              alt="How we work" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              loading="lazy"
            />
            
            {/* Overlay Gradient matching AboutUs */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-80 transition-opacity duration-500"></div>
            
            {/* Call to Action Box inside corner layout */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl ring-1 ring-black/5 max-w-xs transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F69A20] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F69A20]"></span>
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Our Mission</span>
                </div>
                <p className="text-gray-900 font-extrabold text-xl leading-tight">
                  Execute your <br /> 
                  <span className="text-[#F69A20]">Ideas From Start</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default ProcessSection;