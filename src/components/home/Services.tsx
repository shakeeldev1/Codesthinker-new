// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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
  Star,
  TrendingUp,
  Clock,
  Briefcase,
} from "lucide-react";
import Button from "../common/Button";

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [sliderStyle, setSliderStyle] = useState({ width: "0px", transform: "translateX(0px)" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState(6);
  
  const tabs = ["All", "Web", "Mobile", "DevOps", "Data", "AI"];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Enhanced color palette with better contrast
  const colors = {
    primary: "#0A0A2A",
    secondary: "#1A1A3A",
    accent: "#08061E",
    accentDark: "#D97706",
    accentLight: "#FEF3C7",
    textLight: "#F8FAFC",
    textMuted: "#94A3B8",
    borderLight: "#E2E8F0",
    bgCard: "#FFFFFF",
    bgHover: "#F8FAFC",
  };

  const servicesData = useMemo(() => [
    {
      id: 1,
      title: "Web Development",
      category: "Web",
      shortDesc: "Modern, scalable web applications built with cutting-edge technologies for exceptional user experiences.",
      longDesc: "From responsive SPAs to complex enterprise portals, we deliver high-performance web solutions.",
      tags: ["Requirement Gathering & Planning", "Design & Development", "Testing & Optimization"],
      metrics: { time: "4-8 weeks", rating: "4.9" },
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
      ],
      icon: Code2,
gradient: "from-[#08061E] to-[#08061E]",    },
    {
      id: 2,
      title: "Mobile App Development",
      category: "Mobile",
      shortDesc: "Native and cross-platform mobile experiences that deliver exceptional performance and user engagement.",
      longDesc: "iOS, Android, and cross-platform apps with seamless UI/UX and optimized performance.",
      tags: ["Conceptualization & Design", "Development", "Testing & Optimization"],
      metrics: { time: "6-10 weeks", rating: "4.8" },
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
      ],
      icon: Smartphone,
gradient: "from-[#08061E] to-[#08061E]",    },
    {
      id: 3,
      title: "DevOps Services",
      category: "DevOps",
      shortDesc: "Automated, efficient, and scalable infrastructure solutions for modern application deployment.",
      longDesc: "CI/CD pipelines, container orchestration, and cloud-native architectures.",
      tags: ["CI/CD Pipelines Setup", "Infrastructure as Code (IaC)", "Monitoring & Alerting"],
      metrics: { time: "3-6 weeks", rating: "4.9" },
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
      ],
      icon: Cloud,
gradient: "from-[#08061E] to-[#08061E]",    },
    {
      id: 4,
      title: "Browser Extensions",
      category: "Web",
      shortDesc: "Powerful browser extensions that enhance productivity and streamline workflows.",
      longDesc: "Cross-browser compatible extensions with intuitive interfaces and robust functionality.",
      tags: ["Requirement Analysis", "Development", "Testing & Publishing"],
      metrics: { time: "2-4 weeks", rating: "4.7" },
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
      ],
      icon: Layers,
gradient: "from-[#08061E] to-[#08061E]",    },
    {
      id: 5,
      title: "Data Science",
      category: "Data",
      shortDesc: "Transform raw data into actionable insights with advanced analytics and machine learning.",
      longDesc: "Predictive modeling, data visualization, and business intelligence solutions.",
      tags: ["Data Collection", "Data Preprocessing", "Model Training & Deployment"],
      metrics: { time: "8-12 weeks", rating: "4.8" },
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
      ],
      icon: Database,
gradient: "from-[#08061E] to-[#08061E]",    },
    {
      id: 6,
      title: "Generative AI",
      category: "AI",
      shortDesc: "Cutting-edge AI solutions that automate creativity and enhance decision-making.",
      longDesc: "Custom LLM implementation, RAG systems, and AI agent development.",
      tags: ["Model Fine-tuning", "Prompt Engineering", "Custom LLM Development"],
      metrics: { time: "6-10 weeks", rating: "4.9" },
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        "https://static.cdnlogo.com/logos/o/38/openai.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg"
      ],
      icon: Brain,
