import React, { useEffect, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SectionBadge } from "../ui/SectionBadge";
import { HiArrowRight, HiOutlineCheckCircle } from "react-icons/hi";

interface StoryItem {
  year: string;
  title: string;
  description: string;
  highlight: string;
  image: string;
}

const storyData: StoryItem[] = [
  {
    year: "2005",
    title: "Where Codes Thinker Began",
    description:
      "We started with one goal: build reliable software that businesses can depend on. Quality engineering and honest partnerships became the foundation of everything we do.",
    highlight: "Company founded",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    year: "2012",
    title: "From Builds to Full Product Delivery",
    description:
      "We expanded into complete product cycles covering web platforms, custom software, and digital transformation for growing companies across multiple industries.",
    highlight: "Full cycle delivery",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop",
  },
  {
    year: "2018",
    title: "Serving Clients Across Continents",
    description:
      "Our work reached teams in the UK, Europe, Middle East, and North America. Consistent delivery and clear communication turned first projects into long term partnerships.",
    highlight: "Global client reach",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1400&auto=format&fit=crop",
  },
  {
    year: "2024",
    title: "Manchester UK Regional Office",
    description:
      "We opened our Manchester office to stay closer to European clients, while our Bahawalpur delivery center continues to power scalable engineering execution.",
    highlight: "UK office launched",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    year: "2026",
    title: "500+ Projects and Still Growing",
    description:
      "With 20+ years of experience, 500+ delivered projects, 45K+ satisfied clients, and a 4.9/5 rating, we help the next generation of products launch and scale with confidence.",
    highlight: "500+ projects delivered",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1400&auto=format&fit=crop",
  },
];

const OurStory: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = storyData[index];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % storyData.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-slate-50 to-white py-12 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-[#07051D]/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionBadge text="Our Journey" theme="light" className="mb-4" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#07051D] tracking-tight">
            The Codes Thinker Story
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Since 2005 we have grown from a focused engineering team into a trusted global partner.
            Today that journey includes 500+ projects, 45K+ satisfied clients, and partnerships built on delivery and trust.
          </p>
        </div>

        {/* Year pills */}
        <div
          data-aos="fade-up"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {storyData.map((item, i) => (
            <button
              key={item.year}
              onClick={() => setIndex(i)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border ${
                i === index
                  ? "bg-[#07051D] text-white border-[#07051D] shadow-lg shadow-[#07051D]/20"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#07051D]/30 hover:text-[#07051D]"
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>

        {/* Featured story panel */}
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Image */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] border border-slate-200/80 shadow-[0_20px_60px_-30px_rgba(7,5,29,0.35)]">
            {storyData.map((item, i) => (
              <img
                key={item.year}
                src={item.image}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07051D]/80 via-[#07051D]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur-md">
                <HiOutlineCheckCircle className="w-4 h-4" />
                {active.highlight}
              </span>
              <p className="mt-3 text-white/80 text-sm sm:text-base max-w-lg leading-relaxed hidden sm:block">
                Milestone {index + 1} of {storyData.length}
              </p>
            </div>
          </div>

          {/* Content card */}
          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-3xl bg-[#07051D] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-[#07051D] shadow-[0_20px_60px_-30px_rgba(7,5,29,0.5)]">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-white/95">
                    {active.year}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                    0{index + 1} / 0{storyData.length}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold leading-tight min-h-[2.6em]">
                  {active.title}
                </h3>
                <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed min-h-[6.5em]">
                  {active.description}
                </p>
              </div>

              <div className="mt-8">
                <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden mb-6">
                  <div
                    key={index}
                    className={`h-full bg-white rounded-full ${!isPaused ? "animate-[storyProgress_5s_linear]" : "w-full"}`}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-white/80 transition-colors"
                  >
                    Next milestone
                    <HiArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1.5">
                    {storyData.map((item, i) => (
                      <button
                        key={`dot-${item.year}`}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to ${item.year}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === index ? "w-7 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust strip */}
        <div
          data-aos="fade-up"
          className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { value: "2005", label: "Founded" },
            { value: "500+", label: "Projects" },
            { value: "45K+", label: "Clients" },
            { value: "4.9/5", label: "Rating" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm"
            >
              <p className="text-xl sm:text-2xl font-extrabold text-[#07051D]">{item.value}</p>
              <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes storyProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default OurStory;
