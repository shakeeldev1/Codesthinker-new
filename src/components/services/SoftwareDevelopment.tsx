import React, { useState, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import GlobalHero from './GlobalHero';
import Button from '../common/Button';
import {
  Zap,
  Shield,
  TrendingUp,
  Users,
  Code2,
  ArrowRight,
  CheckCircle2,
  Database,
  Cpu,
  Globe,
  Layers,
  Rocket
} from 'lucide-react';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';

const SoftwareDevelopment = () => {
  const [activeService, setActiveService] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const softwareHeroData = [
    {
      id: 1,
      subtitle: "Enterprise Engineering",
      title: "Solutions Built for Scale",
      description: "Developing mission-critical software architectures that power modern industry leaders.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
      color: "from-amber-600/40 to-orange-500/40",
    },
    {
      id: 2,
      subtitle: "Cloud Innovation",
      title: "The Future of Development",
      description: "Leveraging cloud-native technologies to build resilient and adaptable digital products.",
      image: "https://images.unsplash.com/photo-1492138786289-d35ea832da43?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-orange-600/40 to-amber-500/40",
    },
    {
      id: 3,
      subtitle: "Full-Stack Mastery",
      title: "Crafting Complex Systems",
      description: "Where technical excellence meets business logic in every line of code.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop",
      color: "from-yellow-600/40 to-orange-500/40",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  
  const processSteps = [
    { step: "01", title: "Discovery", description: "We analyze your requirements, constraints, and goals to create a comprehensive roadmap." },
    { step: "02", title: "Architecture", description: "Design scalable, maintainable systems using industry best practices and proven patterns." },
    { step: "03", title: "Development", description: "Build with precision, following strict quality standards and continuous integration practices." },
    { step: "04", title: "Deployment", description: "Launch with confidence using automated testing, monitoring, and staged rollouts." }
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



      <section className="py-12 flex justify-center bg-[#07051D]">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Ready to Build Custom <span className="text-amber-500">Enterprise Software?</span>
          </h2>
          <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
            Solve complex business challenges with custom-built software solutions engineered for performance and scale.
          </p>
          <Button text="Start Your Project" variant="primary" size="md" showArrow className="mx-2" />
          <Button text="Book a Consultation" variant="outline" size="md" className="mx-2" />
        </div>
      </section>
    </div>
  );
};

export default SoftwareDevelopment;