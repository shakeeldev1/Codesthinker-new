import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const NotFound = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  
  let is404 = true;
  let errorMessage = "The page you're looking for seems to have vanished into the digital void.";
  
  if (error) {
    if (isRouteErrorResponse(error)) {
      if (error.status !== 404) {
        is404 = false;
        errorMessage = error.statusText || error.data?.message || "An unexpected error occurred.";
      }
    } else if (error instanceof Error) {
      is404 = false;
      errorMessage = error.message;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* We render Navbar here in case this is used as an errorElement outside of MainLayout */}
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center relative px-4 pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#08061E]/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#F69A20]/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 md:p-16 shadow-2xl"
          >
            {is404 ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.2
                }}
                className="text-[150px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-r from-[#08061E] to-[#2a225c] mb-6 select-none"
              >
                404
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <AlertCircle className="w-32 h-32 text-[#F69A20]" />
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              {is404 ? "Oops! Page Not Found" : "Oops! Something Went Wrong"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-lg mb-10 max-w-lg mx-auto"
            >
              {errorMessage}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
              
              <Link
                to="/"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#08061E] text-white font-semibold hover:bg-[#1a153a] hover:shadow-lg hover:shadow-[#08061E]/20 transition-all"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
