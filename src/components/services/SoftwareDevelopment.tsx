import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import GlobalHero from './GlobalHero';
import {
  Zap,
  Layers,
  Database,
  Globe,
  Cpu,
  Rocket
} from 'lucide-react';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const SoftwareDevelopment = () => {

  const softwareHeroData = [
    {
      id: 1,
      subtitle: "Custom Solutions",
      title: "Building Software That Scales",
      description: "We deliver high-quality, scalable software solutions tailored to your unique business needs and challenges.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      primaryLink: "/contact",
      secondaryLink: "/projects",
      primaryBtnText: "Start Your Project",
      secondaryBtnText: "View Our Work"
    },
    {
      id: 2,
      subtitle: "Enterprise Grade",
      title: "Modernizing Your Business Infrastructure",
      description: "From legacy system migration to cloud-native architecture, we help you stay ahead in the digital era.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
      primaryLink: "/contact",
      secondaryLink: "/projects",
      primaryBtnText: "Consult Our Experts",
      secondaryBtnText: "Case Studies"
    },
    {
      id: 3,
      subtitle: "Innovation First",
      title: "Pioneering Future-Ready Applications",
      description: "Leveraging AI, IoT, and Blockchain to build applications that redefine industry standards.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      primaryLink: "/contact",
      secondaryLink: "/projects",
      primaryBtnText: "Explore Innovation",
      secondaryBtnText: "Our Tech Stack"
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });
    // Explicitly refresh AOS to re-scan and apply animations after DOM is ready
    AOS.refresh();
  }, []);

  const services = [
    {
      id: 1,
      title: "Enterprise Applications",
      description: "Scalable, mission-critical systems designed for organizations that demand reliability and performance at scale.",
      icon: Layers,
      tag: "Enterprise",
      span: "col-span-2",
      accent: "from-orange-50 via-amber-50 to-white",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "Custom CRM & ERP",
      description: "Bespoke business systems tailored to your unique workflows and industry requirements.",
      icon: Database,
      tag: "Business Systems",
      span: "col-span-1",
      accent: "from-slate-50 to-white",
      iconColor: "text-slate-700",
    },
    {
      id: 3,
      title: "API Integration",
      description: "Seamlessly connect disparate systems and build robust data pipelines for modern enterprises.",
      icon: Zap,
      tag: "Integration",
      span: "col-span-1",
      accent: "from-amber-50 to-white",
      iconColor: "text-amber-600",
    },
    {
      id: 4,
      title: "Cloud-Native Solutions",
      description: "Modern applications built for the cloud with containerization and orchestration at their core.",
      icon: Globe,
      tag: "Cloud",
      span: "col-span-1",
      accent: "from-orange-50 to-white",
      iconColor: "text-orange-400",
    },
    {
      id: 5,
      title: "Legacy Modernization",
      description: "Transform legacy systems into modern, maintainable applications without disrupting operations.",
      icon: Cpu,
      tag: "Modernization",
      span: "col-span-1",
      accent: "from-stone-50 to-white",
      iconColor: "text-stone-600",
    },
    {
      id: 6,
      title: "Performance Engineering",
      description: "Optimize every millisecond with advanced profiling, caching strategies, and architectural improvements.",
      icon: Rocket,
      tag: "Performance",
      span: "col-span-2",
      accent: "from-amber-50 via-orange-50 to-white",
      iconColor: "text-amber-500",
    }
  ];

  const techStack = [
    "React", "Node.js", "Python", "TypeScript", "Docker", "AWS", "PostgreSQL", "Kubernetes", "Next.js", "GraphQL", "Redis", "MongoDB", "Terraform", "CI/CD"
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Dynamic Global Hero with Software Development Data */}
      <GlobalHero data={softwareHeroData} height="100vh" />

      <GlobalCapabilitiesSection
        badgeText="Our Services"
        title="Complete Development Solutions"
        subtitle="From concept to launch, we deliver end-to-end software development excellence engineered for enterprise complexity."
        capabilities={services}
      />

      <GlobalTechStackSection
        badgeText="Technology Stack"
        title="Tools we master."
        subtitle="Cutting-edge technologies across cloud, development, and data platforms."
        techStack={techStack}
      />



      <GlobalServiceCTA 
        theme="dark" 
        title="Ready to Build Custom"
        highlightText="Enterprise Software?"
        subtitle="Solve complex business challenges with custom-built software solutions engineered for performance and scale."
      />
    </div>
  );
};

export default SoftwareDevelopment;