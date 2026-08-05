import React, { useState } from 'react';
import {
  FaSearch,
  FaPaintBrush,
  FaCode,
  FaBug,
  FaArrowRight,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionBadge } from '../ui/SectionBadge';

const WorkProcess: React.FC = () => {
  const steps = [
    {
      icon: <FaSearch className="w-6 h-6" />,
      title: 'Discovery & Strategy',
      desc: 'Hum aapke goals aur target audience ko samajhne ke liye gehra analysis karte hain aur technical roadmap taiyar karte hain.',
      img: 'https://images.pexels.com/photos/7640413/pexels-photo-7640413.jpeg',
      points: ['Market Research', 'Technical Planning', 'User Journey Mapping'],
    },
    {
      icon: <FaPaintBrush className="w-6 h-6" />,
      title: 'UI/UX Designing',
      desc: 'Hum aise intuitive aur visually stunning interfaces banate hain jo users ko ek behtareen digital experience provide karte hain.',
      img: 'https://images.pexels.com/photos/6804084/pexels-photo-6804084.jpeg',
      points: ['Wireframing', 'Modern UI Design', 'Responsive Layouts'],
    },
    {
      icon: <FaCode className="w-6 h-6" />,
      title: 'Development',
      desc: 'Modern frameworks ka istemal karte hue hum scalable, secure aur high-performance web solutions build karte hain.',
      img: 'https://images.pexels.com/photos/7691729/pexels-photo-7691729.jpeg',
      points: ['Clean Architecture', 'API Integration', 'Performance Optimization'],
    },
    {
      icon: <FaBug className="w-6 h-6" />,
      title: 'Testing & Launch',
      desc: 'Launch se pehle rigorous QA testing ki jati hai taakay aapka product har device par bug-free aur smooth chale.',
      img: 'https://images.pexels.com/photos/7698800/pexels-photo-7698800.jpeg',
      points: ['Cross-browser Testing', 'Unit Testing', 'Deployment & Support'],
    },
  ];

  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <section className="relative bg-[#f8fafc] py-12  overflow-visible">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-amber-400/10 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-indigo-500/10 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6  text-center">
        {/* Section Header */}
        <div className="mb-24">
          <SectionBadge text="Process" theme="light" />
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#07051d] leading-tight">
            How We Bring Your <br />
            <span className="text-amber-500">Ideas to Life</span>
          </h2>
        </div>

        {/* 
          Main Grid Container:
          items-start is CRITICAL for the sticky effect to work.
        */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-start">
          
          {/* LEFT SIDE: SCROLLABLE CARDS */}
          <div className="space-y-10 pb-20">
            {steps.map((step, idx) => {
              const isActive = selectedStep === idx;
              return (
                <motion.div
                  key={idx}
                  // Scroll Spy logic: Change image when card enters 50% of the screen
                  onViewportEnter={() => setSelectedStep(idx)}
                  viewport={{ amount: 0.5, margin: "-10% 0px -10% 0px" }}
                  onClick={() => setSelectedStep(idx)}
                  className={`relative px-5 py-2 rounded-xl border-2 transition-all duration-700 cursor-pointer group
                    ${isActive 
                      ? 'bg-[#07051d] border-amber-500 shadow-2xl translate-x-2 md:translate-x-6' 
                      : 'bg-white border-transparent hover:border-gray-200'
                    }`}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Icon Box */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500
                      ${isActive ? 'bg-amber-500 text-black rotate-[10deg]' : 'bg-gray-100 text-gray-500 group-hover:scale-110'}`}>
                      {step.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className={`text-xs font-black uppercase tracking-[0.3em] ${isActive ? 'text-amber-400' : 'text-gray-400'}`}>
                          Phase 0{idx + 1}
                        </span>
                        <FaArrowRight className={`mt-1 transition-all duration-500 ${isActive ? 'text-amber-500 opacity-100' : 'opacity-0 -translate-x-4'}`} />
                      </div>

                      <h3 className={`text-3xl font-bold mt-3 mb-5 ${isActive ? 'text-white' : 'text-[#07051d]'}`}>
                        {step.title}
                      </h3>
                      
                      <p className={`text-lg leading-relaxed mb-8 transition-colors duration-500 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                        {step.desc}
                      </p>

                      {/* Detail Points */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {step.points.map((point, pIdx) => (
                          <div key={pIdx} className={`flex items-center gap-3 text-sm font-semibold ${isActive ? 'text-gray-200' : 'text-gray-600'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT SIDE: STICKY IMAGE CONTAINER */}
          <div className="hidden lg:block sticky top-24 z-20">
            <div className="relative h-[650px] w-full rounded-xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] border-[16px] border-white bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedStep}
                  initial={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                  transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={steps[selectedStep].img}
                    alt={steps[selectedStep].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Visual Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating Content on Image */}
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-4xl font-black mb-2 tracking-tight">
                        {steps[selectedStep].title}
                      </h4>
                      <p className="text-amber-400 font-medium tracking-widest uppercase text-sm">
                        Streamlined Efficiency
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Step Counter Badge */}
              <div className="absolute top-8 right-8 bg-black/20 backdrop-blur-xl border border-white/30 text-white font-bold py-2 px-5 rounded-full text-sm">
                0{selectedStep + 1} / 0{steps.length}
              </div>
            </div>

            {/* Bottom Progress Bar (Visual only) */}
            <div className="mt-8 px-4">
               <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-amber-500"
                    animate={{ width: `${((selectedStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorkProcess;