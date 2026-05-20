import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BookOpen,
  Briefcase,
  Users,
  Rocket,
  Code,
  Award,
} from "lucide-react";

function WhyChooseUs() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const features = [
    {
      title: "Real-World Learning",
      desc: "Learn through practical projects that simulate real industry problems.",
      img: "https://i.pinimg.com/736x/9f/06/ae/9f06aee1108bc82ef7595a2abd91fbf8.jpg",
      icon: <Code size={20} />,
    },
    {
      title: "Industry Courses",
      desc: "Modern MERN, backend systems, and advanced development paths.",
      img: "https://i.pinimg.com/736x/ec/ba/c1/ecbac1e9891b3a857d2de4691b310c61.jpg",
      icon: <BookOpen size={20} />,
    },
    {
      title: "Internship Program",
      desc: "Work on live projects and gain real industry experience.",
      img: "https://i.pinimg.com/736x/e8/7e/c4/e87ec4c9d80e8e3da206a9c67e368226.jpg",
      icon: <Briefcase size={20} />,
    },
    {
      title: "Career Support",
      desc: "From learning to job placement — we guide your entire journey.",
      img: "https://i.pinimg.com/1200x/06/a4/25/06a4256e32e7f1aa1a851792ffab8fea.jpg",
      icon: <Rocket size={20} />,
    },
    {
      title: "Strong Community",
      desc: "Connect with developers, mentors, and peers globally.",
      img: "https://i.pinimg.com/1200x/69/fa/43/69fa434336a8cd5585573c087e001aa0.jpg",
      icon: <Users size={20} />,
    },
    {
      title: "Certified Growth",
      desc: "Earn certifications that boost your professional profile.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
      icon: <Award size={20} />,
    },
  ];
  return (
    <section className="w-full py-2 px-6 bg-white">

     {/* Heading */}
      <div data-aos="fade-down" className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white ring-1 ring-gray-200 shadow-sm rounded-full px-4 py-1.5">
          <div className="w-2 h-2 rounded-full bg-[#F69A20] "></div>
          <span className="text-xs font-bold text-gray-700 uppercase tracking-widest"> Why Choose Us</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
           Built for  {" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
            <span className="text-[#F69A20] ">Future</span> Developers
          </span>
        </h2>
        <p className="text-gray-500 mt-6 text-lg">
          Everything you need to become a professional developer in one place.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {features.map((item, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            className="group relative rounded-3xl overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-500"
          >

            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#07051D] opacity-0 group-hover:opacity-100 transition-all duration-300">
                {item.icon}
              </div>

              {/* Border Draw Effect */}
            </div>

            {/* Content */}
            <div className="p-6 relative">

              {/* Number Badge */}
              <span className="text-xs font-semibold text-[#FEA800] tracking-[3px] uppercase">
                0{index + 1}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mt-3 group-hover:text-[#07051D] transition-all">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                {item.desc}
              </p>

              {/* Bottom Line Animation */}
              <div className="mt-5 h-[2px] w-0 bg-[#FEA800] group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div data-aos="fade-up" className="text-center mt-8">
        <button className="px-8 py-3 rounded-full bg-[#07051D] hover:bg-[#0f0b35] transition-all text-white font-semibold shadow-lg hover:scale-105">
          Start Your Journey
        </button>
      </div>
    </section>
  );
}

export default WhyChooseUs;