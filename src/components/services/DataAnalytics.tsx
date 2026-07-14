import React from 'react';
import { BarChart2, PieChart, TrendingUp } from 'lucide-react';
import GlobalHero from './GlobalHero';
import GlobalServiceCTA from './GlobalServiceCTA';
import { GlobalCapabilitiesSection } from './GlobalCapabilitiesSection';
import { GlobalTechStackSection } from './GlobalTechStackSection';

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

  const capabilities = [
    {
      id: 1,
      title: 'Data Engineering',
      description: 'Scalable ETL and data warehouse design for reliable analytics and data pipelines.',
      icon: BarChart2,
      tag: 'Engineering',
      span: 'col-span-1',
      accent: 'from-orange-50 via-amber-50 to-white',
      iconColor: 'text-orange-500',
    },
    {
      id: 2,
      title: 'Business Intelligence',
      description: 'Custom dashboards, KPIs and executive reports for faster decisions and deeper insights.',
      icon: PieChart,
      tag: 'Visualization',
      span: 'col-span-1',
      accent: 'from-slate-50 to-white',
      iconColor: 'text-slate-700',
    },
    {
      id: 3,
      title: 'Predictive Analytics',
      description: 'Forecasting and ML models to surface future trends, anomalies, and opportunities.',
      icon: TrendingUp,
      tag: 'Intelligence',
      span: 'col-span-1',
      accent: 'from-amber-50 to-white',
      iconColor: 'text-amber-600',
    }
  ];

  const techStack = [
    'Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Snowflake', 'Apache Spark', 'Databricks', 'TensorFlow', 'PostgreSQL', 'Redshift', 'BigQuery', 'Apache Airflow', 'Kafka'
  ];

  return (
    <div className="min-h-screen bg-white">
      <GlobalHero data={heroData} height="80vh" />

      <GlobalCapabilitiesSection
        badgeText="Data"
        title="Data Analytics Services"
        subtitle="Comprehensive analytics and BI to measure, optimize, and grow your digital performance."
        capabilities={capabilities}
      />

      <GlobalTechStackSection
        badgeText="Data Stack"
        title="Tools we master."
        subtitle="Cutting-edge tools for processing, managing, visualizing, and analyzing raw data."
        techStack={techStack}
      />

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
