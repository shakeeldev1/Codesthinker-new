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
      hoverText: 'group-hover:text-amber-500',
    },
    dark: {
      bg: 'bg-[#07051d]',
      border: 'border-white/10',
      text: 'text-white',
      subtext: 'text-gray-200',
      iconBg: 'bg-white/5',
      iconColor: 'text-amber-500',
      hoverIconBg: 'group-hover:bg-amber-500',
      hoverIconColor: 'group-hover:text-[#07051d]',
      shadow: 'shadow-lg group-hover:shadow-2xl group-hover:shadow-amber-500/10',
      hoverBorder: 'group-hover:border-amber-500/50',
      hoverText: 'group-hover:text-amber-500',
    },
  };

  const t = themes[isDark ? 'dark' : 'light'];
  const iconSize = compact ? 20 : 28;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
      className={`
        group relative overflow-hidden rounded-2xl border-2
        transition-all duration-500 cursor-pointer
        ${compact ? 'p-5 md:p-6' : 'p-8'}
        ${t.bg} ${t.border} ${t.shadow} ${t.hoverBorder}
        before:absolute before:inset-0 before:bg-gradient-to-br 
        before:from-white/5 before:to-transparent before:opacity-0 
        before:group-hover:opacity-100 before:transition-opacity before:duration-500
        before:pointer-events-none
        ${className}
      `}
    >
      {/* Animated glow effect on hover */}
      <div className={`
        absolute -inset-20 opacity-0 group-hover:opacity-100 
        transition-opacity duration-500 pointer-events-none
        ${isDark ? 'bg-amber-500/5' : 'bg-amber-400/5'}
        blur-3xl
      `}></div>

      {/* Icon container */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className={`
          relative z-10
          ${compact ? 'w-10 h-10 mb-4' : 'w-14 h-14 mb-6'}
          rounded-2xl flex items-center justify-center
          ${t.iconBg} ${t.hoverIconBg}
          transition-all duration-500
          shadow-md group-hover:shadow-lg group-hover:drop-shadow-xl
        `}
      >
        <div className={`
          ${t.iconColor} ${t.hoverIconColor}
          transition-colors duration-500 pointer-events-none
        `}>
          {icon && (
            <div>
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
          ${compact ? 'text-lg mb-2' : 'text-xl mb-4'}
          font-bold tracking-tight pointer-events-none
          transition-colors duration-500
          ${t.text} ${t.hoverText}
        `}>
          {title}
        </h3>
      )}

      {/* Description (clamped to keep cards uniform) */}
      {description && (
        <p
          className={`leading-relaxed pointer-events-none transition-colors duration-500 ${compact ? 'text-sm' : 'text-base'} ${t.subtext}`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: compact ? 48 : 72,
          }}
        >
          {description}
        </p>
      )}

      {/* Decorative corner accent */}
      <div className={`
        absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12
        rounded-full opacity-0 group-hover:opacity-20
        transition-opacity duration-500
        ${isDark ? 'bg-amber-500' : 'bg-amber-500'}
        blur-2xl pointer-events-none
      `}></div>
    </motion.div>
  );
};

export default GlobalServiceCard;
