// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

const GlobalServiceCard = ({ 
  icon, 
  title, 
  description, 
  index = 0,
  compact = false,
  theme = 'light',
  className = ""
}) => {
  const isDark = theme === 'dark';

  // Define theme-aware color schemes
  const themes = {
    light: {
      bg: 'bg-white',
      border: 'border-gray-200',
      text: 'text-[#07051d]',
      subtext: 'text-gray-600',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      hoverIconBg: 'group-hover:bg-amber-500',
      hoverIconColor: 'group-hover:text-white',
      shadow: 'shadow-sm group-hover:shadow-xl group-hover:shadow-amber-500/20',
      hoverBorder: 'group-hover:border-amber-400',
      hoverText: 'group-hover:text-[#F49B21]',
    },
    dark: {
      bg: 'bg-gradient-to-br from-[#0c0933] to-[#07051d]',
      border: 'border-white/5',
      text: 'text-white',
      subtext: 'text-slate-300',
      iconBg: 'bg-white/[0.03] border border-white/10',
      iconColor: 'text-[#F49B21]',
      hoverIconBg: 'group-hover:bg-gradient-to-tr group-hover:from-amber-400 group-hover:to-[#F49B21]',
      hoverIconColor: 'group-hover:text-[#07051d]',
      shadow: 'shadow-[0_4px_30px_rgba(0,0,0,0.25)] group-hover:shadow-[0_24px_60px_-15px_rgba(244,155,33,0.18)]',
      hoverBorder: 'group-hover:border-[#F49B21]/50',
      hoverText: 'group-hover:text-[#F49B21]',
    },
  };

  const t = themes[isDark ? 'dark' : 'light'];
  const iconSize = compact ? 20 : 28;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } }}
      className={`
        group relative overflow-hidden rounded-[2rem] border
        transition-all duration-500 cursor-pointer
        ${compact ? 'p-6 md:p-7' : 'p-8 md:p-10'}
        ${t.bg} ${t.border} ${t.shadow} ${t.hoverBorder}
        before:absolute before:inset-0 before:bg-gradient-to-br 
        before:from-white/5 before:to-transparent before:opacity-0 
        before:group-hover:opacity-100 before:transition-opacity before:duration-500
        before:pointer-events-none
        ${className}
      `}
    >
      {/* Top Accent Glowing Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F49B21] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Animated radial halo glow in the background */}
      <div className={`
        absolute -inset-10 opacity-0 group-hover:opacity-100 
        transition-all duration-700 pointer-events-none
        ${isDark ? 'bg-[radial-gradient(circle_at_center,rgba(244,155,33,0.15)_0%,transparent_60%)]' : 'bg-amber-400/[0.06]'}
        blur-2xl
      `}></div>

      {/* Icon container */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className={`
          relative z-10
          ${compact ? 'w-11 h-11 mb-5' : 'w-16 h-16 mb-8'}
          rounded-2xl flex items-center justify-center
          ${t.iconBg} ${t.hoverIconBg}
          transition-all duration-500
          shadow-md group-hover:shadow-lg
        `}
      >
        <div className={`
          ${t.iconColor} ${t.hoverIconColor}
          transition-colors duration-500 pointer-events-none
        `}>
          {icon && (
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              {React.isValidElement(icon) ? (
                React.cloneElement(icon, { 
                  size: iconSize,
                  className: "pointer-events-none"
                })
              ) : (
                icon
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Title */}
      {title && (
        <h3 className={`
          ${compact ? 'text-lg mb-2.5' : 'text-2xl mb-4'}
          font-bold tracking-tight pointer-events-none
          transition-colors duration-300
          ${t.text} ${t.hoverText}
        `}
        style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p
          className={`leading-relaxed pointer-events-none transition-colors duration-300 ${compact ? 'text-xs' : 'text-sm'} ${t.subtext}`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: compact ? 48 : 60,
          }}
        >
          {description}
        </p>
      )}

      {/* Link indicator */}
      {!compact && (
        <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F49B21] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <span>Explore Service</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}

      {/* Decorative corner blur accent */}
      <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[#F49B21] blur-2xl pointer-events-none" />
    </motion.div>
  );
};

export default GlobalServiceCard;
