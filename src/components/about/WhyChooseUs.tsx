import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import {
  Code,
  Layers,
  Cpu,
  ShieldCheck,
  Globe,
  Award,
} from "lucide-react";
import { SectionBadge } from "../ui/SectionBadge";
import { HiArrowRight } from "react-icons/hi";

interface FeatureItem {
  title: string;
  desc: string;
  img: string;
  icon: React.ReactNode;
}

const WhyChooseUs: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const features: FeatureItem[] = [
    {
      title: "Proven Since 2005",
      desc: "Two decades of shipping production software — processes refined by hundreds of real world client engagements.",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      icon: <Award size={20} />,
    },
    {
      title: "500+ Projects Delivered",
      desc: "From MVPs to enterprise platforms — web, mobile, AI, and cloud systems built for performance and growth.",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
      icon: <Layers size={20} />,
    },
    {
      title: "45K+ Satisfied Clients",
      desc: "Businesses trust us for clear communication, on time delivery, and products that keep performing after launch.",
      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
      icon: <Globe size={20} />,
    },
    {
      title: "Dedicated Engineering Teams",
      desc: "Full stack engineers and technical leads aligned to your roadmap — not freelancers who disappear mid sprint.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      icon: <Cpu size={20} />,
    },
    {
      title: "Modern Tech Architecture",
      desc: "Scalable MERN, Next.js, cloud, and mobile stacks engineered for uptime, speed, and maintainability.",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
      icon: <Code size={20} />,
    },
    {
      title: "End to End Delivery Support",
      desc: "Discovery, design, build, launch, and ongoing support — one partner from idea to scale.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
      icon: <ShieldCheck size={20} />,
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 bg-white overflow-hidden">
      {/* Heading */}
      <div data-aos="fade-down" className="text-center max-w-3xl mx-auto">
        <SectionBadge text="Why Partner With Us" theme="light" className="mb-4" />

        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          Why clients{" "}
          <span className="text-[#07051D]">choose Codes Thinker</span>
        </h2>
        <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Experience, delivery volume, and lasting client relationships — the proof behind every partnership we start.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="mt-14 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={`feature-${index}`}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="group relative rounded-3xl overflow-hidden bg-[#07051D] shadow-[0_16px_50px_-20px_rgba(7,5,29,0.55)] border border-[#07051D] hover:shadow-[0_28px_60px_-18px_rgba(7,5,29,0.7)] transition-all duration-500 flex flex-col justify-between"
          >
            {/* Image Banner */}
            <div className="relative h-52 overflow-hidden bg-[#0c0a28]">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07051D] via-[#07051D]/40 to-transparent" />

              {/* Floating Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#07051D] shadow-md transition-all duration-300 group-hover:bg-white group-hover:scale-105">
                {item.icon}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 relative flex-1 flex flex-col justify-between bg-[#07051D]">
              <div>
                {/* Index Number */}
                <span className="text-xs font-bold text-white tracking-[3px] uppercase bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                  0{index + 1}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mt-3.5 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/65 text-sm mt-2.5 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Animated Indicator */}
              <div className="mt-6 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div data-aos="fade-up" className="text-center mt-12">
        <button
          onClick={() => navigate("/contact")}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#07051D] hover:bg-[#0f0b35] transition-all duration-300 text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-95"
        >
          Talk to Our Team
          <HiArrowRight className="w-5 h-5" />
        </button>
        <p className="mt-3 text-sm text-gray-500">
          Free consultation · Clear roadmap · No obligation
        </p>
      </div>
    </section>
  );
};

export default WhyChooseUs;