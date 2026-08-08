export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  social: { platform: string; url: string; icon: string }[];
  avatar: string;
  location?: string;
  experience?: string;
  email?: string;
  achievements?: string[];
}

export const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&h=250&auto=format&fit=crop";

export const teamMembers: TeamMember[] = [
  {
    id: "exec-001", name: " Mr. Waseem", role: "CEO & Founder",
    description: "Visionary leader with 15+ years of experience in tech innovation.",
    skills: ["React", "Next.js", "Node.js", "AWS", "Leadership"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "twitter", url: "#", icon: "FaTwitter" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/Waseem Malik COO.jpeg", location: "United States", experience: "15+ years", email: "waseem@company.com",
    achievements: ["Tech Innovator Award 2023", "Forbes 30 Under 30"],
  },
  {
    id: "exec-002", name: "Mr. Saim", role: "Managing Director",
    description: "Visionary Managing Director with proven track record of corporate growth.",
    skills: ["Executive Leadership", "Strategic Planning", "P&L Management", "Operations"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/Sarmad_Director.jpeg", location: "Manchester, UK", experience: "18+ years", email: "sarmad@company.com",
    achievements: ["PhD in AI", "Google Developer Expert"],
  },
  {
    id: "exec-003", name: "Mr. Faheem", role: "COO & Co-Founder",
    description: "Operations expert ensuring seamless execution of complex projects.",
    skills: ["System Design", "DevOps", "Kubernetes", "Team Management", "Agile"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "twitter", url: "#", icon: "FaTwitter" },
    ],
    avatar: "/team/Faheem Bilal_COO.png", location: "United Kingdom", experience: "12+ years", email: "faheem@company.com",
    achievements: ["Operational Excellence Award", "Certified Scrum Master"],
  },
  {
    id: "exec-004", name: "Mr. Shakeel", role: "General Manager",
    description: "Strategic thinker driving operational excellence and customer satisfaction.",
    skills: ["Strategic Planning", "Operations", "Leadership", "Agile", "Business Development"],
    social: [{ platform: "linkedin", url: "#", icon: "linkedin" }],
    avatar: "/team/MShakeel.png", location: "UAE", experience: "10+ years", email: "shakeel@company.com",
    achievements: ["GM of the Year 2022", "Customer Excellence Award"],
  },
  {
    id: "dev-001", name: "Sadiq Hussain", role: "Lead Full Stack Engineer",
    description: "Dynamic Full Stack Engineer with expertise in scalable web applications.",
    skills: ["React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "AWS", "DevOps"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/sadiq-hussain-9a85a2334", icon: "linkedin" },
      { platform: "github", url: "https://github.com/sadiqhussain988", icon: "github" },
    ],
    avatar: "/team/Sadiq_Hussain_Full-Satack-Developer.jpg", location: "Pakistan", experience: "6+ years", email: "sadiqhussain31304@gmail.com",
    achievements: ["AWS Certified Solutions Architect", "Full Stack Developer Award"],
  },
  {
    id: "dev-002", name: "M Jahanzaib", role: "Mern Stack Developer",
    description: "API architect building robust, scalable backend systems.",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "Docker"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/Jahanzaib_Frontend.jpeg", location: "Pakistan", experience: "3+ years", email: "jahanzaibmahar18@gmail.com",
  },
  {
    id: "dev-003", name: "M Abdullah", role: "Mobile Application Developer",
    description: "Cross-platform mobile expert building beautiful, performant apps.",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase", "Swift"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/AbdullahFlutter.jpeg", location: "Pakistan", experience: "2+ years", email: "abdullahrajpoot2476@gmail.com",
  },
   {
    id: "dev-0010", name: "Zahid Hussain", role: "Digital Marketer",
    description: "Digital marketing strategist driving brand growth through data-driven campaigns and social media expertise.",
    skills: ["SEO", "Content Marketing", "Social Media Management", "Analytics", "PPC", "Email Marketing"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/zahid.jpg", location: "Pakistan", experience: "2+ years", email: "abdullahrajpoot2476@gmail.com",
  },
  {
    id: "dev-004", name: "Farhan Ahmad", role: "Mern Stack Developer",
    description: "Passionate MERN Stack Developer building responsive and scalable web applications.",
    skills: ["Python", "ReactJS", "TypeScript", "SQL", "Pandas", "Tableau"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/farhandev.jpeg", location: "Pakistan", experience: "4+ years", email: "farhan@company.com",
  },
  {
    id: "dev-005", name: "Zulqarnain Saeed", role: "Frontend Developer",
    description: "Passionate Frontend Developer building responsive and scalable web applications.",
    skills: ["Next.js", "ReactJS", "TypeScript", "JavaScript", "Redux"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/Zulqarnain_Frontend_Developer.jpg", location: "Pakistan", experience: "4+ years", email: "zulqarnain@company.com",
  },
  {
    id: "des-001", name: "Riffat Tahira", role: "UI Designer",
    description: "Creative designer crafting intuitive, beautiful interfaces.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "dribbble", url: "#", icon: "FaDribbble" },
    ],
    avatar: "/team/Riffat.jpg", location: "Pakistan", experience: "3+ years", email: "riffat@company.com",
  },
  {
    id: "dev-006", name: "Alishba Iqbal", role: "Full Stack Developer",
    description: "Versatile developer building end-to-end solutions.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    social: [{ platform: "linkedin", url: "#", icon: "linkedin" }],
    avatar: "/team/Alishba_Iqbal_fullstack.jpeg", location: "Pakistan", experience: "4+ years", email: "alishba@company.com",
  },
  {
    id: "dev-007", name: "Kiran Saif", role: "WordPress Developer",
    description: "Experienced WordPress developer creating custom themes and plugins.",
    skills: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
    social: [{ platform: "linkedin", url: "#", icon: "linkedin" }],
    avatar: "/team/Kiran_Saif_wordpress.jpeg", location: "Pakistan", experience: "8+ years", email: "kiran@company.com",
    achievements: ["Certified WordPress Developer", "Top 10 WordPress Plugins Contributor"],
  },
  // {
  //   id: "dev-008", name: "Ayesha Choudary", role: "Frontend Developer",
  //   description: "Passionate frontend developer specializing in responsive web applications.",
  //   skills: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "HTML"],
  //   social: [{ platform: "linkedin", url: "#", icon: "linkedin" }],
  //   avatar: "/team/Ayesha_Chaudhry_frontend.jpeg", location: "Pakistan", experience: "5+ years", email: "ayesha@company.com",
  //   achievements: ["Frontend Development Award", "UI/UX Excellence"],
  // },
  // {
  //   id: "dev-009", name: "Maryam Tahir", role: "Frontend Developer",
  //   description: "Passionate frontend developer specializing in responsive web applications.",
  //   skills: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "HTML"],
  //   social: [{ platform: "linkedin", url: "#", icon: "linkedin" }],
  //   avatar: "/team/Maryam_tahir_frontend.jpeg", location: "Pakistan", experience: "5+ years", email: "maryam@company.com",
  //   achievements: ["Frontend Development Award", "UI/UX Excellence"],
  // },
];

export const getRoleTheme = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes('design') || r.includes('ui/ux') || r.includes('creative')) {
    return { text: 'text-[#F49B21]', gradient: 'from-[#F49B21] to-amber-500', hoverFill: 'hover:bg-[#F49B21]/90', accent: '#F49B21' };
  }
  if (r.includes('developer') || r.includes('engineer') || r.includes('qa') || r.includes('architect') || r.includes('scientist')) {
    return { text: 'text-[#07051D]', gradient: 'from-[#07051D] to-slate-700', hoverFill: 'hover:bg-[#07051D]/90', accent: '#07051D' };
  }
  if (r.includes('hr') || r.includes('operations') || r.includes('talent')) {
    return { text: 'text-[#F49B21]', gradient: 'from-[#07051D] to-[#F49B21]', hoverFill: 'hover:bg-[#07051D]', accent: '#F49B21' };
  }
  if (r.includes('manager') || r.includes('lead') || r.includes('head')) {
    return { text: 'text-[#07051D]', gradient: 'from-[#F49B21] to-[#07051D]', hoverFill: 'hover:bg-slate-800', accent: '#07051D' };
  }
  if (r.includes('marketing') || r.includes('sales') || r.includes('content') || r.includes('social')) {
    return { text: 'text-[#F49B21]', gradient: 'from-[#F49B21] to-amber-500', hoverFill: 'hover:bg-[#F49B21]/90', accent: '#F49B21' };
  }
  return { text: 'text-[#07051D]', gradient: 'from-slate-800 to-[#07051D]', hoverFill: 'hover:bg-slate-800', accent: '#07051D' };
};