"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { LuUser, LuMapPin, LuCalendar, LuLinkedin, LuGithub, LuTwitter, LuDribbble, LuMail, LuPhone, LuAward, LuPlay, LuPause, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { FaLinkedinIn, FaGithub, FaTwitter, FaDribbble } from "react-icons/fa";
import { SectionBadge } from "../ui/SectionBadge";


// --- Types ---
interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  social: { platform: string; url: string; icon: React.ReactNode }[];
  avatar: string;
  location?: string;
  experience?: string;
  email?: string;
  achievements?: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: "241740",
    name: "Waseem Malik",
    role: "CEO & Founder",
    description: "Visionary leader with 15+ years of experience in tech innovation. Passionate about building scalable solutions that transform businesses and drive digital transformation.",
    skills: ["React", "Next.js", "Node.js", "AWS", "Leadership", "Strategic Planning"],
    social: [
      { platform: "linkedin", url: "#", icon: <FaLinkedinIn /> },
      { platform: "twitter", url: "#", icon: <FaTwitter /> },
      { platform: "github", url: "#", icon: <FaGithub /> },
    ],
    avatar: "https://media.licdn.com/dms/image/v2/D4D35AQHjWK7LfB9xEQ/profile-framedphoto-shrink_800_800/B4DZtfVWDwHQAg-/0/1766830989930?e=1779876000&v=beta&t=C1L2YjzIzP9tLkGLpxzR9iPJnZQiTMgT8hdJxLa4pwo",
    location: "United States",
    experience: "15+ years",
    email: "waseem@company.com",
    achievements: ["Tech Innovator Award 2023", "Forbes 30 Under 30", "Published Author"],
  },
  {
    id: "125",
    name: "Faheem Bilal",
    role: "COO & Co-Founder",
    description: "Operations expert ensuring seamless execution of complex projects. Dedicated to building high-performing teams and fostering innovation culture.",
    skills: ["System Design", "DevOps", "Kubernetes", "Team Management", "Agile", "Scrum"],
    social: [
      { platform: "linkedin", url: "#", icon: <FaLinkedinIn /> },
      { platform: "twitter", url: "#", icon: <FaTwitter /> },
    ],
    avatar: "public/F-malik.png",
    location: "United Kingdom",
    experience: "12+ years",
    email: "faheem@company.com",
    achievements: ["Operational Excellence Award", "Certified Scrum Master"],
  },
  {
    id: "241353",
    name: "M Shakeel",
    role: "General Manager",
    description: "Strategic thinker driving operational excellence and customer satisfaction. Expert in scaling businesses and optimizing workflows.",
    skills: ["Strategic Planning", "Operations", "Leadership", "Agile", "Business Development"],
    social: [{ platform: "linkedin", url: "#", icon: <FaLinkedinIn /> }],
    avatar: "public/sh.dev.jpg",
    location: "UAE",
    experience: "10+ years",
    email: "shakeel@company.com",
    achievements: ["GM of the Year 2022", "Customer Excellence Award"],
  },
  {
    id: "241738",
    name: "Muhammad Sarmad",
    role: "AI & Data Science Lead",
    description: "AI visionary architecting intelligent systems. Specializes in machine learning solutions that drive business intelligence and predictive analytics.",
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "Computer Vision"],
    social: [
      { platform: "linkedin", url: "#", icon: <FaLinkedinIn /> },
      { platform: "github", url: "#", icon: <FaGithub /> },
    ],
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFETwvo9BfeEw/profile-displayphoto-scale_400_400/B4DZ3.2IIBJUAo-/0/1778097096356?e=1781136000&v=beta&t=MSnzCmUHMsczdgZ4H9Q04kceDm5U4ISFsHLzfihyK1g",
    location: "Manchester, UK",
    experience: "18+ years",
    email: "sarmad@company.com",
    achievements: ["PhD in AI", "Google Developer Expert", "Published in Nature AI"],
  },
  {
    id: "241807",
    name: "Sadiq Hussain",
    role: "Mern Stack Developer",
    description: "Full-stack wizard crafting elegant solutions with modern JavaScript technologies. Passionate about clean code and performance optimization.",
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "GraphQL"],
    social: [
      { platform: "linkedin", url: "#", icon: <FaLinkedinIn /> },
      { platform: "github", url: "#", icon: <FaGithub /> },
    ],
    avatar: "public/sadiq.jpg",
    location: "Pakistan",
    experience: "6+ years",
    email: "sadiq@company.com",
  },
  {
    id: "241693",
    name: "Farhan Ahmad",
    role: "Frontend Developer",
    description: "API architect building robust, scalable backend systems. Expert in microservices and cloud infrastructure.",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "Docker"],
    social: [
      { platform: "linkedin", url: "#", icon: <FaLinkedinIn /> },
      { platform: "github", url: "#", icon: <FaGithub /> },
    ],
    avatar: "public/f.dev.png",
    location: "Pakistan",
    experience: "5+ years",
    email: "shamail@company.com",
  },
  {
    id: "123",
    name: "Muhammad Ahmad",
    role: "Data Scientist",
    description: "Machine learning expert turning data into actionable insights. Specializes in predictive modeling and data visualization.",
    skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Pandas", "Tableau"],
    social: [
      { platform: "linkedin", url: "#", icon: <FaLinkedinIn /> },
      { platform: "github", url: "#", icon: <FaGithub /> },
    ],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "4+ years",
    email: "ahmad@company.com",
  },
  {
    id: "241765",
    name: "Faizan Ali",
    role: "Mobile Developer",
    description: "Cross-platform mobile expert building beautiful, performant apps. Passionate about creating seamless mobile experiences.",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase", "Swift"],
    social: [
      { platform: "linkedin", url: "#", icon: <FaLinkedinIn /> },
      { platform: "github", url: "#", icon: <FaGithub /> },
    ],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "5+ years",
    email: "faizan@company.com",
  },
  {
    id: "241735",
    name: "Shumaila Sial",
    role: "QA Engineer",
    description: "Quality advocate ensuring flawless user experiences through rigorous testing. Expert in automation and CI/CD pipelines.",
    skills: ["Selenium", "Cypress", "Jest", "Automation", "Manual Testing", "CI/CD"],
    social: [{ platform: "linkedin", url: "#", icon: <FaLinkedinIn /> }],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "4+ years",
    email: "shumaila@company.com",
  },
  {
    id: "112",
    name: "Fiza Yaseen",
    role: "UI Designer",
    description: "Creative designer crafting intuitive, beautiful interfaces. Passionate about user-centered design and design systems.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems"],
    social: [
      { platform: "linkedin", url: "#", icon: <FaLinkedinIn /> },
      { platform: "dribbble", url: "#", icon: <FaDribbble /> },
    ],
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "3+ years",
    email: "fiza@company.com",
  },
  {
    id: "111",
    name: "Sara Khan",
    role: "HR Operations Manager",
    description: "People-first leader building exceptional company culture. Expert in talent acquisition and employee development.",
    skills: ["Recruitment", "HR Strategy", "Employee Relations", "Performance Management", "Training & Development"],
    social: [{ platform: "linkedin", url: "#", icon: <FaLinkedinIn /> }],
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "8+ years",
    email: "sara@company.com",
    achievements: ["HR Excellence Award 2023", "Certified HR Professional"],
  },
];

