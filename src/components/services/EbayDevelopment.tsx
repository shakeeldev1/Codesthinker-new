import React from 'react';
import {
  ShoppingBag,
  RefreshCw,
  Layers,
  BarChart3,
  Package,
  Zap,
} from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const EbayDevelopment = () => {
  const heroData = [
    {
      id: 1,
      subtitle: 'Marketplace Integration',
      title: 'Professional eBay Store Setup & Integration',
      description: 'We build and manage high-performing eBay stores with automated listing sync, inventory management, and seamless multi-channel selling workflows.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
      primaryLink: '/contact',
      secondaryLink: '/projects',
      primaryBtnText: 'Start Your eBay Store',
      secondaryBtnText: 'View Our Work',
    },
  ];

  const capabilities = [
    {
      id: 1,
      title: 'eBay Store Setup',
      description: 'Complete store configuration, branding, policies, and category optimization to launch your eBay presence professionally.',
      icon: ShoppingBag,
      tag: 'Store Setup',
      span: 'col-span-2',
      accent: 'from-orange-50 via-amber-50 to-white',
      iconColor: 'text-orange-500',
    },
    {
      id: 2,
      title: 'Product Listing & Sync',
      description: 'Bulk listing tools, automated product uploads, and real-time inventory sync across your sales channels.',
      icon: Package,
      tag: 'Listings',
      span: 'col-span-1',
      accent: 'from-slate-50 to-white',
      iconColor: 'text-slate-700',
    },
    {
      id: 3,
      title: 'API & ERP Integration',
      description: 'Connect eBay with your warehouse, ERP, or Shopify store using eBay APIs for seamless order and stock management.',
      icon: Layers,
      tag: 'Integrations',
      span: 'col-span-1',
      accent: 'from-amber-50 to-white',
      iconColor: 'text-amber-600',
    },
    {
      id: 4,
      title: 'Multi-Channel Migration',
      description: 'Migrate existing listings from Amazon, Etsy, or your own store to eBay with zero data loss.',
      icon: RefreshCw,
      tag: 'Migration',
      span: 'col-span-1',
      accent: 'from-orange-50 to-white',
      iconColor: 'text-orange-400',
    },
    {
      id: 5,
      title: 'Performance Optimization',
      description: 'SEO-optimized titles, competitive pricing strategies, and promoted listings to maximize visibility and sales.',
      icon: Zap,
      tag: 'Optimization',
      span: 'col-span-1',
      accent: 'from-stone-50 to-white',
      iconColor: 'text-stone-600',
    },
    {
      id: 6,
      title: 'Analytics & Reporting',
      description: 'Sales dashboards, conversion tracking, and performance reports to help you make data-driven selling decisions.',
      icon: BarChart3,
      tag: 'Analytics',
      span: 'col-span-2',
      accent: 'from-amber-50 via-orange-50 to-white',
      iconColor: 'text-amber-500',
    },
  ];

  const techStack = [
    'eBay API', 'eBay Trading API', 'Inventory Sync', 'Node.js', 'Python', 'REST APIs', 'Shopify', 'WooCommerce', 'ERP Integration', 'Bulk Listing Tools', 'Google Sheets', 'Webhooks',
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-x-hidden">
      <GlobalHero data={heroData} height="80vh" />

      <GlobalCapabilitiesSection
        badgeText="eBay Services"
        title="eBay Integration Services"
        subtitle="End to end eBay store setup, product syncing, and marketplace automation built for scale."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Integration Stack"
        title="Tools & Platforms We Use"
        subtitle="Industry-standard APIs and automation tools for reliable eBay marketplace operations."
        techStack={techStack}
      />

      <GlobalServiceCTA
        theme="light"
        title="Ready to Launch Your"
        highlightText="eBay Store?"
        subtitle="Connect with our experts today for a free consultation and start selling on eBay with professional setup and automation."
      />
    </div>
  );
};

export default EbayDevelopment;
