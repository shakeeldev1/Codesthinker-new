import React from "react";
import ContactHeader from "../components/contact/Hero";
import ContactSection from "../components/contact/ContactSection";


function Contact() {
  return (
    <div className="relative bg-gradient-to-b from-[#0a0820] to-[#030211] overflow-x-hidden">
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(59,130,246,0.05),transparent_50%)]" />
      </div>

      <ContactHeader />
      <ContactSection />
    </div>
  );
}

export default Contact;