import React from 'react';
import {
  Brain,
  Eye,
  Gamepad2,
  MessageSquare,
  Globe,
  Zap
} from 'lucide-react';
import GlobalHero1 from './GlobalHero1';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

const GamingAI = () => {
  const capabilities = [
    {
      id: 1,
      title: "Machine Learning",
      description: "Advanced predictive models and intelligent automation systems tailored for optimization.",
      icon: Brain,
      tag: "AI/ML",
      span: "col-span-2",
      accent: "from-orange-50 via-amber-50 to-white",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "Computer Vision",
      description: "Image recognition and visual analysis powered by cutting-edge neural networks.",
      icon: Eye,
      tag: "Vision",
      span: "col-span-1",
      accent: "from-slate-50 to-white",
      iconColor: "text-slate-700",
    },
    {
      id: 3,
      title: "Game Development",
      description: "Immersive 2D/3D experiences with AAA-quality graphics and performant gameplay.",
      icon: Gamepad2,
      tag: "Gaming",
      span: "col-span-1",
      accent: "from-amber-50 to-white",
      iconColor: "text-amber-600",
    },
    {
      id: 4,
      title: "Natural Language",
      description: "Advanced NLP for conversational AI agents and semantic understanding systems.",
      icon: MessageSquare,
      tag: "NLP",
      span: "col-span-1",
      accent: "from-orange-50 to-white",
      iconColor: "text-orange-400",
    },
    {
      id: 5,
      title: "AR/VR Solutions",
      description: "Next-gen immersive technologies and spatial computing for enterprise applications.",
      icon: Globe,
      tag: "Spatial",
      span: "col-span-1",
      accent: "from-stone-50 to-white",
      iconColor: "text-stone-600",
    },
    {
      id: 6,
      title: "Real-time Systems",
      description: "Ultra low-latency data processing pipelines for critical gaming and AI workloads.",
      icon: Zap,
      tag: "Infrastructure",
      span: "col-span-2",
      accent: "from-amber-50 via-orange-50 to-white",
      iconColor: "text-amber-500",
    }
  ];

  const techStack = [
    "Unity", "Unreal Engine", "TensorFlow", "PyTorch", "OpenCV", "C#", "C++", "Python", "CUDA", "Blender", "OpenGL", "Vulkan", "Hugging Face", "Keras"
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
        primaryLink="/contact"
        secondaryLink="/projects"
        primaryBtnText="Build the Future"
        secondaryBtnText="Explore Tech"
      />

      <GlobalCapabilitiesSection
        badgeText="The Advantage"
        title="Next-Gen AI & Gaming"
        subtitle="We combine algorithmic excellence with immersive spatial graphics to build products that redefine industry standards."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Technology Stack"
        title="Tools we master."
        subtitle="Engines, modeling frameworks, low-level languages, and GPU acceleration platforms."
        techStack={techStack}
      />

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