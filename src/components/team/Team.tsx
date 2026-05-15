import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// --- Types ---
interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  social: { platform: string; url: string; icon: string }[];
  avatar: string;
  location?: string;
  experience?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "241740",
    name: "Waseem Malik",
    role: "CEO & Founder",
    description: "Visionary leader with 15+ years of experience in tech innovation. Passionate about building scalable solutions that transform businesses.",
    skills: ["React", "Next.js", "Node.js", "AWS", "Leadership"],
    social: [
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin" },
      { platform: "twitter", url: "#", icon: "fab fa-twitter" },
      { platform: "github", url: "#", icon: "fab fa-github" },
    ],
    avatar: "https://p16-common-sign.tiktokcdn.com/tos-alisg-avt-0068/042438a0d29f5af7865628aa1e630149~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=09c8c96c&x-expires=1778734800&x-signature=EP%2BtGyyzvVLQ6DK9Wq3fvI9%2BpPE%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my",
    location: "United States",
    experience: "15+ years",
  },
  {
    id: "125",
    name: "Faheem Bilal",
    role: "COO & Co-Founder",
    description: "Operations expert ensuring seamless execution of complex projects. Dedicated to building high-performing teams.",
    skills: ["System Design", "DevOps", "Kubernetes", "Team Management"],
    social: [
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin" },
      { platform: "twitter", url: "#", icon: "fab fa-twitter" },
    ],
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFi8siQCmQ4Pw/profile-displayphoto-scale_400_400/B56Z1x4gjHH4Ag-/0/1775732135135?e=1779926400&v=beta&t=8voE58pzgfwSTgcuWqvm11nzREh8nCJPAAEmcuUrKSs",
    location: "United Kingdom",
    experience: "12+ years",
  },
  {
    id: "241353",
    name: "M Shakeel",
    role: "General Manager",
    description: "Strategic thinker driving operational excellence and customer satisfaction.",
    skills: ["Strategic Planning", "Operations", "Leadership", "Agile"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://media-mct1-1.cdn.whatsapp.net/v/t61.24694-24/556963412_843844435197094_919066186063556731_n.jpg?ccb=11-4&oh=01_Q5Aa4gEHcouk9ZeSNdXkfqUKND3Yc-X6_lDvWIwfqSGGxrOLWA&oe=6A1259E0&_nc_sid=5e03e0&_nc_cat=100",
    location: "UAE",
    experience: "10+ years",
  },
  {
    id: "241738",
    name: "Assad-ullah",
    role: "CFO & Finance Lead",
    description: "Financial strategist ensuring sustainable growth and investment optimization.",
    skills: ["Financial Planning", "Risk Management", "Investment Strategy"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQGL16q3yApdRw/profile-displayphoto-scale_400_400/B4DZj_HCAuHwAk-/0/1756626700731?e=1779926400&v=beta&t=QXh0vzeMcQuFVzAk5hiXcNjZ8A9uefdcMbcxOYR-DCc",
    location: "Canada",
    experience: "18+ years",
  },
  {
    id: "241807",
    name: "Sadiq Hussain",
    role: "Mern Stack Developer",
    description: "Full-stack wizard crafting elegant solutions with modern JavaScript technologies.",
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    social: [
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin" },
      { platform: "github", url: "#", icon: "fab fa-github" },
    ],
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQF_56wdXywwEg/profile-displayphoto-scale_400_400/B4DZ4BVsIqKsAg-/0/1778138924423?e=1779926400&v=beta&t=5sRvaafj_yCXfFOr0ZIgzQY57q3bVf5Xj86T72R29wM",
    location: "Pakistan",
    experience: "6+ years",
  },
  {
    id: "241693",
    name: "Shamail Ansari",
    role: "Backend Engineer",
    description: "API architect building robust, scalable backend systems.",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Celery"],
    social: [
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin" },
      { platform: "github", url: "#", icon: "fab fa-github" },
    ],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "5+ years",
  },
  {
    id: "123",
    name: "Muhammad Ahmad",
    role: "Data Scientist",
    description: "Machine learning expert turning data into actionable insights.",
    skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Pandas"],
    social: [
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin" },
      { platform: "github", url: "#", icon: "fab fa-github" },
    ],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "4+ years",
  },
  {
    id: "241765",
    name: "Faizan Ali",
    role: "Mobile Developer",
    description: "Cross-platform mobile expert building beautiful, performant apps.",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    social: [
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin" },
      { platform: "github", url: "#", icon: "fab fa-github" },
    ],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "5+ years",
  },
  {
    id: "241735",
    name: "Shumaila Sial",
    role: "QA Engineer",
    description: "Quality advocate ensuring flawless user experiences through rigorous testing.",
    skills: ["Selenium", "Cypress", "Jest", "Automation", "Manual Testing"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "4+ years",
  },
  {
    id: "112",
    name: "Fiza Yaseen",
    role: "UI Designer",
    description: "Creative designer crafting intuitive, beautiful interfaces.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    social: [
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin" },
      { platform: "dribbble", url: "#", icon: "fab fa-dribbble" },
    ],
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "3+ years",
  },
  {
    id: "111",
    name: "Sara Khan",
    role: "HR Operations Manager",
    description: "People-first leader building exceptional company culture.",
    skills: ["Recruitment", "HR Strategy", "Employee Relations", "Performance Management"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&h=300&auto=format&fit=crop",
    location: "Pakistan",
    experience: "8+ years",
  },
];

// --- Particle Background Component ---
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          alpha: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 156, 36, ${particle.alpha})`;
        ctx.fill();
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ opacity: 0.4 }} />;
};

// --- Main Team Component ---
const Team: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="min-h-screen bg-[#030211] flex items-center justify-center text-white">
        No team members found.
      </div>
    );
  }

  const safeIndex = activeIndex >= teamMembers.length ? 0 : activeIndex;
  const activeMember = teamMembers[safeIndex];
  const TOTAL_ITEMS = teamMembers.length;
  const RADIUS = typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 280;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL_ITEMS);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, TOTAL_ITEMS]);

  const handleManualSelection = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative min-h-screen bg-[#030211] text-white py-16 md:py-24 px-6 overflow-hidden">
      <ParticleBackground />
      
      {/* Dynamic Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: shouldReduceMotion ? 1 : [1, 1.2, 1], 
            opacity: shouldReduceMotion ? 0.15 : [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-radial from-[#F59C24]/20 to-transparent rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: shouldReduceMotion ? 1 : [1, 1.1, 1], 
            opacity: shouldReduceMotion ? 0.1 : [0.05, 0.15, 0.05] 
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[140px]" 
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">Meet Our Leadership</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            The Minds Behind{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Innovation
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mt-4"
          >
            A collective of passionate experts dedicated to transforming ideas into reality
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* LEFT: Advanced Orbit System */}
          <div className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center">
            {/* Orbit Rings */}
            <div className="absolute border border-white/5 rounded-full" style={{ width: RADIUS * 2, height: RADIUS * 2 }} />
            <div className="absolute border border-white/3 rounded-full" style={{ width: RADIUS * 1.5, height: RADIUS * 1.5 }} />
            <div className="absolute border border-white/2 rounded-full" style={{ width: RADIUS * 0.8, height: RADIUS * 0.8 }} />

            {/* Central Avatar */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="relative z-20 w-56 h-56 md:w-72 md:h-72"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-[40px] opacity-30 animate-pulse" />
                <div className="relative w-full h-full rounded-full border-4 border-white/10 p-1.5 backdrop-blur-sm shadow-2xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent">
                  <img 
                    src={activeMember.avatar} 
                    alt={activeMember.name} 
                    className="w-full h-full rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Orbiting Team Members */}
            {teamMembers.map((member, index) => {
              const angle = (index / TOTAL_ITEMS) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              const isActive = safeIndex === index;

              return (
                <motion.div
                  key={member.id}
                  className="absolute z-30 cursor-pointer"
                  animate={{ x, y }}
                  transition={{ type: "spring", stiffness: 80, damping: 18 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleManualSelection(index)}
                >
                  <div className="relative group">
                    <motion.div
                      animate={{ 
                        scale: isActive ? 1.3 : 1,
                        borderColor: isActive ? "#F59C24" : "rgba(255,255,255,0.2)"
                      }}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                        isActive 
                          ? 'opacity-100 shadow-[0_0_25px_rgba(245,156,36,0.6)] ring-2 ring-amber-500/50' 
                          : 'opacity-50 hover:opacity-100 hover:grayscale-0 grayscale'
                      }`}
                    >
                      <img src={member.avatar} className="w-full h-full object-cover" alt={member.name} />
                    </motion.div>
                    {isActive && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="text-[10px] font-bold text-amber-400 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                          {member.name.split(' ')[0]}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Enhanced Profile Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, type: "spring", damping: 20 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Decorative line */}
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "4rem" }} 
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 mb-6" 
                />

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                    {activeMember.name}
                  </h2>
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
                      {activeMember.role}
                    </p>
                    {activeMember.experience && (
                      <>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <p className="text-white/40 text-xs">📅 {activeMember.experience} exp</p>
                      </>
                    )}
                    {activeMember.location && (
                      <>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <p className="text-white/40 text-xs">📍 {activeMember.location}</p>
                      </>
                    )}
                  </div>

                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 font-light">
                    {activeMember.description}
                  </p>

                  {/* Skills Section */}
                  <div className="mb-8">
                    <h4 className="text-[10px] uppercase text-white/40 tracking-[0.2em] font-bold mb-4">
                      Core Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeMember.skills.map((skill, i) => (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          transition={{ delay: i * 0.05 }}
                          key={skill} 
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 hover:bg-amber-500/20 hover:border-amber-500/30 hover:text-amber-300 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 pt-6 border-t border-white/10">
                    {activeMember.social.map((social, i) => (
                      <motion.a 
                        key={i} 
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all duration-300 text-white/60 hover:shadow-lg hover:shadow-amber-500/25"
                      >
                        <i className={social.icon}></i>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {teamMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleManualSelection(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    safeIndex === idx 
                      ? 'w-8 h-2 bg-amber-500' 
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`View ${teamMembers[idx].name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Team;