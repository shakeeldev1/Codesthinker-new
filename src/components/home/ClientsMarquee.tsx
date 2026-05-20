import React from "react";

// --- Static Data ---
const LOGO_SET_1 = [
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab00f71b4404c713d8c89_logos-01.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab02c9fab945df8ecd652_logos-02.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab044d9281ad7b01eb05c_logos-07.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab044e11c2d9938bf9843_logos-10.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab044ede52c6b4d634fb7_logos-03.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab044c1ce06c8f1952a3b_logos-08.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab43ebfe2a47e97806944_logos-11.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab45a3e29cc442b6bf675_logos-12.webp",
];

const LOGO_SET_2 = [
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab4dbe11c2d9938c27d18_logos-15.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab4db8f558dae7c1917f1_logos-16.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab4db78a325afc063f717_logos-14.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab4db1cc957344f5bbab1_logos-17.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab4db772f8afe8c783c4a_logos-21.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab4db1db91836e20c6bba_logos-18.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab4dc5827a724a5d56c50_logos-23.webp",
  "https://cdn.prod.website-files.com/6719ad0ceed6d5aa24a83d61/685ab4dbbfe90b70d91933ac_logos-25.webp",
];

// --- Sub-Component ---
const LogoImage: React.FC<{ src: string }> = ({ src }) => (
  <img
    src={src}
    alt="Trusted Client Logo"
    loading="lazy"
    className="h-10 md:h-14 w-auto flex-shrink-0 object-contain mx-10 transform-gpu contrast-[1.02] brightness-95 filter transition-all duration-300 hover:scale-105"
    style={{ 
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)' 
    }}
  />
);

// --- Main Component ---
const ClientsMarquee: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-gray-200 to-gray-200 py-12 overflow-hidden font-sans">
      
      {/* Background Decor Layer matching core design layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-15"></div>
      </div>

      {/* Styled Brand Header Block */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-full px-4 py-1.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#F69A20]"></div>
          <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">
            Our Ecosystem
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Trusted by Innovative Market Leaders
        </h2>
      </div>

      {/* Global CSS injection for hardware smooth infinite animation loops */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-loop {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-loop-reverse {
          animation: marquee 25s linear infinite reverse;
        }
        .marquee-group-container:hover .animate-marquee-loop,
        .marquee-group-container:hover .animate-marquee-loop-reverse {
          animation-play-state: paused;
        }
      `}</style>

      {/* Marquee Body Layout Wrapper */}
      <div className="relative flex flex-col gap-10 marquee-group-container z-10">
        
        {/* Row 1: Left to Right movement */}
        <div className="relative flex w-full overflow-hidden items-center">
          <div className="flex animate-marquee-loop whitespace-nowrap will-change-transform py-2">
            {[...LOGO_SET_1, ...LOGO_SET_1].map((src, idx) => (
              <LogoImage key={`row1-${idx}`} src={src} />
            ))}
          </div>
          
          {/* Edge Fades perfectly mixed into background gradient layers */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-gray-100 via-gray-100/70 to-transparent z-20 pointer-events-none" />
        </div>

        {/* Row 2: Right to Left movement */}
        <div className="relative flex w-full overflow-hidden items-center">
          <div className="flex animate-marquee-loop-reverse whitespace-nowrap will-change-transform py-2">
            {[...LOGO_SET_2, ...LOGO_SET_2].map((src, idx) => (
              <LogoImage key={`row2-${idx}`} src={src} />
            ))}
          </div>
          
          {/* Edge Fades perfectly mixed into background gradient layers */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-gray-100 via-gray-100/70 to-transparent z-20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default ClientsMarquee;