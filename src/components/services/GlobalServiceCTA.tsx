import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GlobalServiceCTAProps {
  theme?: 'light' | 'dark';
  title?: string;
  highlightText?: string;
  subtitle?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  primaryLink?: string;
  secondaryLink?: string;
}

const GlobalServiceCTA: React.FC<GlobalServiceCTAProps> = ({
  theme = 'light',
  title = "Ready to transform your",
  highlightText = "Digital Presence?",
  subtitle = "Join hundreds of successful businesses that have scaled with our innovative solutions and expert team.",
  primaryBtnText = "Start Your Project",
  secondaryBtnText = "Book a Consultation",
  primaryLink = "/contact",
  secondaryLink = "/contact"
}) => {
  const isDark = theme === 'dark';

  // Theme configuration
  const themeConfig = {
    light: {
      bg: 'bg-white',
      borderColor: 'border-gray-200',
      glowTop: 'bg-amber-200',
      glowBottom: 'bg-amber-100',
      textPrimary: 'text-[#07051d]',
      textSecondary: 'text-gray-600',
      highlightText: 'text-amber-500',
      badgeBg: 'bg-amber-50',
      badgeBorder: 'border-amber-200',
      badgeText: 'text-amber-700',
      badgeIcon: 'text-amber-600',
      secondaryBtnBg: 'bg-transparent',
      secondaryBtnBorder: 'border-[#07051d]',
      secondaryBtnText: 'text-[#07051d]',
      secondaryBtnHover: 'hover:bg-[#07051d] hover:text-white',
      shadow: 'shadow-xl',
    },
    dark: {
      bg: 'bg-[#07051d]',
      borderColor: 'border-white/10',
      glowTop: 'bg-amber-500/10',
      glowBottom: 'bg-amber-500/5',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-200',
      highlightText: 'text-amber-500',
      badgeBg: 'bg-white/5',
      badgeBorder: 'border-white/10',
      badgeText: 'text-gray-200',
      badgeIcon: 'text-amber-500',
      secondaryBtnBg: 'bg-transparent',
      secondaryBtnBorder: 'border-white',
      secondaryBtnText: 'text-white',
      secondaryBtnHover: 'hover:bg-white hover:text-[#07051d]',
      shadow: 'shadow-2xl shadow-amber-500/10',
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
    <section className="relative py-6 md:py-8 overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`
          relative rounded-3xl p-4 md:p-7 lg:p-9 overflow-hidden border-2 transition-all duration-500
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
            className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {/* Left content */}
            <div className="space-y-4 text-center lg:text-left flex flex-col justify-center">
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${colors.badgeBg} ${colors.badgeBorder} group hover:scale-105 w-fit mx-auto lg:mx-0`}
              >
                <Sparkles className={`w-4 h-4 ${colors.badgeIcon}`} />
                <span className={`text-xs font-bold uppercase tracking-widest ${colors.badgeText}`}>
                  Limited Openings Available
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={itemVariants}
                className={`text-3xl md:text-5xl font-bold leading-tight ${colors.textPrimary} mb-6`}
              >
                {title}{' '}
                <span className={`${colors.highlightText}`}>
                  {highlightText}
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className={`text-sm md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${colors.textSecondary} mb-8`}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Right actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col gap-4 justify-center lg:justify-center items-center lg:items-center h-full w-full"
            >
              {/* Primary button */}
              <Link
                to={primaryLink}
                className="relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 cursor-pointer overflow-hidden shadow-lg focus:outline-none px-6 py-2 md:px-8 text-sm md:text-base bg-amber-500 text-[#07051d] hover:bg-amber-400 group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {primaryBtnText}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/30 group-hover:translate-x-full transition-transform duration-700 ease-in-out rotate-12"></span>
              </Link>

              {/* Secondary button */}
              <Link
                to={secondaryLink}
                className={`px-6 py-2 md:px-8 text-sm md:text-base font-bold rounded-xl border-2 transition-all duration-300 shadow-lg cursor-pointer ${colors.secondaryBtnBg} ${colors.secondaryBtnBorder} ${colors.secondaryBtnText} ${colors.secondaryBtnHover}`}
              >
                {secondaryBtnText}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalServiceCTA;