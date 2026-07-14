import React from 'react';
import {
  Megaphone,
  BarChart,
  Search,
  Mail,
  Share2,
  PenTool
} from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const DigitalMarketing = () => {
  const marketingHeroData = [
    {
      id: 1,
      subtitle: "Performance Marketing",
      title: "Drive Growth with Data-Driven Strategies",
      description: "Scale your business with expert-led digital marketing campaigns that deliver measurable ROI and brand authority.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      primaryLink: "/contact",
      secondaryLink: "/projects",
      primaryBtnText: "Boost Your Sales",
      secondaryBtnText: "Case Studies"
    },
    {
      id: 2,
      subtitle: "Social Commerce",
      title: "Connect with Your Ideal Audience",
      description: "Building loyal communities and driving engagement across all platforms where your customers live and shop.",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2062&auto=format&fit=crop",
      primaryLink: "/contact",
      secondaryLink: "/projects",
      primaryBtnText: "Get Social Now",
      secondaryBtnText: "Our Approach"
    },
    {
      id: 3,
      subtitle: "Search Excellence",
      title: "Rank High, Grow Faster",
      description: "Dominating search results with advanced SEO and targeted SEM strategies tailored for your industry.",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
      primaryLink: "/contact",
      secondaryLink: "/projects",
      primaryBtnText: "Start SEO Audit",
      secondaryBtnText: "View Results"
    },
  ];

  const capabilities = [
    {
      id: 1,
      title: "Search Engine Optimization (SEO)",
      description: "Boost your organic visibility and rank higher on search engines with data-driven SEO strategies.",
      icon: Search,
      tag: "Organic Search",
      span: "col-span-2",
      accent: "from-orange-50 via-amber-50 to-white",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "Social Media SMM",
      description: "Build a loyal community and drive engagement across platforms like Instagram, LinkedIn, and Facebook.",
      icon: Share2,
      tag: "Social",
      span: "col-span-1",
      accent: "from-slate-50 to-white",
      iconColor: "text-slate-700",
    },
    {
      id: 3,
      title: "Pay-Per-Click (PPC)",
      description: "Maximize your ROI with targeted ad campaigns on Google Ads, Bing, and social media platforms.",
      icon: Megaphone,
      tag: "Paid Advertising",
      span: "col-span-1",
      accent: "from-amber-50 to-white",
      iconColor: "text-amber-600",
    },
    {
      id: 4,
      title: "Content Marketing",
      description: "Create valuable, relevant content that attracts and retains a clearly defined audience.",
      icon: PenTool,
      tag: "Copywriting",
      span: "col-span-1",
      accent: "from-orange-50 to-white",
      iconColor: "text-orange-400",
    },
    {
      id: 5,
      title: "Email Marketing",
      description: "Nurture leads and drive conversions with personalized, automated email campaigns.",
      icon: Mail,
      tag: "Automation",
      span: "col-span-1",
      accent: "from-stone-50 to-white",
      iconColor: "text-stone-600",
    },
    {
      id: 6,
      title: "Analytics & Reporting",
      description: "Track performance, measure success, and gain actionable insights with advanced analytics.",
      icon: BarChart,
      tag: "Telemetry",
      span: "col-span-2",
      accent: "from-amber-50 via-orange-50 to-white",
      iconColor: "text-amber-500",
    }
  ];

  const techStack = [
    "Google Analytics", "Google Ads", "Meta Ads", "Mailchimp", "HubSpot", "SEMrush", "Ahrefs", "Google Search Console", "Hotjar", "ActiveCampaign", "Buffer", "Hootsuite"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Global Hero with Marketing Data */}
      <GlobalHero data={marketingHeroData} height="100vh" />

      <GlobalCapabilitiesSection
        badgeText="Marketing Services"
        title="Digital Marketing Services"
        subtitle="End-to-end digital marketing solutions designed to maximize your online visibility, customer acquisition, and revenue."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Marketing Stack"
        title="Tools we master."
        subtitle="Modern advertising platforms, content tools, SEO platforms, and analytics telemetry."
        techStack={techStack}
      />

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