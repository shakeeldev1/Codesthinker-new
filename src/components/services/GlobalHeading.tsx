import React from 'react';

interface GlobalHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  badge?: string | { text: string; variant?: 'default' | 'secondary' };
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alignment?: 'left' | 'center';
  gradientColors?: {
    from: string;
    to: string;
  };
  textColor?: 'dark' | 'light';
  className?: string;
}

const GlobalHeading: React.FC<GlobalHeadingProps> = ({
  as: Component = 'h2',
  badge,
  title,
  titleHighlight,
  subtitle,
  size = 'lg',
  alignment = 'left',
  gradientColors = { from: 'from-amber-400', to: 'to-orange-600' },
  textColor = 'dark',
  className = ''
}) => {
  
  // Extract text safely from the badge prop to avoid the "Objects are not valid" error
  const badgeText = typeof badge === 'object' ? badge?.text : badge;

  // Fluid high-end typography scaling
  const sizeClasses = {
    sm: 'text-2xl md:text-3xl font-bold leading-tight',
    md: 'text-3xl md:text-4xl font-bold leading-tight',
    lg: 'text-3xl md:text-5xl font-bold leading-tight',
    xl: 'text-4xl md:text-6xl font-bold leading-tight'
  };

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto'
  };

  const themeClasses = {
    dark: {
      title: 'text-[#07051d]',
      subtitle: 'text-gray-600 font-normal'
    },
    light: {
      title: 'text-white',
      subtitle: 'text-gray-200 font-normal'
    }
  };

  return (
    <div className={`flex flex-col gap-4 md:gap-6 ${alignmentClasses[alignment]} ${className}`}>
      
      {/* Sleek Minimalist Badge */}
      {badgeText && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/5 border border-amber-500/10 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5 ring-1 ring-amber-500/20 rounded-full">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-black text-amber-600 dark:text-amber-400">
            {badgeText}
          </span>
        </div>
      )}

      {/* Main Heading */}
      <div className="relative inline-block">
        <Component 
          className={`${themeClasses[textColor].title} ${sizeClasses[size]} max-w-4xl`}
        >
          {titleHighlight && title.includes(titleHighlight) ? (
            <>
              {title.split(titleHighlight)[0]}
              <span className="text-amber-500">
                {titleHighlight}
              </span>
              {title.split(titleHighlight)[1]}
            </>
          ) : (
            title
          )}
        </Component>
      </div>

      {/* Refined Subtitle */}
      {subtitle && (
        <p className={`
          max-w-[65ch] 
          text-sm md:text-xl 
          leading-relaxed 
          ${themeClasses[textColor].subtitle} 
          ${alignment === 'center' ? 'mx-auto' : ''}
        `}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default GlobalHeading;