import React from 'react';
import { motion } from 'framer-motion';

interface ProcessPoint {
  id: string;
  title: string;
  description: string;
}

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
    <section className="bg-white py-16 px-6 lg:py-24 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        
        {/* Left Side: Points */}
        <motion.div variants={fadeInLeft} className="flex flex-col justify-center pr-0 lg:pr-12 space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#FE9E00] font-bold tracking-widest text-xs uppercase">
                Execution Process
              </span>
              <div className="h-[2px] w-10 bg-[#FE9E00]"></div>
            </div>
            <h2 className="text-2xl md:text-start text-center md:text-4xl font-extrabold text-[#0C1F3D] leading-tight">
              Always <span className='bg-gradient-to-r from-amber-500 to-yellow-400 text-[#07051d]c     ' style={{color:'transparent',backgroundClip:'text'}}>Deliver More</span> <br className='flex md:hidden'/> than you Expected
            </h2>
          </div>

          <div className="space-y-12">
            {processPoints.map((point) => (
              <div key={point.id} className="flex gap-6 group">
                <div className="flex-shrink-0">
                  {/* Square Box for Number */}
                  <div className="w-14 h-14 bg-[#0C1F3D] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {point.id}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0C1F3D] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Image & Call to Action */}
        <motion.div variants={fadeInRight} className="relative md:mt-12 mt-26 lg:mt-0 flex flex-col">
          <div className="flex-grow overflow-hidden shadow-xl">
            <img 
              src="https://img.magnific.com/premium-vector/scrum-agile-framework-plan-as-software-development-method-effective-teamwork-project-sprint-adaptive-programming-rule-cycle-process-managing-strategy-flat-vector-modern-illustration_566886-15875.jpg?ga=GA1.1.1217937454.1777963358&semt=ais_hybrid&w=740&q=80" 
              alt="How we work" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Call to Action Box in the Corner */}
          <div className="absolute bottom-0 left-0 bg-[#FE9E00] p-8 w-full max-w-[320px] shadow-2xl">
            <p className="text-[#0C1F3D] font-black text-2xl lg:text-3xl leading-tight">
              Execute your <br /> 
              <span className="text-white">Ideas from start</span>
            </p>
          </div>
          
          {/* Subtle Yellow accent border/background behind image if needed */}
          <div className="absolute top-0 right-0 w-24 h-full bg-[#FDC400] -z-10 translate-x-12 opacity-10"></div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default ProcessSection;