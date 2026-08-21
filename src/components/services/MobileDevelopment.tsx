import React from 'react';
import {
  Zap,
  Shield,
  TrendingUp,
  PenTool,
  Rocket,
  Globe,
  Smartphone as PhoneIcon,
  Cloud
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalHero from './GlobalHero';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const MobileDevelopment = () => {
  const capabilities = [
    {
      id: 1,
      title: 'Native Development',
      description: 'Swift for iOS and Kotlin for Android, built for maximum performance and native capabilities.',
      icon: PhoneIcon,
      tag: 'Native',
      span: 'col-span-2',
      accent: 'from-orange-50 via-amber-50 to-white',
      iconColor: 'text-orange-500',
    },
    {
      id: 2,
      title: 'Cross-Platform Apps',
      description: 'React Native and Flutter solutions for faster development and multi-platform reach.',
      icon: Zap,
      tag: 'Hybrid',
      span: 'col-span-1',
      accent: 'from-slate-50 to-white',
      iconColor: 'text-slate-700',
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user experience and engagement at the core.',
      icon: PenTool,
      tag: 'Design',
      span: 'col-span-1',
      accent: 'from-amber-50 to-white',
      iconColor: 'text-amber-600',
    },
    {
      id: 4,
      title: 'Backend Integration',
      description: 'Seamless API integration with cloud services, databases, and third-party platforms.',
      icon: Cloud,
      tag: 'Backend',
      span: 'col-span-1',
      accent: 'from-orange-50 to-white',
      iconColor: 'text-orange-400',
    },
    {
      id: 5,
      title: 'Security & Privacy',
      description: 'Enterprise-grade security with encryption, secure authentication, and data protection.',
      icon: Shield,
      tag: 'Security',
      span: 'col-span-1',
      accent: 'from-stone-50 to-white',
      iconColor: 'text-stone-600',
    },
    {
      id: 6,
      title: 'App Optimization',
      description: 'Performance tuning, App Store Optimization (ASO), analytics, and continuous improvement.',
      icon: TrendingUp,
      tag: 'Growth',
      span: 'col-span-2',
      accent: 'from-amber-50 via-orange-50 to-white',
      iconColor: 'text-amber-500',
    }
  ];

  const techStack = [
    "Swift", "Kotlin", "React Native", "Flutter", "Firebase", "SQLite", "Figma", "GraphQL", "Objective-C", "Java", "App Store Connect", "Google Play Console", "Realm", "Redux"
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 bg-[#07051d] overflow-hidden">
        {/* Advanced Mesh Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-px bg-white w-6 sm:w-8" />
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-white/70">
                  Available for Projects
                </p>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tighter">
                Mastering <br />
                <span className="bg-gradient-to-r from-amber-200 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  Mobile Flow
                </span>
              </h1>

              <p className="text-base sm:text-xl text-gray-200 leading-relaxed max-w-xl">
                We don't just build apps we engineer digital experiences that sit at the intersection of <span className="text-white">user desire</span> and <span className="text-white">business logic.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-5">
              <Link 
                to="/contact"
                className="group relative px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base overflow-hidden rounded-xl bg-amber-500 text-[#07051d] font-bold transition-all duration-300 shadow-lg focus:outline-none block"
              >
                <span className="relative z-10">Launch Your Project</span>
                <div className="absolute inset-0 -translate-x-full bg-white/30 group-hover:translate-x-full transition-transform duration-700 ease-in-out rotate-12" />
              </Link>
              <Link 
                to="/projects"
                className="px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base bg-transparent hover:bg-white hover:text-[#07051d] text-white font-bold rounded-xl border-2 border-white transition-all duration-300 shadow-lg cursor-pointer block text-center"
              >
                Our Work
              </Link>
            </div>

          </div>

          {/* Right Visual: 3D Phone Perspective */}
          <div className="relative perspective-1000 hidden lg:flex items-center justify-center">
            <div className="relative transform-gpu rotate-y-[-25deg] rotate-x-[10deg] hover:rotate-y-[-10deg] transition-transform duration-1000 ease-out">
              {/* Shadow under the phone */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/60 blur-3xl rounded-[100%]" />

              {/* Phone frame */}
              <div className="w-[220px] h-[440px] bg-slate-900 rounded-[2.2rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden ring-1 ring-white/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent z-10 pointer-events-none" />

                {/* Internal Screen Mockup */}
                <div className="h-full w-full bg-[#050505] p-4 flex flex-col gap-4">
                  <div className="w-1/2 h-4 bg-white/10 rounded-full mt-8" />
                  <div className="w-full h-32 bg-amber-500/10 rounded-2xl border border-amber-500/20 animate-pulse" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-white/5 rounded-xl" />
                    <div className="h-24 bg-white/5 rounded-xl" />
                  </div>
                  <div className="mt-auto w-full h-12 bg-amber-500 rounded-xl" />
                </div>
              </div>

              {/* Floating "Notification" card */}
              <div className="absolute -right-20 top-1/4 w-48 p-4 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-black" strokeWidth={3} />
                  </div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-tight">Active Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalCapabilitiesSection
        badgeText="Solutions"
        title="Comprehensive Mobile Solutions"
        subtitle="End to end development services covering every aspect of mobile app creation, optimization, and scaling."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Technology Stack"
        title="Tools we master."
        subtitle="Native languages, hybrid SDKs, cloud backend platforms, and design tools."
        techStack={techStack}
      />

      <GlobalServiceCTA
        theme="light"
        title="Ready to Launch Your"
        highlightText="Dream Mobile App?"
        subtitle="We transform your ideas into powerful, high performance iOS and Android applications for the global market."
      />
    </div>
  );
};

export default MobileDevelopment;