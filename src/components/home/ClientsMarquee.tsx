import React from 'react';

/**
 * Technical Fixes included for sharp images:
 * 1. transform-gpu: Forces hardware acceleration to keep images crisp during motion.
 * 2. -50% Translation: Standard practice for seamless looping with doubled arrays.
 * 3. backface-visibility: Prevents the "shimmer" or "blur" effect in WebKit browsers.
 */

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

const LogoImage: React.FC<{ src: string }> = ({ src }) => (
  <img
    src={src}
    alt="Client Logo"
    loading="lazy"
    /* REMOVED: grayscale, opacity-60, hover effects */
    /* ADDED: contrast-[1.05] for a slight extra sharpness boost */
    className="h-12 md:h-18 w-auto flex-shrink-0 object-contain mx-8  transform-gpu contrast-[1.05]"
    style={{ 
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)' 
    }}
  />
);

const ClientsMarquee: React.FC = () => {
  return (
    <section className="py-6 bg-transparent overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 10s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee 10s linear infinite reverse;
        }

        /* Stop animation on hover for better UX */
        .marquee-container:hover .animate-marquee,
        .marquee-container:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative flex flex-col gap-16 marquee-container">
        
        {/* First Row: Left to Right */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap will-change-transform">
            {/* We double the array to ensure the end of the first set meets the start of the second seamlessly */}
            {[...LOGO_SET_1, ...LOGO_SET_1].map((src, idx) => (
              <LogoImage key={`row1-${idx}`} src={src} />
            ))}
          </div>
          
          {/* Side Fades for that premium "vanishing" look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>

        {/* Second Row: Right to Left */}
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee-reverse whitespace-nowrap will-change-transform">
            {[...LOGO_SET_2, ...LOGO_SET_2].map((src, idx) => (
              <LogoImage key={`row2-${idx}`} src={src} />
            ))}
          </div>
          
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default ClientsMarquee;