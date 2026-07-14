import React, { useState, useEffect } from 'react';
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
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

// ==================== DATA ====================
const cyberHeroData = [
  {
    id: 1,
    subtitle: "Enterprise Defense",
    title: "Intelligent Cyber Security Solutions",
    description: "Protecting your digital assets with advanced threat intelligence and real-time response capabilities.",
    image: "https://images.unsplash.com/photo-1509956072962-7ff0f36dd7ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    primaryLink: "/contact",
    secondaryLink: "/projects",
    primaryBtnText: "Secure Your Assets",
    secondaryBtnText: "View Security Work"
  },
  {
    id: 2,
    subtitle: "Zero Trust Architecture",
    title: "Security Without Compromise",
    description: "Implementing mission-critical defense layers that ensure your data remains accessible only to those you trust.",
    image: "https://images.unsplash.com/photo-1498049860654-af1a5c566876?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    primaryLink: "/contact",
    secondaryLink: "/projects",
    primaryBtnText: "Get Audit Now",
    secondaryBtnText: "Security Protocols"
  },
  {
    id: 3,
    subtitle: "Cloud Security",
    title: "Modern Threat Protection",
    description: "Leveraging AI-powered detection to stay steps ahead of evolving digital risks and vulnerabilities.",
    image: "https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
    primaryLink: "/contact",
    secondaryLink: "/projects",
    primaryBtnText: "Start Free Audit",
    secondaryBtnText: "Our Methodology"
  },
];

const capabilities = [
  {
    id: 1,
    title: "Threat Detection",
    description: "Real-time monitoring and intelligent threat detection powered by machine learning algorithms.",
    icon: Eye,
    tag: "Monitoring",
    span: "col-span-2",
    accent: "from-orange-50 via-amber-50 to-white",
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    title: "Data Protection",
    description: "Military-grade encryption and advanced data loss prevention for all your sensitive information.",
    icon: Lock,
    tag: "Encryption",
    span: "col-span-1",
    accent: "from-slate-50 to-white",
    iconColor: "text-slate-700",
  },
  {
    id: 3,
    title: "Infrastructure Security",
    description: "Secure your cloud, on-premise, and hybrid environments with comprehensive infrastructure hardening.",
    icon: Server,
    tag: "Cloud",
    span: "col-span-1",
    accent: "from-amber-50 to-white",
    iconColor: "text-amber-600",
  },
  {
    id: 4,
    title: "Incident Response",
    description: "Expert team ready to respond to security incidents 24/7 with proven methodologies.",
    icon: Brain,
    tag: "Response",
    span: "col-span-1",
    accent: "from-orange-50 to-white",
    iconColor: "text-orange-400",
  },
  {
    id: 5,
    title: "Risk Management",
    description: "Comprehensive risk assessments and compliance management for regulatory requirements.",
    icon: TrendingUp,
    tag: "Compliance",
    span: "col-span-1",
    accent: "from-stone-50 to-white",
    iconColor: "text-stone-600",
  },
  {
    id: 6,
    title: "Security Training",
    description: "Empower your team with security awareness and best practices training programs.",
    icon: Zap,
    tag: "Training",
    span: "col-span-2",
    accent: "from-amber-50 via-orange-50 to-white",
    iconColor: "text-amber-500",
  }
];

const techStack = [
  "Linux", "Python", "AWS Security", "Docker", "Bash", "C++", "Kubernetes", "Azure Security", "Wireshark", "Metasploit", "Nmap", "Suricata", "Snort", "Splunk", "Kali Linux", "OpenSSL"
];

const CyberSecurity = () => {
  return (
    <div className="bg-white">
      <GlobalHero data={cyberHeroData} height="100vh" />
      
      <GlobalCapabilitiesSection
        badgeText="Security Services"
        title="Our Security Services"
        subtitle="Comprehensive security solutions tailored to protect your organization at every level from modern digital threats."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Technology Stack"
        title="Tools we master."
        subtitle="Cutting-edge tools, platforms, and security suites used to audit, protect, and monitor infrastructure."
        techStack={techStack}
      />

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