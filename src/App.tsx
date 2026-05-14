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
import ServicePage from './pages/ServicePage';
import Whatsapp from './components/common/Whatsapp';




// Layout
const MainLayout = () => {
  return (
    <>
    <Navbar />
      <Outlet />
      <Whatsapp/>
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
      { path: 'services/:serviceId', element: <ServicePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;