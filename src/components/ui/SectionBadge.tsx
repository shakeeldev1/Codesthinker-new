import React from "react";
import { Sparkles } from "lucide-react";

interface SectionBadgeProps {
  text: string;
  theme?: "light" | "dark";
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ text, theme = "light", className = "" }) => {
  const isDark = theme === "dark";

  return (
    <div className={`inline-flex items-center justify-center gap-3 sm:gap-4 group ${className}`}>
      {/* Left fading line */}
      <div 
        className="w-8 sm:w-12 h-[1.5px] rounded-full bg-gradient-to-r from-transparent to-[#F69A20] opacity-60 group-hover:w-16 transition-all duration-500 ease-out"
      />
      
      {/* Center Content */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F69A20] animate-pulse" />
        <span 
          className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.25em] transition-colors duration-300 ${
            isDark ? "text-gray-200 group-hover:text-white" : "text-gray-700 group-hover:text-[#07051d]"
          }`}
        >
          {text}
        </span>
      </div>

      {/* Right fading line */}
      <div 
        className="w-8 sm:w-12 h-[1.5px] rounded-full bg-gradient-to-l from-transparent to-[#F69A20] opacity-60 group-hover:w-16 transition-all duration-500 ease-out"
      />
    </div>
  );
};

