"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { LuUser, LuMapPin, LuCalendar, LuLinkedin, LuGithub, LuTwitter, LuDribbble, LuMail, LuPhone, LuAward } from "react-icons/lu";
import { FaLinkedinIn, FaGithub, FaTwitter, FaDribbble } from "react-icons/fa";

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
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFi8siQCmQ4Pw/profile-displayphoto-scale_400_400/B56Z1x4gjHH4Ag-/0/1775732135135?e=1779926400&v=beta&t=8voE58pzgfwSTgcuWqvm11nzREh8nCJPAAEmcuUrKSs",
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
    avatar: "https://media-mct1-1.cdn.whatsapp.net/v/t61.24694-24/556963412_843844435197094_919066186063556731_n.jpg?ccb=11-4&oh=01_Q5Aa4gEHcouk9ZeSNdXkfqUKND3Yc-X6_lDvWIwfqSGGxrOLWA&oe=6A1259E0&_nc_sid=5e03e0&_nc_cat=100",
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
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQF_56wdXywwEg/profile-displayphoto-scale_400_400/B4DZ4BVsIqKsAg-/0/1778138924423?e=1779926400&v=beta&t=5sRvaafj_yCXfFOr0ZIgzQY57q3bVf5Xj86T72R29wM",
    location: "Pakistan",
    experience: "6+ years",
    email: "sadiq@company.com",
  },
  {
    id: "241693",
    name: "Shamail Ansari",
    role: "Backend Engineer",
    description: "API architect building robust, scalable backend systems. Expert in microservices and cloud infrastructure.",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "Docker"],
    social: [
      { platform: "linkedin", url: "#", icon: <FaLinkedinIn /> },
      { platform: "github", url: "#", icon: <FaGithub /> },
    ],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=300&auto=format&fit=crop",
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

const Team: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredOrb, setHoveredOrb] = useState<number | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const autoPlayTimeoutRef = useRef<number | undefined>(undefined);
  
  const TOTAL_ITEMS = teamMembers.length;
  const RADIUS = windowSize.width < 768 ? 160 : 260;

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

  const activeMember = teamMembers[activeIndex];

  // Smooth spring animation for orb positions
  const getOrbPosition = (index: number) => {
    const angle = (index / TOTAL_ITEMS) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * RADIUS;
    const y = Math.sin(angle) * RADIUS;
    return { x, y };
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 overflow-hidden font-sans py-12 md:py-12 px-4">
      {/* Enhanced Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-slate-600/20 to-gray-700/20 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm ring-1 ring-gray-200 shadow-lg rounded-full px-5 py-2"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59C22] animate-pulse"></div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Our Leadership Team</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 tracking-tight"
          >
            The Minds  <span className="text-[#F59C22] relative inline-block">
              Behind
              
            </span> Innovation
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            A collective of passionate experts dedicated to transforming complex challenges into seamless digital experiences.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT: Enhanced Orbiting System */}
          <div className="relative w-full lg:w-1/2 h-[450px] md:h-[550px] flex items-center justify-center">
            {/* Glowing Background Rings */}
            <motion.div 
              className="absolute border border-gray-200 rounded-full"
              style={{ width: RADIUS * 2, height: RADIUS * 2 }}
              animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: [0,0,1,1] }}
            />
            <motion.div 
              className="absolute border border-gray-300/50 rounded-full border-dashed"
              style={{ width: RADIUS * 1.5, height: RADIUS * 1.5 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: [0,0,1,1] }}
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
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-r from-[#F59C22] to-[#0F0D23] shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img 
                      src={activeMember.avatar} 
                      alt={activeMember.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#F59C22]/20 to-[#0F0D23]/20 blur-xl -z-10" />
              </motion.div>
            </AnimatePresence>

            {/* Orbiting Members */}
            {teamMembers.map((member, index) => {
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.25 : 1,
                      borderColor: isActive ? "#F59C22" : "#e5e7eb",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 bg-white shadow-lg transition-all duration-300 ${
                      isActive 
                        ? "ring-4 ring-[#F59C22]/30 shadow-xl" 
                        : "hover:shadow-xl hover:border-[#F59C22]/50"
                    }`}
                  >
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {isHovered && !isActive && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#F59C22]" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                  {isActive && (
                    <motion.div 
                      className="absolute -inset-1 rounded-full bg-[#F59C22]/20 -z-10"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Enhanced Member Info Card */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl ring-1 ring-gray-200 relative overflow-hidden group"
              >
                {/* Animated Brand Accent Line */}
                <motion.div 
                  className="w-24 h-1.5 bg-gradient-to-r from-[#0F0D23] to-[#0F0D23] rounded-full mb-8"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                <div className="space-y-6">
                  <div>
                    <motion.h3 
                      className="text-3xl md:text-4xl font-bold text-gray-900"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {activeMember.name}
                    </motion.h3>
                    
                    <motion.div 
                      className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <span className="text-[#F59C22] font-bold text-sm uppercase tracking-wider px-3 py-1 bg-amber-50 rounded-full">
                        {activeMember.role}
                      </span>
                      {activeMember.location && (
                        <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                          <LuMapPin className="text-[#F59C22]" size={14} /> 
                          {activeMember.location}
                        </span>
                      )}
                      {activeMember.experience && (
                        <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                          <LuCalendar className="text-[#F59C22]" size={14} /> 
                          {activeMember.experience} Exp
                        </span>
                      )}
                    </motion.div>
                  </div>

                  <motion.p 
                    className="text-gray-600 text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {activeMember.description}
                  </motion.p>

                  {/* Core Expertise Section */}
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <LuAward className="text-[#F59C22]" /> Core Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeMember.skills.slice(0, 6).map((skill, idx) => (
                        <motion.span 
                          key={skill} 
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs font-semibold rounded-lg ring-1 ring-gray-200 hover:ring-[#F59C22] hover:shadow-md transition-all cursor-default"
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

                  {/* Achievements Section (if available) */}
                  {activeMember.achievements && activeMember.achievements.length > 0 && (
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <LuAward className="text-[#F59C22]" /> Achievements
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeMember.achievements.map((achievement, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-semibold rounded-full ring-1 ring-amber-200"
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
                        className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-[#F59C22] hover:to-[#0F0D23] hover:text-white transition-all duration-300 shadow-sm group"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-lg">{social.icon}</span>
                      </motion.a>
                    ))}
                    {activeMember.email && (
                      <motion.a
                        href={`mailto:${activeMember.email}`}
                        className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-[#F59C22] hover:to-[#0F0D23] hover:text-white transition-all duration-300 shadow-sm"
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
              {teamMembers.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleManualSelection(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    activeIndex === idx 
                      ? "w-10 bg-gradient-to-r from-[#0F0D23] to-[#0F0D23]" 
                      : "w-2 bg-gray-300 hover:bg-gray-400"
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
                <div className="flex gap-1 items-center text-xs text-gray-400">
                  <span>Auto-playing</span>
                  <div className="flex gap-0.5">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 rounded-full bg-gray-400"
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
      </div>
    </section>
  );
};

export default Team;