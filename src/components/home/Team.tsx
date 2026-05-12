import React, { useState } from "react";
import ParticleBackground from "./ParticleBackground";

// ======================================
// TYPES
// ======================================

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface Position {
  left: number;
  top: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  social: SocialLink[];
  avatar: string;
  position: Position;
  lineAngle: number;
  lineLength: number;
}

// ======================================
// TEAM MEMBERS DATA
// ======================================

const teamMembersData: TeamMember[] = [
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
    position: { left: 550, top: 300 },
    lineAngle: -180,
    lineLength: 250,
  },
  {
    id: "125",
    name: "Faheem Bilal",
    role: "COO & Co-Founder",
    description: "Technical lead with 8+ years of experience in software architecture and team management.",
    skills: ["System Design", "DevOps", "Kubernetes"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQFi8siQCmQ4Pw/profile-displayphoto-scale_400_400/B56Z1x4gjHH4Ag-/0/1775732135135?e=1779926400&v=beta&t=8voE58pzgfwSTgcuWqvm11nzREh8nCJPAAEmcuUrKSs",
    position: { left: 510.313, top: 435.16 },
    lineAngle: -147.274,
    lineLength: 249.995,
  },
  {
    id: "241353",
    name: "M Shakeel ",
    role: "General Manager",
    description: "Creative UX designer focused on user-centered design and accessibility.",
    skills: ["Figma", "User Research", "Adobe XD"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&auto=format&fit=crop",
    position: { left: 403.854, top: 527.408 },
    lineAngle: -114.544,
    lineLength: 249.994,
  },
  {
    id: "241738",
    name: "Assad-ullah",
    role: "CFO & Finance Lead",
    description: "Frontend specialist with expertise in modern JavaScript frameworks.",
    skills: ["React", "Vue.js", "Tailwind CSS"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&h=300&auto=format&fit=crop",
    position: { left: 264.421, top: 547.455 },
    lineAngle: -81.8162,
    lineLength: 249.999,
  },
  {
    id: "241807",
    name: "Sadiq Hussain",
    role: "Mern Stack Developer",
    description: "Strategic product manager bridging business goals and technical execution.",
    skills: ["Product Strategy", "Agile", "Roadmap"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQF_56wdXywwEg/profile-displayphoto-scale_400_400/B4DZ4BVsIqKsAg-/0/1778138924423?e=1779926400&v=beta&t=5sRvaafj_yCXfFOr0ZIgzQY57q3bVf5Xj86T72R29wM",
    position: { left: 136.285, top: 488.937 },
    lineAngle: -49.0887,
    lineLength: 249.999,
  },
  {
    id: "241693",
    name: "Shamail Ansari",
    role: "Backend Engineer",
    description: "Backend developer specializing in API design and database optimization.",
    skills: ["Python", "Django", "PostgreSQL"],
    social: [{ platform: "github", url: "#", icon: "fab fa-github" }],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=300&auto=format&fit=crop",
    position: { left: 60.1268, top: 370.433 },
    lineAngle: -16.3619,
    lineLength: 250.002,
  },
  {
    id: "123",
    name: "Muhammad Ahmad",
    role: "Data Scientist",
    description: "Data scientist skilled in ML algorithms and data visualization.",
    skills: ["Python", "TensorFlow", "SQL"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=300&auto=format&fit=crop",
    position: { left: 60.1268, top: 229.567 },
    lineAngle: 16.3639,
    lineLength: 250.004,
  },
  {
    id: "241765",
    name: "Faizan Ali",
    role: "Mobile Developer",
    description: "Mobile app developer specializing in cross-platform solutions.",
    skills: ["React Native", "Flutter", "iOS"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=300&auto=format&fit=crop",
    position: { left: 136.285, top: 111.063 },
    lineAngle: 49.0901,
    lineLength: 250.006,
  },
  {
    id: "241735",
    name: "Shumaila Sial",
    role: "QA Engineer",
    description: "Quality assurance specialist with automation expertise.",
    skills: ["Selenium", "Cypress", "Jest"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&h=300&auto=format&fit=crop",
    position: { left: 264.421, top: 52.5446 },
    lineAngle: 81.8165,
    lineLength: 250.008,
  },
  {
    id: "112",
    name: "Fiza Yaseen",
    role: "UI Designer",
    description: "Creative UI designer with an eye for detail and modern aesthetics.",
    skills: ["UI Design", "Figma", "Sketch"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300&h=300&auto=format&fit=crop",
    position: { left: 403.854, top: 72.592 },
    lineAngle: 114.543,
    lineLength: 250.002,
  },
  {
    id: "111",
    name: "Sara Khan",
    role: "HR Operations Manager",
    description: "Experienced HR manager skilled in recruitment and employee relations.",
    skills: ["Recruitment", "HR Strategy", "Operations"],
    social: [{ platform: "linkedin", url: "#", icon: "fab fa-linkedin" }],
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&h=300&auto=format&fit=crop",
    position: { left: 510.313, top: 164.84 },
    lineAngle: 147.273,
    lineLength: 250,
  },
];

// ======================================
// COMPONENT
// ======================================

const TeamSection: React.FC = () => {
  const [activeMember, setActiveMember] = useState<TeamMember>(
    teamMembersData[0]
  );

  return (
    <section className="team-section py-24 bg-[#f8fafc] text-[#07051d] relative overflow-hidden">
        <ParticleBackground/>
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#07051D] opacity-40 rounded-full blur-3xl z-0 animate-float" />
      <div className="absolute -bottom-32 -right-32 w-125 h-125 bg-[#07051d]/10 opacity-40 rounded-full blur-3xl z-0 animate-float2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Meet The <span className="text-[#F59C24]">Experts</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Our passionate, multi-disciplinary team brings creativity and innovation to every project.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-center gap-12">
          {/* CIRCLE LAYOUT */}
          <div className="relative w-85 h-85 md:w-155 md:h-155 shrink-0">
            {/* CENTER DISPLAY IMAGE */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="relative p-2 rounded-full bg-white/80 shadow-2xl animate-float border-4 border-[#07051D]">
                <img
                  src={activeMember.avatar}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#07051D] shadow-lg"
                  alt={activeMember.name}
                />
                <div className="absolute -bottom-3 -right-3 bg-[#07051D] text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {activeMember.role}
                </div>
              </div>
            </div>

            {/* ORBITING MEMBERS */}
            <div className="relative w-full h-full scale-75 md:scale-100">
              {teamMembersData.map((member) => {
                const isActive = activeMember.id === member.id;
                return (
                  <button
                    key={member.id}
                    onClick={() => setActiveMember(member)}
                    aria-label={`View ${member.name}`}
                    className={`absolute transition-all duration-300 group outline-none ${
                      isActive
                        ? "z-30 scale-125"
                        : "z-10 hover:scale-110"
                    }`}
                    style={{
                      left: `${member.position.left}px`,
                      top: `${member.position.top}px`,
                    }}
                  >
                    {/* LINE */}
                    <div
                      className={`absolute top-1/2 left-1/2 h-px origin-left pointer-events-none transition-all duration-500 ${
                        isActive
                          ? "bg-[#07051D] opacity-100"
                          : "bg-[#07051D]/50 opacity-30"
                      }`}
                      style={{
                        width: `${member.lineLength}px`,
                        transform: `rotate(${member.lineAngle}deg)`,
                      }}
                    />
                    {/* AVATAR */}
                    <div className="relative z-40">
                      <img
                        src={member.avatar}
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 shadow-md transition-all ${
                          isActive
                            ? "border-[#07051D] ring-4 ring-[#07051D]/20 scale-110"
                            : "border-[#07051D]"
                        }`}
                        alt={member.name}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DETAIL CARD */}
          <div className="w-full max-w-lg">
            <div
              className="bg-[#07051D] p-8 border border-amber-100 rounded-2xl shadow-xl backdrop-blur-md"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
              }}
            >
              <div className="flex items-center gap-6 mb-8">
                <img
                  src={activeMember.avatar}
                  className="w-20 h-20 rounded-full border-2 border-amber-500 shadow-lg"
                  alt={activeMember.name}
                />
                <div>
                  <h3 className="text-3xl font-black italic uppercase text-[#07051d]">
                    {activeMember.name}
                  </h3>
                  <p className="text-amber-500 font-mono tracking-widest text-base bg-amber-50 rounded-full px-4 py-1 inline-block mt-1 shadow-sm">
                    {activeMember.role}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* PROFILE */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-amber-500 tracking-widest mb-2 border-l-2 border-amber-500 pl-3">
                    Profile
                  </h4>
                  <p className="text-[#07051d]/80 leading-relaxed font-medium">
                    {activeMember.description}
                  </p>
                </div>

                {/* SKILLS */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-amber-500 tracking-widest mb-3 border-l-2 border-amber-500 pl-3">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeMember.skills.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="text-[11px] font-mono bg-amber-50 border border-amber-100 px-3 py-1 text-[#07051d] rounded-full shadow-sm"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* SOCIAL */}
                <div className="flex gap-4 pt-4">
                  {activeMember.social.map(
                    (social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className="text-amber-500 hover:text-[#07051d] text-2xl transition-colors"
                      >
                        <i className={social.icon}></i>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .neon-text {
          text-shadow: 0 0 18px rgba(251,191,36,0.5);
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float2 {
          animation: float2 12s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }

          50% {
            transform: translateY(-18px) translateX(12px);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }

          50% {
            transform: translateY(22px) translateX(-16px);
          }
        }
      `}</style>

      {/* FONT AWESOME */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
    </section>
  );
};

export default TeamSection;