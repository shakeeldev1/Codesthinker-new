import React from 'react';

interface GlobalServiceCard1Props {
  icon?: string;
  name?: string;
  theme?: 'light' | 'dark' | string;
  variant?: string;
}

const GlobalServiceCard1: React.FC<GlobalServiceCard1Props> = ({ icon, name, theme = 'light', variant = 'default' }) => {
  const isDark = theme === 'dark';

  // Define theme-aware color schemes
  const themes: Record<string, Record<string, string>> = {
    light: {
      bg: 'bg-white',
      border: 'border-gray-200',
      text: 'text-[#07051d]',
      subtext: 'text-gray-600',
      hoverBg: 'hover:bg-white',
      hoverBorder: 'hover:border-amber-400',
      accentBg: 'bg-amber-50',
      accent: 'text-amber-500',
      categoryBg: 'bg-amber-100',
      shadow: 'shadow-sm hover:shadow-xl',
      glowBg: 'bg-amber-500/10',
      glowHover: 'group-hover:bg-amber-500/20',
    },
    dark: {
      bg: 'bg-[#07051d]',
      border: 'border-white/10',
      text: 'text-white',
      subtext: 'text-gray-200',
      hoverBg: 'hover:bg-[#07051d]',
      hoverBorder: 'hover:border-amber-500/50',
      accentBg: 'bg-white/5',
      accent: 'text-amber-500',
      categoryBg: 'bg-white/5',
      shadow: 'shadow-lg hover:shadow-2xl hover:shadow-amber-500/10',
      glowBg: 'bg-amber-500/5',
      glowHover: 'group-hover:bg-amber-500/10',
    },
  };

  const t = themes[isDark ? 'dark' : 'light'];

  return (
    <div
      className={`
        group relative overflow-hidden p-6 rounded-xl border-2 
        transition-all duration-300 cursor-pointer
        ${t.bg} ${t.border} ${t.hoverBg} ${t.hoverBorder} ${t.shadow}
        before:absolute before:inset-0 before:bg-gradient-to-br 
        before:from-white/5 before:to-transparent before:opacity-0 
        before:group-hover:opacity-100 before:transition-opacity before:duration-300
        before:pointer-events-none
      `}
    >
      {/* Animated background glow effect */}
      <div className={`
        absolute -inset-12 opacity-0 group-hover:opacity-100 
        transition-opacity duration-500 pointer-events-none
        ${isDark ? 'bg-amber-500/5' : 'bg-amber-400/5'}
        blur-3xl
      `}></div>

      {/* Icon container with enhanced visual hierarchy */}
      <div className="mb-5 relative z-10">
        <div className="flex justify-center">
          {/* Glow effect behind icon */}
          <div className={`
            absolute inset-0 rounded-full blur-2xl 
            transition-all duration-300 group-hover:scale-125
            ${t.glowBg} ${t.glowHover}
          `}></div>

          {/* Icon */}
          {icon && (
            <div className="relative">
              <img
                src={icon}
                alt={name || 'Icon'}
                className={`
                  w-16 h-16 object-contain
                  transition-all duration-300
                  group-hover:scale-125 group-hover:drop-shadow-lg
                  filter ${isDark ? 'drop-shadow-lg' : 'drop-shadow'}
                `}
              />
            </div>
          )}
        </div>
      </div>

      {/* Text content with refined typography */}
      <div className="relative z-10 space-y-2 text-center">
        {name && (
          <h3 className={`
            text-xl md:text-2xl font-bold tracking-tight
            transition-colors duration-300
            ${t.text} group-hover:text-amber-500
            line-clamp-2
          `}>
            {name}
          </h3>
        )}
      </div>

      {/* Subtle corner accent */}
      <div className={`
        absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10
        rounded-full opacity-0 group-hover:opacity-20
        transition-opacity duration-300
        ${isDark ? 'bg-amber-500' : 'bg-amber-500'}
        blur-2xl
      `}></div>
    </div>
  );
};

export default GlobalServiceCard1;
