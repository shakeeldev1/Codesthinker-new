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
import { SectionBadge } from "../ui/SectionBadge";
import { Link } from "react-router-dom";

// --- Components ---
const Button = ({ text }: { text: string }) => (
  <button className="inline-flex items-center justify-center bg-white text-[#08061E] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-lg">
    {text}
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
      className={`flex items-start gap-5 group ${isLeft ? "flex-row text-left" : "flex-row-reverse text-right"}`}
    >
      {/* Icon Wrapper */}
      <div className="shrink-0 mt-1 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110 shadow-lg transition-all duration-500">
        <Icon size={24} strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-bold text-white/90 text-xl tracking-wide group-hover:text-white transition-colors duration-500">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors duration-500">
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
    <section className="relative py-16 bg-[#08061E] overflow-hidden font-sans">
      {/* Premium Tech Grid Background & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Ambient Corner Glows */}
        <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-[#F69A20] opacity-[0.06] rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-[#4F46E5] opacity-[0.05] rounded-full blur-[150px]"></div>
        
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-white opacity-[0.03] blur-[100px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#08061E] via-transparent to-[#08061E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <SectionBadge text="Why Choose Us" theme="dark" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            <span className="text-2xl md:text-3xl font-semibold text-white/90 block mb-1">Why Choose</span>
            <span className="relative inline-block">
              Code's Thinker.
              <span
                className="absolute -bottom-1 left-0 h-[4px] bg-[#F69A20]/60 rounded-full w-full"
              />
            </span>
          </motion.h2>
        </div>

        {/* Circular Orbit Layout (Desktop Only) */}
        <div className="relative mt-16 hidden xl:flex justify-center items-center h-[650px] w-full max-w-[1200px] mx-auto">
          {/* Central Core */}
          <div className="absolute z-20 w-[300px] h-[300px] flex items-center justify-center">
            {/* Ambient Glow */}
            <div className="absolute inset-0 rounded-full filter blur-[80px] opacity-20 animate-pulse"
              style={{ background: 'radial-gradient(circle, #F69A20 0%, #ffffff 60%, transparent 100%)' }}
            />

            {/* Outer Orbital Rings */}
            <div className="absolute w-[120%] h-[120%] border border-white/10 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[90%] h-[90%] border border-white/[0.05] rounded-full animate-[spin_30s_linear_infinite_reverse]" />

            {/* Glowing Hexagon Core */}
            <div className="relative z-10 w-40 h-40 flex items-center justify-center transform transition-transform duration-700 hover:scale-110 hover:rotate-12">
              {/* Outer Hexagon */}
              <svg viewBox="0 0 200 200" className="absolute w-full h-full drop-shadow-[0_0_30px_rgba(246,154,32,0.5)] animate-[spin_20s_linear_infinite]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="hexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F69A20" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9"/>
                  </linearGradient>
                </defs>
                <polygon points="100,15 178,57.5 178,142.5 100,185 22,142.5 22,57.5" fill="none" stroke="url(#hexGrad1)" strokeWidth="2" />
              </svg>
              {/* Inner Hexagon (counter-spin) */}
              <svg viewBox="0 0 200 200" className="absolute w-[70%] h-[70%] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-[spin_15s_linear_infinite_reverse]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="hexGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#F69A20" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                <polygon points="100,15 178,57.5 178,142.5 100,185 22,142.5 22,57.5" fill="url(#hexGrad2)" fillOpacity="0.15" stroke="url(#hexGrad2)" strokeWidth="2" />
              </svg>
              {/* Center Diamond */}
              <svg viewBox="0 0 80 80" className="relative z-10 w-12 h-12 drop-shadow-[0_0_15px_rgba(246,154,32,0.8)]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F69A20"/>
                    <stop offset="100%" stopColor="#ffffff"/>
                  </linearGradient>
                </defs>
                <polygon points="40,5 75,40 40,75 5,40" fill="url(#diamondGrad)" />
              </svg>
            </div>
          </div>

          {/* Orbiting Feature Nodes */}
          {features.map((feature, i) => {
            // 6 features -> 60 degrees apart (Math.PI / 3)
            // Offset by -90 degrees (-Math.PI / 2) so the first item is at the top
            const angle = (i * 60 - 90) * (Math.PI / 180);
            
            // CREATIVE FIX: Use an Elliptical Orbit!
            // Wide horizontally to fill blank space, short vertically to prevent excessive height
            const xRadius = 520; 
            const yRadius = 260; 
            
            const x = Math.cos(angle) * xRadius;
            const y = Math.sin(angle) * yRadius;
            
            const isLeft = x < -10;
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                whileInView={{ opacity: 1, scale: 1, x: x, y: y }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-[300px] z-30 group"
                style={{
                  left: "calc(50% - 150px)",
                  top: "calc(50% - 40px)",
                }}
              >
                <div className={`flex items-center gap-4 ${isLeft ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                  {/* Glowing Icon Container */}
                  <div className="shrink-0 p-4 bg-[#08061E] backdrop-blur-md rounded-2xl border border-white/10 text-white/70 group-hover:text-white group-hover:border-white/30 group-hover:scale-110 shadow-2xl transition-all duration-500 relative overflow-hidden">
                     <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     <Icon size={28} strokeWidth={1.5} className="relative z-10" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-white/90 text-lg tracking-wide group-hover:text-white transition-colors duration-500 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-500 line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile/Tablet Grid View (Hidden on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:hidden mt-16">
          {features.map((f, i) => (
            <FeatureItem key={f.title} feature={f} index={i} align="left" />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
       <Link to="/about" className="inline-block">
          <Button text="More About Us" />
       </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
