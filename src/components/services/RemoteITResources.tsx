import React, { useState } from 'react';
import {
  Users,
  Zap,
  Globe,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Code2,
  Shield,
  Clock,
  Lightbulb,
  Rocket,
  Target
} from 'lucide-react';
import GlobalHero1 from './GlobalHero1';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';

const RemoteITResources = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const technologies = [
    { name: "React", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "AWS", category: "Cloud", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "Docker", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Java", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Angular", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "PostgreSQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }
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

      {/* Services Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <GlobalHeading
              className="mb-16"
              badge={{ text: "Services" }}
              title="Remote IT Services"
              titleHighlight="IT Services"
              subtitle="Flexible engagement models for every need"
              alignment="center"
              textColor="dark"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 size={28} />,
                title: "Dedicated Teams",
                description: "Full-time team members working exclusively for your company",
                features: ["24/7 Availability", "Scalable Team Size", "Managed Training"]
              },
              {
                icon: <Rocket size={28} />,
                title: "Staff Augmentation",
                description: "Supplement your existing team with specialized expertise",
                features: ["Flexible Duration", "Specific Skills", "Quick Integration"]
              },
              {
                icon: <Target size={28} />,
                title: "Project-Based",
                description: "Complete projects with focused expert teams",
                features: ["Fixed Timeline", "Quality Guaranteed", "No Long-term Commitment"]
              }
            ].map((service, index) => (
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
        title="Ready to Scale Your"
        highlightText="Engineering Capacity?"
        subtitle="Access the top 3% of tech talent and build your dedicated remote team in days, not months."
      />
    </div>
  );
};

export default RemoteITResources;