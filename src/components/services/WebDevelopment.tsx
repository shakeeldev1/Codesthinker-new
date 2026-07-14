import React from 'react';
import {
  Code2,
  Smartphone,
  Zap,
  ShoppingCart,
  Globe,
  Layers
} from 'lucide-react';
import GlobalHero1 from './GlobalHero1';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const WebDevelopment = () => {
  const capabilities = [
    {
      id: 1,
      title: "Responsive Design",
      description: "Pixel-perfect websites that work flawlessly on all devices, from mobile phones to high-resolution desktop screens.",
      icon: Globe,
      tag: "UX Design",
      span: "col-span-2",
      accent: "from-orange-50 via-amber-50 to-white",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "Performance First",
      description: "Lightning-fast load times and smooth interactions optimized for search engine indexing and user experience.",
      icon: Zap,
      tag: "Optimization",
      span: "col-span-1",
      accent: "from-slate-50 to-white",
      iconColor: "text-slate-700",
    },
    {
      id: 3,
      title: "E-commerce Solutions",
      description: "Complete online stores with secure checkout flows, real-time inventory management, and customer analytics.",
      icon: ShoppingCart,
      tag: "Commerce",
      span: "col-span-1",
      accent: "from-amber-50 to-white",
      iconColor: "text-amber-600",
    },
    {
      id: 4,
      title: "Progressive Web Apps",
      description: "App-like web experiences that function offline, install on home screens, and support push notifications.",
      icon: Smartphone,
      tag: "PWA",
      span: "col-span-1",
      accent: "from-orange-50 to-white",
      iconColor: "text-orange-400",
    },
    {
      id: 5,
      title: "Modern Stack",
      description: "Built with cutting-edge technologies like React, Next.js, and TypeScript for absolute scale and code safety.",
      icon: Code2,
      tag: "Engineering",
      span: "col-span-1",
      accent: "from-stone-50 to-white",
      iconColor: "text-stone-600",
    },
    {
      id: 6,
      title: "Content Management",
      description: "Flexible headless CMS integrations allowing team members to make instant, visual content updates.",
      icon: Layers,
      tag: "CMS Integration",
      span: "col-span-2",
      accent: "from-amber-50 via-orange-50 to-white",
      iconColor: "text-amber-500",
    }
  ];

  const techStack = [
    "React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "Vercel", "MongoDB", "Figma", "Redux", "GraphQL", "PostgreSQL", "Sanity CMS"
  ];

  return (
    <div className="bg-white overflow-x-hidden overflow-y-hidden">
      {/* Global Hero 1 with Web Development Data */}
      <GlobalHero1 
        theme="dark"
        title="Web Development That Converts"
        badge="Development"
        subtitle="We create stunning, high-performance websites that engage your audience and drive measurable results. From responsive design to complex applications, we build digital experiences that matter."
        images={[
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
        ]}
        primaryLink="/contact"
        secondaryLink="/projects"
        primaryBtnText="Start Your Project"
        secondaryBtnText="View Our Work"
      />

      <GlobalCapabilitiesSection
        badgeText="Our Services"
        title="Our Web Services"
        subtitle="Comprehensive solutions tailored to your business needs, engineered for responsiveness and high performance."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Technology Stack"
        title="Tools we master."
        subtitle="Modern frameworks, markup design systems, static generators, and serverless hosting environments."
        techStack={techStack}
      />

      <GlobalServiceCTA 
        theme="light" 
        title="Ready to Build Your"
        highlightText="Next-Gen Website?"
        subtitle="From complex web apps to stunning landing pages, we build high-performance solutions tailored to your business."
      />
    </div>
  );
};

export default WebDevelopment;