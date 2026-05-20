import React, { useEffect, useState, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface StoryItem {
  year: string;
  title: string;
  description: string;
  image: string;
}

const storyData: StoryItem[] = [
  {
    year: "2022",
    title: "Where It Started",
    description:
      "Code's Thinker began with a bold vision: delivering high-quality, international-grade software solutions. What started in local markets quickly grew into a trusted digital engineering company.",
    image: "https://codesthinker.com/home/servicesImage.png",
  },
  {
    year: "2023",
    title: "Bahawalpur Branch Established",
    description:
      "Second branch established in Bahawalpur, Pakistan, empowering local developers with the capability to deliver world-class, international SEO for our global client projects.",
    image: "https://online.maryville.edu/wp-content/uploads/sites/97/2020/07/software-developer-coding.jpg",
  },
  {
    year: "2024",
    title: "Global Project Growth",
    description:
      "We expanded our portfolio internationally, securing significant software projects and AI integrations for businesses across the UK, Europe, and beyond.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
  },
  {
    year: "2025",
    title: "Manchester UK Branch Launch",
    description:
      "First branch opened in Manchester, United Kingdom — putting Code's Thinker on the international map and building stronger relationships with UK-based and European clients.",
    image: "https://res.cloudinary.com/highereducation/images/f_auto,q_auto/g_face,c_fill,fl_lossy,q_auto:best,w_448,h_382/v1673383092/ComputerScience.org/day-in-the-life-of-a-software-dev/day-in-the-life-of-a-software-dev.jpg?_i=AA",
  },
  {
    year: "2026",
    title: "Future Vision: One Global Team",
    description:
      "Our vision is to stand among the world's leading software development companies — one international project at a time, powered by AI innovation.",
    image: "https://www.blimp.pk/wp-content/uploads/2025/05/software-development-service-pakistan.jpg",
  },
];

const OurStory: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % storyData.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const getPosition = useCallback((i: number) => {
    const diff = i - index;
    if (diff === 0) return "center";
    if (diff === -1 || diff === storyData.length - 1) return "left";
    if (diff === 1 || diff === -(storyData.length - 1)) return "right";
    return "hidden";
  }, [index]);

  return (
    // Fixed: Added strict overflow-hidden on outer container wrapper
    <section className="w-full bg-white py-12 px-4 sm:px-6 overflow-hidden relative">
      {/* Heading */}
      <div data-aos="fade-down" className="text-center max-w-3xl mx-auto mb-4">
        <div className="inline-flex items-center gap-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-full px-4 py-1.5">
          <div className="w-2 h-2 rounded-full bg-[#F69A20] "></div>
          <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Our Journy</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          Code's{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
            <span className="text-[#F69A20] ">Thinker</span> Story
          </span>
        </h2>

        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm md:text-base">
          From a bold vision to a global software development company — delivering excellence across continents.
        </p>
      </div>

      {/* Slider deck */}
      {/* Fixed: Adjusted mobile height to prevent clipping card scales */}
      <div className="relative mt-8 flex justify-center items-center h-[480px] md:h-[540px] w-full max-w-7xl mx-auto">
        {storyData.map((item, i) => {
          const pos = getPosition(i);

          return (
            <div
              key={i}
              className={`
                absolute w-[280px] sm:w-[340px] md:w-[420px] transition-all duration-700 ease-in-out
                ${pos === "center"
                  ? "z-30 scale-100 md:scale-110 opacity-100 pointer-events-auto"
                  : pos === "left"
                    ? "-translate-x-[160px] sm:-translate-x-[220px] md:-translate-x-[280px] scale-85 md:scale-90 opacity-30 md:opacity-40 pointer-events-none"
                    : pos === "right"
                      ? "translate-x-[160px] sm:translate-x-[220px] md:translate-x-[280px] scale-85 md:scale-90 opacity-30 md:opacity-40 pointer-events-none"
                      : "opacity-0 scale-75 pointer-events-none"
                }
              `}
            >
              <div className="bg-[#090B22] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white/10">
                {/* Image */}
                <img
                  src={item.image}
                  className="h-[160px] sm:h-[200px] md:h-[220px] w-full object-cover"
                  alt={item.title}
                />

                {/* Content */}
                <div className="p-5 md:p-6">
                  <span className="inline-block bg-[#FEA800]/15 text-[#FEA800] text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full tracking-[2px]">
                    {item.year}
                  </span>

                  <h3 className="text-lg md:text-2xl font-bold mt-2.5 text-white truncate">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-2 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Indicator Controls */}
      <div className="flex justify-center items-center gap-2.5 mt-8 relative z-40">
        {storyData.map((item, i) => (
          <button
            key={`dot-${item.year}`}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full h-2.5
              ${index === i ? "bg-[#FEA800] w-7" : "bg-gray-200 hover:bg-gray-300 w-2.5"}`}
            aria-label={`Go to year ${item.year}`}
          />
        ))}
      </div>
    </section>
  );
};

export default OurStory;