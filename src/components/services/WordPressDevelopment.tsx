import React from 'react';
import { Globe, PenTool, Layers } from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const WordPressDevelopment: React.FC = () => {
  const heroData = [
    {
      id: 1,
      subtitle: 'CMS & WordPress',
      title: 'Professional WordPress Development',
      description: 'Custom themes, plugins, and high-performance WordPress sites optimized for content and conversions.',
      image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop',
      primaryLink: '/contact',
      secondaryLink: '/projects',
      primaryBtnText: 'Get a Quote',
      secondaryBtnText: 'View Themes'
    }
  ];

  const capabilities = [
    {
      id: 1,
      title: 'Custom Themes',
      description: 'Bespoke, responsive themes built for speed, accessibility, and unique visual identity.',
      icon: PenTool,
      tag: 'Theme Dev',
      span: 'col-span-1',
      accent: 'from-orange-50 via-amber-50 to-white',
      iconColor: 'text-orange-500',
    },
    {
      id: 2,
      title: 'Plugin Development',
      description: 'Tailored plugins to add business-specific functionality, secure database routines, and API integrations.',
      icon: Layers,
      tag: 'Backend',
      span: 'col-span-1',
      accent: 'from-slate-50 to-white',
      iconColor: 'text-slate-700',
    },
    {
      id: 3,
      title: 'Migrations & Optimization',
      description: 'Seamless migrations, database query optimizations, performance tuning, and security hardening for scale.',
      icon: Globe,
      tag: 'Infrastructure',
      span: 'col-span-1',
      accent: 'from-amber-50 to-white',
      iconColor: 'text-amber-600',
    }
  ];

  const techStack = [
    'WordPress', 'PHP', 'JavaScript', 'MySQL', 'CSS3', 'HTML5', 'WooCommerce', 'Gutenberg', 'WP-CLI', 'Elementor', 'Tailwind CSS', 'Docker'
  ];

  return (
    <div className="min-h-screen bg-white">
      <GlobalHero data={heroData} height="80vh" />

      <GlobalCapabilitiesSection
        badgeText="WordPress"
        title="WordPress Development Services"
        subtitle="Fast, secure, and content-first WordPress experiences designed for easy editorial workflows and speed."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="CMS Stack"
        title="Tools we master."
        subtitle="Core WordPress ecosystems, database servers, query tools, and styling frameworks."
        techStack={techStack}
      />

      <GlobalServiceCTA
        theme="light"
        title="Launch a Beautiful"
        highlightText="WordPress Site"
        subtitle="From blogs to enterprise CMS, we build sites that perform and convert."
      />
    </div>
  );
};

export default WordPressDevelopment;
