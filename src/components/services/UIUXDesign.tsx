import React from 'react';
import {
  Palette,
  Users,
  Zap,
  Target,
  Smartphone,
  Brain
} from 'lucide-react';
import GlobalHero2 from './GlobalHero2';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const UIUXDesign = () => {
  const capabilities = [
    {
      id: 1,
      title: "Visual Design",
      description: "Create stunning, brand-aligned interfaces that captivate and engage users with color psychology and design systems.",
      icon: Palette,
      tag: "Visuals",
      span: "col-span-2",
      accent: "from-orange-50 via-amber-50 to-white",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "User Research",
      description: "Deep dive into user behavior, needs, and pain points through interviews, surveys, and usability testing.",
      icon: Users,
      tag: "Research",
      span: "col-span-1",
      accent: "from-slate-50 to-white",
      iconColor: "text-slate-700",
    },
    {
      id: 3,
      title: "UX Strategy",
      description: "Develop comprehensive strategies that align design with business goals and user expectations.",
      icon: Brain,
      tag: "Strategy",
      span: "col-span-1",
      accent: "from-amber-50 to-white",
      iconColor: "text-amber-600",
    },
    {
      id: 4,
      title: "Mobile First",
      description: "Design experiences optimized for mobile devices with responsive, touch-friendly interfaces.",
      icon: Smartphone,
      tag: "Responsive",
      span: "col-span-1",
      accent: "from-orange-50 to-white",
      iconColor: "text-orange-400",
    },
    {
      id: 5,
      title: "Prototyping",
      description: "Build interactive prototypes and wireframes to test concepts and validate ideas before development.",
      icon: Zap,
      tag: "Prototypes",
      span: "col-span-1",
      accent: "from-stone-50 to-white",
      iconColor: "text-stone-600",
    },
    {
      id: 6,
      title: "Usability Testing",
      description: "Validate designs through user testing to ensure intuitive, accessible, and effective solutions.",
      icon: Target,
      tag: "Testing",
      span: "col-span-2",
      accent: "from-amber-50 via-orange-50 to-white",
      iconColor: "text-amber-500",
    }
  ];

  const techStack = [
    "Figma", "Adobe XD", "Sketch", "InVision", "Framer", "Tailwind CSS", "Photoshop", "Illustrator", "Zeplin", "Miro"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <GlobalHero2
        badge="Experience"
        title="Elevating User Experience with Precision"
        subtitle="We blend creativity with user centric data to design intuitive interfaces that drive engagement and business growth."
        theme="dark"
        images={[
          "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop"
        ]}
        primaryLink="/contact"
        secondaryLink="/projects"
        primaryBtnText="Start Designing"
        secondaryBtnText="Our Portfolio"
      />

      <GlobalCapabilitiesSection
        badgeText="Services"
        title="UI/UX Design Services"
        subtitle="Transformative design solutions tailored to your unique needs, user patterns, and business goals."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Design Stack"
        title="Tools we master."
        subtitle="Modern vector creation tools, interactive prototyping environments, wireframing software, and collaborative boards."
        techStack={techStack}
      />

      <GlobalServiceCTA 
        theme="light" 
        title="Ready to Craft Exceptional"
        highlightText="User Experiences?"
        subtitle="Let's build intuitive, beautiful, and high-converting designs that your users will absolutely love."
      />
    </div>
  );
};

export default UIUXDesign;