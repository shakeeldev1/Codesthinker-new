import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

function ContactUs() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="w-full bg-white py-24 px-6 relative overflow-hidden">

      {/* Soft Glow Background */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-[#FDBE00]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-[#07051D]/10 blur-[140px] rounded-full"></div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT SIDE */}
        <div data-aos="fade-right">

          <p className="text-[#FDBE00] uppercase tracking-[4px] text-sm font-semibold">
            Contact Us
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#07051D] mt-4 leading-tight">
            Let’s Talk & Build <br />
            Something <span className="text-[#FDBE00]">Amazing</span>
          </h2>

          <p className="text-gray-600 mt-6 leading-relaxed">
            We are always ready to help you with courses, internships,
            projects, and career guidance. Reach out anytime.
          </p>

          {/* CONTACT CARDS */}
          <div className="mt-10 space-y-4">

            {/* EMAIL */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition">
              <Mail className="text-[#FDBE00]" />
              <span className="text-gray-700 font-medium">
                support@codesthinker.com
              </span>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition">
              <Phone className="text-[#FDBE00]" />
              <span className="text-gray-700 font-medium">
                +92 300 1234567
              </span>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition">
              <MapPin className="text-[#FDBE00]" />
              <span className="text-gray-700 font-medium">
                Pakistan Office, Karachi
              </span>
            </div>

            {/* WEBSITE */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition">
              <Globe className="text-[#FDBE00]" />
              <span className="text-gray-700 font-medium">
                www.codesthinker.com
              </span>
            </div>

          </div>

          {/* BUTTON */}
          <button className="mt-10 px-8 py-3 bg-[#07051D] text-white font-semibold rounded-full hover:bg-[#1a1740] transition-all duration-300 hover:scale-105">
            Get In Touch
          </button>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div data-aos="fade-left" className="relative flex justify-center">

          {/* Glow */}
          <div className="absolute w-[350px] h-[350px] bg-[#FDBE00]/10 blur-[120px] rounded-full"></div>

          {/* Image */}
          <img
            src="https://i.pinimg.com/1200x/95/aa/2c/95aa2c7b6bddef5b56fa4ed6e812bca1.jpg"
            alt="Contact"
            className="relative w-[90%] max-w-[420px] h-[500px] object-cover rounded-[40px] border border-gray-200 shadow-[0_25px_80px_rgba(0,0,0,0.15)]"
          />

        </div>

      </div>
    </section>
  );
}
export default ContactUs;