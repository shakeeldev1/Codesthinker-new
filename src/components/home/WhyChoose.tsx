import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  TrendingUp,
  BookOpen,
  Award,
  Briefcase,
  Users,
} from "lucide-react";

// --- Interfaces ---


import type { LucideProps } from "lucide-react";

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

// --- Sub-Component ---

const FeatureItem: React.FC<FeatureItemProps> = ({ feature, index, align = "left" }) => {
  const isLeft = align === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex items-center gap-6 group ${
        isLeft ? "flex-row" : "flex-row-reverse text-right"
      }`}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <h3 className="text-xl font-bold text-white group-hover:text-[#F49B21] transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-white/60 text-sm md:text-base mt-2 leading-relaxed group-hover:text-white/90 transition-colors">
          {feature.description}
        </p>
      </div>

      <div className="relative shrink-0">
        <motion.div
          whileHover={{
            scale: 1.1,
            rotate: 15,
            backgroundColor: "#C8A951",
            color: "#0A1F3D",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative w-14 h-14 rounded-2xl bg-[#0A1F3D]/50 border border-[#C8A951]/20 backdrop-blur-md flex items-center justify-center text-[#F49B21] cursor-pointer"
        >
          <feature.icon size={26} strokeWidth={1.5} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

const WhyChoose: React.FC = () => {
  // Static Data Arrays
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
    <section className="relative py-12 bg-[#07051D] overflow-hidden font-sans">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-fixed opacity-20"
          style={{
            backgroundImage:
              "url('https://codesthinker.com/about/about2.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#05162E] via-transparent to-[#0A1F3D]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Why Choose <span className="text-[#F49B21]">Codes Thinker</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-linear-to-r from-[#F49B21] to-[#D4B86A] mx-auto rounded-full mb-8" />
          <p className="text-gray-400 max-w-2xl mx-auto text-lg italic">
            "Empowering your ideas with code, creativity, and community."
          </p>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-16 lg:w-[35%]">
            {featuresLeft.map((f, i) => (
              <FeatureItem key={`left-${i}`} feature={f} index={i} align="left" />
            ))}
          </div>

          {/* Center Image */}
          <div className="lg:w-[30%] flex justify-center relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Spinning Rings */}
              <div className="absolute -inset-6 border border-[#C8A951]/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-10 border border-[#C8A951]/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

              <img
                src="https://henceforthsolutions.com/wp-content/themes/henceforthsloutions/assets/images/why-choose/why-choose-image.webp"
                alt="Codes Thinker Team Collaboration"
                className="relative z-10 rounded-full w-64 h-64 md:w-85 md:h-85 object-cover border-8 border-[#0A1F3D] shadow-[0_0_60px_rgba(200,169,81,0.2)]"
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-16 lg:w-[35%]">
            {featuresRight.map((f, i) => (
              <FeatureItem key={`right-${i}`} feature={f} index={i} align="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;