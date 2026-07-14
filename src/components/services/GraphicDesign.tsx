import React from 'react';
import {
  Palette,
  Image as ImageIcon,
  PenTool,
  Layout,
  Type,
  Monitor
} from 'lucide-react';
import GlobalHero2 from './GlobalHero2';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const GraphicDesign = () => {
  const capabilities = [
    {
      id: 1,
      title: "Logo Design & Branding",
      description: "Create a memorable brand identity with custom logos, color palettes, and comprehensive brand guidelines.",
      icon: Palette,
      tag: "Identity",
      span: "col-span-2",
      accent: "from-orange-50 via-amber-50 to-white",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "Marketing Collateral",
      description: "Professionally designed brochures, flyers, business cards, and presentations that leave a lasting impression.",
      icon: Layout,
      tag: "Print & PDF",
      span: "col-span-1",
      accent: "from-slate-50 to-white",
      iconColor: "text-slate-700",
    },
    {
      id: 3,
      title: "Social Media Graphics",
      description: "Engaging and on-brand visual content tailored for Instagram, LinkedIn, Twitter, and Facebook.",
      icon: ImageIcon,
      tag: "Social Content",
      span: "col-span-1",
      accent: "from-amber-50 to-white",
      iconColor: "text-amber-600",
    },
    {
      id: 4,
      title: "Digital Advertisements",
      description: "High-converting display ads, social media ad creatives, and promotional banners for digital campaigns.",
      icon: Monitor,
      tag: "Marketing",
      span: "col-span-1",
      accent: "from-orange-50 to-white",
      iconColor: "text-orange-400",
    },
    {
      id: 5,
      title: "Illustration & Art",
      description: "Custom illustrations, iconography, and digital art that add a unique personality to your brand.",
      icon: PenTool,
      tag: "Custom Art",
      span: "col-span-1",
      accent: "from-stone-50 to-white",
      iconColor: "text-stone-600",
    },
    {
      id: 6,
      title: "Typography & Layout",
      description: "Expert typesetting and layout design for magazines, ebooks, whitepapers, and editorial content.",
      icon: Type,
      tag: "Editorial",
      span: "col-span-2",
      accent: "from-amber-50 via-orange-50 to-white",
      iconColor: "text-amber-500",
    }
  ];

  const heroImages = [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop"
  ];

  const techStack = [
    "Adobe Illustrator", "Adobe Photoshop", "Adobe XD", "Adobe After Effects", "Figma", "Sketch", "Adobe Premiere Pro", "Blender", "InDesign", "Canva"
  ];

  return (
    <div className="min-h-screen bg-white">
      <GlobalHero2
        title="Visual Storytelling for Impactful Brands"
        badge="Impactful Brands"
        subtitle="Elevate your brand with our professional graphic design services. We create compelling visuals that tell your story and resonate with your audience."
        images={heroImages}
        primaryLink="/contact"
        secondaryLink="/projects"
        primaryBtnText="Get Creative Now"
        secondaryBtnText="View Designs"
      />

      <GlobalCapabilitiesSection
        badgeText="Services"
        title="Graphic Design Services"
        subtitle="Comprehensive graphic design solutions tailored to elevate your brand's visual identity across all platforms."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Design Stack"
        title="Tools we master."
        subtitle="Professional raster/vector editors, page layout suites, 3D modeling programs, and motion tools."
        techStack={techStack}
      />

      <GlobalServiceCTA 
        theme="dark" 
        title="Ready to Elevate Your"
        highlightText="Brand Identity?"
        subtitle="Create a lasting impression with premium graphic designs that speak volumes about your brand's excellence."
      />
    </div>
  );
};

export default GraphicDesign;