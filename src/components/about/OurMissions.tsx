import React, { useEffect, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SectionBadge } from "../ui/SectionBadge";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface MissionItem {
  id: number;
  title: string;
  tagline: string;
  desc: string;
  img: string;
}

const agencyMissions: MissionItem[] = [
  {
    id: 1,
    title: "Empower Global Enterprises",
    tagline: "STRATEGIC TECH PARTNERSHIP",
    desc: "We help forward-thinking businesses innovate faster by delivering tailored software solutions, high-converting platforms, and scalable digital products.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Architect Scalable Systems",
    tagline: "HIGH PERFORMANCE ENGINEERING",
    desc: "Our engineering focus centers on clean code architecture, robust cloud infrastructure, microservices, and modern web frameworks like Next.js & Node.",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Accelerate Digital Transformation",
    tagline: "END TO END PRODUCT DELIVERY",
    desc: "From rapid MVP development to enterprise-level software migration, we guide businesses through every stage of their technology evolution.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  },
];

const OurMissions: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % agencyMissions.length);
  }, []);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + agencyMissions.length) % agencyMissions.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 overflow-hidden">
      {/* Heading */}
      <div data-aos="fade-down" className="text-center max-w-3xl mx-auto mb-16">
        <SectionBadge text="Our Core Mission" theme="light" className="mb-4" />

        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          What We{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
            <span className="text-[#F69A20]">Drive</span> For
          </span>
        </h2>

        <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Empowering global brands and startups with engineering precision, scalable tech, and measurable outcome.
        </p>
      </div>

      {/* Main Grid Section */}
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* LEFT - IMAGE SLIDER */}
        <div
          data-aos="fade-right"
          className="lg:col-span-6 relative overflow-hidden rounded-3xl shadow-2xl group border border-gray-100"
        >
          <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden bg-gray-900">
            {agencyMissions.map((item, i) => (
              <img
                key={item.id}
                src={item.img}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            ))}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Navigation Arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-black/50 hover:bg-[#F69A20] text-white transition-all backdrop-blur-md"
                aria-label="Previous Mission"
              >
                <HiChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-black/50 hover:bg-[#F69A20] text-white transition-all backdrop-blur-md"
                aria-label="Next Mission"
              >
                <HiChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {agencyMissions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-[#F69A20]" : "w-2.5 bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Go to item ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT - CONTENT DISPLAY */}
        <div data-aos="fade-left" className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-[3px] uppercase text-[#F69A20] bg-[#F69A20]/10 px-3 py-1 rounded-full border border-[#F69A20]/20">
                {agencyMissions[index].tagline}
              </span>
              <span className="text-xs font-semibold tracking-widest text-gray-400">
                0{index + 1} / 0{agencyMissions.length}
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 transition-all duration-300 min-h-[48px]">
              {agencyMissions[index].title}
            </h3>

            <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed min-h-[80px]">
              {agencyMissions[index].desc}
            </p>

            {/* Progress Bar */}
            <div className="mt-6 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                key={index}
                className={`h-full bg-[#F69A20] ${
                  !isPaused ? "animate-[progress_4.5s_linear]" : "w-full"
                }`}
              />
            </div>
          </div>

          {/* Selector Items */}
          <div className="mt-8 space-y-3">
            {agencyMissions.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setIndex(i)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center justify-between ${
                  i === index
                    ? "bg-[#090B22] text-white border-[#090B22] shadow-lg translate-x-1"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      i === index
                        ? "bg-[#F69A20] text-gray-900"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-semibold text-sm sm:text-base">
                    {item.title}
                  </span>
                </div>
                <HiChevronRight
                  className={`w-5 h-5 transition-transform ${
                    i === index ? "text-[#F69A20] translate-x-1" : "text-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
    </section>
  );
};

export default OurMissions;