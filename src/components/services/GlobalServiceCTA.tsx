import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, MessageSquare, Sparkles } from 'lucide-react';

interface GlobalServiceCTAProps {
  theme?: 'light' | 'dark';
  title?: string;
  highlightText?: string;
  subtitle?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

const GlobalServiceCTA: React.FC<GlobalServiceCTAProps> = ({
  theme = 'light',
  title = "Ready to transform your",
  highlightText = "Digital Presence?",
  subtitle = "Join hundreds of successful businesses that have scaled with our innovative solutions and expert team.",
  primaryBtnText = "Start Your Project",
  secondaryBtnText = "Book a Consultation"
}) => {
  const isDark = theme === 'dark';

  // Theme configuration
  const themeConfig = {
    light: {
      bg: 'bg-white',
      borderColor: 'border-gray-200',
      glowTop: 'bg-amber-200',
      glowBottom: 'bg-orange-100',
      textPrimary: 'text-[#07051d]',
      textSecondary: 'text-gray-600',
      highlightGradient: 'from-amber-500 via-orange-500 to-amber-600',
      badgeBg: 'bg-amber-50',
      badgeBorder: 'border-amber-200',
      badgeText: 'text-amber-700',
      badgeIcon: 'text-amber-600',
      secondaryBtnBg: 'bg-gray-50',
      secondaryBtnBorder: 'border-gray-200',
      secondaryBtnText: 'text-[#07051d]',
      secondaryBtnHover: 'hover:border-amber-400 hover:bg-amber-50',
      shadow: 'shadow-xl',
    },
    dark: {
      bg: 'bg-[#07051d]',
      borderColor: 'border-gray-800',
      glowTop: 'bg-amber-600/20',
      glowBottom: 'bg-orange-600/10',
      textPrimary: 'text-slate-50',
      textSecondary: 'text-slate-400',
      highlightGradient: 'from-amber-400 via-orange-400 to-amber-500',
      badgeBg: 'bg-amber-950/50',
      badgeBorder: 'border-amber-800/50',
      badgeText: 'text-amber-300',
      badgeIcon: 'text-amber-400',
      secondaryBtnBg: 'bg-[#0f0b29]/50',
      secondaryBtnBorder: 'border-gray-800',
      secondaryBtnText: 'text-slate-50',
      secondaryBtnHover: 'hover:border-amber-500/60 hover:bg-[#07051d]',
      shadow: 'shadow-2xl shadow-amber-500/20',
    }
  };

  const colors = themeConfig[isDark ? 'dark' : 'light'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className={`relative py-8 md:py-10 overflow-hidden ${isDark ? 'bg-[#07051d]' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`
          relative rounded-3xl p-5 md:p-8 lg:p-10 overflow-hidden border-2 transition-all duration-500
          ${colors.bg} ${colors.borderColor} ${colors.shadow}
          before:absolute before:inset-0 before:bg-gradient-to-br 
          before:from-white/5 before:to-transparent before:opacity-0 
          before:hover:opacity-100 before:transition-opacity before:duration-500
          before:pointer-events-none
        `}>
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Top left glow */}
            <motion.div 
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -top-1/3 -left-1/4 w-96 h-96 rounded-full ${colors.glowTop} blur-[120px]`}
            />
            
            {/* Bottom right glow */}
            <motion.div 
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className={`absolute -bottom-1/3 -right-1/4 w-96 h-96 rounded-full ${colors.glowBottom} blur-[120px]`}
            />
          </div>

          {/* Content container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center"
          >
            {/* Left content */}
            <div className="space-y-4 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${colors.badgeBg} ${colors.badgeBorder} group hover:scale-105`}
              >
                <Sparkles className={`w-4 h-4 ${colors.badgeIcon}`} />
                <span className={`text-xs font-bold uppercase tracking-widest ${colors.badgeText}`}>
                  Limited Openings Available
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={itemVariants}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight ${colors.textPrimary}`}
              >
                {title}{' '}
                <span className={`inline-block bg-gradient-to-r ${colors.highlightGradient} bg-clip-text text-transparent font-serif italic mt-2`}>
                  {highlightText}
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className={`text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 ${colors.textSecondary}`}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Right actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 justify-center lg:justify-end items-center"
            >
              {/* Primary button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                className={`
                  group relative px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 
                  text-white font-semibold rounded-full overflow-hidden transition-all duration-300
                  shadow-lg hover:shadow-2xl hover:shadow-amber-500/40
                  flex items-center justify-center gap-2 w-max
                `}
              >
                <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                  {primaryBtnText}
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </motion.button>

              {/* Secondary button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center justify-center gap-2 px-6 py-2.5 font-semibold rounded-full 
                  border-2 transition-all duration-300 text-sm md:text-base w-max
                  ${colors.secondaryBtnBg} ${colors.secondaryBtnBorder} ${colors.secondaryBtnText} ${colors.secondaryBtnHover}
                  backdrop-blur-sm
                `}
              >
                <MessageSquare className="w-4 h-4" />
                {secondaryBtnText}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalServiceCTA;