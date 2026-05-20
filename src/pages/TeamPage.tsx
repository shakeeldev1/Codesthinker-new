import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import Team from '../components/about/Team';
import Hero from '../components/team/Hero';


// --- Scroll Progress Indicator Component ---
const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 z-50 origin-left"
      style={{ scaleX: scrollProgress / 100 }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.1 }}
    />
  );
};

// --- Back to Top Button Component ---
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center group"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Page Transition Component ---
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// --- Main TeamPage Component ---
function TeamPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative bg-gradient-to-b from-[#02010a] via-[#030211] to-[#02010a] overflow-x-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.05),transparent_50%)]" />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            x: shouldReduceMotion ? 0 : [0, 50, 0],
            y: shouldReduceMotion ? 0 : [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: shouldReduceMotion ? 0 : [0, -40, 0],
            y: shouldReduceMotion ? 0 : [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Main Content with Page Transition */}
      <PageTransition>
        {/* Hero Section */}
        <div className="relative z-10">
          <Hero/>
        </div>

        {/* Divider with Animation */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-10 max-w-7xl mx-auto px-6"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        {/* Team Section */}
        <div className="relative z-10">
          <Team />
        </div>
      </PageTransition>

      {/* Back to Top Button */}
      <BackToTop />

      {/* Floating Contact CTA (Optional) */}
      <motion.a
        href="/contact"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-8 left-8 z-50 hidden lg:flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 hover:bg-amber-500/20 hover:border-amber-500/30 hover:text-amber-400 transition-all duration-300 group"
      >
        <span className="text-sm font-medium">Join Our Team</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </motion.a>

      {/* Custom Cursor (Desktop only) */}
      {!shouldReduceMotion && typeof window !== 'undefined' && window.innerWidth > 768 && (
        <motion.div
          className="fixed w-6 h-6 pointer-events-none z-[100] hidden lg:block"
          animate={{
            x: -12,
            y: -12,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5,
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
          }}
        >
          <div className="w-full h-full rounded-full bg-amber-500/20 border border-amber-500/50" />
        </motion.div>
      )}

      {/* Add custom styles for smooth scrolling */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #F59C24, #F97316);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #F97316, #F59C24);
        }
        
        /* Selection color */
        ::selection {
          background: rgba(245, 156, 36, 0.3);
          color: white;
        }
        
        /* Focus styles */
        :focus-visible {
          outline: 2px solid #F59C24;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

export default TeamPage;