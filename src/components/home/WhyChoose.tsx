import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  TrendingUp,
  BookOpen,
  Award,
  Briefcase,
  Users,
  ChevronRight,
} from "lucide-react";

// --- Interfaces ---
import type { LucideProps } from "lucide-react";
import Button from "../common/Button";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
}

interface FeatureItemProps {
  feature: Feature;
  index: number;
  align?: "left" | "right";
}

// --- Sub-Component with Icons Outside ---
const FeatureItem: React.FC<FeatureItemProps> = ({ feature, index, align = "left" }) => {
  const isLeft = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-start gap-5 group ${isLeft ? "flex-row" : "flex-row-reverse text-right"
        }`}
    >
      {/* Icon - Outside on the side, not inside a hover circle */}
      <motion.div
        whileHover={{
          scale: 1.15,
          rotate: 8,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative shrink-0 mt-1"
      >
        <div className="w-12 h-12 rounded-xl bg-[#0A1F3D] border border-[#F49B21]/30 flex items-center justify-center text-[#F49B21] transition-all duration-300 group-hover:border-[#F49B21] group-hover:shadow-lg group-hover:shadow-[#F49B21]/10">
          <feature.icon size={22} strokeWidth={1.7} />
        </div>
        {/* Decorative accent line */}
        <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-0.5 bg-gradient-to-r from-[#F49B21] to-transparent ${isLeft ? '-left-6' : '-right-6'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </motion.div>

      {/* Content */}
      <div className={`flex-1 ${isLeft ? "text-left" : "text-right"}`}>
        <h3 className="text-xl font-bold text-white group-hover:text-[#F49B21] transition-colors duration-300 flex items-center gap-2">
          {feature.title}
          {isLeft && <ChevronRight size={18} className="text-[#F49B21] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />}
        </h3>
        <p className="text-gray-400 text-sm md:text-base mt-2 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

// --- Center Image Component ---
const CenterImage: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 20 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="relative"
    >
      {/* Outer decorative rings */}
      <div className="absolute -inset-4 rounded-full border border-[#F49B21]/15 animate-[spin_25s_linear_infinite]" />
      <div className="absolute -inset-10 rounded-full border border-[#F49B21]/8 animate-[spin_35s_linear_infinite_reverse]" />
      <div className="absolute -inset-16 rounded-full border border-[#F49B21]/4 animate-[spin_45s_linear_infinite]" />

      {/* Glow effect */}
      <div className="absolute -inset-8 rounded-full bg-[#F49B21]/5 blur-2xl animate-pulse" />

      {/* Main Image */}
      <div className="relative rounded-full overflow-hidden ring-4 ring-[#F49B21]/20 shadow-2xl">
        <img
          src="https://aliveinc.in/images/why-choose-section-1%20.webp"
          alt="Codes Thinker Team Collaboration"
          className="w-64 h-64 md:w-80 md:h-80 object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#07051D]/30 via-transparent to-[#F49B21]/10" />
      </div>

      {/* Decorative dots around the image */}
      <div className="absolute -top-3 -right-3 w-4 h-4 bg-[#F49B21] rounded-full animate-ping opacity-60" />
      <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-[#F49B21] rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/2 -right-6 w-2 h-2 bg-[#F49B21] rounded-full animate-pulse opacity-50" />
      <div className="absolute top-1/2 -left-6 w-2 h-2 bg-[#F49B21] rounded-full animate-pulse opacity-50" />
    </motion.div>
  );
};

// --- Main Component ---
const WhyChoose: React.FC = () => {
  const featuresLeft: Feature[] = [
    {
      title: "Live Project Tracking",
      description: "Track your code deployments and project milestones in real-time with our intuitive dashboard.",
      icon: Clock,
    },
    {
      title: "Insightful Analytics",
      description: "Leverage data-driven insights to optimize your development process and business growth.",
      icon: TrendingUp,
    },
    {
      title: "Learning Hub",
      description: "Access curated resources, guides, and tutorials to empower your coding journey.",
      icon: BookOpen,
    },
  ];

  const featuresRight: Feature[] = [
    {
      title: "Award-Winning Solutions",
      description: "Delivering innovative and reliable software recognized by industry leaders.",
      icon: Award,
    },
    {
      title: "Scalable Architecture",
      description: "Flexible systems designed to scale with your business and technical needs.",
      icon: Briefcase,
    },
    {
      title: "Vibrant Community",
      description: "Connect with passionate developers and experts in the Codes Thinker network.",
      icon: Users,
    },
  ];

  return (
    <section className="relative py-20 bg-[#07051D] overflow-hidden font-sans">
      {/* Background Pattern - Subtle grid */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://codesthinker.com/about/about2.jpg')",
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07051D] via-[#07051D]/95 to-[#07051D]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#F49B21_0%,_transparent_70%)] opacity-[0.03]" />

        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(244, 155, 33, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F49B21]/10 border border-[#F49B21]/20 text-[#F49B21] text-sm font-medium mb-4">
              Why Choose Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Why Choose{" "}
            <span className="relative inline-block">
              <span className="text-[#F49B21] relative z-10">Codes Thinker</span>
              <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 200 8">
                <path d="M0,4 Q50,8 100,4 T200,4" stroke="#F49B21" fill="none" strokeWidth="2" strokeOpacity="0.5" />
              </svg>
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-[#F49B21] to-[#D4B86A] mx-auto rounded-full mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg italic"
          >
            "Empowering your ideas with code, creativity, and community."
          </motion.p>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 xl:gap-16">
          {/* Left Features */}
          <div className="flex flex-col gap-12 w-full lg:w-[30%]">
            {featuresLeft.map((feature, index) => (
              <FeatureItem key={`left-${index}`} feature={feature} index={index} align="left" />
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center items-center w-full lg:w-auto">
            <CenterImage />
          </div>

          {/* Right Features */}
          <div className="flex flex-col gap-12 w-full lg:w-[30%]">
            {featuresRight.map((feature, index) => (
              <FeatureItem key={`right-${index}`} feature={feature} index={index} align="right" />
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16 pt-8 border-t border-[#F49B21]/10"
        >
         
          <Button text="Start Now" />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;