import React, { useState } from 'react';
import {
  Palette,
  Users,
  Zap,
  Target,
  Code2,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Layout,
  Brain,
  Lightbulb,
  TrendingUp,
  Shield,
  Infinity,
  Star,
  Layers
} from 'lucide-react';
import GlobalHero2 from './GlobalHero2';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';
import Button from '../common/Button';

const UIUXDesign = () => {
  const [activeTab, setActiveTab] = useState(0);

  const technologies = [
    { name: "Figma", category: "Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Adobe XD", category: "Design", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg" },
    { name: "Sketch", category: "Prototyping", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg" },
    { name: "InVision", category: "Wireframing", icon: "https://cdn.worldvectorlogo.com/logos/invision.svg" },
    { name: "Framer", category: "Collaboration", icon: "https://cdn.simpleicons.org/framer/ffffff" },
    { name: "Tailwind CSS", category: "Styling", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Photoshop", category: "Image Editing", icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
    { name: "Illustrator", category: "Vector Art", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" }
  ];

  const services = [
    {
      icon: Palette,
      title: "Visual Design",
      description: "Create stunning, brand-aligned interfaces that captivate and engage users with color psychology and design systems."
    },
    {
      icon: Users,
      title: "User Research",
      description: "Deep dive into user behavior, needs, and pain points through interviews, surveys, and usability testing."
    },
    {
      icon: Brain,
      title: "UX Strategy",
      description: "Develop comprehensive strategies that align design with business goals and user expectations."
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Design experiences optimized for mobile devices with responsive, touch-friendly interfaces."
    },
    {
      icon: Zap,
      title: "Prototyping",
      description: "Build interactive prototypes and wireframes to test concepts and validate ideas before development."
    },
    {
      icon: Target,
      title: "Usability Testing",
      description: "Validate designs through user testing to ensure intuitive, accessible, and effective solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <GlobalHero2
        badge="Experience"
        title="Elevating User Experience with Precision"
        subtitle="We blend creativity with user-centric data to design intuitive interfaces that drive engagement and business growth."
        theme="dark"
        images={[
          "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop"
        ]}
      />

      {/* Services Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <GlobalHeading
            className="mb-16"
            badge={{ text: "Services" }}
            title="Our Services"
            titleHighlight="Services"
            subtitle="Transformative design solutions tailored to your unique needs and goals"
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
                icon={<service.icon size={28} />}
                theme="light"
              />
            ))}
          </div>

          <section className="py-12 flex justify-center bg-[#07051D]">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Ready to Elevate Your <span className="text-amber-500">User Experience?</span>
              </h2>
              <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
                Transform your digital products with stunning, user-centric UI/UX design that drives engagement and results.
              </p>
              <Button text="Start Your Project" variant="primary" size="md" showArrow className="mx-2" />
              <Button text="Book a Consultation" variant="outline" size="md" className="mx-2" />
            </div>
          </section>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0B0F19]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <GlobalHeading
              badge={{ text: "Technology Stack" }}
              title="Cutting-Edge Technologies"
              titleHighlight="Technologies"
              subtitle="We leverage industry-leading tools and frameworks"
              alignment="center"
              size="lg"
              textColor="light"
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
        title="Ready to Craft Exceptional"
        highlightText="User Experiences?"
        subtitle="Let's build intuitive, beautiful, and high-converting designs that your users will absolutely love."
      />
    </div>
  );
};

export default UIUXDesign;