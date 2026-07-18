import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Globe, Rocket, Sparkles, ChevronRight } from "lucide-react";
const video = "/video.mp4";
import { SectionBadge } from "../ui/SectionBadge";

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const videoOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  const easeOutCubic = [0.22, 1, 0.36, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutCubic } },
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center pt-28 md:pt-0 overflow-hidden font-sans bg-[#07051D]">
      {/* Background Video Layer */}
      <motion.div style={{ scale: videoScale, opacity: videoOpacity }} className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={video}>
          <source src={video} type="video/mp4" />
        </video>
      </motion.div>

      {/* Modern Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-[#07051D] via-[#07051D]/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-linear-to-t from-[#07051D] via-transparent to-transparent z-10" />

      <div className="container mx-auto px-6 relative z-30">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-3/5 space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <SectionBadge text="Meet our Team" theme="dark" className="mx-auto lg:mx-0 mb-4" />

            <motion.h1 
              variants={itemVariants} 
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white"
            >
              Architecting the <br />
              <span className="text-[#F49B21]">
                Digital Future
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants} 
              className="text-sm md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed text-gray-200"
            >
              We bridge the gap between complex strategy and human-centric execution. 
              Join a global network of innovators dedicated to your growth.
            </motion.p>

            {/* Stats Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {[
                { label: "Team Members", val: "50+", icon: <Users className="w-5 h-5 text-[#F49B21]" /> },
                { label: "Global Reach", val: "8+ Nations", icon: <Globe className="w-5 h-5 text-[#F49B21]" /> },
                { label: "Success Rate", val: "99%", icon: <Rocket className="w-5 h-5 text-[#F49B21]" /> }
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl p-4 flex items-center gap-4 group cursor-default transition-all duration-350 hover:bg-white/[0.07] hover:border-[#F49B21]/30 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#F49B21]/10 group-hover:border-[#F49B21]/30">
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-white leading-none">{stat.val}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-4 flex justify-center lg:justify-start">
              <button className="relative overflow-hidden group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#F49B21] text-[#08061E] font-bold rounded-2xl shadow-lg text-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] select-none">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white flex items-center gap-2">
                  Start Collaborating
                  <ChevronRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-[#08061E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="w-full lg:w-2/5 flex justify-center lg:justify-end relative"
          >
            {/* Background SVG Decoration */}
            <motion.svg 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] as const }}
              className="absolute -top-10 -right-10 w-64 h-64 opacity-20 pointer-events-none" 
              viewBox="0 0 200 200"
            >
              <path fill="#F59E0B" d="M44.7,-76.4C58.3,-69.2,70,-57.9,78.7,-44.5C87.4,-31.1,93,-15.5,91.2,-0.9C89.4,13.6,80.1,27.2,69.5,37.9C58.9,48.7,46.9,56.5,34.4,63.1C21.9,69.7,8.8,75,-4.4,82.7C-17.7,90.4,-31.1,100.4,-43.3,98.2C-55.5,96.1,-66.4,81.7,-74.6,67.6C-82.7,53.4,-88.1,39.6,-91,25.4C-93.9,11.2,-94.3,-3.3,-89.7,-16.5C-85.2,-29.7,-75.7,-41.5,-64.3,-51.1C-52.9,-60.7,-39.7,-68.1,-26.4,-75.4C-13.1,-82.7,0.3,-89.9,13.7,-88.5C27.1,-87.1,40.4,-77.2,44.7,-76.4Z" transform="translate(100 100)" />
            </motion.svg>

            <motion.div 
              className="relative z-10 group"
              animate={{ y: [-8, 8] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/20 bg-white/5 backdrop-blur-3xl p-3 shadow-[0_0_50px_rgba(244,155,33,0.1)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(244,155,33,0.2)]">
                <img
                  alt="Team collaboration"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                  className="w-[320px] md:w-105 h-87.5 rounded-[2.1rem] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Float Badge */}
                <div className="absolute top-8 -left-8 bg-[#07051D]/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 select-none">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#F49B21] animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>Innovation Hub</p>
                    <p className="text-[9px] text-[#F49B21] font-bold mt-0.5">2024 DESIGN WINNER</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;