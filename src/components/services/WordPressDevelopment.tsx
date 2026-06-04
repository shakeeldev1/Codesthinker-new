import React from 'react';
import { Globe, PenTool, Layers } from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';

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

  const services = [
    { icon: PenTool, title: 'Custom Themes', description: 'Bespoke, responsive themes built for speed and accessibility.' },
    { icon: Layers, title: 'Plugin Development', description: 'Tailored plugins to add business-specific functionality and integrations.' },
    { icon: Globe, title: 'Migrations & Optimization', description: 'Seamless migrations, performance tuning and security hardening for scale.' }
  ];

  return (
    <div className="min-h-screen pt-18 bg-white">
      <GlobalHero data={heroData} height="80vh" />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <GlobalHeading
            badge={{ text: 'WordPress' }}
            title="WordPress Development Services"
            titleHighlight="WordPress"
            subtitle="Fast, secure and content-first WordPress experiences"
            alignment="center"
            textColor="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {services.map((s, i) => (
              <GlobalCard
                key={i}
                index={i}
                title={s.title}
                description={s.description}
                icon={<s.icon size={28} />}
                theme="light"
              />
            ))}
          </div>
        </div>
      </section>

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
