// Shared abstract SVG icon — navy-dominant gradient with warm amber tip
// Used in both the home Services grid and all services/* sub-pages

import React from "react";

const AbstractIcon = ({ id, className }: { id: number; className?: string }) => {
  const GradientDef = () => (
    <defs>
      <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#1B1855" />
        <stop offset="55%"  stopColor="#2D2875" />
        <stop offset="100%" stopColor="#C97B1A" stopOpacity="0.7" />
      </linearGradient>
      <filter id={`shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#2D2875" floodOpacity="0.25" />
      </filter>
    </defs>
  );

  const getShape = () => {
    switch (id) {
      case 1:
        return <circle cx="50" cy="50" r="35" stroke={`url(#grad-${id})`} strokeWidth="22" fill="none" filter={`url(#shadow-${id})`} />;
      case 2:
        return (
          <g filter={`url(#shadow-${id})`}>
            <rect x="25" y="10" width="22" height="80" rx="11" fill={`url(#grad-${id})`} opacity="0.9" />
            <rect x="53" y="25" width="22" height="50" rx="11" fill={`url(#grad-${id})`} opacity="0.6" />
          </g>
        );
      case 3:
        return (
          <g filter={`url(#shadow-${id})`}>
            <circle cx="30" cy="30" r="18" fill={`url(#grad-${id})`} opacity="0.9" />
            <circle cx="70" cy="30" r="18" fill={`url(#grad-${id})`} opacity="0.7" />
            <circle cx="30" cy="70" r="18" fill={`url(#grad-${id})`} opacity="0.7" />
            <circle cx="70" cy="70" r="18" fill={`url(#grad-${id})`} opacity="0.5" />
          </g>
        );
      case 4:
        return <path d="M50 0 C50 40, 90 50, 100 50 C60 50, 50 90, 50 100 C50 60, 10 50, 0 50 C40 50, 50 10, 50 0" fill={`url(#grad-${id})`} filter={`url(#shadow-${id})`} />;
      case 5:
        return (
          <g filter={`url(#shadow-${id})`}>
            <rect x="15" y="55" width="16" height="35" rx="8" fill={`url(#grad-${id})`} opacity="0.5" />
            <rect x="42" y="30" width="16" height="60" rx="8" fill={`url(#grad-${id})`} opacity="0.7" />
            <rect x="69" y="10" width="16" height="80" rx="8" fill={`url(#grad-${id})`} opacity="0.9" />
          </g>
        );
      case 6:
        return (
          <g filter={`url(#shadow-${id})`}>
            <path d="M20 20 Q50 20 50 50 T80 80 L80 20 Q50 20 50 50 T20 80 Z" fill={`url(#grad-${id})`} opacity="0.9" />
            <circle cx="35" cy="65" r="15" fill={`url(#grad-${id})`} opacity="0.6" />
          </g>
        );
      case 7:
        return (
          <g filter={`url(#shadow-${id})`}>
            <circle cx="40" cy="50" r="30" fill={`url(#grad-${id})`} opacity="0.9" />
            <circle cx="70" cy="40" r="20" fill={`url(#grad-${id})`} opacity="0.6" />
            <circle cx="65" cy="65" r="25" fill={`url(#grad-${id})`} opacity="0.7" />
          </g>
        );
      default:
        return <circle cx="50" cy="50" r="30" fill={`url(#grad-${id})`} />;
    }
  };

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <GradientDef />
      {getShape()}
    </svg>
  );
};

export default AbstractIcon;
