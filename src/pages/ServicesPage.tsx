import React from 'react';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Gamepad2, 
  ShieldCheck, 
  Users, 
  Palette, 
  PenTool, 
  TrendingUp,
  Server,
  BarChart,
  ShoppingCart,
  CheckCircle2,
  Lock,
  Cpu,
  Database
} from 'lucide-react';
import GlobalHero from '../components/services/GlobalHero';
import GlobalHeading from '../components/services/GlobalHeading';
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

// Interactive CSS mockups for the Bento Cards
const TerminalMockup = () => (
  <div className="w-full h-44 bg-[#050415] rounded-2xl border border-white/5 p-4 flex flex-col font-mono text-[10px] text-slate-300 shadow-2xl relative overflow-hidden group-hover:border-[#F49B21]/30 transition-colors duration-500">
    <div className="flex items-center gap-1.5 pb-2.5 border-b border-white/5 mb-2.5">
      <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
      <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
      <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
      <span className="text-[8px] text-slate-500 ml-2">ct@codesthinker: ~</span>
    </div>
    <div className="space-y-1 select-none flex-grow">
      <div className="text-slate-500">// Fetching scalable API configuration...</div>
      <div><span className="text-[#F49B21]">&gt;</span> npm run deploy:cloud</div>
      <div className="text-emerald-400">✓ Optimization pipeline complete.</div>
      <div className="text-blue-400">ℹ Running on AWS ECS / Serverless.</div>
      <div className="flex items-center gap-1">
        <span className="text-purple-400">const</span> <span className="text-blue-300">CT_App</span> = <span className="text-[#F49B21]">async</span> () =&gt; &#123;
      </div>
      <div className="pl-4 text-slate-400">await initStack();</div>
      <div className="pl-4 flex items-center gap-0.5">
        <span className="text-emerald-400">return</span> <span className="text-yellow-200">"🚀 Scale & Build"</span>;
        <span className="w-1 h-2.5 bg-[#F49B21] animate-pulse"></span>
      </div>
      <div>&#125;</div>
    </div>
  </div>
);

const BrowserMockup = () => (
  <div className="w-full h-44 bg-[#050415] rounded-2xl border border-white/5 flex flex-col shadow-2xl overflow-hidden group-hover:border-[#F49B21]/30 transition-colors duration-500">
    <div className="flex items-center gap-1.5 p-2 bg-white/5 border-b border-white/5">
      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
      <div className="bg-white/5 text-[8px] text-slate-400 px-3 py-0.5 rounded flex-grow text-center truncate mx-4">
        https://codesthinker.com/dashboard
      </div>
    </div>
    <div className="p-3.5 flex-grow grid grid-cols-12 gap-2 text-[8px]">
      <div className="col-span-3 space-y-1.5 border-r border-white/5 pr-1.5">
        <div className="h-2 bg-[#F49B21]/20 rounded w-full animate-pulse"></div>
        <div className="h-1.5 bg-white/5 rounded w-4/5"></div>
        <div className="h-1.5 bg-white/5 rounded w-3/4"></div>
      </div>
      <div className="col-span-9 space-y-2">
        <div className="grid grid-cols-3 gap-1">
          <div className="bg-white/5 rounded p-1 flex flex-col items-center">
            <span className="text-[6px] text-slate-500">Visits</span>
            <span className="font-bold text-[#F49B21]">+24%</span>
          </div>
          <div className="bg-white/5 rounded p-1 flex flex-col items-center">
            <span className="text-[6px] text-slate-500">Sales</span>
            <span className="font-bold text-emerald-400">$18k</span>
          </div>
          <div className="bg-white/5 rounded p-1 flex flex-col items-center">
            <span className="text-[6px] text-slate-500">Speed</span>
            <span className="font-bold text-blue-400">99</span>
          </div>
        </div>
        <div className="bg-white/5 rounded p-2 h-14 flex items-end gap-1 justify-center">
          <div className="bg-white/10 w-2.5 rounded-t-sm h-6 group-hover:h-10 transition-all duration-700"></div>
          <div className="bg-[#F49B21]/80 w-2.5 rounded-t-sm h-10 group-hover:h-12 transition-all duration-700"></div>
          <div className="bg-white/10 w-2.5 rounded-t-sm h-4 group-hover:h-8 transition-all duration-700"></div>
          <div className="bg-emerald-400/80 w-2.5 rounded-t-sm h-12 group-hover:h-9 transition-all duration-700"></div>
          <div className="bg-[#F49B21] w-2.5 rounded-t-sm h-8 group-hover:h-11 transition-all duration-700"></div>
        </div>
      </div>
    </div>
  </div>
);

