import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";

function ContactHead() {
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
        src="https://i.pinimg.com/1200x/95/aa/2c/95aa2c7b6bddef5b56fa4ed6e812bca1.jpg"
        alt="Contact Codes Thinker"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#07051D]/60"></div>

      {/* Glow Effects (same as AboutHead style) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FDBE00]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FDBE00]/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">

        <div className="max-w-5xl text-center text-white">

          {/* Heading */}
          <h1
            data-aos="zoom-in"
            className="text-4xl sm:text-5xl md:text-5xl font-extrabold leading-tight"
          >
            Let’s Build Something <br />
            <span className="text-[#FDBE00]">Amazing Together</span>
          </h1>

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-8 text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          >
            Whether you want courses, internships, or career guidance —
            we are always here to support your journey in technology and growth.
          </p>

        

          {/* Button */}
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="mt-12"
          >
            <button className="px-8 py-3 rounded-full bg-[#FDBE00] text-[#07051D] font-semibold hover:bg-yellow-400 transition-all duration-300 hover:scale-105">
              Contact Now
            </button>
          </div>
        </div>
      </div>

      {/* Floating Icon (fixed error) */}
      <div className="absolute top-6 right-6 bg-[#FDBE00]/10 text-[#FDBE00] p-3 rounded-2xl backdrop-blur-md border border-[#FDBE00]/20">
        <Sparkles />
      </div>
    </div>
  );
}
export default ContactHead;