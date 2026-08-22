import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 }
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
};

const ContactHeader: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      aria-label="Contact hero section"
      className="relative w-full min-h-[70vh] flex items-center bg-gradient-to-br from-[#0a0820] via-[#141229] to-[#0a0820] text-white overflow-hidden"
    >
      {/* Dynamic Background that follows mouse */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 156, 36, 0.15), transparent 70%)`,
        }}
      />

      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: shouldReduceMotion ? 1 : [1, 1.2, 1],
            opacity: shouldReduceMotion ? 0.15 : [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-radial from-amber-500/20 to-transparent rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: shouldReduceMotion ? 1 : [1, 1.1, 1],
            opacity: shouldReduceMotion ? 0.1 : [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-gradient-radial from-blue-500/15 to-transparent rounded-full blur-[100px]" 
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20 pb-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14">
          
          {/* LEFT CONTENT */}
          <motion.div
            variants={textVariant}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-3/5 space-y-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 backdrop-blur-sm">
              <span className="inline-flex rounded-full h-2 w-2 bg-amber-500" />
              <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">Available 24/7</span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight">
              Get in Touch For{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  Quick Support
                </span>
                <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 400 20" fill="none">
                  <path d="M0 10 Q100 20 200 10 Q300 0 400 10" stroke="url(#gradient)" strokeWidth="3" fill="none" strokeLinecap="round">
                    <animate attributeName="stroke-dasharray" from="0 800" to="800 800" dur="2s" fill="freeze" />
                  </path>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Have a complex problem? Our team is ready to discuss your goals and
              architect a custom solution tailored to your vision.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"></div>
                <div>
                  <div className="text-sm font-bold text-white">24/7</div>
                  <div className="text-[10px] text-white/40">Support Available</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"></div>
                <div>
                  <div className="text-sm font-bold text-white">&lt; 2hrs</div>
                  <div className="text-[10px] text-white/40">Response Time</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"></div>
                <div>
                  <div className="text-sm font-bold text-white">100%</div>
                  <div className="text-[10px] text-white/40">Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-2/5 flex justify-center lg:justify-end"
          >
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
              className="relative group"
            >
              {/* Decorative Rings */}
              <div className="absolute -inset-4 border border-amber-500/20 rounded-[2.5rem] animate-spin-slow" />
              <div className="absolute -inset-8 border border-white/10 rounded-[2.5rem] animate-spin-slower" />

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl p-2 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_60px_rgba(245,156,36,0.2)]">
                <img
                  alt="Customer support illustration"
                  src="https://www.algotix.ai/_next/image?url=%2Fimages%2Fcontact%2Fcontact-image.png&w=1080&q=75"
                  className="w-[320px] max-w-[85vw] md:w-[450px] rounded-[1.8rem] object-cover"
                  loading="eager"
                  decoding="async"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs text-white/90">Live chat available 24/7</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Wavy Divider */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-20">
        <svg
          aria-hidden="true"
          className="relative block w-full h-[60px] md:h-[80px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59C20" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#F59C20" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59C20" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28
            c70.36-5.37,136.33-33.31,206.8-37.5
            c73.84-4.36,147.54,16.88,218.2,35.26
            c69.27,18,138.3,24.88,209.4,13.08
            c36.15-6,69.85-17.84,104.45-29.34
            C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#waveGradient)"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05
            C99.41,111.27,165,111,224.58,91.58
            c31.15-10.15,60.09-26.07,89.67-39.8
            c40.92-19,84.73-46,130.83-49.67
            c36.26-2.85,70.9,9.42,98.6,31.56
            c31.77,25.39,62.32,62,103.63,73
            c40.44,10.79,81.35-6.69,119.13-24.28
            s75.16-39,116.92-43.05
            c59.73-5.85,113.28,22.88,168.9,38.84
            c30.2,8.66,59,6.17,87.09-7.5
            c22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="#0a0820"
          />
        </svg>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 35s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactHeader;