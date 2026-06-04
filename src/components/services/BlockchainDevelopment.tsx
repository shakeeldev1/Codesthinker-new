import React from 'react';
import { Server, ShieldCheck, Code } from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';

const BlockchainDevelopment: React.FC = () => {
  const heroData = [
    {
      id: 1,
      subtitle: 'Blockchain & Web3',
      title: 'Enterprise-Grade Blockchain Development',
      description: 'Design and deliver secure, scalable blockchain solutions — smart contracts, DApps, and chain integrations with production-ready audits.',
      image: 'https://images.unsplash.com/photo-1603785336168-7f3a9d0a5f63?q=80&w=2070&auto=format&fit=crop',
      primaryLink: '/contact',
      secondaryLink: '/projects',
      primaryBtnText: 'Start a Project',
      secondaryBtnText: 'View Case Studies'
    }
  ];

  const services = [
    { icon: Code, title: 'Smart Contracts', description: 'Production-ready smart contracts with automated testing and formal audit support.' },
    { icon: Server, title: 'DApp Development', description: 'Full-stack decentralized applications with secure wallet and backend integrations.' },
    { icon: ShieldCheck, title: 'Security & Audits', description: 'Comprehensive security reviews, penetration testing and remediation guidance.' }
  ];

  return (
    <div className="min-h-screen pt-18  bg-white">
      <GlobalHero data={heroData} height="80vh" />

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <GlobalHeading
            badge={{ text: 'Blockchain' }}
            title="Blockchain Development Services"
            titleHighlight="Blockchain"
            subtitle="Decentralized solutions, secure smart contracts and reliable integrations"
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
        title="Ready to Explore"
        highlightText="Blockchain Solutions?"
        subtitle="Let's build secure, scalable, and auditable blockchain products together."
      />
    </div>
  );
};

export default BlockchainDevelopment;
