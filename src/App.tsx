import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Whatsapp from './components/common/Whatsapp';
import Contact from './pages/Contact';
import ApplyNowProjectTraining from './pages/ApplyNowProjectTraining';
import ApplyForInternship from './pages/ApplyForInternship';
import JobBoard from './pages/JobBoard';
import Blog from './pages/Blog';
import TeamPage from './pages/TeamPage';


// Layout
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
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
      { path: 'blog', element: <Blog /> },
      { path: 'contact', element: <Contact /> },
      { path: 'apply/projects', element: <ApplyNowProjectTraining /> },
      { path: 'apply/internship', element: <ApplyForInternship /> },
      { path: 'apply/jobs', element: <JobBoard /> },
      { path: 'team', element: <TeamPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;