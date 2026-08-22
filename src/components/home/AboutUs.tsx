"use client";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Icons
import {
  LuUsers,
  LuTarget,
  LuCpu,
  LuAward,
  LuHeadphones,
  LuCreditCard,
  LuUser,
  LuChevronRight,
} from "react-icons/lu";
import { LucideCheckCircle } from "lucide-react";
import { SectionBadge } from "../ui/SectionBadge";

// --- Types ---
interface Feature {
  text: string;
  aos: string;
  icon: React.ReactNode;
  description: string;
  category: string;
  delay: number;
}

interface Stat {
  value: string;
  label: string;
  aos: string;
  delay?: number;
}

// --- Static Data ---
const aboutFeatures: Feature[] = [
  {
    text: "Industry Expert Staff",
    aos: "fade-right",
    icon: <LuUsers />,
    description: "10+ years of collective experience",
    category: "expertise",
    delay: 0,
  },
  {
    text: "Cutting-Edge Tech",
    aos: "fade-right",
    icon: <LuCpu />,
    description: "React, Node.js, Python, Cloud",
    category: "expertise",
    delay: 50,
  },
  {
    text: "Certified Pros",
    aos: "fade-right",
    icon: <LuAward />,
    description: "Industry-recognized certifications",
    category: "expertise",
    delay: 100,
  },
  {
    text: "Client Centric",
    aos: "fade-left",
    icon: <LuTarget />,
    description: "Your success is our priority",
    category: "client",
    delay: 0,
  },
  {
    text: "24/7 Support",
    aos: "fade-left",
    icon: <LuHeadphones />,
    description: "Round-the-clock assistance",
    category: "client",
    delay: 50,
  },
  {
    text: "Transparent Pricing",
    aos: "fade-left",
    icon: <LuCreditCard />,
    description: "No hidden costs, clear terms",
    category: "client",
    delay: 100,
  },
];

const stats: Stat[] = [
  { value: "500+", label: "Happy Clients", aos: "fade-up" },
  { value: "150+", label: "Projects Delivered", aos: "fade-up", delay: 100 },
  { value: "98%", label: "Client Retention", aos: "fade-up", delay: 200 },
  { value: "24/7", label: "Support Available", aos: "fade-up", delay: 300 },
];

const AboutUs: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  // Fallback to true if it's not the home page, or strictly check for "/about"
  const isAboutPage = location.pathname.includes("/about");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
      disable: window.innerWidth < 768,
    });
  }, []);

  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Image Section */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1" data-aos="zoom-out-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 group">
              <img
                src="/ct.webp"
                alt="Code's Thinker Team"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* RIGHT: Content (Home Page Variant) */}
          {isHomePage && (
            <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8" data-aos="fade-left">
              <div className="space-y-4">
                <SectionBadge text="Who We Are" theme="light" />

                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                  About{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
                    <span className="text-[#F69A20] ">Code's</span> Thinker
                  </span>
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                  We redefine excellence in business solutions. Our approach combines technical mastery
                  with creative strategy to drive sustainable growth for modern enterprises.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start cursor-pointer gap-4 px-4 py-2 bg-white rounded-xl shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:ring-gray-200 transition-all duration-300 hover:-translate-y-1 group"
                    data-aos={feature.aos}
                    data-aos-delay={feature.delay}
                  >
                    <div className="p-2.5 bg-gray-50 text-gray-700 rounded-lg group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{feature.text}</h3>
                      <p className="text-xs text-gray-500 leading-snug">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-2 text-center">
                <Link to="/about" 
                  type="button"
                  className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-5 py-2 rounded-full transition-all hover:shadow-lg focus:ring-4 focus:ring-gray-200"
                >
                  Learn More About Us
                  <LuChevronRight className="text-lg group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* RIGHT: Content (About Page Variant) */}
          {isAboutPage && (
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col justify-center gap-8" data-aos="fade-left">
              <div className="space-y-4">
                <SectionBadge text="Our Story" theme="light" />

                <h1 className="font-extrabold text-4xl lg:text-5xl text-gray-900 leading-tight tracking-tight">
                  Building{" "}
                  <span className="relative whitespace-nowrap">
                    Future Ready
                    <svg className="absolute -bottom-2 left-0 w-full text-blue-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                  </span>
                  <br />
                  Software
                </h1>

                <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                  We are a team of passionate developers and thinkers. At Code's Thinker,
                  we craft intelligent solutions that empower businesses to thrive in the digital age.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 hover:bg-gray-50 transition-colors"
                    data-aos={stat.aos}
                    data-aos-delay={stat.delay || 0}
                  >
                    <div className="text-2xl lg:text-3xl font-extrabold text-gray-900">{stat.value}</div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1 text-center">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Team Trust Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-white flex items-center justify-center text-white shadow-md z-10 hover:z-20 transition-transform hover:scale-110"
                      >
                        <LuUser size={18} />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">Expert Development Team</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <LucideCheckCircle size={14} className="text-emerald-500" />
                      <span className="text-sm font-medium text-gray-600">React, Node.js, Python & more</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-12 bg-gray-200"></div>

                <button 
                  type="button"
                  className="inline-flex justify-center items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all shadow-sm"
                >
                  Contact Our Team
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;