import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Gamepad2, 
  ShieldCheck, 
  Users, 
  Palette, 
  PenTool, 
  TrendingUp 
  ,
  Server,
  BarChart
} from 'lucide-react';
import GlobalHero from '../components/services/GlobalHero';
import GlobalHeading from '../components/services/GlobalHeading';
import GlobalCard from '../components/services/GlobalServiceCard';
import GlobalServiceCTA from '../components/services/GlobalServiceCTA';


const servicesHeroData = [
  {
    id: 1,
    subtitle: "What We Do",
    title: "Our Comprehensive Digital Services",
    description: "We offer a comprehensive suite of digital services to help your business thrive in the modern technological landscape.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    primaryLink: "/contact",
    secondaryLink: "/about",
    primaryBtnText: "Get in Touch",
    secondaryBtnText: "Learn About Us"
  },
  {
    id: 2,
    subtitle: "Innovation First",
    title: "Transforming Ideas into Reality",
    description: "From custom software to cutting-edge AI and gaming solutions, we bring technical excellence to every project.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    primaryLink: "/projects",
    secondaryLink: "/contact",
    primaryBtnText: "View Our Work",
    secondaryBtnText: "Start a Project"
  }
];

const servicesData = [
  {
    id: 'software',
    title: 'Software Development',
    description: 'Custom software solutions tailored to your business needs, from enterprise applications to specialized tools.',
    icon: Code,
    link: '/services/software'
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Modern, scalable, and responsive web applications built with cutting-edge technologies.',
    icon: Globe,
    link: '/services/web'
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile experiences that users love for iOS and Android.',
    icon: Smartphone,
    link: '/services/mobile'
  },
  {
    id: 'gaming',
    title: 'AI/ML & Gaming',
    description: 'Innovative gaming experiences and intelligent AI/ML solutions for next-gen applications.',
    icon: Gamepad2,
    link: '/services/gaming'
  },
  {
    id: 'security',
    title: 'Cyber Security',
    description: 'Robust security solutions to protect your digital assets and ensure data privacy.',
    icon: ShieldCheck,
    link: '/services/security'
  },
  {
    id: 'resources',
    title: 'Remote IT Resources',
    description: 'Access top-tier IT talent and build dedicated remote teams for your projects.',
    icon: Users,
    link: '/services/resources'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Transformative design solutions  and high-converting user experiences.',
    icon: Palette,
    link: '/services/ui-ux'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Comprehensive graphic design solutions to elevate your brand\'s visual identity.',
    icon: PenTool,
    link: '/services/graphic-design'
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'Data-driven marketing strategies to boost your online presence and drive growth.',
    icon: TrendingUp,
    link: '/services/marketing'
  }
  ,
  {
    id: 'blockchain',
    title: 'Blockchain Development',
    description: 'Build secure, scalable blockchain applications, smart contracts, and DApps.',
    icon: Server,
    link: '/services/blockchain'
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transform data into actionable insights with analytics and BI solutions.',
    icon: BarChart,
    link: '/services/data-analytics'
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    description: 'Custom WordPress themes, plugins and performant CMS-driven sites.',
    icon: Globe,
    link: '/services/wordpress'
  }
];

const ServicesPage = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <GlobalHero data={servicesHeroData} height="100vh" />

      {/* Services Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <GlobalHeading
              badge={{ text: "Our Services" }}
              title="Complete Digital Solutions"
              titleHighlight="Solutions"
              subtitle="From concept to launch, we deliver end-to-end digital excellence"
              alignment="center"
              size="lg"
              gradientColors={{ from: 'from-amber-400', to: 'to-orange-500' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => (
              <div key={index} className="h-full" onClick={() => window.location.href = service.link}>
                <GlobalCard
                  index={index}
                  title={service.title}
                  description={service.description}
                  icon={<service.icon size={28} />}
                  theme="dark"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlobalServiceCTA 
        theme="light" 
        title="Ready to Transform Your"
        highlightText="Digital Presence?"
        subtitle="Let's collaborate to build innovative solutions that drive real business growth."
      />
    </div>
  );
};

export default ServicesPage;