const executives = teamMembers.slice(0, 4);
const normalStaff = teamMembers.slice(4);

const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&h=250&auto=format&fit=crop";

const StaffCard: React.FC<{ member: TeamMember; index: number; onSelect: () => void }> = ({ member, index, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: Math.min(index * 0.05, 0.3) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      className="group relative cursor-pointer flex flex-col bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-[2.5rem] p-4 shadow-[0_10px_30px_rgba(7,5,29,0.03)] hover:shadow-[0_40px_100px_-20px_rgba(244,155,33,0.25)] hover:border-[#F49B21]/30 hover:-translate-y-4 hover:scale-[1.02] transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] z-10 overflow-hidden"
    >
      {/* Premium Executive Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-[#F49B21]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] pointer-events-none z-0" />
      
      {/* Animated Top Premium Strip */}
      <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#07051D] to-[#F49B21] opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] z-20" />

      {/* Portrait Box */}
      <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-inner group-hover:shadow-[0_10px_30px_rgba(7,5,29,0.15)] transition-all duration-[800ms] z-10">
        <img 
          src={member.avatar} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }}
        />
        {/* Soft shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07051D]/60 via-[#07051D]/10 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-[800ms]" />
      </div>

      {/* Content Box */}
      <div className="pt-6 pb-3 px-3 flex flex-col justify-between flex-grow relative z-10">
        <div className="space-y-3">
          {/* Header Row: Role & Location */}
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
            <span className="px-3 py-1 rounded-lg bg-slate-100 text-[#07051D] border border-slate-200/60 group-hover:bg-[#07051D] group-hover:text-white transition-colors duration-[600ms]">
              {member.role}
            </span>
            {member.location && (
              <span className="text-slate-400 group-hover:text-slate-600 transition-colors duration-[600ms] flex items-center gap-1.5">
                <LuMapPin className="text-[#F49B21] w-3.5 h-3.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-[600ms]" /> {member.location}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-extrabold text-[1.4rem] text-[#07051D] group-hover:text-[#F49B21] transition-colors duration-[800ms] pt-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {member.name}
          </h3>
        </div>

        {/* Footer: Experience & Clean Accent */}
        <div className="pt-5 mt-5 border-t border-slate-100 group-hover:border-slate-200 transition-colors duration-[600ms] flex items-center justify-between">
          {member.experience && (
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors duration-[600ms] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F49B21] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F49B21]"></span>
              </span>
              {member.experience} EXP
            </span>
          )}
          
          <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#F49B21] flex items-center justify-center transition-colors duration-[600ms] shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-white transition-colors duration-[600ms]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const getRoleTheme = (role: string) => {
  const lowerRole = role.toLowerCase();
  
  // Design / UI / UX -> Warm brand orange accent (#F49B21)
  if (lowerRole.includes('design') || lowerRole.includes('ui/ux') || lowerRole.includes('creative')) {
    return {
      text: 'text-[#F49B21]',
      bg: 'from-[#F49B21]/[0.05] via-[#F49B21]/[0.01] to-transparent',
      border: 'border-[#F49B21]/30',
      fill: 'bg-[#F49B21]',
      hoverFill: 'hover:bg-[#F49B21]/90',
      gradient: 'from-[#F49B21] to-amber-500',
      shadow: 'shadow-[0_8px_20px_rgba(244,155,33,0.25)] hover:shadow-[0_12px_25px_rgba(244,155,33,0.35)]',
    };
  }
  
  // Developer / Tech / QA -> Brand dark navy (#07051D)
  if (lowerRole.includes('developer') || lowerRole.includes('engineer') || lowerRole.includes('qa') || lowerRole.includes('architect') || lowerRole.includes('scientist')) {
    return {
      text: 'text-[#07051D]',
      bg: 'from-[#07051D]/[0.04] via-[#07051D]/[0.01] to-transparent',
      border: 'border-[#07051D]/20',
      fill: 'bg-[#07051D]',
      hoverFill: 'hover:bg-[#07051D]/90',
      gradient: 'from-[#07051D] to-slate-700',
      shadow: 'shadow-[0_8px_20px_rgba(7,5,29,0.15)] hover:shadow-[0_12px_25px_rgba(7,5,29,0.25)]',
    };
  }
  
  // HR / Operations -> Brand orange blending to navy (#07051D)
  if (lowerRole.includes('hr') || lowerRole.includes('operations') || lowerRole.includes('talent')) {
    return {
      text: 'text-[#F49B21]',
      bg: 'from-[#F49B21]/[0.03] via-[#07051D]/[0.02] to-transparent',
      border: 'border-[#F49B21]/20',
      fill: 'bg-[#F49B21]',
      hoverFill: 'hover:bg-[#07051D]',
      gradient: 'from-[#07051D] to-[#F49B21]',
      shadow: 'shadow-[0_8px_20px_rgba(244,155,33,0.2)] hover:shadow-[0_12px_25px_rgba(244,155,33,0.3)]',
    };
  }
  
  // Management / PM -> Premium brand navy blending to orange (#07051D / #F49B21)
  if (lowerRole.includes('manager') || lowerRole.includes('lead') || lowerRole.includes('head')) {
    return {
      text: 'text-[#07051D]',
      bg: 'from-[#07051D]/[0.03] via-[#F49B21]/[0.01] to-transparent',
      border: 'border-[#07051D]/20',
      fill: 'bg-[#07051D]',
      hoverFill: 'hover:bg-slate-800',
      gradient: 'from-[#F49B21] to-[#07051D]',
      shadow: 'shadow-[0_8px_20px_rgba(7,5,29,0.25)] hover:shadow-[0_12px_25px_rgba(7,5,29,0.35)]',
    };
  }

  // Marketing / Sales -> Warm brand orange (#F49B21)
  if (lowerRole.includes('marketing') || lowerRole.includes('sales') || lowerRole.includes('content') || lowerRole.includes('social')) {
    return {
      text: 'text-[#F49B21]',
      bg: 'from-[#F49B21]/[0.05] via-[#F49B21]/[0.01] to-transparent',
      border: 'border-[#F49B21]/30',
      fill: 'bg-[#F49B21]',
      hoverFill: 'hover:bg-[#F49B21]/90',
      gradient: 'from-[#F49B21] to-amber-500',
      shadow: 'shadow-[0_8px_20px_rgba(244,155,33,0.25)] hover:shadow-[0_12px_25px_rgba(244,155,33,0.35)]',
    };
  }
  
  return {
    text: 'text-[#07051D]',
    bg: 'from-[#07051D]/[0.02] to-transparent',
    border: 'border-slate-200',
    fill: 'bg-[#07051D]',
    hoverFill: 'hover:bg-slate-800',
    gradient: 'from-slate-800 to-[#07051D]',
    shadow: 'shadow-[0_8px_20px_rgba(7,5,29,0.12)] hover:shadow-[0_12px_25px_rgba(7,5,29,0.2)]',
  };
};

