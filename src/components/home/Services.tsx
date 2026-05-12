"use client";

import React, { useState, useEffect, useRef } from "react";

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [sliderStyle, setSliderStyle] = useState({ width: "66px", transform: "translateX(4px)" });
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const tabs = ["All", "Web", "Mobile", "DevOps", "Data", "AI", "Cloud", "Blockchain"];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const servicesData = [
    {
      title: "Web Development",
      category: "Web",
      tags: ["Requirement Gathering & Planning", "Design & Development", "Testing & Optimization"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
      ],
    },
    {
      title: "Mobile App Development",
      category: "Mobile",
      tags: ["Conceptualization & Design", "Development", "Testing & Optimization"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
      ],
    },
    {
      title: "DevOps Services",
      category: "DevOps",
      tags: ["CI/CD Pipelines Setup", "Infrastructure as Code (IaC)", "Monitoring"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg"
      ],
    },
    {
      title: "Browser Extensions",
      category: "Web",
      tags: ["Requirement Analysis", "Development", "Testing", "Publishing"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg"
      ],
    },
    {
      title: "Data Science",
      category: "Data",
      tags: ["Data Collection", "Data Preprocessing", "Model Training"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg"
      ],
    },
    {
      title: "Generative AI (ML, AI)",
      category: "AI",
      tags: ["Model Fine-tuning", "Prompt Engineering", "Custom LLMs"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        "https://static.cdnlogo.com/logos/o/38/openai.svg"
      ],
    },
    {
      title: "Cloud & Automation",
      category: "Cloud",
      tags: ["Cloud Architecture", "Infrastructure Automation", "Test Automation"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg"
      ],
    },
    {
      title: "Blockchain & Web3",
      category: "Blockchain",
      tags: ["Smart Contracts", "Wallet Integration", "Tokenomics"],
      logos: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
        "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
      ],
    },
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

  const getLoopingLogos = (logos: string[]) => [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-12 bg-white overflow-visible rounded-[3rem]">
      {/* Soft Ambient Glows for Light Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-100/50 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">Our Services</span>
        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#07051d] leading-tight">
          Empowering Your Business with<br />
          <span className="text-amber-500"> Innovative </span>Solutions
        </h2>
        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4">
          Scalable, high-performance solutions tailored to your unique needs.
        </p>
      </div>

      {/* Desktop Tabs (Light Styled) */}
      <div className="hidden sm:block mb-16">
        <div className="flex justify-center">
          <div ref={containerRef} className="relative bg-gray-100/80 border border-gray-200 rounded-2xl p-1.5 inline-flex backdrop-blur-sm shadow-inner">
            <div
              className="absolute top-1.5 bottom-1.5 bg-[#07051d] rounded-xl transition-all duration-300 ease-out shadow-lg"
              style={sliderStyle}
            ></div>
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[idx] = el; }}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeTab === tab ? "text-white" : "text-gray-500 hover:text-[#07051d]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Cards Grid (The DARK Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {filteredServices.map((service, idx) => (
          <div
            key={`${activeTab}-${idx}`}
            className="w-full max-w-[380px] group relative rounded-xl bg-[#07051d] border border-transparent flex flex-col justify-between px-9 py-12 overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(7,5,29,0.4)] hover:-translate-y-2"
            style={{ minHeight: 460 }}
          >
            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/[0.08] via-transparent to-blue-500/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <div className="h-1 w-12 bg-amber-500 mt-3 rounded-full group-hover:w-20 transition-all duration-500" />
              </div>

              {/* Tags (Light text on Dark card) */}
              <div className="flex flex-wrap gap-2 mb-10 min-h-[80px]">
                {service.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="inline-block bg-white/10 rounded-lg py-1.5 px-3 text-[11px] font-semibold text-gray-300 border border-white/5 group-hover:border-white/20 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              {/* Tech Slider (Inverted for Dark Card) */}
              <div className="relative overflow-hidden py-5 border-y border-white/10 mb-10">
                <div className="flex gap-8 animate-slide group-hover:pause w-fit">
                  {getLoopingLogos(service.logos).map((logo, logoIdx) => (
                    <div key={logoIdx} className="flex-shrink-0 grayscale invert opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                      <img src={logo} alt="tech icon" className="h-6 w-6 object-contain" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-start">
                <button className="flex items-center gap-3 bg-amber-500 text-[#07051d] px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:bg-white hover:scale-105 shadow-lg active:scale-95">
                  See Details
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="-rotate-45"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes slide {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .animate-slide { animation: slide 30s linear infinite; }
        .pause { animation-play-state: paused; }
        .animate-in { animation: fadeIn 0.6s ease-out, slideIn 0.6s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateY(30px); } to { transform: translateY(0); } }
      `}</style>
    </section>
  );
};

export default ServicesSection;