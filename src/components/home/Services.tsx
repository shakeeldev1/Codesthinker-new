"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Code2,
  Smartphone,
  Cloud,
  Database,
  Brain,
  Layers,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Button from "../common/Button";

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [sliderStyle, setSliderStyle] = useState({ width: "66px", transform: "translateX(4px)" });
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const PRIMARY_COLOR = "#07051D";
  const SECONDARY_COLOR = "#F59C24";

  const tabs = ["All", "Web", "Mobile", "DevOps", "Data", "AI"];

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
  }, [activeTab]);

  const getLoopingLogos = (logos: string[]) => [...logos, ...logos, ...logos];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <section className="relative w-full bg-white overflow-hidden py-16 sm:py-24">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.03] blur-3xl" style={{ backgroundColor: PRIMARY_COLOR }} />
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full opacity-[0.05] blur-3xl" style={{ backgroundColor: SECONDARY_COLOR }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{ borderColor: `${SECONDARY_COLOR}30`, backgroundColor: `${SECONDARY_COLOR}08` }}
          >
            <Sparkles className="w-4 h-4" style={{ color: SECONDARY_COLOR }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SECONDARY_COLOR }}>Our Expertise</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight" style={{ color: PRIMARY_COLOR }}>
            Innovative Solutions for <br />
            <span className="relative inline-block mt-2">
              Digital <span className="text-[#F29D27]">Transformation</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 20" fill="none">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  d="M0 10 Q100 20 200 10 Q300 0 400 10" 
                  stroke={SECONDARY_COLOR} 
                  strokeWidth="4" 
                  fill="none" 
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg">
            We combine strategic thinking with technical excellence to build products that scale and redefine industry standards.
          </p>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden sm:flex justify-center mb-16">
          <div ref={containerRef} className="relative bg-gray-50 border border-gray-200 rounded-full p-1.5 flex items-center shadow-inner">
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-out shadow-md"
              style={{ ...sliderStyle, backgroundColor: SECONDARY_COLOR }}
            />
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[idx] = el; }}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-8 py-2 text-sm font-bold transition-colors duration-300 ${
                  activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden mb-12">
          <button
            onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm"
            style={{ color: PRIMARY_COLOR }}
          >
            <span className="font-bold">{activeTab}</span>
            <motion.div animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}>
              <ArrowRight className="w-5 h-5 rotate-90" />
            </motion.div>
          </button>
          <AnimatePresence>
            {mobileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 relative"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setMobileDropdownOpen(false);
                    }}
                    className={`w-full text-left px-6 py-4 text-sm font-semibold transition-colors ${
                      activeTab === tab ? "text-white" : "text-gray-600 hover:bg-gray-50"
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  custom={idx}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 flex flex-col h-full overflow-hidden"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-4 mb-8">
                    {service.tags.map((tag, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: SECONDARY_COLOR }} />
                        <span className="text-sm font-semibold text-gray-700">{tag}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Row Carousel */}
                  <div className="border-t border-gray-50 pt-8 mb-8 overflow-hidden relative">
                    <div className="flex gap-8 animate-slide group-hover:animation-pause">
                      {getLoopingLogos(service.logos).map((logo, lIdx) => (
                        <img 
                          key={lIdx}
                          src={logo}
                          alt="tech-icon"
                          className="h-6 w-6 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        />
                      ))}
                    </div>
                  </div>

                  <Button 
                    text="Explore Services" 
                    className="w-full justify-center group-hover:bg-[#F59C24] transition-colors duration-300" 
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
        <div className="mt-24 pt-12 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "500+", label: "Success Stories" },
            { val: "98%", label: "Retention Rate" },
            { val: "12+", label: "Industries" },
            { val: "24/7", label: "Expert Support" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-black mb-2" style={{ color: PRIMARY_COLOR }}>{stat.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">{stat.label}</div>
            </motion.div>
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
          animation: slide 25s linear infinite;
        }
        .group:hover .animation-pause {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-slide {
            animation-duration: 15s;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;