interface RoleBackgroundCanvasProps {
  role: string;
}

const RoleBackgroundCanvas: React.FC<RoleBackgroundCanvasProps> = ({ role }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const lowerRole = role.toLowerCase();
    let themeType: 'design' | 'tech' | 'hr' | 'management' | 'marketing' | 'default' = 'default';

    if (lowerRole.includes('design') || lowerRole.includes('ui/ux') || lowerRole.includes('creative')) {
      themeType = 'design';
    } else if (lowerRole.includes('developer') || lowerRole.includes('engineer') || lowerRole.includes('qa') || lowerRole.includes('architect') || lowerRole.includes('scientist')) {
      themeType = 'tech';
    } else if (lowerRole.includes('hr') || lowerRole.includes('operations') || lowerRole.includes('talent')) {
      themeType = 'hr';
    } else if (lowerRole.includes('manager') || lowerRole.includes('lead') || lowerRole.includes('head')) {
      themeType = 'management';
    } else if (lowerRole.includes('marketing') || lowerRole.includes('sales') || lowerRole.includes('content') || lowerRole.includes('social')) {
      themeType = 'marketing';
    }

    // Palette-derived background particle colors (F49B21 = Orange, 07051D = Navy)
    const themeColors = {
      design: 'rgba(244, 155, 33, 0.08)',     // Brand Orange
      tech: 'rgba(7, 5, 29, 0.07)',           // Brand Navy
      hr: 'rgba(244, 155, 33, 0.07)',         // Warm Orange
      management: 'rgba(7, 5, 29, 0.07)',     // Brand Navy
      marketing: 'rgba(244, 155, 33, 0.08)',  // Brand Orange
      default: 'rgba(7, 5, 29, 0.05)',
    };

    const activeColor = themeColors[themeType];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      type: string;
    }

    const particles: Particle[] = [];
    const numParticles = 14; // Slightly more for prominent design

    const designSymbols = ['bezier', 'grid', 'circle', 'square'];
    const techSymbols = ['{}', '</>', '[]', '10', '&&', ';'];
    const hrSymbols = ['heart', 'bubble', 'people', 'connection'];
    const managementSymbols = ['chart', 'trend', 'check', 'ring'];
    const marketingSymbols = ['camera', 'megaphone', 'globe', 'star'];

    for (let i = 0; i < numParticles; i++) {
      const type = themeType;
      let symbol = '';

      if (type === 'design') {
        symbol = designSymbols[Math.floor(Math.random() * designSymbols.length)];
      } else if (type === 'tech') {
        symbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
      } else if (type === 'hr') {
        symbol = hrSymbols[Math.floor(Math.random() * hrSymbols.length)];
      } else if (type === 'management') {
        symbol = managementSymbols[Math.floor(Math.random() * managementSymbols.length)];
      } else if (type === 'marketing') {
        symbol = marketingSymbols[Math.floor(Math.random() * marketingSymbols.length)];
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35, // Slightly slower, more professional glide
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 25 + 18,
        opacity: Math.random() * 0.4 + 0.4, // Slightly more prominent
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        type: symbol || 'dot',
      });
    }

    const drawCamera = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.rect(-size/2, -size/3, size, size * 0.7);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, size * 0.02, size * 0.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillRect(-size * 0.35, -size * 0.45, size * 0.2, size * 0.12);
      ctx.beginPath();
      ctx.arc(size * 0.3, -size * 0.1, size * 0.05, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawMegaphone = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.moveTo(-size/3, -size/6);
      ctx.lineTo(size/3, -size/3);
      ctx.lineTo(size/3, size/3);
      ctx.lineTo(-size/3, size/6);
      ctx.closePath();
      ctx.stroke();
      ctx.fillRect(-size/4, size/6, size/8, size/3);
    };

    const drawBezier = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.moveTo(-size/2, size/4);
      ctx.bezierCurveTo(-size/4, -size/2, size/4, -size/2, size/2, size/4);
      ctx.stroke();
      ctx.fillStyle = activeColor.replace('0.07', '0.4').replace('0.08', '0.4');
      ctx.fillRect(-size/2 - 3, size/4 - 3, 6, 6);
      ctx.fillRect(size/2 - 3, size/4 - 3, 6, 6);
      ctx.beginPath();
      ctx.arc(0, -size/3, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawChart = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.moveTo(-size/2, size/2);
      ctx.lineTo(size/2, size/2);
      ctx.moveTo(-size/2, size/2);
      ctx.lineTo(-size/2, -size/2);
      ctx.stroke();
      ctx.fillStyle = activeColor.replace('0.07', '0.3').replace('0.08', '0.3');
      ctx.fillRect(-size/3, 0, size/6, size/2);
      ctx.fillRect(-size/12, -size/4, size/6, size/2 + size/4);
      ctx.fillRect(size/6, -size/2 + 5, size/6, size/2 + size/2 - 5);
    };

    const drawBubble = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.strokeRect(-size/2, -size/3, size, size * 0.6);
      ctx.moveTo(-size/4, size/4);
      ctx.lineTo(-size/3, size/2);
      ctx.lineTo(-size/8, size/4);
      ctx.stroke();
    };

    const drawHeart = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      const x = 0, y = -size/6;
      ctx.moveTo(x, y + size/4);
      ctx.bezierCurveTo(x - size/2, y - size/2, x - size, y + size/3, x, y + size * 0.85);
      ctx.bezierCurveTo(x + size, y + size/3, x + size/2, y - size/2, x, y + size/4);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Unique prominent design logic: Tech constellations
      if (themeType === 'tech') {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = activeColor.replace(/[\d.]+\)$/, `${(1 - dist/130) * 0.12})`);
              ctx.lineWidth = 1.0;
              ctx.stroke();
            }
          }
        }
      }

      // Unique prominent design logic: Design bezier spline connection
      if (themeType === 'design' && particles.length > 2) {
        ctx.beginPath();
        ctx.moveTo(particles[0].x, particles[0].y);
        for (let i = 1; i < particles.length - 2; i++) {
          const xc = (particles[i].x + particles[i + 1].x) / 2;
          const yc = (particles[i].y + particles[i + 1].y) / 2;
          ctx.quadraticCurveTo(particles[i].x, particles[i].y, xc, yc);
        }
        ctx.strokeStyle = activeColor.replace(/[\d.]+\)$/, '0.05)');
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = height + p.size;
        if (p.y > height + p.size) p.y = -p.size;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.strokeStyle = activeColor.replace(/[\d.]+\)$/, `${p.opacity * 0.35})`);
        ctx.fillStyle = activeColor.replace(/[\d.]+\)$/, `${p.opacity * 0.15})`);
        ctx.lineWidth = 1.5;

        if (themeType === 'tech') {
          ctx.font = `${p.size * 0.8}px monospace`;
          ctx.fillStyle = activeColor.replace(/[\d.]+\)$/, `${p.opacity * 0.25})`);
          ctx.fillText(p.type, -p.size / 2, p.size / 3);
        } else {
          switch (p.type) {
            case 'bezier':
              drawBezier(ctx, p.size);
              break;
            case 'grid':
              ctx.strokeRect(-p.size/2, -p.size/2, p.size, p.size);
              ctx.beginPath();
              ctx.moveTo(0, -p.size/2); ctx.lineTo(0, p.size/2);
              ctx.moveTo(-p.size/2, 0); ctx.lineTo(p.size/2, 0);
              ctx.stroke();
              break;
            case 'circle':
              ctx.beginPath();
              ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
              ctx.stroke();
              break;
            case 'square':
              ctx.strokeRect(-p.size/2, -p.size/2, p.size, p.size);
              break;
            case 'camera':
              drawCamera(ctx, p.size);
              break;
            case 'megaphone':
              drawMegaphone(ctx, p.size);
              break;
            case 'globe':
              ctx.beginPath();
              ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
              ctx.stroke();
              break;
            case 'star':
              ctx.beginPath();
              for (let i = 0; i < 5; i++) {
                ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * (p.size/2), -Math.sin((18 + i * 72) * Math.PI / 180) * (p.size/2));
              }
              ctx.closePath();
              ctx.stroke();
              break;
            case 'heart':
              drawHeart(ctx, p.size);
              break;
            case 'bubble':
              drawBubble(ctx, p.size);
              break;
            case 'chart':
              drawChart(ctx, p.size);
              break;
            case 'trend':
              ctx.beginPath();
              ctx.moveTo(-p.size/2, p.size/3);
              ctx.lineTo(-p.size/6, p.size/6);
              ctx.lineTo(p.size/6, -p.size/6);
              ctx.lineTo(p.size/2, -p.size/3);
              ctx.stroke();
              break;
            case 'check':
              ctx.beginPath();
              ctx.moveTo(-p.size/3, 0);
              ctx.lineTo(-p.size/10, p.size/4);
              ctx.lineTo(p.size/3, -p.size/4);
              ctx.stroke();
              break;
            default:
              ctx.beginPath();
              ctx.arc(0, 0, p.size/4, 0, Math.PI * 2);
              ctx.fill();
              ctx.stroke();
          }
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [role]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};

