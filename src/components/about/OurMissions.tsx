import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function OurMissions() {
  const [index, setIndex] = useState(0);
  const missions = [
    {
      title: "Empower Students",
      desc: "We aim to empower students with real-world skills that prepare them for modern tech careers.",
      img: "https://i.pinimg.com/736x/82/48/b7/8248b74f7d5ac340fdb200ce349c20de.jpg",
    },
    {
      title: "Build Practical Skills",
      desc: "Our focus is on hands-on learning through projects, not just theory-based education.",
      img: "https://i.pinimg.com/736x/5d/91/98/5d9198787dfb1d4fa10c6741ea718f0d.jpg",
    },
    {
      title: "Career Growth",
      desc: "We guide students from learning phase to internships and job placements.",
      img: "https://i.pinimg.com/736x/2e/6d/82/2e6d82123a4ef5422984ea07fa6ad0cd.jpg",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % missions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-20 px-6">

      {/* Heading */}
      <div data-aos="fade-down" className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-[#FEA800] uppercase tracking-[4px] text-sm font-semibold">
          Our Mission
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-5xl font-extrabold text-gray-900 mt-4">
          What We Aim For
        </h2>

        <p className="text-gray-500 mt-5 text-lg">
          Driving students toward success with real-world learning and opportunities.
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT - IMAGE CAROUSEL */}
        <div data-aos="fade-right" className="relative overflow-hidden rounded-3xl shadow-xl">

          <img
            src={missions[index].img}
            alt="mission"
            className="w-full h-[360px] object-cover transition-all duration-700"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {missions.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                  i === index ? "bg-[#FEA800] scale-125" : "bg-white/60"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* RIGHT - CONTENT */}
        <div data-aos="fade-left">

          <span className="text-xs font-semibold tracking-[4px] uppercase text-[#FEA800]">
            {index + 1} / {missions.length}
          </span>

          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 transition-all duration-500">
            {missions[index].title}
          </h3>

          <p className="text-gray-500 mt-6 text-lg leading-relaxed">
            {missions[index].desc}
          </p>

          {/* Progress Bar */}
          <div className="mt-8 w-full h-[3px] bg-gray-200 rounded-full overflow-hidden">
            <div
              key={index}
              className="h-full bg-[#FEA800] animate-[progress_3s_linear]"
            ></div>
          </div>

          {/* Button */}
          <button className="mt-10 px-7 py-3 rounded-full bg-[#07051D] text-white hover:bg-[#0f0b35] transition-all duration-300 font-semibold shadow-lg hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      {/* Animation */}
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
}

export default OurMissions;