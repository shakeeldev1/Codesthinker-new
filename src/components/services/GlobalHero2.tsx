import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ShoppingBag, Filter, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GlobalHero2Props {
  title?: string;
  badge?: string;
  subtitle?: string;
  images?: string[];
  theme?: 'light' | 'dark';
  primaryLink?: string;
  secondaryLink?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

const GlobalHero2: React.FC<GlobalHero2Props> = ({
  title = "Premium Selection",
  badge = "Selection",
  subtitle = "Explore our curated catalog of high performance electronics. Engineered for those who demand excellence.",
  images = [],
  theme = 'light',
  primaryLink = '/contact',
  secondaryLink = '/projects',
  primaryBtnText = 'Launch Your Project',
  secondaryBtnText = 'Our Work'
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isDark = theme === 'dark';

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className={`relative min-h-screen ${isDark ? 'bg-[#07051d]' : 'bg-white'} overflow-hidden pt-28 pb-12 md:pt-20 flex items-center`}>
      {/* Unique Tech Dot Pattern */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(#ffffff10_1px,transparent_1px)]' : 'bg-[radial-gradient(#0f172a10_1px,transparent_1px)]'} [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]`} />
      </div>

      {/* Subtle Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-64 h-64 md:w-96 md:h-96 ${isDark ? 'bg-amber-500/10' : 'bg-blue-100/40'} rounded-full blur-[80px] md:blur-[100px]`} />
        <div className={`absolute top-1/2 -right-24 w-64 h-64 md:w-80 md:h-80 ${isDark ? 'bg-orange-500/10' : 'bg-cyan-100/30'} rounded-full blur-[80px]`} />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <motion.div className="max-w-3xl space-y-6" variants={itemVariants}>
            <h1 className={`text-3xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-[#07051d]'} leading-tight mb-6`}>
              {title.split(badge).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-amber-500">
                      {badge}
                    </span>
                  )}
                </span>
              ))}
            </h1>

            <p className={`text-sm md:text-xl ${isDark ? 'text-gray-200' : 'text-gray-600'} leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8`}>
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5 w-full sm:w-auto mt-8">
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

              {/* Feature Tags */}
          <motion.div className="mt-8 md:mt-10 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4" variants={containerVariants}>
            {[
              { icon: Sparkles, label: 'Latest Design', color: 'text-amber-500', bg: isDark ? 'bg-white/5' : 'bg-amber-50', border: isDark ? 'border-white/10' : 'border-amber-200' },
              { icon: ShoppingBag, label: 'User Centric', color: 'text-amber-500', bg: isDark ? 'bg-white/5' : 'bg-amber-50', border: isDark ? 'border-white/10' : 'border-amber-200' },
              { icon: Filter, label: 'Pixel Perfect', color: 'text-amber-500', bg: isDark ? 'bg-white/5' : 'bg-amber-50', border: isDark ? 'border-white/10' : 'border-amber-200' },
            ].map((tag, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-xl ${tag.bg} border ${tag.border} backdrop-blur-md hover:shadow-xl transition-all cursor-default group`}
              >
                <tag.icon size={16} className={`${tag.color} group-hover:scale-110 transition-transform`} />
                <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-200' : 'text-[#07051d]'} tracking-wide`}>{tag.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Decorative Product Card */}
        <motion.div 
          className="relative flex items-center justify-center order-1 lg:order-2 perspective-1000"
          variants={itemVariants}
        >
          <div className={`relative z-20 w-[256px] h-[320px] sm:w-[400px] sm:h-[360px] lg:w-[480px] lg:h-[400px] ${isDark ? 'bg-[#07051d]' : 'bg-white'} rounded-[32px] sm:rounded-[40px] border ${isDark ? 'border-white/10' : 'border-slate-100'} shadow-2xl ${isDark ? 'shadow-amber-900/40' : 'shadow-amber-200/20'} flex items-center justify-center overflow-hidden transform-gpu rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-transform duration-1000 ease-out`}
          >
            <AnimatePresence mode="popLayout">
              {images.length > 0 ? (
                <motion.img
                  key={images[currentImageIndex]}
                  src={images[currentImageIndex]}
                  alt="Product Preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Zap className="text-amber-200 w-16 h-16 sm:w-24 sm:h-24" strokeWidth={0.5} />
              )}
            </AnimatePresence>

            {/* Image Indicators / Pagination */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === currentImageIndex ? "w-8 bg-amber-500" : isDark ? "w-2 bg-white/20" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Decorative Background Blob */}
          <div className="absolute -z-10 w-full max-w-[400px] aspect-square bg-amber-50/50 rounded-full blur-3xl opacity-70" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GlobalHero2;