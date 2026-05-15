"use client";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Updated Icons
import { 
  LuUsers, 
  LuTarget, 
  LuHandshake, 
  LuZap, 
  LuRefreshCw,
  LuUser
} from "react-icons/lu";

const AboutUs: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";

  const aboutFeatures = [
    { text: "Industry Expert Staff", aos: "fade-right", icon: <LuUsers/> },
    { text: "Client-Centric Focus", aos: "fade-left", icon: <LuTarget/> },
    { text: "Partner rather than Vendor", aos: "fade-up-right", icon: <LuHandshake/> },
    { text: "Solutions Geared to Improve Productivity", aos: "fade-up-left", icon: <LuZap/> },
    { text: "Collaborative Approach Throughout the Process", aos: "fade-up-right", icon: <LuRefreshCw/> },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      disable: window.innerWidth < 768,
    });
  }, []);

  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-br from-[#E9F6FF] to-[#D4EBFF] overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F49B21] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#07051D] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Image */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1" data-aos="fade-up-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group border-4 border-white">
              <img
                src="public/ct.png"
                alt="Code's Thinker Team"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#07051D]/10 group-hover:bg-transparent transition-colors"></div>
            </div>
          </div>

          {/* RIGHT: Content (Home Page) */}
          {isHomePage && (
            <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-6" data-aos="fade-up-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#07051D]">
                About{" "}
                <span className="relative inline-block text-[#F49B21]">
                  Code's
                  {/* Underline SVG */}
                  <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 400 20" fill="none">
                    <path 
                      d="M0 10 Q100 20 200 10 Q300 0 400 10" 
                      stroke="url(#underlineGradient)" 
                      strokeWidth="4" 
                      fill="none" 
                      strokeLinecap="round"
                      className="animate-draw"
                    />
                    <defs>
                      <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="50%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                 Thinker
              </h1>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                We redefine excellence in business solutions at Code's Thinker. Our approach 
                combines technical mastery with creative strategy to drive sustainable growth.
              </p>

              <div className="flex flex-col gap-4">
                {aboutFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white/60 backdrop-blur-md p-3 px-5 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-default group"
                    data-aos={feature.aos}
                    data-aos-delay={index * 100}
                  >
                    <div className="p-2 bg-[#07051D] text-[#F49B21] rounded-lg text-xl shadow-inner group-hover:bg-[#F49B21] group-hover:text-white transition-colors">
                      {feature.icon}
                    </div>
                    <span className="font-semibold text-[#07051D]">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RIGHT: Content (About Page) */}
          {isAboutPage && (
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col justify-center gap-6" data-aos="fade-up-left">
              <h1 className="font-bold text-4xl lg:text-5xl text-[#07051D]">
                Building <br />
                <span className="text-[#F49B21]">Future Ready Software</span>
              </h1>
              
              <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
                We are a team of passionate developers and thinkers. At Code's Thinker, 
                we craft intelligent solutions that empower businesses to thrive.
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-[#07051D] border-2 border-white flex items-center justify-center text-[#F49B21] shadow-lg">
                      <LuUser size={20}/>
                    </div>
                  ))}
                </div>
                <div className="h-10 w-[1px] bg-gray-300 mx-2"></div>
                <p className="text-[#07051D] font-medium">
                  Trusted by <span className="text-[#F49B21]">500+</span> happy clients
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes draw {
          from { stroke-dasharray: 0 400; }
          to { stroke-dasharray: 400 400; }
        }
        .animate-draw {
          animation: draw 1.5s ease-out forwards;
          stroke-dashoffset: 0;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;