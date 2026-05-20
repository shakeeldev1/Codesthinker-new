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
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';

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
      number: "01",
      title: "Enterprise Applications",
      description: "Scalable, mission-critical systems designed for organizations that demand reliability and performance at scale.",
      features: ["High availability", "Security hardened", "Scalable architecture"],
      icon: <Layers size={28} />
    },
    {
      number: "02",
      title: "Custom CRM & ERP",
      description: "Bespoke business systems tailored to your unique workflows and industry requirements.",
      features: ["Workflow optimization", "Data integration", "Real-time analytics"],
      icon: <Database size={28} />
    },
    {
      number: "03",
      title: "API Integration",
      description: "Seamlessly connect disparate systems and build robust data pipelines for modern enterprises.",
      features: ["RESTful design", "GraphQL ready", "Real-time sync"],
      icon: <Zap size={28} />
    },
    {
      number: "04",
      title: "Cloud-Native Solutions",
      description: "Modern applications built for the cloud with containerization and orchestration at their core.",
      features: ["Kubernetes ready", "Auto-scaling", "Multi-region"],
      icon: <Globe size={28} />
    },
    {
      number: "05",
      title: "Legacy Modernization",
      description: "Transform legacy systems into modern, maintainable applications without disrupting operations.",
      features: ["Zero downtime", "Incremental migration", "Cost optimization"],
      icon: <Cpu size={28} />
    },
    {
      number: "06",
      title: "Performance Engineering",
      description: "Optimize every millisecond with advanced profiling, caching strategies, and architectural improvements.",
      features: ["Load optimization", "Database tuning", "CDN integration"],
      icon: <Rocket size={28} />
    }
  ];

  const technologies = [
    { name: "React", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TypeScript", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Docker", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "AWS", category: "Cloud", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "PostgreSQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Kubernetes", category: "Orchestration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Dynamic Global Hero with Software Development Data */}
      <GlobalHero data={softwareHeroData} height="100vh" />

      {/* Services Grid - Interactive */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <GlobalHeading
              badge={{ text: "Our Services" }}
              title="Complete Development Solutions"
              titleHighlight="Development Solutions"
              subtitle="From concept to launch, we deliver end-to-end software development excellence"
              alignment="center"
              size="lg"
              gradientColors={{ from: 'from-amber-400', to: 'to-orange-500' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <GlobalCard
                key={idx}
                index={idx}
                title={service.title}
                description={service.description}
                icon={service.icon}
                theme="dark"
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
              />
            ))}
          </div>
        </div>
      </section>



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