import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { SectionBadge } from "../ui/SectionBadge";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
function AboutHead() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden bg-[#07051D]">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
        alt="Codes Thinker"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Increased Dark Overlay Opacity (from /60 to /80) */}
      <div className="absolute inset-0 bg-[#07051D]/80"></div>

      {/* Gradient Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#F49B21]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F49B21]/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-28 pb-28 md:pb-16 px-4 sm:px-6">
        <div className="max-w-7xl text-center text-white">

          {/* Badge Tag */}
          <SectionBadge text="Trusted Software Partner" theme="dark" className="mb-4" />

          {/* Main Heading with text drop shadow */}
          <h1
            data-aos="zoom-in"
            data-aos-delay="100"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg"
          >
            Delivering World Class Software for{" "}
            <span className="text-[#F49B21]">Global Clients</span>
          </h1>

          {/* Description with enhanced visibility */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-6 text-gray-200 text-lg sm:text-xl md:text-xl leading-relaxed max-w-4xl mx-auto drop-shadow-md"
          >
            Codes Thinker is a high end digital company that delivers scalable, professional software solutions. We specialize in modern architecture, AI development, and seamless UI/UX transforming complex business challenges into high performance digital products.
          </p>

          {/* Global Client Banner */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-gray-300 text-sm"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F49B21]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 014 0V6a6 6 0 10-12 0v.27c0 .6.13 1.18.33 1.71M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
              Worldwide Clients
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F49B21]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Manchester, UK
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F49B21]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Bahawalpur, Pakistan
            </span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F49B21]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              1000+ Projects Delivered
            </span>
          </div>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
          >
            {/* Primary CTA — View Projects */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(244,155,33,0.25)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/projects")}
              className="relative overflow-hidden group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-[#F49B21] text-[#08061E] font-bold rounded-2xl shadow-xl text-[15px]"
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                View Our Projects
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <HiArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
              {/* Slide up dark navy layer */}
              <div className="absolute inset-0 bg-[#08061E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              {/* Shine sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-10"
                animate={{ x: ['-150%', '250%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              />
            </motion.button>

            {/* Secondary CTA — Get in Touch */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="relative overflow-hidden group w-full sm:w-auto px-8 py-4 bg-transparent text-white font-bold rounded-2xl border-2 border-white/20 hover:border-[#F49B21] transition-colors duration-300 text-[15px]"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#08061E]">
                Get in Touch
              </span>
              {/* Slide up amber layer */}
              <div className="absolute inset-0 bg-[#F49B21] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </motion.button>
          </div>

        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[60px] sm:h-[90px] md:h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#07051D"
            fillOpacity="1"
            d="M0,224L60,208C120,192,240,160,360,160C480,160,600,192,720,202.7C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default AboutHead;