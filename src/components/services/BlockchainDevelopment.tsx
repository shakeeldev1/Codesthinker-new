import React from 'react';
import { Server, ShieldCheck, Code } from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

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

  const capabilities = [
    {
      id: 1,
      title: 'Smart Contracts',
      description: 'Production-ready smart contracts with automated testing and formal audit support.',
      icon: Code,
      tag: 'Development',
      span: 'col-span-1',
      accent: 'from-orange-50 via-amber-50 to-white',
      iconColor: 'text-orange-500',
    },
    {
      id: 2,
      title: 'DApp Development',
      description: 'Full stack decentralized applications with secure wallet and backend integrations.',
      icon: Server,
      tag: 'Fullstack',
      span: 'col-span-1',
      accent: 'from-slate-50 to-white',
      iconColor: 'text-slate-700',
    },
    {
      id: 3,
      title: 'Security & Audits',
      description: 'Comprehensive security reviews, penetration testing and remediation guidance.',
      icon: ShieldCheck,
      tag: 'Security',
      span: 'col-span-1',
      accent: 'from-amber-50 to-white',
      iconColor: 'text-amber-600',
    }
  ];

  const techStack = [
    'Solidity', 'Rust', 'Hardhat', 'Truffle', 'Ethers.js', 'Web3.js', 'Ethereum', 'Solana', 'Hyperledger', 'IPFS', 'Metamask', 'ERC-20', 'ERC-721', 'Web3'
  ];

  return (
    <div className="min-h-screen bg-white">
      <GlobalHero data={heroData} height="80vh" />

      <GlobalCapabilitiesSection
        badgeText="Blockchain"
        title="Blockchain Development Services"
        subtitle="Decentralized solutions, secure smart contracts, and reliable integrations engineered for trust."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Web3 Stack"
        title="Tools we master."
        subtitle="Modern blockchain networks, tooling, and protocols."
        techStack={techStack}
      />

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
