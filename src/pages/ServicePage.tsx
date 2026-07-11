import { useParams, Navigate } from 'react-router-dom';

import SoftwareDevelopment from '../components/services/SoftwareDevelopment';
import WebDevelopment from '../components/services/WebDevelopment';
import MobileDevelopment from '../components/services/MobileDevelopment';
import GamingAI from '../components/services/GamingAI';
import CyberSecurity from '../components/services/CyberSecurity';
import RemoteITResources from '../components/services/RemoteITResources';
import UIUXDesign from '../components/services/UIUXDesign';
import GraphicDesign from '../components/services/GraphicDesign';
import DigitalMarketing from '../components/services/DigitalMarketing';
import BlockchainDevelopment from '../components/services/BlockchainDevelopment';
import DataAnalytics from '../components/services/DataAnalytics';
import WordPressDevelopment from '../components/services/WordPressDevelopment';
import ShopifyDevelopment from '../components/services/ShopifyDevelopment';

const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  switch (serviceId) {
    case 'software':
      return <SoftwareDevelopment />;
    case 'web':
      return <WebDevelopment />;
    case 'mobile':
      return <MobileDevelopment />;
    case 'gaming':
      return <GamingAI />;
    case 'security':
      return <CyberSecurity />;
    case 'resources':
      return <RemoteITResources />;
    case 'ui-ux':
      return <UIUXDesign />;
    case 'graphic-design':
      return <GraphicDesign />;
    case 'marketing':
      return <DigitalMarketing />;
    case 'blockchain':
      return <BlockchainDevelopment />;
    case 'data-analytics':
      return <DataAnalytics />;
    case 'wordpress':
      return <WordPressDevelopment />;
    case 'shopify':
      return <ShopifyDevelopment />;
    case 'ebay':
      return <Navigate to="/contact" replace />;
    default:
      // Redirect to home if the service route is invalid
      return <Navigate to="/" replace />;
  }
};

export default ServicePage;