const Team: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedStaff, setSelectedStaff] = useState<TeamMember | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredOrb, setHoveredOrb] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1024, 
    height: typeof window !== 'undefined' ? window.innerHeight : 768 
  });
  const autoPlayTimeoutRef = useRef<number | undefined>(undefined);

  // Close modal on escape keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedStaff(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  
  const TOTAL_ITEMS = executives.length;
  const getRadius = (width: number) => {
    if (width < 380) return 100;
    if (width < 500) return 130;
    if (width < 768) return 160;
    if (width < 1024) return 220;
    return 260;
  };
  const RADIUS = getRadius(windowSize.width);

  // Handle window resize for responsive radius
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL_ITEMS);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, TOTAL_ITEMS]);

  const handleManualSelection = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    
    // Clear existing timeout
    if (autoPlayTimeoutRef.current !== undefined) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    // Resume autoplay after 10 seconds of inactivity
    autoPlayTimeoutRef.current = window.setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, []);

  const activeMember = executives[activeIndex];

  // Smooth spring animation for orb positions
  const getOrbPosition = (index: number) => {
    const angle = (index / TOTAL_ITEMS) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * RADIUS;
    const y = Math.sin(angle) * RADIUS;
    return { x, y };
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F9FAFB] overflow-hidden font-sans py-16 px-4">
      {/* Ambient Floating Luxury Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#F49B21]/6 to-transparent rounded-full filter blur-[100px] animate-pulse"
        />
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-[#07051D]/4 to-transparent rounded-full filter blur-[120px] animate-pulse delay-1000"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(244,155,33,0.015)_0%,transparent_70%)] filter blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionBadge text="Executive Leadership" theme="light" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-[#07051D] tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            The Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F49B21] to-amber-500">Innovation</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto font-light"
          >
            A collective of passionate experts dedicated to transforming complex challenges into seamless digital experiences.
          </motion.p>
        </div>

        {/* Orbit System Row */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT: Enhanced Orbiting System */}
          <div className="relative w-full lg:w-1/2 h-[340px] sm:h-[450px] md:h-[550px] flex items-center justify-center select-none overflow-visible">
            {/* Glowing Concentric Background Rings */}
            <motion.div 
              className="absolute border border-slate-200/50 rounded-full"
              style={{ width: RADIUS * 2, height: RADIUS * 2 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute border border-dashed border-[#F49B21]/15 rounded-full"
              style={{ width: RADIUS * 1.5, height: RADIUS * 1.5 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute border border-dotted border-slate-350/20 rounded-full"
              style={{ width: RADIUS * 1.1, height: RADIUS * 1.1 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Central Hero Avatar */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: -180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-20"
              >
                {/* Ultra-premium glowing halo behind the executive */}
                <div className="absolute -inset-8 bg-gradient-to-tr from-[#F49B21]/40 via-[#07051D]/10 to-[#F49B21]/40 rounded-full blur-[40px] opacity-70 animate-pulse-slow -z-10" />
                
                <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-[4px] bg-gradient-to-tr from-[#07051D] via-amber-400 to-[#F49B21] shadow-[0_20px_60px_-15px_rgba(244,155,33,0.4)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 animate-[spin_4s_linear_infinite]" />
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#07051D] relative z-10 border-[4px] border-white/90">
                    <img 
                      src={activeMember.avatar} 
                      alt={activeMember.name} 
                      className="w-full h-full object-cover transform transition-transform duration-[1500ms] group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07051D]/40 to-transparent opacity-60 mix-blend-overlay" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Orbiting Members */}
            {executives.map((member, index) => {
              const { x, y } = getOrbPosition(index);
              const isActive = activeIndex === index;
              const isHovered = hoveredOrb === index;
              const delay = index * 0.05;

              return (
                <motion.div
                  key={member.id}
                  className="absolute z-30 cursor-pointer group"
                  initial={{ x: 0, y: 0, scale: 0 }}
                  animate={{ x, y, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20,
                    delay: delay + 0.5
                  }}
                  onClick={() => handleManualSelection(index)}
                  onMouseEnter={() => setHoveredOrb(index)}
                  onMouseLeave={() => setHoveredOrb(null)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.25 : 1,
                      borderColor: isActive ? "#F49B21" : "#e5e7eb",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 bg-white shadow-lg transition-all duration-300 ${
                      isActive 
                        ? "ring-4 ring-[#F49B21]/30 shadow-xl" 
                        : "hover:shadow-xl hover:border-[#F49B21]/50"
                    }`}
                  >
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }}
                    />
                    {isHovered && !isActive && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#F49B21] animate-ping" />
                      </div>
                    )}
                  </motion.div>
                  {isActive && (
                    <motion.div 
                      className="absolute -inset-1 rounded-full bg-[#F49B21]/20 -z-10"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Enhanced Member Info Card */}
          <div className="w-full lg:w-1/2 relative z-30">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="bg-white/95 backdrop-blur-3xl border border-slate-100 shadow-[0_40px_100px_-20px_rgba(7,5,29,0.15)] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group hover:shadow-[0_40px_100px_-20px_rgba(244,155,33,0.2)] transition-shadow duration-[1000ms]"
              >
                {/* Ultra-premium Leadership Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#F49B21]/[0.02] to-[#07051D]/[0.02] opacity-100 pointer-events-none" />
                
                {/* Animated Top Premium Strip */}
                <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#07051D] via-[#F49B21] to-[#07051D] bg-[length:200%_auto] animate-[sweep_3s_linear_infinite]" />

                {/* Animated Brand Accent Line */}
                <motion.div 
                  className="w-24 h-1.5 bg-[#F49B21] rounded-full mb-8 shadow-[0_0_15px_rgba(244,155,33,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                />

                <div className="space-y-6 relative z-10">
                  <div>
                    <motion.h3 
                      className="text-3xl lg:text-4xl font-extrabold text-[#07051D] tracking-tight"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {activeMember.name}
                    </motion.h3>
                    
                    <motion.div 
                      className="flex flex-wrap items-center gap-y-3 gap-x-5 mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <span className="text-white font-extrabold text-[11px] uppercase tracking-[0.2em] px-4 py-2 bg-gradient-to-r from-[#07051D] to-[#1a1540] border border-[#07051D]/20 rounded-full shadow-lg shadow-[#07051D]/20">
                        {activeMember.role}
                      </span>
                      {activeMember.location && (
                        <span className="flex items-center gap-2 text-slate-500 text-[13px] font-bold uppercase tracking-widest">
                          <LuMapPin className="text-[#F49B21]" size={16} /> 
                          {activeMember.location}
                        </span>
                      )}
                      {activeMember.experience && (
                        <span className="flex items-center gap-2 text-slate-500 text-[13px] font-bold uppercase tracking-widest">
                          <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F49B21] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F49B21]"></span>
                          </span>
                          {activeMember.experience} Exp
                        </span>
                      )}
                    </motion.div>
                  </div>

                  <motion.p 
                    className="text-slate-600 text-[1.05rem] leading-relaxed font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {activeMember.description}
                  </motion.p>

                  {/* Core Expertise Section */}
                  <motion.div 
                    className="space-y-4 pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <LuAward className="text-[#F49B21] scale-110" /> Leadership Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {activeMember.skills.slice(0, 6).map((skill, idx) => (
                        <motion.span 
                          key={skill} 
                          className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200/60 hover:border-[#F49B21] hover:text-[#07051D] transition-all cursor-default"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Achievements Section */}
                  {activeMember.achievements && activeMember.achievements.length > 0 && (
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <LuAward className="text-[#F49B21]" /> Key Milestones
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeMember.achievements.map((achievement, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1.5 bg-[#F8FAFC] border border-slate-200/50 text-[#475569] text-xs font-semibold rounded-full shadow-sm"
                          >
                            🏆 {achievement}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Enhanced Social Links */}
                  <motion.div 
                    className="flex items-center gap-3 pt-6 border-t border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {activeMember.social.map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-[#F1F5F9] text-slate-600 rounded-xl hover:bg-[#07051D] hover:text-white transition-all duration-300 border border-slate-200/60 shadow-sm"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-lg">{social.icon}</span>
                      </motion.a>
                    ))}
                    {activeMember.email && (
                      <motion.a
                        href={`mailto:${activeMember.email}`}
                        className="p-2.5 bg-[#F1F5F9] text-slate-600 rounded-xl hover:bg-[#07051D] hover:text-white transition-all duration-300 border border-slate-200/60 shadow-sm"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <LuMail className="text-lg" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-50 to-transparent rounded-tl-3xl -z-10" />
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Pagination Dots */}
            <div className="flex justify-center lg:justify-start gap-2 mt-10">
              {executives.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleManualSelection(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    activeIndex === idx 
                      ? "w-10 bg-[#07051D]" 
                      : "w-2 bg-gray-350 hover:bg-gray-400"
                  }`}
                  whileHover={{ scaleY: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={activeIndex === idx ? { scaleX: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            {isAutoPlaying && (
              <motion.div 
                className="flex justify-center lg:justify-start gap-1 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex gap-1 items-center text-xs text-gray-450">
                  <span>Auto-playing</span>
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tier 2: Core Talent Cards */}
        <div className="mt-14 pt-12 border-t border-slate-200/60">
          <div className="text-center mb-16 space-y-4">
            <SectionBadge text="Core Talent" theme="light" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07051D] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Our Engineering & Creative Force
            </h2>
            <p className="text-slate-550 text-base max-w-xl mx-auto font-light">
              Meet the specialists, engineers, and designers who craft, scale, and deliver digital solutions at Codes Thinker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {normalStaff.map((member) => {
              const theme = getRoleTheme(member.role);
              const accentColor = theme.bg.includes('F49B21') ? '#F49B21' : '#07051D';
              
              return (
                <div key={member.id} className={`group relative bg-white/95 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-[0_10px_30px_-10px_rgba(7,5,29,0.05)] border border-slate-100 transition-all duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-3 hover:scale-[1.015] hover:shadow-[0_40px_80px_-20px_rgba(${accentColor === '#F49B21' ? '244,155,33' : '7,5,29'},0.2)] overflow-hidden flex flex-col cursor-pointer`}>
                  
                  {/* Dynamic Blurred Background Image on Hover */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-[1000ms] ease-out pointer-events-none">
                    <img 
                      src={member.avatar} 
                      alt="" 
                      className="w-full h-full object-cover scale-150 blur-2xl" 
                    />
                  </div>
                  
                  {/* Elegant Top Border Strip */}
                  <div className={`absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] scale-x-0 group-hover:scale-x-100 origin-left`} />

                  {/* Content Container */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header: Small Tasteful Avatar and Name/Role */}
                    <div className="flex flex-col sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center gap-5 mb-6">
                      {/* Avatar Ring */}
                      <div className={`w-20 h-20 rounded-full p-[3px] bg-slate-100 group-hover:bg-gradient-to-br ${theme.gradient} flex-shrink-0 shadow-sm group-hover:shadow-[0_10px_30px_rgba(${accentColor === '#F49B21' ? '244,155,33' : '7,5,29'},0.25)] transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.05]`}>
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110" onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }} />
                        </div>
                      </div>
                      
                      <div className="transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-1.5">
                        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#F49B21] transition-colors duration-[600ms]" style={{ fontFamily: "'Outfit', sans-serif" }}>{member.name}</h3>
                        <span className={`${theme.text} font-bold text-[10px] uppercase tracking-[0.2em] mt-1 block opacity-80 group-hover:opacity-100 transition-opacity duration-500`}>{member.role}</span>
                        {member.location && (
                          <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-medium mt-1.5 group-hover:text-slate-600 transition-colors duration-500">
                            <LuMapPin size={14} className="text-[#F49B21]/70 group-hover:text-[#F49B21]" /> {member.location}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-slate-500 text-[15px] leading-relaxed font-light mb-8 flex-grow transition-colors duration-500 group-hover:text-slate-800">
                      {member.description}
                    </p>

                    <div className="space-y-3 mb-6 relative z-30">
                      <div className="flex flex-wrap gap-2.5">
                        {member.skills.slice(0, 4).map(skill => (
                          <span key={skill} className="px-3.5 py-1.5 bg-slate-50 group-hover:bg-white text-slate-500 text-[11px] font-semibold rounded-full border border-slate-200/60 group-hover:border-slate-300 transition-all duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between relative z-30">
                      <div className="flex gap-3">
                        {member.social.map((s, i) => (
                          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-white hover:bg-[#07051D] transition-all duration-[500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] border border-slate-200/50 hover:-translate-y-1 hover:shadow-md">
                            <span className="text-[15px]">{s.icon}</span>
                          </a>
                        ))}
                      </div>
                      {member.email && (
                        <a href={`mailto:${member.email}`} className={`px-6 h-10 flex items-center justify-center gap-2 rounded-full bg-slate-50 text-slate-500 hover:text-white transition-all duration-[500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] border border-slate-200/50 hover:-translate-y-1 hover:shadow-md ${theme.hoverFill} font-bold text-[11px] uppercase tracking-widest`}>
                          <LuMail className="text-[15px]" /> Contact
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Team;