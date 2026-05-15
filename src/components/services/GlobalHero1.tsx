import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface GlobalHero1Props {
  title?: string;
  subtitle?: string;
  images?: string[];
  badge?: string;
  theme?: 'light' | 'dark';
}

const GlobalHero1: React.FC<GlobalHero1Props> = ({ 
  title, 
  subtitle, 
  images = [],
  badge,
  theme = 'light'
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
      className={`relative min-h-screen ${isDark ? 'bg-slate-950' : 'bg-white'} overflow-hidden pt-28 pb-12 md:pt-20 flex items-center`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(#ffffff10_1px,transparent_1px)]' : 'bg-[radial-gradient(#0f172a10_1px,transparent_1px)]'} [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]`} />
      </div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute -top-20 -right-20 md:-top-40 md:-right-40 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#F49B1F]/10 rounded-full blur-[60px] md:blur-[100px] animate-blob`}></div>
        <div className={`absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#F49B1F]/10 rounded-full blur-[60px] md:blur-[100px] animate-blob animation-delay-2000`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div className="space-y-6 text-center md:text-left" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light ${isDark ? 'text-white' : 'text-slate-900'} leading-[1.1] mb-6 tracking-tighter`}>
                {title.split(badge).map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="italic font-serif text-[#F49B1F]">
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
              className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'} font-light leading-relaxed max-w-xl mx-auto md:mx-0`}
            >
              {subtitle}
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4 md:pt-8 flex justify-center md:justify-start">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="group relative px-7 py-3.5 sm:px-8 sm:py-4 overflow-hidden rounded-xl bg-[#F49B1F] text-white font-bold text-sm sm:text-base flex items-center gap-3 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Our Mission
                  <ArrowRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-[#F49B1F]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
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
                    transition={{ duration: 1.5, ease: "easeInOut" }}
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
                      idx === currentImageIndex ? "w-8 bg-[#F49B1F]" : isDark ? "w-2 bg-white/20" : "w-2 bg-white/40"
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