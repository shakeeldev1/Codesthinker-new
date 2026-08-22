// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GlobalHero1Props {
  title?: string;
  subtitle?: string;
  images?: string[];
  badge?: string;
  theme?: 'light' | 'dark';
  primaryLink?: string;
  secondaryLink?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

const GlobalHero1: React.FC<GlobalHero1Props> = ({ 
  title, 
  subtitle, 
  images = [],
  badge,
  theme = 'light',
  primaryLink = '/contact',
  secondaryLink = '/projects',
  primaryBtnText = 'Explore Our Mission',
  secondaryBtnText = 'Learn More'
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const isDark = theme === 'dark';

  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  if (!title) return null; // Safety check

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section
      id="hero"
      className={`relative min-h-screen ${isDark ? 'bg-[#07051d]' : 'bg-white'} overflow-hidden pt-28 pb-12 md:pt-20 flex items-center`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute -top-20 -right-20 md:-top-40 md:-right-40 w-[300px] h-[300px] md:w-[600px] md:h-[600px] ${isDark ? 'bg-amber-500/10' : 'bg-blue-100/40'} rounded-full blur-[60px] md:blur-[100px] animate-blob`}></div>
        <div className={`absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-[300px] h-[300px] md:w-[600px] md:h-[600px] ${isDark ? 'bg-orange-500/10' : 'bg-indigo-100/30'} rounded-full blur-[60px] md:blur-[100px] animate-blob animation-delay-2000`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div className="space-y-6 text-center md:text-left" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h1 className={`text-3xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-[#07051d]'} leading-tight mb-6`}>
                {title.split(badge).map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-amber-500">
                        {badge}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </h1>
            </motion.div>

            <motion.p
              id="reach"
              variants={itemVariants}
              className={`text-sm md:text-xl ${isDark ? 'text-gray-200' : 'text-gray-600'} leading-relaxed max-w-xl mx-auto md:mx-0 mb-8`}
            >
              {subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4 md:pt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-5 w-full sm:w-auto">
              <Link
                to={primaryLink}
                className="relative overflow-hidden group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#F49B21] text-[#08061E] font-bold rounded-2xl shadow-lg text-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] select-none"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white flex items-center gap-2">
                  {primaryBtnText}
                  <ArrowRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-[#08061E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </Link>
              <Link
                to={secondaryLink}
                className={`relative overflow-hidden group flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-transparent ${isDark ? 'text-white border-white/20' : 'text-[#07051d] border-[#07051d]/20'} font-bold rounded-2xl border-2 hover:border-[#F49B21] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] select-none`}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#08061E]">
                  {secondaryBtnText}
                </span>
                <div className="absolute inset-0 bg-[#F49B21] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Stat Card with 10% size reduction */}
          <motion.div
            className="relative h-[270px] sm:h-[360px] md:h-[450px] w-full max-w-[90%] mx-auto md:mr-0 md:ml-auto perspective-1000"
            variants={itemVariants}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={`absolute inset-0 rounded-[32px] md:rounded-[40px] overflow-hidden border ${isDark ? 'border-white/10' : 'border-white/20'} ${isDark ? 'shadow-amber-900/40' : 'shadow-slate-200/50'} shadow-2xl flex flex-col items-center justify-center p-6 md:p-10 text-center group transform-gpu rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-transform duration-1000 ease-out`}>
              {/* Background Images with AnimatePresence */}
              <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout">
                  <motion.img 
                    key={currentImageIndex}
                    src={images[currentImageIndex]} 
                    alt="Innovation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === currentImageIndex ? "w-8 bg-amber-500" : isDark ? "w-2 bg-white/20" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-10 md:h-10 border-t-2 border-l-2 border-white/30 rounded-tl-xl z-10" />
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 md:w-10 md:h-10 border-b-2 border-r-2 border-white/30 rounded-br-xl z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </motion.section>
  );
};

export default GlobalHero1;
