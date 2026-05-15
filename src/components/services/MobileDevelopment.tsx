import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Zap,
  Shield,
  TrendingUp,
  Code2,
  Users,
  Layers,
  PenTool,
  Cpu,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Globe,
  Smartphone as PhoneIcon,
  BarChart3,
  Lock,
  Clock,
  Award,
  Download,
  Cloud,
  Wifi
} from 'lucide-react';
import GlobalHeading from './GlobalHeading';
import Button from '../common/Button';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';

const MobileDevelopment = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [scrollY, setScrollY] = useState(0);

  const technologies = [
    { name: "Swift", category: "iOS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg" },
    { name: "Kotlin", category: "Android", icon: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png" },
    { name: "React Native", category: "Cross-Platform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Flutter", category: "Cross-Platform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Firebase", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "SQLite", category: "Database", icon: "https://upload.wikimedia.org/wikipedia/commons/9/97/Sqlite-square-icon.svg" },
    { name: "Figma", category: "Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "GraphQL", category: "API", icon: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
  {/* Advanced Mesh Background */}
  <div className="absolute inset-0 z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-600/20 blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    {/* Left Content */}
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-amber-200/80">Available for Projects</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] mb-6 tracking-tighter">
          Mastering <br />
          <span className="italic font-serif bg-gradient-to-r from-amber-200 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            Mobile Flow
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-xl">
          We don't just build apps we engineer digital experiences that sit at the intersection of <span className="text-white">user desire</span> and <span className="text-white">business logic.</span>
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-5">
        <button className="group relative px-10 py-4 overflow-hidden rounded-full bg-amber-500 text-black font-bold transition-all duration-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
          <span className="relative z-10">Launch Your Project</span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
        <button className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 backdrop-blur-xl transition-all duration-300">
          Our Work
        </button>
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
      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <GlobalHeading
            className="mb-16"
            badge={{ text: "Solutions" }}
            title="Comprehensive Mobile Solutions"
            titleHighlight="Mobile Solutions"
            subtitle="End-to-end development services covering every aspect of mobile app creation"
            alignment="center"
            textColor="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <PhoneIcon size={28} />,
                title: 'Native Development',
                description: 'Swift for iOS and Kotlin for Android, built for maximum performance and native capabilities.'
              },
              {
                icon: <Zap size={28} />,
                title: 'Cross-Platform Apps',
                description: 'React Native and Flutter solutions for faster development and multi-platform reach.'
              },
              {
                icon: <PenTool size={28} />,
                title: 'UI/UX Design',
                description: 'Beautiful, intuitive interfaces designed with user experience and engagement at the core.'
              },
              {
                icon: <Cloud size={28} />,
                title: 'Backend Integration',
                description: 'Seamless API integration with cloud services, databases, and third-party platforms.'
              },
              {
                icon: <Shield size={28} />,
                title: 'Security & Privacy',
                description: 'Enterprise-grade security with encryption, secure authentication, and data protection.'
              },
              {
                icon: <TrendingUp size={28} />,
                title: 'App Optimization',
                description: 'Performance tuning, ASO, analytics integration, and continuous improvement strategies.'
              }
            ].map((service, index) => (
              <GlobalCard
                key={index}
                index={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                theme="light"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <GlobalHeading
              badge={{ text: "Technology Stack" }}
              title="Cutting-Edge Technologies"
              titleHighlight="Technologies"
              subtitle="We leverage industry-leading tools and frameworks"
              alignment="center"
              size="lg"
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

      <section className="py-12 flex justify-center bg-[#07051D]">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Ready to Launch Your <span className="text-amber-500">Dream Mobile App?</span>
          </h2>
          <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
            We transform your ideas into powerful, high-performance iOS and Android applications for the global market.
          </p>
          <Button text="Start Your Project" variant="primary" size="md" showArrow className="mx-2" />
          <Button text="Book a Consultation" variant="outline" size="md" className="mx-2" />
        </div>
      </section>
    </div>
  );
};

export default MobileDevelopment;