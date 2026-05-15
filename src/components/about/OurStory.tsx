import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const storyData = [
  {
    year: "2022",
    title: "Where It Started",
    description:
      "Codes Thinker began with a simple vision — helping students learn modern technology with practical skills and real guidance.",
    image:
      "https://i.pinimg.com/1200x/a6/44/91/a6449101d81731a30254d352607d6069.jpg",
  },
  {
    year: "2023",
    title: "Building Community",
    description:
      "We connected students, mentors, and developers together to create a strong learning environment full of opportunities.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    year: "2024",
    title: "Professional Growth",
    description:
      "Industry-focused internships and project-based learning helped students prepare for real software careers.",
    image:
      "https://i.pinimg.com/736x/73/77/c1/7377c10a1d365791446da422c672d08c.jpg",
  },
  {
    year: "2025",
    title: "Career Opportunities",
    description:
      "Codes Thinker expanded into internships, career mentorship, and job preparation programs for future developers.",
    image:
      "https://i.pinimg.com/1200x/a3/dd/f8/a3ddf8e4dbb674e3da0273c5108e5577.jpg",
  },
  {
    year: "2026",
    title: "Future Vision",
    description:
      "Our mission continues to empower future innovators through technology, creativity, and modern education.",
    image:
      "https://i.pinimg.com/736x/6d/79/5a/6d795a9f493ff72281653f8997cadeff.jpg",
  },
];

function OurStory() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % storyData.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const getPosition = (i: number) => {
    const diff = i - index;

    if (diff === 0) return "center";
    if (diff === -1 || diff === storyData.length - 1) return "left";
    if (diff === 1 || diff === -(storyData.length - 1)) return "right";
    return "hidden";
  };

  return (
    <section className="w-full bg-white py-8 px-6 overflow-hidden">

      {/* Heading */}
      <div data-aos="fade-down" className="text-center max-w-3xl mx-auto">
        <p className="text-[#FEA800] tracking-[4px] uppercase text-sm font-semibold">
          Our Journey
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-[#07051D] mt-3">
          Codes Thinker Story
        </h1>

        <p className="text-gray-500 mt-5">
          A smooth journey of learning, growth, and building future developers.
        </p>
      </div>

      {/* CARDS */}
      <div className="relative mt-8 flex justify-center items-center h-[520px]">

        {storyData.map((item, i) => {
          const pos = getPosition(i);

          return (
            <div
              key={i}
              className={`
                absolute w-[320px] md:w-[420px] transition-all duration-700 ease-in-out
                ${
                  pos === "center"
                    ? "z-30 scale-110 opacity-100"
                    : pos === "left"
                    ? "translate-x-[-260px] scale-90 opacity-40"
                    : pos === "right"
                    ? "translate-x-[260px] scale-90 opacity-40"
                    : "opacity-0 scale-75"
                }
              `}
            >
              <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">

                {/* Image */}
                <img
                  src={item.image}
                  className="h-[220px] w-full object-cover"
                />

                {/* Content */}
                <div className="p-6">
                  <span className="text-[#FEA800] text-sm font-semibold tracking-[3px]">
                    {item.year}
                  </span>

                  <h2 className="text-2xl font-bold mt-3 text-gray-900">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animation fix */}
      <style>
        {`
          body {
            overflow-x: hidden;
          }
        `}
      </style>
    </section>
  );
}

export default OurStory;