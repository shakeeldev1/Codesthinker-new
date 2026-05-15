import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "../home/ParticleBackground";

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

// Using your data (simplified for the logic demo)
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
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "241738",
    name: "Assad-ullah",
    role: "CFO & Finance Lead",
    description: "Frontend specialist with expertise in modern JavaScript frameworks.",
    skills: ["React", "Vue.js", "Tailwind CSS"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&h=300&auto=format&fit=crop",
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
  const activeMember = teamMembers[activeIndex];

  // Config constants
  const RADIUS = 250; // Orbit radius in pixels
  const TOTAL_ITEMS = teamMembers.length;

  return (
    <section className="relative min-h-screen bg-[#07051d] text-white py-20 px-4 overflow-hidden flex items-center">
    <ParticleBackground/>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F59C24] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: DYNAMIC ORBIT */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            {/* The Invisible Orbit Ring for visual guidance */}
            <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full" />
            
            {/* CENTRAL IMAGE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative z-20 w-56 h-56 md:w-72 md:h-72"
              >
                <div className="w-full h-full rounded-full border-[12px] border-[#07051d] shadow-[0_0_60px_rgba(245,156,36,0.2)] overflow-hidden">
                   <img src={activeMember.avatar} alt={activeMember.name} className="w-full h-full object-cover" />
                </div>
                {/* Floating Badge */}
                <motion.div 
                  initial={{ y: 20 }} 
                  animate={{ y: 0 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#F59C24] text-[#07051d] px-6 py-2 rounded-full font-black text-xs uppercase tracking-tighter shadow-xl whitespace-nowrap"
                >
                  {activeMember.role}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* ORBITING AVATARS (Dynamic Math) */}
            {teamMembers.map((member, index) => {
              // Calculate angle in radians
              const angle = (index / TOTAL_ITEMS) * 2 * Math.PI;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={member.id}
                  onClick={() => setActiveIndex(index)}
                  className="absolute z-30 transition-opacity"
                  animate={{ 
                    x, y, 
                    scale: isActive ? 1.3 : 1,
                    opacity: isActive ? 1 : 0.6 
                  }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Connector Line (Shows only when active) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: RADIUS, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="absolute top-1/2 left-1/2 h-[2px] bg-gradient-to-r from-[#F59C24] to-transparent origin-left pointer-events-none"
                        style={{ transform: `rotate(${angle + Math.PI}rad)` }}
                      />
                    )}
                  </AnimatePresence>

                  <div className={`p-1 rounded-full ${isActive ? 'bg-[#F59C24]' : 'bg-white/10 backdrop-blur-md border border-white/20'}`}>
                    <img src={member.avatar} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" alt={member.name} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: CONTENT CARD */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-2 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
              >
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59C24]/10 blur-3xl" />
                
                <h2 className="text-4xl font-bold mb-2 t">{activeMember.name}</h2>
                <div className="text-[#F59C24] font-mono text-sm uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                  <span className="w-10 h-px bg-[#F59C24]" /> {activeMember.role}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                  {activeMember.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 tracking-[0.4em] font-bold mb-4">Core Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {activeMember.skills.map(skill => (
                        <span key={skill} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:bg-[#F59C24] hover:text-[#07051d] transition-all cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-white/10">
                    {activeMember.social.map((s, i) => (
                      <a key={i} href={s.url} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#F59C24] hover:text-[#07051d] transition-all text-xl">
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