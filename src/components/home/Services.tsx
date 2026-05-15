"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  Smartphone,
  Cloud,
  Database,
  Brain,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Button from "../common/Button";

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [sliderStyle, setSliderStyle] = useState({ width: "66px", transform: "translateX(4px)" });
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Configuration Constants
  const PRIMARY_COLOR = "#07051D";
  const SECONDARY_COLOR = "#F59C24";

  const tabs = ["All", "Web", "Mobile", "DevOps", "Data", "AI", "Cloud", "Blockchain"];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const servicesData = [
    {
      id: 1,
      title: "Web Development",
      category: "Web",
      shortDesc: "Modern, scalable web applications built with cutting-edge technologies.",
      tags: ["Requirement Gathering & Planning", "Design & Development", "Testing & Optimization"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
      ],
      icon: Code2,
    },
    {
      id: 2,
      title: "Mobile App Development",
      category: "Mobile",
      shortDesc: "Native and cross-platform mobile experiences that users love.",
      tags: ["Conceptualization & Design", "Development", "Testing & Optimization"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
      ],
      icon: Smartphone,
    },
    {
      id: 3,
      title: "DevOps Services",
      category: "DevOps",
      shortDesc: "Automated, efficient, and scalable infrastructure solutions.",
      tags: ["CI/CD Pipelines Setup", "Infrastructure as Code (IaC)", "Monitoring & Alerting"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
      ],
      icon: Cloud,
    },
    {
      id: 4,
      title: "Browser Extensions",
      category: "Web",
      shortDesc: "Powerful browser extensions to enhance user productivity.",
      tags: ["Requirement Analysis", "Development", "Testing & Publishing"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
      ],
      icon: Layers,
    },
    {
      id: 5,
      title: "Data Science",
      category: "Data",
      shortDesc: "Data-driven insights to power your business decisions.",
      tags: ["Data Collection", "Data Preprocessing", "Model Training & Deployment"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
      ],
      icon: Database,
    },
    {
      id: 6,
      title: "Generative AI",
      category: "AI",
      shortDesc: "Cutting-edge AI solutions for next-generation applications.",
      tags: ["Model Fine-tuning", "Prompt Engineering", "Custom LLM Development"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        "https://static.cdnlogo.com/logos/o/38/openai.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg"
      ],
      icon: Brain,
    }
  ];

  const filteredServices = activeTab === "All" 
    ? servicesData 
    : servicesData.filter(service => service.category === activeTab);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeButton = tabRefs.current[activeIndex];
    if (activeButton && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      const relativeLeft = buttonRect.left - containerRect.left;
      setSliderStyle({
        width: `${buttonRect.width}px`,
        transform: `translateX(${relativeLeft}px)`,
      });
    }
  }, [activeTab, tabs]);

  const getLoopingLogos = (logos: string[]) => [...logos, ...logos, ...logos];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 }
    })
  };

  return (
    <section className="relative w-full bg-white overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Subtle Background Elements using Primary Color */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full opacity-[0.03]" style={{ backgroundColor: PRIMARY_COLOR }} />
        <div className="absolute top-1/2 -left-24 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full opacity-[0.02]" style={{ backgroundColor: SECONDARY_COLOR }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 sm:mb-6"
            style={{ borderColor: `${SECONDARY_COLOR}40`, backgroundColor: `${SECONDARY_COLOR}10` }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: SECONDARY_COLOR }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: SECONDARY_COLOR }}>Our Expertise</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4" style={{ color: PRIMARY_COLOR }}>
            Innovative Solutions for <br />
            <span style={{ color: SECONDARY_COLOR }}>Digital Transformation</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-base sm:text-lg px-4">
            We combine strategic thinking with technical excellence to build products that scale.
          </p>
        </div>

        {/* Custom Tabs - Desktop */}
        <div className="hidden sm:flex justify-center mb-12 md:mb-16">
          <div ref={containerRef} className="relative bg-gray-50 border border-gray-200 rounded-full p-1.5 flex items-center overflow-x-auto">
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ ...sliderStyle, backgroundColor: SECONDARY_COLOR }}
            />
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[idx] = el; }}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden mb-8 px-4">
          <button
            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            style={{ color: PRIMARY_COLOR }}
          >
            <span className="font-semibold">{activeTab}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {mobileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setMobileDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    style={activeTab === tab ? { backgroundColor: SECONDARY_COLOR } : {}}
                  >
                    {tab}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
          <AnimatePresence mode="wait">
            {filteredServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  custom={idx}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 flex flex-col"
                >
                  {/* Icon Header */}
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 transition-transform group-hover:scale-110 duration-300"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: PRIMARY_COLOR }}>
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 sm:mb-6 flex-grow">
                    {service.shortDesc}
                  </p>

                  {/* Checklist */}
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {service.tags.map((tag, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: SECONDARY_COLOR }} />
                        <span className="text-xs sm:text-sm font-semibold text-gray-700">{tag}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Row */}
                  <div className="border-t border-gray-50 pt-5 sm:pt-6 mb-6 sm:mb-8 overflow-hidden">
                    <div className="flex gap-4 sm:gap-6 animate-slide group-hover:animation-pause">
                      {getLoopingLogos(service.logos).map((logo, lIdx) => (
                        <img 
                          key={lIdx} 
                          src={logo} 
                          alt="tech" 
                          className="h-4 w-4 sm:h-5 sm:w-5 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all flex-shrink-0" 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="w-full">
                    <Button text="Explore Services" className="w-full sm:w-auto" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-0">
          {[
            { val: "500+", label: "Success Stories" },
            { val: "98%", label: "Retention Rate" },
            { val: "12+", label: "Industries" },
            { val: "24/7", label: "Expert Support" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-black mb-1" style={{ color: PRIMARY_COLOR }}>{stat.val}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slide {
          display: flex;
          width: max-content;
          animation: slide 20s linear infinite;
        }
        .group:hover .animation-pause {
          animation-play-state: paused;
        }
        
        /* Responsive media queries */
        @media (max-width: 640px) {
          .animate-slide {
            animation-duration: 15s;
          }
        }
        
        @media (min-width: 1024px) {
          .animate-slide {
            animation-duration: 25s;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .group:hover .animation-pause {
            animation-play-state: running;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;