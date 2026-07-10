import React from "react";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Whatsapp Floating Action Button Component
 * Provides a fixed position link to WhatsApp with a pulse animation.
 */
const Whatsapp: React.FC = () => {
  return (
    <a
      href="https://wa.me/+44 7470 103120"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        {/* Glowing Pulse Circle */}
        <span className="absolute inline-flex h-12 w-12 md:h-16 md:w-16 rounded-full bg-green-400 opacity-75 animate-ping"></span>

        {/* Main Button */}
        <div className="relative bg-green-500 text-white p-3 md:p-4 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)] md:shadow-[0_0_20px_rgba(34,197,94,0.8)] hover:bg-green-600 hover:shadow-[0_0_25px_rgba(34,197,94,1)] hover:scale-110 transition-all duration-300">
          <FaWhatsapp className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>
    </a>
  );
};

export default Whatsapp;