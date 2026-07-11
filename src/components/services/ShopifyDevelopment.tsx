import { useEffect } from 'react';
import {
  ShoppingCart,
  Laptop,
  Layers,
  RefreshCw,
  Zap,
  TrendingUp
} from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';
import GlobalServiceCard1 from './GlobalServiceCard1';
import AOS from "aos";
import "aos/dist/aos.css";

const ShopifyDevelopment = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });
    // Explicitly refresh AOS to re-scan and apply animations after DOM is ready
    setTimeout(() => {
      AOS.refresh();
    }, 100); // Add a small delay
  }, []);

  const heroData = [
    {
      id: 1,
      subtitle: 'E-Commerce',
      title: 'High-Converting Shopify Stores Built to Scale',
      description: 'We build high-performance Shopify stores that blend premium design and clean Liquid/Hydrogen development to deliver frictionless shopping experiences and boost your sales.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
      primaryLink: '/contact',
      secondaryLink: '/projects',
      primaryBtnText: 'Launch Your Store',
      secondaryBtnText: 'View Our Work'
    }
  ];

  const services = [
    {
      icon: ShoppingCart,
      title: "Store Setup & Design",
      description: "Custom store configuration, payment integrations, and visually stunning storefronts aligned with your brand."
    },
    {
      icon: Laptop,
      title: "Custom Theme Development",
      description: "Tailored Shopify Liquid themes or Headless Hydrogen builds crafted for maximum speed and uniqueness."
    },
    {
      icon: Layers,
      title: "App Integrations & APIs",
      description: "Seamless connection with ERPs, CRMs, shipping carriers, and custom private app development."
    },
    {
      icon: RefreshCw,
      title: "Platform Migrations",
      description: "Risk-free migration of products, customers, and orders from WooCommerce, Magento, or custom setups."
    },
    {
      icon: Zap,
      title: "Speed & Performance Optimization",
      description: "Performance auditing, code cleanup, and asset optimization to boost your conversion rates and Google Core Web Vitals."
    },
    {
      icon: TrendingUp,
      title: "E-commerce SEO & Marketing",
      description: "Tailored on-page SEO strategies, Google Merchant Center setup, and conversion rate optimization (CRO) audits."
    }
  ];

  const technologies = [
    { name: "Shopify Plus", category: "E-commerce Platform", icon: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" },
    { name: "Liquid", category: "Template Engine", icon: "/liquid-logo.svg" },
    { name: "GraphQL", category: "Storefront API", icon: "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" },
    { name: "Tailwind CSS", category: "Storefront Styling", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    { name: "React (Hydrogen)", category: "Headless Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", category: "Custom App Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "TypeScript", category: "App Development", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Figma", category: "UI/UX Store Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
  ];

  return (
    <div className="bg-white overflow-x-hidden overflow-y-hidden">
      {/* Global Hero with Shopify Development Data */}
      <GlobalHero data={heroData} height="80vh" />

      {/* Services Grid Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
            <GlobalHeading
              badge={{ text: "E-Commerce Services" }}
              title="Shopify Development Services"
              titleHighlight="Shopify Services"
              subtitle="End-to-end commerce development optimized for revenue and stability"
              alignment="center"
              size="lg"
              gradientColors={{ from: 'from-amber-400', to: 'to-orange-500' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <GlobalCard
                key={index}
                index={index}
                title={service.title}
                description={service.description}
                icon={<service.icon size={28} />}
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
              badge={{ text: "Commerce Stack" }}
              title="Modern E-Commerce Tech"
              titleHighlight="E-Commerce Tech"
              subtitle="We build stores using robust, industry-standard systems and modern headless integrations"
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

      <GlobalServiceCTA 
        theme="light" 
        title="Ready to Scale Your"
        highlightText="Online Business?"
        subtitle="Connect with our experts today for a free Shopify audit and discuss launching or migrating your e-commerce store."
      />
    </div>
  );
};

export default ShopifyDevelopment;
