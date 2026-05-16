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

  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer overflow-hidden shadow-md hover:shadow-lg focus:outline-none";

  const variants = {
    primary: "bg-amber-400 text-[#0a1f44] hover:bg-amber-300",
    outline: "bg-transparent border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-[#0a1f44]",
  };

  const sizes = {
    sm: "px-3 py-2 text-lg",
    md: "px-3 py-2 text-xl",
    lg: "px-3 py-2 text-xl",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className} group`;

  const ButtonContent = (
    <>
      {/* Shine effect */}
      <span className="absolute inset-0 -translate-x-full bg-white/30 group-hover:translate-x-full transition-transform duration-700 ease-in-out rotate-12"></span>

      {/* Text & Arrow */}
      <span className="relative flex items-center gap-2 z-10">
        {text}
        {showArrow && <span className="transform transition-transform group-hover:translate-x-1">→</span>}
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
