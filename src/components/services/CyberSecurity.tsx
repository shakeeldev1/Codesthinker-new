import React, { useState, useEffect } from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import {
  Shield,
  Lock,
  AlertTriangle,
  TrendingUp,
  Zap,
  Eye,
  Server,
  Brain,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';

// ==================== DATA ====================
const cyberHeroData = [
  {
    id: 1,
    subtitle: "Enterprise Defense",
    title: "Intelligent Cyber Security Solutions",
    description: "Protecting your digital assets with advanced threat intelligence and real-time response capabilities.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    color: "from-slate-900/80 to-slate-800/80",
  },
  {
    id: 2,
    subtitle: "Zero Trust Architecture",
    title: "Security Without Compromise",
    description: "Implementing mission-critical defense layers that ensure your data remains accessible only to those you trust.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    color: "from-amber-900/40 to-orange-800/40",
  },
  {
    id: 3,
    subtitle: "Cloud Security",
    title: "Modern Threat Protection",
    description: "Leveraging AI-powered detection to stay steps ahead of evolving digital risks and vulnerabilities.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2070&auto=format&fit=crop",
    color: "from-slate-900/60 to-amber-900/40",
  },
];

const servicesData = [
  {
    icon: Eye,
    title: "Threat Detection",
    description: "Real-time monitoring and intelligent threat detection powered by machine learning algorithms.",
    features: ["24/7 Monitoring", "AI-Powered Analysis", "Instant Alerts"]
  },
  {
    icon: Lock,
    title: "Data Protection",
    description: "Military-grade encryption and advanced data loss prevention for all your sensitive information.",
    features: ["End-to-End Encryption", "DLP Systems", "Compliance Ready"]
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description: "Secure your cloud, on-premise, and hybrid environments with comprehensive infrastructure hardening.",
    features: ["Cloud Security", "Network Hardening", "Patch Management"]
  },
  {
    icon: Brain,
    title: "Incident Response",
    description: "Expert team ready to respond to security incidents 24/7 with proven methodologies.",
    features: ["Rapid Response", "Forensics", "Recovery Planning"]
  },
  {
    icon: TrendingUp,
    title: "Risk Management",
    description: "Comprehensive risk assessments and compliance management for regulatory requirements.",
    features: ["Risk Assessment", "Compliance", "Reporting"]
  },
  {
    icon: Zap,
    title: "Security Training",
    description: "Empower your team with security awareness and best practices training programs.",
    features: ["Staff Training", "Simulations", "Documentation"]
  }
];

const CyberSecurity = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const technologies = [
    { name: "Linux", category: "Core OS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Python", category: "Scripting", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "AWS", category: "Cloud Security", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Docker", category: "Containers", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Bash", category: "Automation", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
    { name: "C++", category: "System Level", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Kubernetes", category: "Orchestration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Azure", category: "Cloud Infrastructure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      <GlobalHero data={cyberHeroData} height="100vh" />
      
      {/* ==================== SECTION 2: CORE SERVICES ==================== */}
      <section className="py-24 px-6 bg-white relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <GlobalHeading
              className="mb-16"
              badge={{ text: "Services" }}
              title="Our Security Services"
              titleHighlight="Services"
              subtitle="Comprehensive security solutions tailored to protect your organization at every level."
              alignment="center"
              textColor="dark"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <GlobalCard
                key={index}
                index={index}
                title={service.title}
                description={service.description}
                icon={<service.icon size={28} />}
                theme="light"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <GlobalHeading
              badge={{ text: "Technology Stack" }}
              title="Cutting-Edge Technologies"
              titleHighlight="Technologies"
              subtitle="We leverage industry-leading tools and frameworks"
              alignment="center"
              size="lg"
              gradientColors={{ from: 'from-amber-400', to: 'to-orange-500' }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {technologies.map((tech, idx) => (
              <GlobalServiceCard1
                key={idx}
                icon={tech.icon}
                name={tech.name}
                category={tech.category}
                theme="dark"
              />
            ))}
          </div>
        </div>
      </section>

      <GlobalServiceCTA 
        theme="light" 
        title="Ready to Secure Your"
        highlightText="Digital Enterprise?"
        subtitle="Protect your business with world-class security architectures and proactive threat defense systems."
      />
    </div>
  );
};

export default CyberSecurity;