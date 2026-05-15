import React from 'react';
import {
  Palette,
  Image as ImageIcon,
  PenTool,
  Layout,
  Type,
  Monitor,
  Zap,
  Star,
  Shield,
  Infinity,
  Users,
  TrendingUp
} from 'lucide-react';
import GlobalHeading from './GlobalHeading';
import GlobalHero2 from './GlobalHero2';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';

const ServicesSection = () => {
  const services = [
    {
      icon: <Palette size={28} />,
      title: "Logo Design & Branding",
      description: "Create a memorable brand identity with custom logos, color palettes, and comprehensive brand guidelines."
    },
    {
      icon: <Layout size={28} />,
      title: "Marketing Collateral",
      description: "Professionally designed brochures, flyers, business cards, and presentations that leave a lasting impression."
    },
    {
      icon: <ImageIcon size={28} />,
      title: "Social Media Graphics",
      description: "Engaging and on-brand visual content tailored for Instagram, LinkedIn, Twitter, and Facebook."
    },
    {
      icon: <Monitor size={28} />,
      title: "Digital Advertisements",
      description: "High-converting display ads, social media ad creatives, and promotional banners for digital campaigns."
    },
    {
      icon: <PenTool size={28} />,
      title: "Illustration & Art",
      description: "Custom illustrations, iconography, and digital art that add a unique personality to your brand."
    },
    {
      icon: <Type size={28} />,
      title: "Typography & Layout",
      description: "Expert typesetting and layout design for magazines, ebooks, whitepapers, and editorial content."
    }
  ];

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <GlobalHeading
          className="mb-16"
          badge={{ text: "Services" }}
          title="Our Services"
          titleHighlight="Services"
          subtitle="Comprehensive graphic design solutions tailored to elevate your brand's visual identity."
          alignment="center"
          textColor="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <GlobalCard
              key={index}
              index={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              theme="dark"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const GraphicDesign = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
  ];

  const technologies = [
    { name: "Illustrator", category: "Vector", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
    { name: "Photoshop", category: "Raster", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
    { name: "Adobe XD", category: "Layout", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" },
    { name: "After Effects", category: "Animation", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg" },
    { name: "Figma", category: "Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Sketch", category: "Vector", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg" },
    { name: "Premiere Pro", category: "Video Editing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg" },
    { name: "Blender", category: "3D Modeling", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <GlobalHero2
        title="Visual Storytelling for Impactful Brands"
        badge="Impactful Brands"
        subtitle="Elevate your brand with our professional graphic design services. We create compelling visuals that tell your story and resonate with your audience."
        images={heroImages}
      />
      <ServicesSection />

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
              />
            ))}
          </div>
        </div>
      </section>

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