import React, { useEffect } from 'react';
import {
  Code2,
  Smartphone,
  Zap,
  ShoppingCart,
  Globe,
  CheckCircle2,
  ArrowRight,
  Layers,
  Cpu,
  Database,
  Layout,
  ShieldCheck
} from 'lucide-react';
import GlobalHero1 from './GlobalHero1';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';
import AOS from "aos";
import "aos/dist/aos.css";

const WebDevelopment = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });
    // Explicitly refresh AOS to re-scan and apply animations after DOM is ready
    setTimeout(() => {
      AOS.refresh();
    }, 100); // Add a small delay
  }, []);

  const services = [
    {
      icon: Globe,
      title: "Responsive Design",
      description: "Pixel-perfect websites that work flawlessly on all devices, from mobile phones to desktop screens."
    },
    {
      icon: Zap,
      title: "Performance First",
      description: "Lightning-fast load times and smooth interactions optimized for SEO and user experience."
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete online stores with secure payments, inventory management, and customer analytics."
    },
    {
      icon: Smartphone,
      title: "Progressive Web Apps",
      description: "App-like experiences that work offline, install on home screens, and engage users seamlessly."
    },
    {
      icon: Code2,
      title: "Modern Stack",
      description: "Built with cutting-edge technologies like React, Next.js, and TypeScript for scalability."
    },
    {
      icon: Layers,
      title: "Content Management",
      description: "Flexible CMS integration for easy content updates without technical knowledge required."
    }
  ];

  const technologies = [
    { name: "React", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", category: "Framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Node.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "TypeScript", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Tailwind CSS", category: "Styling", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    { name: "Vercel", category: "Deployment", icon: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
    { name: "MongoDB", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Figma", category: "Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
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

      {/* Services Grid Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <GlobalHeading
              badge={{ text: "Our Services" }}
              title="Our Web Services"
              titleHighlight="Web Services"
              subtitle="Comprehensive solutions tailored to your business needs"
              alignment="center"
              size="lg"
              gradientColors={{ from: 'from-amber-400', to: 'to-orange-500' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
        title="Ready to Build Your"
        highlightText="Next-Gen Website?"
        subtitle="From complex web apps to stunning landing pages, we build high-performance solutions tailored to your business."
      />
    </div>
  );
};

export default WebDevelopment;