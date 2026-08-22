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
  phones?: string[];
  achievements?: string[];
}

export const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=250&h=250&auto=format&fit=crop";

export const teamMembers: TeamMember[] = [
  {
    id: "exec-001", name: " Mr. Waseem", role: "CEO & Founder",
    description: "Visionary leader with 15+ years of experience in tech innovation. Leads cross functional teams to deliver scalable products and drives the company strategy with a focus on sustainable growth and technical excellence.",
    skills: ["React", "Next.js", "Node.js", "AWS", "Leadership"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/waseem-malik9/", icon: "FaLinkedinIn" },
      { platform: "twitter", url: "#", icon: "FaTwitter" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/Waseem Malik COO.webp", location: "United States", experience: "15+ years", email: "waseem@company.com",
    achievements: ["Tech Innovator Award 2023", "Forbes 30 Under 30"],
  },
  {
    id: "exec-002", name: "Mr. Sam", role: "Managing Director",
    description: "Experienced Managing Director with a proven track record of corporate growth. Oversees business operations, partnerships and delivery, ensuring teams meet strategic goals while maintaining high client satisfaction.",
    skills: ["Executive Leadership", "Strategic Planning", "P&L Management", "Operations"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/sarmad129/", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/Sarmad_Director.webp", location: "Manchester, UK", experience: "18+ years", email: "sarmad@company.com",
    achievements: ["PhD in AI", "Google Developer Expert"],
  },
  {
    id: "exec-003", name: "Mr. Faheem", role: "COO & Co-Founder",
    description: "Operations expert ensuring seamless execution of complex projects. Specializes in process optimization, resource planning and scaling delivery for enterprise clients.",
    skills: ["System Design", "DevOps", "Kubernetes", "Team Management", "Agile"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/faheem-bilal-a37158402/", icon: "FaLinkedinIn" },
      { platform: "twitter", url: "#", icon: "FaTwitter" },
    ],
    avatar: "/team/Faheem Bilal_COO.webp", location: "United Kingdom", experience: "8+ years", email: "faheem@company.com",
    achievements: ["Operational Excellence Award", "Certified Scrum Master"],
  },
  {
    id: "hr-001", name: "Nova", role: "HR Manager",
    description: "People-focused HR professional supporting recruitment, employee relations, and workplace culture. Drives talent programs, employee engagement initiatives and learning & development for a global workforce.",
    skills: ["Recruitment", "Employee Relations", "Onboarding", "Policy Development", "Talent Management"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/sadiq-hussain-9a85a2334", icon: "FaLinkedinIn" },
      { platform: "email", url: "mailto:hr@company.com", icon: "FaEnvelope" },
    ],
    avatar: "/team/hr.webp", location: "UK", experience: "8+ years", email: "hr@company.com",
    achievements: ["People Operations Excellence", "Employee Engagement Award"],
  },
  {
    id: "exec-004", name: "Mr. Shakeel", role: "General Manager",
    description: "Strategic leader driving operational excellence and customer satisfaction across regions. Aligns teams to deliver high quality services while improving operational efficiency.",
    skills: ["Strategic Planning", "Operations", "Leadership", "Agile", "Business Development"],
    social: [{ platform: "linkedin", url: "https://www.linkedin.com/in/shakeel-dev/", icon: "linkedin" }],
    avatar: "/team/MShakeel.webp", location: "UAE", experience: "10+ years", email: "shakeel@company.com",
    achievements: ["GM of the Year 2022", "Customer Excellence Award"],
  },
  {
    id: "dev-014", name: "Mughees Ur Rehman", role: "Senior Software Engineer",
    description: "Full Stack Engineer building scalable end to end applications with clean architecture and solid delivery practices. Comfortable across frontend, backend, and deployment workflows.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/mughees-ur-rehman06", icon: "FaLinkedinIn" },
      { platform: "github", url: "https://github.com/Mogehs", icon: "FaGithub" },
    ],
    avatar: "/team/Mughees_Ur_Rehman.webp", location: "Pakistan", experience: "2+ years", email: "mughees@company.com",
  },
  {
    id: "dev-001", name: "Sadiq Hussain", role: "Team Leader Full Stack Engineer",
    description: "Dynamic Full Stack Engineer with deep expertise in building scalable web applications and microservices. Leads architecture and mentors engineers to adopt best practices for performance and reliability.",
    skills: ["DevOps", "AWS", "Problem Solving", "Team Management","Full Stack Development","Microservices"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/sadiq-hussain-9a85a2334", icon: "linkedin" },
      { platform: "github", url: "https://github.com/sadiqhussain988", icon: "github" },
    ],
    avatar: "/team/Sadiq_Hussain_Full-Satack-Developer.webp", location: "Pakistan", experience: "6+ years", email: "sadiqhussain31304@gmail.com",
    phones: ["+92 320 3036988", "+92 329 9235015"],
    achievements: ["AWS & Dev Ops Certified Solutions Architect", "Full Stack Developer Award"],
  },
  {
    id: "dev-019", name: "Ayaz Aslam", role: "DevOps Engineer",
    description: "DevOps Engineer specializing in CI/CD pipelines, cloud infrastructure, and automated deployments. Builds reliable, scalable environments with Docker, Kubernetes, and modern cloud platforms.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/ayaz aslam.png", location: "Pakistan", experience: "2+ years", email: "ayaz@company.com",
  },
  //   description: "API architect building robust, scalable backend systems. Focused on clean API design, testability and optimized data flows for large-scale applications.",
  //   skills: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "Docker"],
  //   social: [
  //     { platform: "linkedin", url: "https://www.linkedin.com/in/sadiq-hussain-9a85a2334", icon: "FaLinkedinIn" },
  //     { platform: "github", url: "#", icon: "FaGithub" },
  //   ],
  //   avatar: "/team/Jahanzaib_Frontend.webp", location: "Pakistan", experience: "3+ years", email: "jahanzaibmahar18@gmail.com",
  // },
  {
    id: "dev-003", name: "M Abdullah", role: "Mobile Application Developer",
    description: "Cross-platform mobile expert building beautiful, performant apps with a strong focus on UX and battery/network efficiency. Experienced with React Native and Flutter for rapid delivery.",
    skills: ["iOS", "Flutter",  "Android", "Problem Solving", "Swift"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/muhammad-abdullah2476/", icon: "FaLinkedinIn" },
      { platform: "github", url: "https://github.com/Abdullah2476", icon: "FaGithub" },
    ],
    avatar: "/team/AbdullahFlutter.webp", location: "Pakistan", experience: "2+ years", email: "abdullahrajpoot2476@gmail.com",
  },
   {
    id: "dev-0010", name: "Zahid Hussain", role: "Digital Marketer",
    description: "Digital marketing strategist driving brand growth through data driven campaigns, paid media and SEO. Builds measurable funnels that increase acquisition and retention for B2B and B2C products.",
    skills: ["SEO", "Content Marketing", "Social Media Management", "Analytics", "PPC", "Email Marketing"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/sadiq-hussain-9a85a2334", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/zahid.webp", location: "Pakistan", experience: "2+ years", email: "abdullahrajpoot2476@gmail.com",
  },
  // {
  //   id: "dev-004", name: "Farhan Ahmad", role: "Mern Stack Developer",
  //   description: "Passionate MERN Stack Developer building responsive and scalable web applications. Enjoys performance tuning, writing maintainable code and collaborating across product teams.",
  //   skills: ["Python", "ReactJS", "TypeScript", "SQL", "Pandas", "Tableau"],
  //   social: [
  //     { platform: "linkedin", url: "https://www.linkedin.com/in/farhan-ahmad-dev", icon: "FaLinkedinIn" },
  //     { platform: "github", url: "https://github.com/farhan493495", icon: "FaGithub" },
  //   ],
  //   avatar: "/team/farhandev.webp", location: "Pakistan", experience: "4+ years", email: "farhan@company.com",
  // },
  // {
  //   id: "dev-005", name: "Zulqarnain Saeed", role: "Frontend Developer",
  //   description: "Frontend specialist crafting pixel perfect interfaces with a focus on accessibility and performance. Familiar with modern frameworks and component driven design systems.",
  //   skills: ["Next.js", "ReactJS", "TypeScript", "JavaScript", "Redux"],
  //   social: [
  //     { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
  //     { platform: "github", url: "#", icon: "FaGithub" },
  //   ],
  //   avatar: "/team/Zulqarnain_Frontend_Developer.webp", location: "Pakistan", experience: "4+ years", email: "zulqarnain@company.com",
  // },
  // {
  //   id: "dev-015", name: "Zeeshan Munir", role: "Frontend Developer",
  //   description: "Frontend Developer crafting responsive, accessible interfaces with modern React tooling. Focused on clean UI, performance, and polished user experiences.",
  //   skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux"],
  //   social: [
  //     { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
  //     { platform: "github", url: "#", icon: "FaGithub" },
  //   ],
  //   avatar: "/team/zeeshan.webp", location: "Pakistan", experience: "2+ years", email: "zeeshan@company.com",
  // },
  {
    id: "dev-016", name: "James Thornton", role: "DevOps Engineer",
    description: "DevOps Engineer focused on CI/CD pipelines, cloud infrastructure, and reliable deployments. Builds secure, automated environments that keep products stable as they scale.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "https://i.pinimg.com/1200x/6b/94/30/6b9430c1c6b6041e8008f301e813028a.jpg",
    location: "Manchester, UK",
    experience: "7+ years",
    email: "james@company.com",
  },
  {
    id: "dev-017", name: "Oliver Hayes", role: "AI Specialist",
    description: "AI Specialist designing intelligent systems with machine learning, NLP, and automation. Helps businesses turn data into practical AI features that improve products and operations.",
    skills: ["Python", "Machine Learning", "NLP", "TensorFlow", "PyTorch", "OpenAI"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "https://i.pinimg.com/1200x/b5/de/d1/b5ded1b360966492b3b2f1aa5055b8bf.jpg",
    location: "Manchester, UK",
    experience: "6+ years",
    email: "oliver@company.com",
  },
  {
    id: "dev-018", name: "Alicia Hartley", role: "AI Automation Expert",
    description: "AI Automation Expert building intelligent workflows that remove repetitive work and speed up operations. Combines AI tools, integrations, and practical automation to help teams deliver more with less manual effort.",
    skills: ["AI Automation", "Python", "n8n", "Zapier", "OpenAI", "Workflow Design"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "https://i.pinimg.com/736x/1c/88/70/1c887069fec338e0ff5285bd5cbe7511.jpg",
    location: "Manchester, UK",
    experience: "5+ years",
    email: "alicia@company.com",
  },
  // {
  //   id: "des-001", name: "Riffat Tahira", role: "UI Designer",
  //   description: "Creative designer crafting intuitive, beautiful interfaces that balance aesthetics with usability. Experienced in Figma and design systems, she focuses on accessibility and polished micro-interactions.",
  //   skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems"],
  //   social: [
  //     { platform: "linkedin", url: "https://www.linkedin.com/in/sadiq-hussain-9a85a2334", icon: "FaLinkedinIn" },
  //     { platform: "dribbble", url: "#", icon: "FaDribbble" },
  //   ],
  //   avatar: "https://i.pinimg.com/736x/5a/36/ef/5a36efe61ddc00a587af33cfd4d24d07.jpg", location: "Pakistan", experience: "3+ years", email: "riffat@company.com",
  // },
  {
    id: "dev-013", name: "Kinz Ul Iman", role: "Mobile Application Developer",
    description: "Mobile Application Developer building smooth, user friendly apps for iOS and Android. Focused on clean UI, performance, and reliable cross platform delivery with modern mobile frameworks.",
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase", "Dart"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/kinzul-iman-233597342/", icon: "FaLinkedinIn" },
      { platform: "github", url: "https://github.com/KinzIman22", icon: "FaGithub" },
    ],
    avatar: "/team/kinzul.webp", location: "Pakistan", experience: "2+ years", email: "kinzul@company.com",
  },
  {
    id: "dev-011", name: "Zahra Nazeer", role: "Full Stack Developer",
    description: "Full Stack Developer focused on building clean, scalable web applications from frontend to backend. Delivers reliable features with strong attention to code quality, UX, and maintainable architecture.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/Zahra_Nazeer.webp", location: "Pakistan", experience: "2+ years", email: "zahra@company.com",
  },
  {
    id: "dev-012", name: "Irsa Hijab", role: "Full Stack Developer",
    description: "Full Stack Developer crafting responsive, high performance applications across the stack. Enjoys solving product problems with practical engineering, clean APIs, and polished user interfaces.",
    skills: ["React", "Next.js", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    social: [
      { platform: "linkedin", url: "#", icon: "FaLinkedinIn" },
      { platform: "github", url: "#", icon: "FaGithub" },
    ],
    avatar: "/team/Irsa_Hijab.webp", location: "Pakistan", experience: "2+ years", email: "irsa@company.com",
  },
  {
    id: "dev-007", name: "Kiran Saif", role: "WordPress Developer",
    description: "Experienced WordPress developer creating custom themes, plugins and performant CMS experiences. Skilled at optimizing WP for SEO, speed and reliable content workflows.",
    skills: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
    social: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/kiran-saif-910615427/", icon: "linkedin" },
      { platform: "github", url: "https://github.com/KiranSaif-Developer", icon: "github" },
    ],
    avatar: "/team/Kiran_Saif_wordpress.webp", location: "Pakistan", experience: "8+ years", email: "kiran@company.com",
  },
  // {
  //   id: "dev-006", name: "Alishba Iqbal", role: "Full Stack Developer",
  //   description: "Versatile developer building end to end solutions from database schema to production deployments. Advocates for automated testing and CI/CD to reduce delivery friction.",
  //   skills: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB"],
  //   social: [{ platform: "linkedin", url: "https://www.linkedin.com/in/sadiq-hussain-9a85a2334", icon: "linkedin" }],
  //   avatar: "/team/Alishba_Iqbal_fullstack.webp", location: "Pakistan", experience: "4+ years", email: "alishba@company.com",
  // },
  // {
  //   id: "dev-008", name: "Ayesha Choudary", role: "Frontend Developer",
  //   description: "Passionate frontend developer specializing in responsive web applications.",
  //   skills: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "HTML"],
  //   social: [{ platform: "linkedin", url: "#", icon: "linkedin" }],
  //   avatar: "/team/Ayesha_Chaudhry_frontend.webp", location: "Pakistan", experience: "5+ years", email: "ayesha@company.com",
  //   achievements: ["Frontend Development Award", "UI/UX Excellence"],
  // },
  // {
  //   id: "dev-009", name: "Maryam Tahir", role: "Frontend Developer",
  //   description: "Passionate frontend developer specializing in responsive web applications.",
  //   skills: ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "HTML"],
  //   social: [{ platform: "linkedin", url: "#", icon: "linkedin" }],
  //   avatar: "/team/Maryam_tahir_frontend.webp", location: "Pakistan", experience: "5+ years", email: "maryam@company.com",
  //   achievements: ["Frontend Development Award", "UI/UX Excellence"],
  // },
];

export const getRoleTheme = (role: string) => {
  const r = role.toLowerCase();
  const navy = '#07051D';
  const navyGlow = '7, 5, 29';

  // Shared navy-first palette; amber only as a thin accent in leadership gradients
  const navyBase = {
    text: 'text-[#07051D]',
    soft: 'bg-[#07051D]/[0.06] text-[#07051D] border-[#07051D]/12',
    chip: 'bg-[#07051D]/[0.04] text-[#07051D] border-[#07051D]/10',
    hoverFill: 'hover:bg-[#07051D]',
    accent: navy,
    glow: navyGlow,
  };

  if (r.includes('team leader') || r.includes('leader') || (r.includes('lead') && !r.includes('fullstack') && !r.includes('full stack'))) {
    return {
      ...navyBase,
      text: 'text-[#07051D]',
      gradient: 'from-[#07051D] via-[#1a1540] to-[#07051D]',
      soft: 'bg-[#07051D] text-white border-[#07051D]',
      chip: 'bg-[#07051D]/[0.06] text-[#07051D] border-[#07051D]/15',
      // amber only as a tiny highlight bar tip
      accentBar: 'from-[#07051D] via-[#07051D] to-[#F49B21]',
      accent: navy,
    };
  }
  if (r.includes('design') || r.includes('ui/ux') || r.includes('creative') || r.includes('ui designer')) {
    return {
      ...navyBase,
      gradient: 'from-[#07051D] via-[#1e1b4b] to-[#312e81]',
      accentBar: 'from-[#07051D] to-[#1e1b4b]',
    };
  }
  if (r.includes('mobile') || r.includes('flutter') || r.includes('react native') || r.includes('ios') || r.includes('android')) {
    return {
      ...navyBase,
      gradient: 'from-[#07051D] via-[#0f172a] to-[#1e293b]',
      accentBar: 'from-[#07051D] to-[#1e293b]',
    };
  }
  if (r.includes('frontend') || r.includes('front-end') || r.includes('front end')) {
    return {
      ...navyBase,
      gradient: 'from-[#07051D] via-[#111827] to-[#1f2937]',
      accentBar: 'from-[#07051D] to-[#1f2937]',
    };
  }
  if (r.includes('wordpress') || r.includes('shopify') || r.includes('cms')) {
    return {
      ...navyBase,
      gradient: 'from-[#07051D] via-[#1a1540] to-[#2e1065]',
      accentBar: 'from-[#07051D] to-[#1a1540]',
    };
  }
  if (r.includes('marketing') || r.includes('sales') || r.includes('content') || r.includes('social') || r.includes('digital marketer')) {
    return {
      ...navyBase,
      gradient: 'from-[#07051D] via-[#1a1540] to-[#07051D]',
      accentBar: 'from-[#07051D] via-[#07051D] to-[#F49B21]',
    };
  }
  if (r.includes('hr') || r.includes('operations') || r.includes('talent')) {
    return {
      ...navyBase,
      gradient: 'from-[#07051D] to-[#1a1540]',
      accentBar: 'from-[#07051D] to-[#1a1540]',
    };
  }
  if (r.includes('manager') || r.includes('head') || r.includes('director') || r.includes('ceo') || r.includes('coo')) {
    return {
      ...navyBase,
      gradient: 'from-[#07051D] to-[#0f172a]',
      soft: 'bg-[#07051D] text-white border-[#07051D]',
      accentBar: 'from-[#07051D] to-[#0f172a]',
    };
  }
  if (r.includes('developer') || r.includes('engineer') || r.includes('qa') || r.includes('architect') || r.includes('scientist') || r.includes('mern') || r.includes('devops') || r.includes('ai ')) {
    return {
      ...navyBase,
      gradient: 'from-[#07051D] via-[#12102a] to-[#1a1540]',
      accentBar: 'from-[#07051D] to-[#1a1540]',
    };
  }
  return {
    ...navyBase,
    gradient: 'from-[#07051D] to-[#0f172a]',
    accentBar: 'from-[#07051D] to-[#0f172a]',
  };
};