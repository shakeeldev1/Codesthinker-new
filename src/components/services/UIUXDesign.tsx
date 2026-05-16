import {
  Palette,
  Users,
  Zap,
  Target,
  Smartphone,
  Brain
} from 'lucide-react';
import GlobalHero2 from './GlobalHero2';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';

const UIUXDesign = () => {

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
          "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop"
        ]}
        primaryLink="/contact"
        secondaryLink="/projects"
        primaryBtnText="Start Designing"
        secondaryBtnText="Our Portfolio"
      />

      {/* Services Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <GlobalHeading
            className="mb-16"
            badge={{ text: "Services" }}
            title="UI/UX Design Services"
            titleHighlight="Design Services"
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