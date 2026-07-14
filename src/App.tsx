import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration, // <-- Add this import
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ServicePage from './pages/ServicePage';
import ServicesPage from './pages/ServicesPage';
import Whatsapp from './components/common/Whatsapp';
import Contact from './pages/Contact';
import ApplyForInternship from './pages/ApplyForInternship';
import ApplyForJob from './pages/ApplyForJob';
import GetOurServices from './pages/GetOurServices';
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPostPage';
import TeamPage from './pages/TeamPage';
import ProjectsPage from './pages/ProjectsPage';
import ScrollToTop from './components/common/ScrollToTop';


// Layout
const MainLayout = () => {
  // Log location changes for debugging navigation issues
  const location = useLocation();
  useEffect(() => {
    console.log('[MainLayout] mounted or location changed ->', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* This component ensures the page scrolls to top on every navigation */}
      <ScrollRestoration /> 
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Whatsapp />
      <Footer />
    </div>
  );
};

// Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:serviceId', element: <ServicePage /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'contact', element: <Contact /> },
      { path: 'apply/internship', element: <ApplyForInternship /> },
      { path: 'apply/job', element: <ApplyForJob /> },
      { path: 'apply/get-services', element: <GetOurServices /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'projects', element: <ProjectsPage /> },
    ],
  },
]);

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;