import React from 'react';
import { BarChart2, PieChart, TrendingUp } from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalHeading from './GlobalHeading';
import GlobalServiceCTA from './GlobalServiceCTA';
import GlobalCard from './GlobalServiceCard';

const DataAnalytics: React.FC = () => {
  const heroData = [
    {
      id: 1,
        subtitle: 'Data & Insights',
        title: 'Data Analytics & Business Intelligence',
        description: 'Convert raw data into clear, actionable insights using robust pipelines, dashboards, and reporting.',
      image: 'https://www.shutterstock.com/image-photo/developer-coding-on-laptop-ai-600nw-2686216519.jpg',
      primaryLink: '/contact',
      secondaryLink: '/projects',
      primaryBtnText: 'Request a Demo',
      secondaryBtnText: 'See Examples'
    }
  ];

  const services = [
    { icon: BarChart2, title: 'Data Engineering', description: 'Scalable ETL and data warehouse design for reliable analytics.' },
    { icon: PieChart, title: 'Business Intelligence', description: 'Custom dashboards, KPIs and executive reports for faster decisions.' },
    { icon: TrendingUp, title: 'Predictive Analytics', description: 'Forecasting and ML models to surface future trends and opportunities.' }
  ];

  return (
    <div className="min-h-screen pt-18 bg-white">
      <GlobalHero data={heroData} height="80vh" />

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <GlobalHeading
            badge={{ text: 'Data' }}
            title="Data Analytics Services"
            titleHighlight="Analytics"
            subtitle="Comprehensive analytics and BI to measure, optimize, and grow"
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
                theme="dark"
              />
            ))}
          </div>
        </div>
      </section>

      <GlobalServiceCTA
        theme="light"
        title="Make Better"
        highlightText="Decisions with Data"
        subtitle="We help teams become data-driven using robust analytics and visualization."
      />
    </div>
  );
};

export default DataAnalytics;
