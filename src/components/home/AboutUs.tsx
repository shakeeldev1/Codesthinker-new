import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ParticleBackground from "./ParticleBackground";

const AboutUs: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";

  const aboutFeatures = [
    { text: "Industry Expert Staff", aos: "fade-right" },
    { text: "Client-Centric Focus", aos: "fade-left" },
    { text: "Partner rather than Vendor", aos: "fade-up-right" },
    { text: "Solutions Geared to Improve Productivity", aos: "fade-up-left" },
    { text: "Collaborative Approach Throughout the Process", aos: "fade-up-right" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="relative w-full min-h-[600px] bg-[#E9F6FF] overflow-hidden">
      {/* BACKGROUND EFFECT */}
      <ParticleBackground />

      {/* SHINE EFFECT CSS */}
      <style>{`
        .shine-wrapper {
          position: relative;
          overflow: hidden;
        }
        .shine-wrapper img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .shine-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
        }
        .group:hover .shine-wrapper::after {
          animation: shine-move 1s ease-in-out;
        }
        @keyframes shine-move {
          100% { left: 125%; }
        }
      `}</style>

      {/* MAIN CONTENT - z-10 ensures content stays above the particles */}
      <div className="relative z-10 pt-10 pb-10 px-5 text-black">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Image Section */}
          <div className="w-full md:w-1/2 order-2 group" data-aos="fade-up-right">
            <div className="shine-wrapper rounded-md shadow-2xl overflow-hidden">
              <img
                src="https://codesthinker.com/about/about2.jpg"
                alt="About Code's Thinker"
                loading="lazy"
                className="md:min-h-[450px]"
              />
            </div>
          </div>

          {/* Text Content: Home Page View */}
          {isHomePage && (
            <div className="w-full md:w-1/2 mt-2" data-aos="fade-up-left">
              <h1 className="text-3xl md:text-5xl font-bold">
                About <span className="text-[#F49B21]">Code's </span>Thinker
              </h1>
              <p className="py-3 text-gray-800">
                We redefine excellence in business solutions at Codes Thinker. Our approach 
                combines technical mastery with creative strategy to solve complex problems.
              </p>
              <div className="flex flex-col gap-3 mt-4">
                {aboutFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer bg-white/60 backdrop-blur-sm rounded-full w-fit shadow-md px-4 pe-6 py-1 flex items-center transition-all hover:bg-white"
                    data-aos={feature.aos}
                  >
                    <span className="w-[12px] h-[12px] mr-4 rounded-full bg-gradient-to-r from-[#18c8ff] to-[#c608ff]"></span>
                    <p className="text-md font-medium text-black">{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text Content: About Page View */}
          {isAboutPage && (
            <div className="w-full sm:w-6/12 flex flex-col justify-center px-4 gap-3">
              <h1 className="text-start font-bold text-4xl">
                Building <span className="text-[#0F00AA]">Future-Ready Software</span>
              </h1>
              <p className="w-full text-gray-800 leading-relaxed">
                We are a team of passionate developers, designers, and thinkers building 
                scalable solutions for tomorrow. At Code's Thinker, we don’t just build software 
                — we craft scalable, intelligent solutions that drive real-world impact.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;