const CanvasMockup = () => (
  <div className="w-full h-44 bg-[#050415] rounded-2xl border border-white/5 flex flex-col shadow-2xl overflow-hidden group-hover:border-[#F49B21]/30 transition-colors duration-500 relative">
    <div className="flex items-center justify-between p-2 bg-white/5 border-b border-white/5 text-[8px] text-slate-400">
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-white">Design-Canvas</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-1 h-1 rounded-full bg-[#F49B21]"></div>
        <span className="text-[7px] text-[#F49B21]">Active</span>
      </div>
    </div>
    
    <div className="p-3 flex-grow flex items-center justify-center relative">
      <div className="w-full h-28 border border-dashed border-white/10 rounded-lg relative flex items-center justify-center bg-white/[0.01]">
        <div className="absolute inset-x-0 h-px bg-blue-500/10"></div>
        <div className="absolute inset-y-0 w-px bg-blue-500/10"></div>
        
        <div className="w-10 h-10 rounded bg-gradient-to-tr from-[#F49B21]/30 to-[#F49B21]/5 border border-[#F49B21] group-hover:rotate-45 transition-transform duration-700 relative flex items-center justify-center">
          <span className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-blue-500 rounded-sm"></span>
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-blue-500 rounded-sm"></span>
        </div>
        
        <div className="absolute top-1.5 left-1.5 bg-[#0c0933]/90 border border-white/10 rounded px-1 text-[7px] text-blue-300">
          Rect: 40x40
        </div>
        
        <div className="absolute top-2/3 left-2/3 group-hover:top-1/3 group-hover:left-1/2 transition-all duration-700 ease-out z-10 pointer-events-none">
          <svg className="w-3.5 h-3.5 text-[#F49B21] drop-shadow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.5 3v15.2l3.8-3.8 2.5 5.8 2.3-1-2.5-5.7 4.8-.1L4.5 3z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const PhoneMockup = () => (
  <div className="relative w-28 h-40 bg-[#050415] rounded-2xl border-4 border-white/10 shadow-2xl overflow-hidden mx-auto group-hover:border-[#F49B21]/30 transition-colors duration-500">
    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-white/10 rounded-full flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
    </div>
    <div className="p-2.5 pt-5 space-y-2 text-[6px]">
      <div className="flex items-center gap-1 bg-white/5 p-1 rounded">
        <div className="w-3.5 h-3.5 rounded-full bg-[#F49B21] flex-shrink-0"></div>
        <div className="space-y-0.5 flex-grow">
          <div className="h-1 bg-white/20 rounded w-4/5"></div>
          <div className="h-1 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
      <div className="bg-white/5 p-1.5 rounded space-y-1.5 h-18 overflow-hidden">
        <div className="h-1 bg-white/20 rounded w-full"></div>
        <div className="h-1 bg-white/10 rounded w-11/12"></div>
        <div className="h-1 bg-white/10 rounded w-4/5"></div>
        <div className="h-8 bg-gradient-to-tr from-amber-400/20 to-[#F49B21]/20 rounded-md border border-[#F49B21]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <div className="w-2.5 h-2.5 bg-[#F49B21] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  </div>
);

const SecurityMockup = () => (
  <div className="w-full h-32 flex items-center justify-center relative select-none">
    <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center relative">
      <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '10s' }} />
      <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500/20 to-[#F49B21]/30 flex items-center justify-center border border-[#F49B21]/40 shadow-inner group-hover:scale-110 transition-transform duration-500">
          <Lock className="w-4.5 h-4.5 text-[#F49B21] animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const NeuralNetworkMockup = () => (
  <div className="w-full h-32 flex items-center justify-center relative overflow-hidden select-none">
    <div className="flex items-center gap-4 relative z-10 scale-90">
      <div className="space-y-3">
        <div className="w-1.5 h-1.5 rounded-full bg-[#F49B21]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>
      <div className="relative">
        <div className="w-8 h-8 rounded-full border border-[#F49B21] flex items-center justify-center bg-[#07051d]">
          <Cpu className="w-4.5 h-4.5 text-[#F49B21] animate-spin" style={{ animationDuration: '4s' }} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#F49B21]" />
      </div>
    </div>
  </div>
);