gradient: "from-[#08061E] to-[#08061E]",    },
    {
      id: 7,
      title: "Cloud Architecture",
      category: "DevOps",
      shortDesc: "Scalable, secure, and cost-optimized cloud solutions for modern enterprises.",
      longDesc: "Multi-cloud strategies, serverless architectures, and cloud migration services.",
      tags: ["Cloud Strategy", "Architecture Design", "Migration & Optimization"],
      metrics: { time: "4-8 weeks", rating: "4.8" },
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
      ],
      icon: Cloud,
      gradient: "from-[#08061E] to-[#08061E]",
    },
  ], []);

  const filteredServices = useMemo(() => 
    activeTab === "All" ? servicesData : servicesData.filter(s => s.category === activeTab),
    [activeTab, servicesData]
  );

  const displayedServices = useMemo(() => 
    filteredServices.slice(0, visibleCards),
    [filteredServices, visibleCards]
  );

  const getLoopingLogos = useCallback((logos: string[]) => [...logos, ...logos, ...logos], []);

  // Update slider position when active tab changes
  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeButton = tabRefs.current[activeIndex];
    if (activeButton && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      setSliderStyle({
        width: `${buttonRect.width}px`,
        transform: `translateX(${buttonRect.left - containerRect.left}px)`
      });
    }
  }, [activeTab, tabs]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.service-card-animate');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredServices]);

  const loadMore = () => {
    setVisibleCards(prev => Math.min(prev + 3, filteredServices.length));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-full px-4 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#F69A20] "></div>
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Our Services</span>
                </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-800">
            Turning <span className="text-[#F69A20] relative inline-block">
              Vision
             
            </span> into Reality
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Delivering innovative technology solutions that drive business growth and digital transformation
          </p>
        </motion.div>

        {/* Enhanced Tabs with better interaction */}
        <div className="hidden sm:flex justify-center mb-16">
          <div 
            ref={containerRef} 
            className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-1.5 flex shadow-lg"
          >
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 shadow-md"
              style={{ ...sliderStyle, backgroundColor: colors.accent }}
              layoutId="activeTab"
            />
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[idx] = el; }}
                onClick={() => {
                  setActiveTab(tab);
                  setVisibleCards(6);
                }}
                className={`relative z-10 px-6 md:px-8 py-2.5 text-sm md:text-base font-semibold transition-all duration-300 ${
                  activeTab === tab 
                    ? "text-white" 
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                } rounded-full`}
                aria-label={`Filter by ${tab}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className="sm:hidden mb-8">
          <select
            value={activeTab}
            onChange={(e) => {
              setActiveTab(e.target.value);
              setVisibleCards(6);
            }}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#08061E]"
          >
            {tabs.map(tab => (
              <option key={tab} value={tab}>{tab}</option>
            ))}
          </select>
        </div>

        {/* Services Grid with improved animations */}
        <LayoutGroup>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {displayedServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onHoverStart={() => setHoveredCard(service.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="service-card-animate opacity-0 translate-y-10 transition-all duration-700"
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-orange-200/20 transition-all duration-700" />
                      
                      {/* Top Gradient Bar */}
                      <div className={`h-1 bg-gradient-to-r ${service.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                      
                      <div className="p-6 flex flex-col h-full">
                        {/* Icon with enhanced animation */}
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${service.gradient} shadow-lg`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Title with hover effect */}
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#08061E] transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                          {service.shortDesc}
                        </p>

                        {/* Tags with checkmarks */}
                        <div className="space-y-3 mb-8 flex-grow">
                          {service.tags.map((tag, tIdx) => (
                            <motion.div
                              key={tIdx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: tIdx * 0.1 }}
                              className="flex items-center gap-3 group/item"
                            >
                              <CheckCircle2 className="w-5 h-5 text-[#08061E] flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-900 transition-colors">
                                {tag}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Metrics Badges */}
                        <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-500">{service.metrics.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-[#08061E] fill-current" />
                            <span className="text-xs font-semibold text-gray-700">{service.metrics.rating}</span>
                          </div>
                        </div>

                        {/* Tech stack logos with improved animation */}
                        <div className="overflow-hidden pt-2">
                          <div className="flex gap-6 animate-slide group-hover:animation-pause">
                            {getLoopingLogos(service.logos).map((logo, lIdx) => (
                              <img
                                key={lIdx}
                                src={logo}
                                alt="technology logo"
                                className="h-6 w-6 opacity-40 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                loading="lazy"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      {hoveredCard === service.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Load More Button */}
        {visibleCards < filteredServices.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-5 py-2  border-2 border-[#08061E]  rounded-full font-semibold bg-[#08061E] text-white hover:bg-white hover:text-[#08061E] transition-all duration-300 shadow-md hover:shadow-xl"
            >
            More Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { val: "500+", label: "Projects Completed", icon: Briefcase, color: "from-blue-500 to-cyan-500" },
              { val: "98%", label: "Client Satisfaction", icon: TrendingUp, color: "from-green-500 to-teal-500" },
              { val: "12+", label: "Industries Served", icon: Layers, color: "from-purple-500 to-pink-500" },
              { val: "24/7", label: "Support Available", icon: Clock, color: "from-orange-500 to-red-500" }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative bg-[#08061E] rounded-xl px-5 py-2 shadow-lg overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <Icon className="w-8 h-8 text-[#ffffff] mb-3 mx-auto" />
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">{stat.val}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-300 text-center">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

       
      </div>

      <style jsx global>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-slide {
          display: flex;
          width: max-content;
          animation: slide 20s linear infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-pause {
          animation-play-state: paused;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #08061E;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #D97706;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;