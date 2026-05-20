// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';

// Define the custom props for our component
interface BaseButtonProps {
  text: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showArrow?: boolean;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

// Combine custom props with standard HTML attributes for both buttons and links
type ButtonComponentProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> &
  Omit<Partial<React.ComponentPropsWithoutRef<typeof Link>>, keyof BaseButtonProps>;

const Button: React.FC<ButtonComponentProps> = ({ 
  text, 
  to, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  showArrow = false, 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer overflow-hidden focus:outline-none";

  const variants = {
    primary: "bg-[#08061E] text-white hover:text-white border border-[#F59C20]/20 hover:border-[#F59C20]/40",
    outline: "bg-transparent border-2 border-[#F59C20] text-[#F59C20] hover:bg-[#F59C20]/10",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm gap-1.5",
    md: "px-4 py-1.5 text-base gap-2",
    lg: "px-4 py-1.5 text-lg gap-2.5",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className} group relative`;

  const ButtonContent = (
    <>
      {/* Shine effect - left to right on hover */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#F59C20]/30 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
      
      {/* Animated border shine */}
      <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-[#F59C20] to-transparent animate-pulse"></span>
      </span>

      {/* Text & Arrow */}
      <span className="relative flex items-center z-10 font-medium tracking-wide">
        {text}
        {showArrow && (
          <span className="transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F59C20]">
            →
          </span>
        )}
      </span>
    </>
  );

  // If 'to' exists, render as a React Router Link
  if (to) {
    return (
      <Link 
        to={to} 
        className={combinedStyles} 
        {...(Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'to')) as React.ComponentPropsWithoutRef<typeof Link>)}
      >
        {ButtonContent}
      </Link>
    );
  }

  // Otherwise, render as a standard HTML button
  return (
    <button 
      onClick={onClick} 
      className={combinedStyles} 
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {ButtonContent}
    </button>
  );
};

export default Button;