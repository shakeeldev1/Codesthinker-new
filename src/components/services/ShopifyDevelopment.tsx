import React from 'react';
import {
  ShoppingCart,
  Laptop,
  Layers,
  RefreshCw,
  Zap,
  TrendingUp
} from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const ShopifyDevelopment = () => {
  const heroData = [
    {
      id: 1,
      subtitle: 'E-Commerce',
      title: 'High-Converting Shopify Stores Built to Scale',
      description: 'We build high performance Shopify stores that blend premium design and clean Liquid/Hydrogen development to deliver frictionless shopping experiences and boost your sales.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
      primaryLink: '/contact',
      secondaryLink: '/projects',
      primaryBtnText: 'Launch Your Store',
      secondaryBtnText: 'View Our Work'
    }
  ];

  const capabilities = [
    {
      id: 1,
      title: "Store Setup & Design",
      description: "Custom store configuration, payment integrations, and visually stunning storefronts aligned with your brand.",
      icon: ShoppingCart,
      tag: "Store Setup",
      span: "col-span-2",
      accent: "from-orange-50 via-amber-50 to-white",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "Custom Theme Development",
      description: "Tailored Shopify Liquid themes or Headless Hydrogen builds crafted for maximum speed and uniqueness.",
      icon: Laptop,
      tag: "Theme Dev",
      span: "col-span-1",
      accent: "from-slate-50 to-white",
      iconColor: "text-slate-700",
    },
    {
      id: 3,
      title: "App Integrations & APIs",
      description: "Seamless connection with ERPs, CRMs, shipping carriers, and custom private app development.",
      icon: Layers,
      tag: "Integrations",
      span: "col-span-1",
      accent: "from-amber-50 to-white",
      iconColor: "text-amber-600",
    },
    {
      id: 4,
      title: "Platform Migrations",
      description: "Risk-free migration of products, customers, and orders from WooCommerce, Magento, or custom setups.",
      icon: RefreshCw,
      tag: "Migration",
      span: "col-span-1",
      accent: "from-orange-50 to-white",
      iconColor: "text-orange-400",
    },
    {
      id: 5,
      title: "Speed & Performance Optimization",
      description: "Performance auditing, code cleanup, and asset optimization to boost your conversion rates and Google Core Web Vitals.",
      icon: Zap,
      tag: "Optimization",
      span: "col-span-1",
      accent: "from-stone-50 to-white",
      iconColor: "text-stone-600",
    },
    {
      id: 6,
      title: "E-commerce SEO & Marketing",
      description: "Tailored on-page SEO strategies, Google Merchant Center setup, and conversion rate optimization (CRO) audits.",
      icon: TrendingUp,
      tag: "CRO & SEO",
      span: "col-span-2",
      accent: "from-amber-50 via-orange-50 to-white",
      iconColor: "text-amber-500",
    }
  ];

  const techStack = [
    "Shopify Plus", "Liquid", "GraphQL", "Tailwind CSS", "React (Hydrogen)", "Node.js", "TypeScript", "Figma", "Ruby", "Webpack", "Google Merchant Center", "Algolia"
  ];

  return (
    <div className="bg-white overflow-x-hidden overflow-y-hidden">
      {/* Global Hero with Shopify Development Data */}
      <GlobalHero data={heroData} height="80vh" />

      <GlobalCapabilitiesSection
        badgeText="E-Commerce Services"
        title="Shopify Development Services"
        subtitle="End to end commerce development optimized for revenue, UX performance, and transaction stability."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Commerce Stack"
        title="Modern E-Commerce Tech"
        subtitle="We build stores using robust, industry-standard systems and modern headless integrations."
        techStack={techStack}
      />

      <GlobalServiceCTA 
        theme="light" 
        title="Ready to Scale Your"
        highlightText="Online Business?"
        subtitle="Connect with our experts today for a free Shopify audit and discuss launching or migrating your e-commerce store."
      />
    </div>
  );
};

export default ShopifyDevelopment;
