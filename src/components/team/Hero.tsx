import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Globe, Rocket, Sparkles, ChevronRight } from "lucide-react";
import video from "../../../public/video.mp4";

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
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-1.5 shadow-2xl">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-bold text-gray-200 uppercase tracking-[0.2em]">Meet Our Experts</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl font-bold text-white leading-[1.05] tracking-tight">
              Design the  Future<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400  to-yellow-500">
                With
              </span>
               Our Team
            </motion.h1>

            <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              We bridge the gap between complex strategy and human-centric execution. 
              Join a global network of innovators dedicated to your growth.
            </motion.p>

            {/* Stats Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {[
                { label: "Team Members", val: "50+", icon: <Users className="w-5 h-5 text-amber-400" /> },
                { label: "Global Reach", val: "8+ Nations", icon: <Globe className="w-5 h-5 text-orange-400" /> },
                { label: "Success Rate", val: "99%", icon: <Rocket className="w-5 h-5 text-yellow-400" /> }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-amber-500/50">
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-white leading-none">{stat.val}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <button className="group relative flex items-center gap-2 bg-white text-[#07051D] font-bold px-5 py-2 rounded-full transition-all hover:bg-amber-400 hover:scale-105">
                Start Collaborating
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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

            <div className="relative z-10 group">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/20 bg-white/5 backdrop-blur-3xl p-3 shadow-[0_0_50px_rgba(245,158,11,0.1)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                <img
                  alt="Team collaboration"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                  className="w-[320px] md:w-105 h-87.5 rounded-[2.1rem] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Float Badge */}
                <div className="absolute top-8 -left-8 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#07051D] rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#07051D] uppercase">Innovation Hub</p>
                    <p className="text-[10px] text-gray-500">2024 Design Winner</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;