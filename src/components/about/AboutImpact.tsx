import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SectionBadge } from "../ui/SectionBadge";
import {
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineGlobe,
  HiOutlineClock,
  HiOutlineSupport,
  HiOutlineTrendingUp,
} from "react-icons/hi";

const stats = [
  {
    value: "2005",
    label: "Established",
    desc: "Two decades of engineering trust",
    icon: HiOutlineClock,
  },
  {
    value: "500+",
    label: "Projects Delivered",
    desc: "Web, mobile, AI & enterprise builds",
    icon: HiOutlineBriefcase,
  },
  {
    value: "45K+",
    label: "Satisfied Clients",
    desc: "Businesses that grew with us",
    icon: HiOutlineUserGroup,
  },
  {
    value: "30+",
    label: "Countries Served",
    desc: "UK, Europe, Middle East & beyond",
    icon: HiOutlineGlobe,
  },
  {
    value: "4.9/5",
    label: "Client Rating",
    desc: "Average satisfaction across delivered work",
    icon: HiOutlineTrendingUp,
  },
  {
    value: "24/7",
    label: "Availability",
    desc: "Post launch care you can rely on",
    icon: HiOutlineSupport,
  },
];

const AboutImpact: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="relative w-full bg-[#07051D] py-12 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute -top-24 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div data-aos="fade-up" className="text-center max-w-3xl mx-auto mb-14">
          <SectionBadge text="Our Impact" theme="dark" className="mb-4" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Built for results clients{" "}
            <span className="text-white/80">can measure</span>
          </h2>
          <p className="mt-4 text-white/65 text-base sm:text-lg leading-relaxed">
            Since 2005, Codes Thinker has helped startups and enterprises ship reliable software,
            scale products faster, and stay competitive — with clear delivery and real outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                data-aos="fade-up"
                data-aos-delay={i * 70}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-6 sm:p-7 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-white/90">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-sm text-white/55 leading-relaxed">{stat.desc}</p>
                  </div>
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-white group-hover:text-[#07051D] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutImpact;
