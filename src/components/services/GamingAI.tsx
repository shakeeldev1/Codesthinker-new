import React, { useState, useEffect } from 'react';
import {
  Brain,
  Eye,
  Gamepad2,
  MessageSquare,
  Globe,
  Zap,
  Cpu,
  Code2,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  Activity
} from 'lucide-react';
import GlobalHeading from './GlobalHeading';
import GlobalHero1 from './GlobalHero1';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const GamingAI = () => {
  const [scrollY, setScrollY] = useState(0);

  const technologies = [
    { name: "Unity", category: "Engine", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
    { name: "Unreal Engine", category: "Engine", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg" },
    { name: "TensorFlow", category: "AI/ML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", category: "AI/ML", icon: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg" },
    { name: "OpenCV", category: "Vision", icon: "https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg" },
    { name: "C#", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "C++", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Python", category: "Language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features: FeatureCard[] = [
    {
      title: "Machine Learning",
      description: "Advanced predictive models and intelligent automation systems",
      icon: Brain,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Computer Vision",
      description: "Image recognition and visual analysis powered by cutting-edge AI",
      icon: Eye,
      color: "from-amber-400 to-amber-600"
    },
    {
      title: "Game Development",
      description: "Immersive 2D/3D experiences with AAA-quality graphics",
      icon: Gamepad2,
      color: "from-orange-500 to-amber-700"
    },
    {
      title: "Natural Language",
      description: "Advanced NLP for conversational AI and content understanding",
      icon: MessageSquare,
      color: "from-amber-500 to-yellow-500"
    },
    {
      title: "AR/VR Solutions",
      description: "Next-gen immersive technologies for real-world applications",
      icon: Globe,
      color: "from-amber-600 to-orange-400"
    },
    {
      title: "Real-time Systems",
      description: "Low-latency processing for critical gaming and AI operations",
      icon: Zap,
      color: "from-yellow-500 to-amber-500"
    }
  ];

  const processSteps = [
    { number: "01", title: "Analysis", description: "Deep dive into requirements" },
    { number: "02", title: "Design", description: "Architect scalable solutions" },
    { number: "03", title: "Development", description: "Build with precision" },
    { number: "04", title: "Deployment", description: "Launch with confidence" }
  ];

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      {/* Hero Section */}
      <GlobalHero1
        title="AI & Gaming Revolution"
        badge="Revolution"
        subtitle="Harness the power of artificial intelligence. We build intelligent systems and engaging games that redefine possibilities."
        images={[
          "https://blogs.cisco.com/gcs/ciscoblogs/1/2024/07/AI_blog.png",
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
        ]}
      />
      {/* Features Grid */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 md:px-8 bg-white overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <GlobalHeading
            className="mb-16"
            badge={{ text: "The Advantage" }}
            title="Next-Gen AI & Gaming"
            titleHighlight="AI & Gaming"
            subtitle="We combine technical excellence with strategic thinking to build systems that drive real business growth."
            alignment="center"
            textColor="dark"
            gradientColors={{ from: 'from-amber-500', to: 'to-orange-600' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {features.map((feature, index) => (
              <GlobalCard
                key={index}
                index={index}
                title={feature.title}
                description={feature.description}
                icon={<feature.icon size={28} />}
                theme="dark"
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
              />
            ))}
          </div>
        </div>
      </section>

      <GlobalServiceCTA 
        theme="dark" 
        title="Ready to Build the"
        highlightText="Future of AI & Gaming?"
        subtitle="Harness the power of intelligent systems and immersive gaming experiences to redefine your industry."
      />
    </div>
  );
};

export default GamingAI;