import React from 'react';
import {
  Code2,
  Rocket,
  Target
} from 'lucide-react';
import GlobalHero1 from './GlobalHero1';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const RemoteITResources = () => {
  const capabilities = [
    {
      id: 1,
      title: "Dedicated Teams",
      description: "Full-time team members working exclusively for your company to drive development velocity.",
      icon: Code2,
      tag: "Dedicated",
      span: "col-span-1",
      accent: "from-orange-50 via-amber-50 to-white",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "Staff Augmentation",
      description: "Supplement your existing development team with specialized technical expertise and talent.",
      icon: Rocket,
      tag: "Augmentation",
      span: "col-span-1",
      accent: "from-slate-50 to-white",
      iconColor: "text-slate-700",
    },
    {
      id: 3,
      title: "Project-Based",
      description: "Complete your scope-defined projects with focused, expert development teams.",
      icon: Target,
      tag: "On-demand",
      span: "col-span-1",
      accent: "from-amber-50 to-white",
      iconColor: "text-amber-600",
    }
  ];

  const techStack = [
    "React", "Node.js", "Python", "AWS", "Docker", "Java", "Angular", "PostgreSQL", "Vue.js", "TypeScript", "Kubernetes", "Next.js"
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Global Hero 1 with Remote Resources Data */}
      <GlobalHero1 
        title="Scale Your Team Instantly"
        badge="Instantly"
        subtitle="Access vetted IT professionals worldwide. Build, scale, and ship faster with expert remote resources that integrate seamlessly into your team."
        images={[
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        ]}
        primaryLink="/contact"
        secondaryLink="/projects"
        primaryBtnText="Hire Developers"
        secondaryBtnText="How It Works"
      />

      <GlobalCapabilitiesSection
        badgeText="Services"
        title="Remote IT Services"
        subtitle="Flexible engagement models for every development need and technical requirement."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Technology Stack"
        title="Tools we master."
        subtitle="Vetted capabilities across backend, frontend, cloud, databases, and devops."
        techStack={techStack}
      />

      <GlobalServiceCTA 
        theme="dark" 
        title="Ready to Scale Your"
        highlightText="Engineering Capacity?"
        subtitle="Access the top 3% of tech talent and build your dedicated remote team in days, not months."
      />
    </div>
  );
};

export default RemoteITResources;