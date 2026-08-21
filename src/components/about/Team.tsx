import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  social: { platform: string; url: string; icon: string }[];
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "241740",
    name: "Waseem Malik",
    role: "CEO & Founder",
    description: "Full stack developer with expertise in React, Next.js, and cloud technologies. Passionate about building scalable web applications.",
    skills: ["React", "Next.js", "Node.js", "AWS"],
    social: [
      { platform: "linkedin", url: "#", icon: "fab fa-linkedin" },
      { platform: "twitter", url: "#", icon: "fab fa-x-twitter" },
    ],
    avatar: "https://p16-common-sign.tiktokcdn.com/tos-alisg-avt-0068/042438a0d29f5af7865628aa1e630149~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=09c8c96c&x-expires=1778734800&x-signature=EP%2BtGyyzvVLQ6DK9Wq3fvI9%2BpPE%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my",
  },
  {
    id: "125",
    name: "Faheem Bilal",
    role: "COO & Co-Founder",
    description: "Technical lead with 8+ years of experience in software architecture and team management.",
    skills: ["System Design", "DevOps", "Kubernetes"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFi8siQCmQ4Pw/profile-displayphoto-scale_400_400/B56Z1x4gjHH4Ag-/0/1775732135135?e=1779926400&v=beta&t=8voE58pzgfwSTgcuWqvm11nzREh8nCJPAAEmcuUrKSs",
  },
  {
    id: "241353",
    name: "M Shakeel",
    role: "General Manager",
    description: "Creative UX designer focused on user-centered design and accessibility.",
    skills: ["Figma", "User Research", "Adobe XD"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://media-mct1-1.cdn.whatsapp.net/v/t61.24694-24/556963412_843844435197094_919066186063556731_n.jpg?ccb=11-4&oh=01_Q5Aa4gEHcouk9ZeSNdXkfqUKND3Yc-X6_lDvWIwfqSGGxrOLWA&oe=6A1259E0&_nc_sid=5e03e0&_nc_cat=100",
  },
  {
    id: "241738",
    name: "Assad-ullah",
    role: "CFO & Finance Lead",
    description: "Frontend specialist with expertise in modern JavaScript frameworks.",
    skills: ["React", "Vue.js", "Tailwind CSS"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQGL16q3yApdRw/profile-displayphoto-scale_400_400/B4DZj_HCAuHwAk-/0/1756626700731?e=1779926400&v=beta&t=QXh0vzeMcQuFVzAk5hiXcNjZ8A9uefdcMbcxOYR-DCc",
  },
  {
    id: "241807",
    name: "Sadiq Hussain",
    role: "Mern Stack Developer",
    description: "Strategic product manager bridging business goals and technical execution.",
    skills: ["Product Strategy", "Agile", "Roadmap"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQF_56wdXywwEg/profile-displayphoto-scale_400_400/B4DZ4BVsIqKsAg-/0/1778138924423?e=1779926400&v=beta&t=5sRvaafj_yCXfFOr0ZIgzQY57q3bVf5Xj86T72R29wM",
  },
  {
    id: "241693",
    name: "Shamail Ansari",
    role: "Backend Engineer",
    description: "Backend developer specializing in API design and database optimization.",
    skills: ["Python", "Django", "PostgreSQL"],
    social: [{ platform: "github", url: "#", icon: "fab fa-github" }],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "123",
    name: "Muhammad Ahmad",
    role: "Data Scientist",
    description: "Data scientist skilled in ML algorithms and data visualization.",
    skills: ["Python", "TensorFlow", "SQL"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "241765",
    name: "Faizan Ali",
    role: "Mobile Developer",
    description: "Mobile app developer specializing in cross platform solutions.",
    skills: ["React Native", "Flutter", "iOS"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "241735",
    name: "Shumaila Sial",
    role: "QA Engineer",
    description: "Quality assurance specialist with automation expertise.",
    skills: ["Selenium", "Cypress", "Jest"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "112",
    name: "Fiza Yaseen",
    role: "UI Designer",
    description: "Creative UI designer with an eye for detail and modern aesthetics.",
    skills: ["UI Design", "Figma", "Sketch"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "111",
    name: "Sara Khan",
    role: "HR Operations Manager",
    description: "Experienced HR manager skilled in recruitment and employee relations.",
    skills: ["Recruitment", "HR Strategy", "Operations"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&h=300&auto=format&fit=crop",
  },
];

const Team: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // Responsive orbit radius: prevents the orbiting avatars from overflowing/
  // clipping past the viewport edge on mobile & tablet widths.
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Safety Check 1: Empty Array Protection ---
  if (!teamMembers || teamMembers.length === 0) {
    return <div className="min-h-screen bg-[#07051d] flex items-center justify-center text-white">No team members found.</div>;
  }

  // --- Safety Check 2: Index Bounds Protection ---
  // If activeIndex somehow becomes invalid, fallback to 0
  const safeIndex = activeIndex >= teamMembers.length ? 0 : activeIndex;
  const activeMember = teamMembers[safeIndex];

  const RADIUS = windowWidth < 640 ? 130 : windowWidth < 768 ? 180 : 280;
  const TOTAL_ITEMS = teamMembers.length;

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
  };

  return (
    <section className="relative min-h-screen bg-[#07051D] text-white py-24 px-6 overflow-hidden flex items-center">
      
      {/* Dynamic Background Blurs - More Elegant */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-[#F59C24]/30 to-purple-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-blue-700/20 to-teal-500/10 rounded-full blur-[150px]" 
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: ORBIT SYSTEM */}
          <div className="relative h-[500px] md:h-[650px] w-full flex items-center justify-center">
            {/* Visual Orbit Ring with Slow Rotation */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute border border-white/5 rounded-full" 
              style={{ width: RADIUS * 2, height: RADIUS * 2 }} 
            />
            
            {/* Inner dashed ring for detail */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="absolute border border-dashed border-white/[0.03] rounded-full" 
              style={{ width: RADIUS * 1.5, height: RADIUS * 1.5 }} 
            />

            {/* CENTRAL IMAGE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-20 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 group"
              >
                <div className="absolute inset-0 bg-[#F59C24] rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="relative w-full h-full rounded-full border-[6px] border-white/10 p-2 backdrop-blur-md shadow-2xl overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
                   <img 
                      src={activeMember.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeMember.name)}&background=F59C24&color=fff&size=512`} 
                      alt={activeMember.name} 
                      onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeMember.name)}&background=F59C24&color=fff&size=512`; }}
                      className="w-full h-full rounded-full object-cover" 
                    />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ORBITING NODES */}
            {teamMembers.map((member, index) => {
              const angle = (index / TOTAL_ITEMS) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              const isActive = safeIndex === index;

              return (
                <motion.div
                  key={member.id}
                  className="absolute z-30"
                  animate={{ x, y }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <button onClick={() => handleManualSelection(index)} className="relative group outline-none">
                    <motion.div
                      animate={{ 
                        scale: isActive ? 1.3 : 1,
                        borderColor: isActive ? "#F59C24" : "rgba(255,255,255,0.1)"
                      }}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-[3px] transition-all duration-500 ${
                        isActive ? 'opacity-100 shadow-[0_0_30px_rgba(245,156,36,0.6)] z-40' : 'opacity-50 hover:opacity-100 hover:scale-110 hover:border-white/30'
                      }`}
                    >
                      <img 
                        src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=F59C24&color=fff`} 
                        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=F59C24&color=fff`; }}
                        className="w-full h-full object-cover" 
                        alt={member.name} 
                      />
                    </motion.div>
                    
                    {/* Tooltip for hovering over non-active members */}
                    {!isActive && (
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-black/80 backdrop-blur-sm text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/90 shadow-xl">
                        {member.name}
                      </div>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: INFO CARD */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0B0929]/80 backdrop-blur-2xl border border-white/5 p-10 md:p-14 rounded-[2rem] shadow-2xl relative overflow-hidden"
              >
                {/* Elegant Accent Flare */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F59C24]/10 to-transparent blur-3xl rounded-full" />
                
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "3rem" }} 
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="h-1 bg-[#F59C24] mb-8 rounded-full shadow-[0_0_10px_rgba(245,156,36,0.5)]" 
                />

                <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  {activeMember.name}
                </h2>
                <p className="text-[#F59C24] font-semibold text-xs md:text-sm uppercase tracking-[0.3em] mb-10 drop-shadow-sm">
                  {activeMember.role}
                </p>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-12 font-light">
                  "{activeMember.description}"
                </p>

                <div className="space-y-10">
                  <div>
                    <h4 className="text-[10px] uppercase text-gray-500 tracking-[0.3em] font-bold mb-5 flex items-center gap-3">
                      Technical Mastery
                      <div className="h-px bg-white/5 flex-grow" />
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {activeMember.skills.map((skill, i) => (
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                          key={skill} 
                          className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-medium text-gray-300 hover:bg-[#F59C24] hover:text-black hover:border-[#F59C24] transition-all duration-300 shadow-sm cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8 border-t border-white/5">
                    {activeMember.social.map((s, i) => (
                      <motion.a 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        key={i} 
                        href={s.url} 
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#F59C24] hover:text-black hover:shadow-[0_0_15px_rgba(245,156,36,0.4)] hover:-translate-y-1 transition-all duration-300 text-xl"
                      >
                        <i className={s.icon}></i>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;