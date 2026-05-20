import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration, // <-- Add this import
} from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ServicePage from './pages/ServicePage';
import ServicesPage from './pages/ServicesPage';
import Whatsapp from './components/common/Whatsapp';
import Contact from './pages/Contact';
import ApplyNowProjectTraining from './pages/ApplyNowProjectTraining';
import ApplyForInternship from './pages/ApplyForInternship';
import JobBoard from './pages/JobBoard';
import Blog from './pages/Blog';
import TeamPage from './pages/TeamPage';
import ProjectsPage from './pages/ProjectsPage';
import ScrollToTop from './components/common/ScrollToTop';


// Layout
const MainLayout = () => {
  return (
    <>
      {/* This component ensures the page scrolls to top on every navigation */}
      <ScrollRestoration /> 
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <main>
        <Outlet />
      </main>
      <Whatsapp />
      <Footer />
    </>
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
      { path: 'contact', element: <Contact /> },
      { path: 'apply/projects', element: <ApplyNowProjectTraining /> },
      { path: 'apply/internship', element: <ApplyForInternship /> },
      { path: 'apply/jobs', element: <JobBoard /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'projects', element: <ProjectsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;