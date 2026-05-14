import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function AboutHead() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#07051D]">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
        alt="Codes Thinker"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#07051D]/50"></div>

      {/* Gradient Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FEA800]/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FEA800]/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-5xl text-center text-white">
          
          {/* Top Tag */}
          <p
            data-aos="fade-down"
            className="inline-block px-5 py-2 mb-6 text-sm md:text-base font-semibold tracking-[4px] uppercase rounded-full border border-[#FEA800]/40 bg-[#FEA800]/10 text-[#FEA800] backdrop-blur-md"
          >
            Welcome To Codes Thinker
          </p>

          {/* Main Heading */}
          <h1
            data-aos="zoom-in"
            className="text-4xl sm:text-5xl md:text-5xl font-extrabold leading-tight"
          >
            Transforming Passion Into <br />
            <span className="text-[#FEA800]">
              Real Tech Careers
            </span>
          </h1>

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-8 text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            Codes Thinker provides professional IT courses, internships,
            mentorship, and career opportunities designed to prepare students
            for the modern tech industry. Learn practical skills, work on real
            projects, and grow with industry experts.
          </p>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* Primary Button */}
 <button className="min-w-[180px] px-6 py-3 rounded-full bg-[#FEA800] hover:bg-[#ffb71d] transition-all duration-300 text-[#07051D] font-semibold shadow-xl hover:scale-105 text-sm">
    Explore Courses
  </button>

  {/* Secondary Button */}
  <button className="min-w-[180px] px-6 py-3 rounded-full border border-[#FEA800] text-[#FEA800] hover:bg-[#FEA800] hover:text-[#07051D] transition-all duration-300 font-semibold hover:scale-105 backdrop-blur-md text-sm">
    Learn More
  </button>
          </div>

          {/* Stats */}
       <div
  data-aos="fade-up"
  data-aos-delay="600"
  className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5"
>
  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300">
    <h2 className="text-2xl font-bold text-[#FEA800]">500+</h2>
    <p className="mt-1 text-sm text-gray-300">Students Trained</p>
  </div>

  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300">
    <h2 className="text-2xl font-bold text-[#FEA800]">50+</h2>
    <p className="mt-1 text-sm text-gray-300">Internships Offered</p>
  </div>

  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300">
    <h2 className="text-2xl font-bold text-[#FEA800]">100%</h2>
    <p className="mt-1 text-sm text-gray-300">Practical Learning</p>
  </div>
</div>
  </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[120px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#07051D"
            fillOpacity="1"
            d="M0,224L60,208C120,192,240,160,360,160C480,160,600,192,720,202.7C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default AboutHead;