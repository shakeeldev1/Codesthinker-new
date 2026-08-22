import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
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
    <div className="relative w-full min-h-screen md:h-screen overflow-hidden bg-[#07051D]">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
        alt="Codes Thinker"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
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
          <SectionBadge text="Since 2005 · Trusted Software Partner" theme="dark" className="mb-4" />

          {/* Main Heading */}
          <h1
            data-aos="zoom-in"
            data-aos-delay="100"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg"
          >
            20+ Years Building Software <br className="hidden sm:inline" />
            Clients <span className="text-white/90">Can Rely On</span>
          </h1>

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-6 text-gray-200 text-lg sm:text-xl md:text-xl leading-relaxed max-w-4xl mx-auto drop-shadow-md"
          >
            Founded in 2005, Codes Thinker has delivered <strong className="text-white">500+ projects</strong> and earned the trust of{" "}
            <strong className="text-white">45,000+ satisfied clients</strong> worldwide from startups to enterprises needing scalable web, mobile, and AI solutions.
          </p>

          {/* Highlighted Global Footprint Banner */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm font-medium"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 rounded-full text-white shadow-lg backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-white" />
              <span>Est. <strong>2005</strong></span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 backdrop-blur-md">
              <span><strong className="text-white">500+</strong> Projects Delivered</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 backdrop-blur-md">
              <span><strong className="text-white">45K+</strong> Satisfied Clients</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 backdrop-blur-md">
              <span>Regional Office: <strong className="text-white">Manchester, UK</strong></span>
            </div>
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
              className="relative overflow-hidden group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3 bg-[#F49B21] text-[#08061E] font-bold rounded-2xl shadow-xl text-[15px]"
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
              <div className="absolute inset-0 bg-[#08061E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </motion.button>

            {/* Secondary CTA — Get in Touch */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="relative overflow-hidden group w-full sm:w-auto px-6 py-3 bg-transparent text-white font-bold rounded-2xl border-2 border-white/20 hover:border-[#F49B21] transition-colors duration-300 text-[15px]"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#08061E]">
                Get in Touch
              </span>
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