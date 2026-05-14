import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

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
    description: "Full-stack developer with expertise in React, Next.js, and cloud technologies. Passionate about building scalable web applications.",
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
    description: "Mobile app developer specializing in cross-platform solutions.",
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

  // --- Safety Check 1: Empty Array Protection ---
  if (!teamMembers || teamMembers.length === 0) {
    return <div className="min-h-screen bg-[#07051d] flex items-center justify-center text-white">No team members found.</div>;
  }

  // --- Safety Check 2: Index Bounds Protection ---
  // If activeIndex somehow becomes invalid, fallback to 0
  const safeIndex = activeIndex >= teamMembers.length ? 0 : activeIndex;
  const activeMember = teamMembers[safeIndex];

  const RADIUS = 280;
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
    <section className="relative min-h-screen bg-[#030211] text-white py-24 px-6 overflow-hidden flex items-center">
      <ParticleBackground />
      
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#F59C24] rounded-full blur-[160px]" 
        />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-700/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: ORBIT SYSTEM */}
          <div className="relative h-[500px] md:h-[650px] w-full flex items-center justify-center">
            {/* Visual Orbit Ring */}
            <div className="absolute border border-white/5 rounded-full" style={{ width: RADIUS * 2, height: RADIUS * 2 }} />

            {/* CENTRAL IMAGE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="relative z-20 w-64 h-64 md:w-80 md:h-80"
              >
                <div className="absolute inset-0 bg-[#F59C24] rounded-full blur-[40px] opacity-20" />
                <div className="relative w-full h-full rounded-full border-[8px] border-white/5 p-2 backdrop-blur-sm shadow-2xl overflow-hidden">
                   <img src={activeMember.avatar} alt={activeMember.name} className="w-full h-full rounded-full object-cover" />
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
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                >
                  <button onClick={() => handleManualSelection(index)} className="relative group">
                    <motion.div
                      animate={{ 
                        scale: isActive ? 1.25 : 1,
                        borderColor: isActive ? "#F59C24" : "rgba(255,255,255,0.2)"
                      }}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                        isActive ? 'opacity-100 shadow-[0_0_20px_rgba(245,156,36,0.5)]' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                      }`}
                    >
                      <img src={member.avatar} className="w-full h-full object-cover" alt={member.name} />
                    </motion.div>
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
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-3xl relative overflow-hidden"
              >
                {/* Accent Flare */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#F59C24]/10 blur-3xl" />
                
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "3rem" }} 
                  className="h-1 bg-[#F59C24] mb-8" 
                />

                <h2 className="text-5xl font-black mb-2 tracking-tight italic bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                  {activeMember.name}
                </h2>
                <p className="text-[#F59C24] font-mono text-sm uppercase tracking-[0.4em] mb-10">
                  {activeMember.role}
                </p>

                <p className="text-gray-300 text-lg leading-relaxed mb-12 font-light">
                  "{activeMember.description}"
                </p>

                <div className="space-y-10">
                  <div>
                    <h4 className="text-[10px] uppercase text-gray-500 tracking-[0.5em] font-bold mb-5">Technical Mastery</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeMember.skills.map((skill, i) => (
                        <motion.span 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                          key={skill} 
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:bg-[#F59C24] hover:text-black transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8 border-t border-white/10">
                    {activeMember.social.map((s, i) => (
                      <a 
                        key={i} 
                        href={s.url} 
                        className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#F59C24] hover:text-black transition-all duration-300 text-xl"
                      >
                        <i className={s.icon}></i>
                      </a>
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