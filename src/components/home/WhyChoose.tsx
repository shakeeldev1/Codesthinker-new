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
import type { LucideProps } from "lucide-react";
import video from "../../../public/video.mp4"

// --- Components ---
const Button = ({ text }: { text: string }) => (
  <button className="relative group overflow-hidden bg-white text-gray-900 font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(255,255,255,0.15)]">
    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
      {text}
    </span>
    <span className="absolute inset-0 bg-gradient-to-r from-[#F69A20] to-[#ffb44c] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
  </button>
);

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
}

const FeatureItem: React.FC<{ feature: Feature; index: number; align?: "left" | "right" }> = ({
  feature,
  index,
  align = "left",
}) => {
  const isLeft = align === "left";
  const Icon = feature.icon;

  return (
    <motion.article
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-4 group ${isLeft ? "flex-row text-left" : "flex-row-reverse text-right"}`}
    >
      {/* Icon Wrapper */}
      <div className="shrink-0 mt-1 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-gray-300 group-hover:text-white group-hover:bg-[#F69A20] group-hover:border-[#F69A20] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(246,154,32,0.4)] transition-all duration-300">
        <Icon size={24} strokeWidth={1.75} />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-semibold text-white text-lg lg:text-xl tracking-wide group-hover:text-[#F69A20] transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors duration-300">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
};

// --- Main Component ---
const WhyChoose: React.FC = () => {
  const features = [
    { title: "Live Project Tracking", description: "Real-time updates on milestones and deployments.", icon: Clock },
    { title: "Insightful Analytics", description: "Data-driven insights to optimize your growth.", icon: TrendingUp },
    { title: "Learning Hub", description: "Curated resources for your success.", icon: BookOpen },
    { title: "Award-Winning Solutions", description: "Innovative software recognized by experts.", icon: Award },
    { title: "Scalable Architecture", description: "Flexible systems built for the future.", icon: Briefcase },
    { title: "Vibrant Community", description: "Join a network of passionate developers.", icon: Users },
  ];

  return (
    <section className="relative py-12 bg-[#050414] overflow-hidden">
      {/* Background Video Media */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover  scale-105"
        >
          {/* Replaced broken Pexels download link with a verified fallback stream asset */}
          <source src={video} type="video/mp4" />
        </video>
        {/* Complex Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050414] via-[#050414]/70 to-[#050414]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,154,32,0.08)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg ring-1 ring-white/10 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F69A20] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F69A20]"></span>
            </span>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
              Why Choose Us
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            Why Choose <span className="text-[#F69A20] bg-clip-text bg-gradient-to-r from-[#F69A20] to-[#ffb44c]">Code's</span> Thinker
          </motion.h2>
        </div>

        {/* Features Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col gap-12 sm:gap-14 order-2 lg:order-1">
            {features.slice(0, 3).map((f, i) => (
              <FeatureItem key={f.title} feature={f} index={i} align="left" />
            ))}
          </div>

          {/* Center Graphic */}
          <motion.div 
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
            className="relative mx-auto order-1 lg:order-2 my-4 lg:my-0"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[#050414] rounded-full filter blur-[60px] opacity-20 animate-pulse duration-[6s]" />
            
            {/* Border Shield Ring */}
            <div className="relative p-3 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-[0_0_60px_rgba(246,154,32,0.15)] border-2 border-white/10 group">
                <img 
                  src="/why.png" 
                  alt="Team collaboration showcase" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110" 
                  loading="lazy" 
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="flex flex-col gap-12 sm:gap-14 order-3">
            {features.slice(3, 6).map((f, i) => (
              // Passing updated sequence index (i + 3) to keep smooth step delays across grids
              <FeatureItem key={f.title} feature={f} index={i + 3} align="right" />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-20 sm:mt-24"
        >
          <Button text="More About Us" />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;