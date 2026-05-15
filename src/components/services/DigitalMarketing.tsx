import React, { useState } from 'react';
import {
  Megaphone,
  BarChart,
  Search,
  Mail,
  Share2,
  PenTool,
  ArrowRight,
  TrendingUp,
  Target,
  Users,
  Award,
  Globe,
  PieChart,
  MessageCircle,
  Zap,
  Star
} from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';

const DigitalMarketing = () => {
  const [activeTab, setActiveTab] = useState(0);

  const technologies = [
    { name: "Google", category: "Analytics & Ads", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
    { name: "Facebook", category: "Social Marketing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" },
    { name: "LinkedIn", category: "B2B Marketing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" },
    { name: "Instagram", category: "Social Media", icon: "https://cdn.simpleicons.org/instagram/E4405F" },
    { name: "Salesforce", category: "CRM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg" },
    { name: "WordPress", category: "SEO & Content", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
    { name: "Figma", category: "Ad Creatives", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Slack", category: "Community", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" }
  ];

  const marketingHeroData = [
    {
      id: 1,
      subtitle: "Performance Marketing",
      title: "Drive Growth with Data-Driven Strategies",
      description: "Scale your business with expert-led digital marketing campaigns that deliver measurable ROI and brand authority.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      color: "from-amber-600/40 to-orange-500/40",
    },
    {
      id: 2,
      subtitle: "Social Commerce",
      title: "Connect with Your Ideal Audience",
      description: "Building loyal communities and driving engagement across all platforms where your customers live and shop.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop",
      color: "from-orange-600/40 to-amber-500/40",
    },
    {
      id: 3,
      subtitle: "Search Excellence",
      title: "Rank High, Grow Faster",
      description: "Dominating search results with advanced SEO and targeted SEM strategies tailored for your industry.",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
      color: "from-yellow-600/40 to-orange-500/40",
    },
  ];

  const services = [
    {
      icon: Search,
      title: "Search Engine Optimization (SEO)",
      description: "Boost your organic visibility and rank higher on search engines with data-driven SEO strategies."
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description: "Build a loyal community and drive engagement across platforms like Instagram, LinkedIn, and Facebook."
    },
    {
      icon: Megaphone,
      title: "Pay-Per-Click (PPC)",
      description: "Maximize your ROI with targeted ad campaigns on Google Ads, Bing, and social media platforms."
    },
    {
      icon: PenTool,
      title: "Content Marketing",
      description: "Create valuable, relevant content that attracts and retains a clearly defined audience."
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Nurture leads and drive conversions with personalized, automated email campaigns."
    },
    {
      icon: BarChart,
      title: "Analytics & Reporting",
      description: "Track performance, measure success, and gain actionable insights with advanced analytics."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Audit",
      description: "We analyze your current digital presence, competitors, and market opportunities."
    },
    {
      number: "02",
      title: "Strategy",
      description: "Developing a tailored marketing plan aligned with your specific business goals."
    },
    {
      number: "03",
      title: "Execution",
      description: "Launching campaigns, creating content, and optimizing your digital channels."
    },
    {
      number: "04",
      title: "Monitor",
      description: "Tracking key performance indicators (KPIs) and gathering real-time data."
    },
    {
      number: "05",
      title: "Scale",
      description: "Refining strategies based on analytics to maximize ROI and scale success."
    }
  ];

  const tools = [
    { name: "Google Ads", icon: Target },
    { name: "Analytics", icon: PieChart },
    { name: "Meta Ads", icon: Share2 },
    { name: "Mailchimp", icon: Mail },
    { name: "HubSpot", icon: Users },
    { name: "SEMrush", icon: Search }
  ];

  const benefits = [
    { icon: TrendingUp, text: "Increase website traffic" },
    { icon: Target, text: "Generate high-quality leads" },
    { icon: Award, text: "Improve brand authority" },
    { icon: Users, text: "Enhance customer engagement" },
    { icon: Globe, text: "Expand market reach" },
    { icon: Zap, text: "Boost conversion rates" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Global Hero with Marketing Data */}
      <GlobalHero data={marketingHeroData} height="100vh" />

      {/* Services Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <GlobalHeading
            className="mb-16"
            badge={{ text: "Services" }}
            title="Our Services"
            titleHighlight="Services"
            subtitle="End-to-end digital marketing solutions designed to maximize your online visibility and revenue."
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
        title="Ready to Maximize Your"
        highlightText="Marketing ROI?"
        subtitle="Drive measurable growth and scale your business with data-driven digital marketing strategies that convert."
      />
    </div>
  );
};

export default DigitalMarketing;