const TeamMockup = () => (
  <div className="w-full h-32 flex flex-col items-center justify-center space-y-2.5">
    <div className="flex -space-x-2.5 overflow-hidden">
      {['E', 'D', 'L', 'S'].map((letter, i) => (
        <div 
          key={i} 
          className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-gradient-to-tr from-amber-400 to-[#F49B21] text-white flex items-center justify-center text-[10px] font-black shadow-md transform hover:translate-y-[-3px] transition-transform duration-300"
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          {letter}
        </div>
      ))}
      <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-slate-200 text-slate-700 flex items-center justify-center text-[9px] font-bold">
        +8
      </div>
    </div>
    <div className="flex flex-wrap justify-center gap-1">
      {['React Dev', 'QA'].map((tag, i) => (
        <span key={i} className="text-[6.5px] font-bold bg-[#07051d]/5 border border-[#07051d]/10 px-1.5 py-0.5 rounded text-slate-600 group-hover:border-[#F49B21]/20 group-hover:text-[#07051d] transition-colors duration-300">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const MarketingMockup = () => (
  <div className="w-full h-32 flex flex-col justify-end p-2 select-none">
    <div className="flex items-end gap-1 justify-center h-20">
      {[40, 60, 45, 85, 55, 95].map((val, i) => (
        <div key={i} className="w-2 bg-[#F49B21]/20 rounded-t-sm h-full flex items-end">
          <div 
            className="w-full bg-[#F49B21] rounded-t-sm transition-all duration-[1000ms] ease-out" 
            style={{ height: `${val}%`, transitionDelay: `${i * 80}ms` }}
          />
        </div>
      ))}
    </div>
  </div>
);

const GraphicMockup = () => (
  <div className="w-full h-32 flex items-center justify-center space-x-0.5 relative select-none">
    {['#F49B21', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'].map((color, i) => (
      <div 
        key={i}
        className="w-4 h-12 rounded-full border border-white shadow-md transform hover:translate-y-[-6px] transition-transform duration-300 flex items-end justify-center pb-1.5 cursor-pointer"
        style={{ backgroundColor: color, zIndex: 5 - i }}
      >
        <div className="w-1 h-1 rounded-full bg-white/80" />
      </div>
    ))}
  </div>
);

const BlockchainMockup = () => (
  <div className="w-full h-32 flex items-center justify-center space-x-3 relative select-none">
    {[0, 1, 2].map((i) => (
      <div key={i} className="flex items-center">
        <div className="w-7 h-7 rounded bg-gradient-to-br from-[#0c0933] to-[#07051d] flex items-center justify-center relative group-hover:border-[#F49B21] transition-colors duration-500 shadow-md">
          <Server className="w-3.5 h-3.5 text-[#F49B21] animate-pulse" />
          <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-emerald-400 rounded-full" />
        </div>
        {i < 2 && (
          <div className="w-3 h-0.5 bg-white/20 relative">
            <div className="absolute inset-0 bg-[#F49B21] opacity-25" />
          </div>
        )}
      </div>
    ))}
  </div>
);

const DataAnalyticsMockup = () => (
  <div className="w-full h-32 flex flex-col items-center justify-center p-2 select-none">
    <div className="w-full bg-[#050415] rounded-xl border border-white/5 p-2 font-mono text-[7px] space-y-1 shadow-md">
      <div className="flex justify-between items-center text-slate-500">
        <span>QUERY PIPELINE</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Database className="w-2.5 h-2.5 text-[#F49B21]" />
        <span className="text-white truncate">SELECT COUNT(*) FROM users</span>
      </div>
      <div className="h-1 bg-white/10 rounded w-full overflow-hidden">
        <div className="h-full bg-emerald-400/80 w-4/5 group-hover:w-full transition-all duration-1000 ease-out" />
      </div>
    </div>
  </div>
);

const WordpressMockup = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-20 h-20 rounded-xl border border-white/5 bg-[#050415] p-2 flex flex-col justify-between shadow-md relative overflow-hidden group-hover:border-[#F49B21]/30 transition-colors duration-500">
      <div className="h-2.5 bg-white/10 rounded w-full" />
      <div className="h-6 bg-white/5 rounded flex items-center justify-center">
        <Globe className="w-4.5 h-4.5 text-slate-600 group-hover:text-[#F49B21] transition-colors duration-500" />
      </div>
    </div>
  </div>
);

const ShopifyMockup = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-amber-500/20 to-[#F49B21]/30 flex items-center justify-center border border-[#F49B21]/40 shadow-inner group-hover:scale-105 transition-transform duration-500">
      <ShoppingCart className="w-6 h-6 text-[#F49B21]" />
    </div>
  </div>
);

const servicesData = [
  {
    id: 'software',
    title: 'Software Development',
    description: 'Custom software solutions tailored to your business needs, from enterprise applications to specialized tools.',
    icon: Code,
    link: '/services/software',
    tag: 'Enterprise',
    isLarge: true,
    mockup: TerminalMockup,
    mockupClass: '',
    features: ['Custom APIs & Microservices', 'High-Scale Architecture', 'Continuous CI/CD Delivery']
  },
  {
    id: 'security',
    title: 'Cyber Security',
    description: 'Robust security solutions to protect your digital assets and ensure data privacy.',
    icon: ShieldCheck,
    link: '/services/security',
    tag: 'Core',
    isLarge: false,
    mockup: SecurityMockup,
    mockupClass: 'lg:absolute lg:bottom-[-10px] lg:right-[-10px] lg:w-32 lg:h-32 relative w-full h-32 mt-6 flex items-center justify-center',
    features: ['Zero-Trust Security Integration', 'Continuous Threat Scanning', 'Penetration Assessment']
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Modern, scalable, and responsive web applications built with cutting-edge technologies.',
    icon: Globe,
    link: '/services/web',
    tag: 'Popular',
    isLarge: true,
    mockup: BrowserMockup,
    mockupClass: '',
    features: ['Single Page Apps (SPAs)', 'Server-Side Rendering (SSR)', 'SEO & Load Speed Optimization']
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Native and cross platform mobile experiences that users love for iOS and Android.',
    icon: Smartphone,
    link: '/services/mobile',
    tag: 'Core',
    isLarge: false,
    mockup: PhoneMockup,
    mockupClass: 'lg:absolute lg:bottom-[-20px] lg:right-[-10px] lg:w-28 lg:h-40 relative w-full h-40 mt-6 flex items-center justify-center',
    features: ['Swift & Kotlin Native Apps', 'Flutter Cross-Platform Dev', 'Seamless App Store Delivery']
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Transformative design solutions and high-converting user experiences.',
    icon: Palette,
    link: '/services/ui-ux',
    tag: 'Creative',
    isLarge: true,
    mockup: CanvasMockup,
    mockupClass: '',
    features: ['Vector Wireframe & Prototype', 'Robust Design System Dev', 'High-Converting Conversion Maps']
  },
  {
    id: 'gaming',
    title: 'AI/ML & Gaming',
    description: 'Innovative gaming experiences and intelligent AI/ML solutions for next-gen applications.',
    icon: Gamepad2,
    link: '/services/gaming',
    tag: 'Next-Gen',
    isLarge: false,
    mockup: NeuralNetworkMockup,
    mockupClass: 'lg:absolute lg:bottom-[-10px] lg:right-[-10px] lg:w-32 lg:h-32 relative w-full h-32 mt-6 flex items-center justify-center',
    features: ['Generative Neural Models', 'Interactive 3D Game Mechanics', 'Adaptive Machine Logic']
  },
  {
    id: 'resources',
    title: 'Remote IT Resources',
    description: 'Access top-tier IT talent and build dedicated remote teams for your projects.',
    icon: Users,
    link: '/services/resources',
    tag: 'Scaling',
    isLarge: false,
    mockup: TeamMockup,
    mockupClass: 'lg:absolute lg:bottom-[10px] lg:right-[10px] lg:w-36 lg:h-32 relative w-full h-32 mt-6 flex items-center justify-center',
    features: ['Dedicated React/Python Devs', 'DevOps & Systems Engineers', 'Agile Team Coordination']
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Comprehensive graphic design solutions to elevate your brand\'s visual identity.',
    icon: PenTool,
    link: '/services/graphic-design',
    tag: 'Creative',
    isLarge: false,
    mockup: GraphicMockup,
    mockupClass: 'lg:absolute lg:bottom-[-15px] lg:right-[-15px] lg:w-32 lg:h-32 relative w-full h-32 mt-6 flex items-center justify-center',
    features: ['Consistent Brand Guidelines', 'Vector Media Production', 'Interactive Marketing Ads']
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'Data driven marketing strategies to boost your online presence and drive growth.',
    icon: TrendingUp,
    link: '/services/marketing',
    tag: 'ROI Focus',
    isLarge: false,
    mockup: MarketingMockup,
    mockupClass: 'lg:absolute lg:bottom-[-15px] lg:right-[-15px] lg:w-32 lg:h-32 relative w-full h-32 mt-6 flex items-center justify-center',
    features: ['Targeted Search Campaigns', 'Lead Funnel Development', 'Analytics & KPI Reporting']
  },
  {
    id: 'blockchain',
    title: 'Blockchain Development',
    description: 'Build secure, scalable blockchain applications, smart contracts, and DApps.',
    icon: Server,
    link: '/services/blockchain',
    tag: 'Secure',
    isLarge: false,
    mockup: BlockchainMockup,
    mockupClass: 'lg:absolute lg:bottom-[15px] lg:right-[5px] lg:w-36 lg:h-32 relative w-full h-32 mt-6 flex items-center justify-center',
    features: ['Solidity Smart Contracts', 'Decentralized App (DApp) Dev', 'Tokenomics & Custody Builds']
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transform data into actionable insights with analytics and BI solutions.',
    icon: BarChart,
    link: '/services/data-analytics',
    tag: 'Analytics',
    isLarge: false,
    mockup: DataAnalyticsMockup,
    mockupClass: 'lg:absolute lg:bottom-[-15px] lg:right-[-15px] lg:w-36 lg:h-32 relative w-full h-32 mt-6 flex items-center justify-center',
    features: ['Actionable BI Dashboards', 'Data Extraction pipelines', 'Metric Prediction modeling']
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    description: 'Custom WordPress themes, plugins and performant CMS-driven sites.',
    icon: Globe,
    link: '/services/wordpress',
    tag: 'Popular',
    isLarge: false,
    mockup: WordpressMockup,
    mockupClass: 'lg:absolute lg:bottom-[-15px] lg:right-[-15px] lg:w-28 lg:h-32 relative w-full h-32 mt-6 flex items-center justify-center',
    features: ['Bespoke Gutenberg themes', 'Plugin integration engineering', 'Database query optimizing']
  },
  {
    id: 'shopify',
    title: 'Shopify Development',
    description: 'High-converting custom Shopify stores, Liquid custom themes, apps and integrations.',
    icon: ShoppingCart,
    link: '/services/shopify',
    tag: 'Commerce',
    isLarge: false,
    mockup: ShopifyMockup,
    mockupClass: 'lg:absolute lg:bottom-[10px] lg:right-[10px] lg:w-24 lg:h-24 relative w-full h-24 mt-6 flex items-center justify-center',
    features: ['Custom Liquid interface', 'Shopify App development', 'API integration']
  }
];

const ServicesPage = () => {
  return (
    <div className="bg-white min-h-screen overflow-x-hidden font-sans">
      {/* Hero Section */}
      <GlobalHero data={servicesHeroData} height="100vh" />

      {/* Services Bento Grid */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 relative z-10 bg-white">
        
        {/* Glow Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full filter blur-[120px]" />
          <div className="absolute top-2/3 left-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full filter blur-[100px]" />
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <GlobalHeading
              badge={{ text: "Our Services" }}
              title="Complete Digital Solutions"
              titleHighlight="Solutions"
              subtitle="From concept to launch, we deliver end to end digital excellence"
              alignment="center"
              size="lg"
              gradientColors={{ from: 'from-amber-400', to: 'to-orange-500' }}
            />
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              const Mockup = service.mockup;
              return (
                <div 
                  key={service.id} 
                  className={`
                    group relative overflow-hidden rounded-[2.2rem] border border-gray-100/80
                    p-8 md:p-9 flex flex-col justify-between cursor-pointer h-auto lg:h-[390px] lg:min-h-[390px]
                    shadow-[0_4px_24px_rgba(7,5,29,0.03)] hover:shadow-[0_24px_60px_-15px_rgba(244,155,33,0.15)]
                    hover:border-[#F49B21]/50 hover:-translate-y-2.5 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${service.isLarge ? 'lg:col-span-2' : 'lg:col-span-1'}
                  `}
                  onClick={() => window.location.href = service.link}
                >
                  {/* Default Background Layer (Prominent Navy Blue to White) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#07051d]/18 via-[#07051d]/03 to-white group-hover:opacity-0 transition-opacity duration-300 z-0" />

                  {/* Hover Background Layer (Prominent Amber to White) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100/70 via-amber-50/30 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

                  {/* Animated radial halo glow in the background */}
                  <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(244,155,33,0.12)_0%,transparent_60%)] blur-2xl z-0" />

                  {/* Top Row: Icon + Tag */}
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-to-tr group-hover:from-amber-400 group-hover:to-[#F49B21] group-hover:border-transparent group-hover:text-[#07051d] text-[#F49B21]">
                      <div className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <Icon size={20} className="pointer-events-none" />
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 group-hover:bg-[#F49B21] group-hover:text-[#07051d] group-hover:border-transparent transition-all duration-300">
                      {service.tag}
                    </span>
                  </div>

                  {/* Layout grid for large cards to structure left text and right mockup */}
                  {service.isLarge ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-grow relative z-10 mb-4">
                      <div className="lg:col-span-7 space-y-3.5 pr-2">
                        <h3 
                          className="text-2xl font-bold tracking-tight text-[#07051d] group-hover:text-[#F49B21] transition-colors duration-300"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans group-hover:text-slate-800 transition-colors duration-300">
                          {service.description}
                        </p>

                        {/* Service Scope Checklist */}
                        <ul className="space-y-1.5 pt-1">
                          {service.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
                              <CheckCircle2 size={13} className="text-[#F49B21]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right column: Mockup in flow */}
                      <div className="lg:col-span-5 mt-2 lg:mt-0">
                        <Mockup />
                      </div>
                    </div>
                  ) : (
                    // Single width card layout
                    <div className="flex flex-col flex-grow relative z-10 lg:pr-24 pr-0 mb-4">
                      <div className="space-y-3">
                        <h3 
                          className="text-xl font-bold tracking-tight text-[#07051d] group-hover:text-[#F49B21] transition-colors duration-300"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans group-hover:text-slate-800 transition-colors duration-300">
                          {service.description}
                        </p>

                        {/* Service Scope Checklist */}
                        <ul className="space-y-1.5 pt-1">
                          {service.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
                              <CheckCircle2 size={13} className="text-[#F49B21]" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mockup Container (Responsive absolute on desktop, flow on mobile) */}
                      <div className={`${service.mockupClass} pointer-events-none transition-all duration-[600ms] ease-out group-hover:scale-105 group-hover:rotate-[-2deg] opacity-75 group-hover:opacity-100 z-10`}>
                        <Mockup />
                      </div>
                    </div>
                  )}

                  {/* Explore Link */}
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F49B21] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out relative z-10 mt-6 lg:mt-auto">
                    <span>Explore Service</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
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
