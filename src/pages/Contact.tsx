"use client";

import React, { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

interface FormData {
  firstName: string;
  company: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    text: "+44 7470 103120",
    label: "Phone",
    href: "tel:+447470103120",
  },
  {
    icon: <FaEnvelope />,
    text: "info@codesthinker.com",
    label: "Email",
    href: "mailto:info@codesthinker.com",
  },
  {
    icon: <MdLocationOn />,
    text: "Manchester, UK (Regional)",
    label: "Location",
  },
  {
    icon: <MdLocationOn />,
    text: "Bahawalpur (Global Center)",
    label: "Location",
  },
];

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form
    setFormData({
      firstName: "",
      company: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#050416] flex flex-col font-sans">
      {/* 1. Hero Header */}
      <div
        className="relative w-full min-h-[550px] flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(5, 4, 22, 0.95), rgba(12, 10, 49, 0.9)), url('https://img.magnific.com/free-photo/portrait-asian-girl-works-cafe-uses-laptop-sits-outdoors-street-digital-nomad_1258-189137.jpg?t=st=1779271721~exp=1779275321~hmac=0414f66be79b44de3b4d1f10d999dbddb842f84853f44cc5451ebfe852905373&w=1480')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="z-10 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg text-white">
            Contact Us
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg drop-shadow-md">
            We are ready to provide the right solution tailored to your needs.
          </p>
        </div>

        {/* SVG Wave Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg
            className="relative block w-full h-[80px] md:h-[120px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.9,122.2,192.4,110.15,236.4,101.55,279.7,85.1,321.39,56.44Z"
              className="fill-[#050416]"
            />
          </svg>
        </div>
      </div>

      {/* 2. Main Content Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 z-20 w-full mb-16 relative">
        <div className="bg-[#050416] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-500">
          
          {/* Left Column: Contact Info */}
          <div className="p-8 md:p-12 md:w-5/12 text-gray-300">
            <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Reach out to us for any inquiries or to discuss how we can help accelerate your business.
            </p>

            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center group p-3.5 -ml-3 rounded-2xl hover:bg-[#F49B21]/15 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#F49B21] group-hover:bg-[#F49B21] group-hover:text-[#050416] transition-all duration-300 shadow-sm group-hover:-translate-y-0.5">
                      <span className="text-lg">{item.icon}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
                      {item.label}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white text-sm font-medium mt-0.5 group-hover:text-[#F49B21] transition-colors duration-300 block"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-white text-sm font-medium mt-0.5 group-hover:text-[#F49B21] transition-colors duration-300">
                        {item.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white mb-4">Follow our social channels</h3>
              <div className="flex space-x-3">
                {socialLinks.map(({ icon: Icon, href, label }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#F49B21] hover:text-[#050416] hover:border-[#F49B21] hover:shadow-[0_0_15px_rgba(244,155,33,0.35)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="p-8 md:p-12 md:w-7/12 bg-[#050416] border-t md:border-t-0 md:border-l border-white/10">
            <h2 className="text-3xl font-bold text-white mb-8">Send Us a Message</h2>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="John Doe"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-[#F49B21] focus:ring-2 focus:ring-[#F49B21]/20 outline-none transition-all duration-300 bg-white/[0.05] text-white placeholder:text-gray-500 text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-[#F49B21] focus:ring-2 focus:ring-[#F49B21]/20 outline-none transition-all duration-300 bg-white/[0.05] text-white placeholder:text-gray-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+44 1234 567890"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-[#F49B21] focus:ring-2 focus:ring-[#F49B21]/20 outline-none transition-all duration-300 bg-white/[0.05] text-white placeholder:text-gray-500 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-[#F49B21] focus:ring-2 focus:ring-[#F49B21]/20 outline-none transition-all duration-300 bg-white/[0.05] text-white placeholder:text-gray-500 text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-[#F49B21] focus:ring-2 focus:ring-[#F49B21]/20 outline-none transition-all duration-300 bg-white/[0.05] text-white placeholder:text-gray-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-[#F49B21] focus:ring-2 focus:ring-[#F49B21]/20 outline-none transition-all duration-300 bg-white/[0.05] text-white placeholder:text-gray-500 resize-none text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F49B21] hover:bg-[#e08b1a] disabled:opacity-50 text-[#050416] font-bold py-3.5 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#F49B21]/30 focus:ring-4 focus:ring-[#F49B21]/30 outline-none cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Map Embed Area */}
      <div className="w-full h-96 bg-[#050416]">
        <iframe
          title="Google Map Location"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
          loading="lazy"
          allowFullScreen
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Bartle%20House%209%20Oxford%20Court,%20Manchester%20M23WQ&t=&z=14&ie=UTF8&iwloc=B&output=embed"
        />
      </div>
    </div>
  );
};

export default Contact;