"use client";

import React, { useState, useEffect } from "react";

interface Section {
  id: string;
  title: string;
}

const sections: Section[] = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-collected", title: "2. Information We Collect" },
  { id: "how-we-use", title: "3. How We Use Information" },
  { id: "data-security", title: "4. Data Security" },
  { id: "your-rights", title: "5. Your Rights" },
  { id: "cookies", title: "6. Cookies & Tracking" },
  { id: "third-party", title: "7. Third-Party Services" },
  { id: "contact", title: "8. Contact Us" },
  { id: "changes", title: "9. Policy Changes" },
];

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#050416]">
      {/* Dark Modern Hero Header (Centered) */}
      <header className="relative bg-[#050416] text-white pt-24 pb-16 overflow-hidden">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F49B21]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F49B21]/20 text-[#F49B21] text-xs font-bold uppercase tracking-wider mb-6 border border-[#F49B21]/30">
            Legal Transparency
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            Last updated:{" "}
            <time className="text-[#F49B21] font-semibold">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 p-6 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-100/80 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 px-3">
                Contents
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#F49B21]/15 text-[#050416] font-bold border-l-4 border-[#F49B21] translate-x-1"
                          : "text-gray-600 hover:text-[#050416] hover:bg-gray-50"
                      }`}
                    >
                      {section.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Policy Document Content */}
          <section className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-100/70 space-y-12">
            
            {/* 1. Introduction */}
            <div id="introduction" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At <strong className="text-[#050416]">CodesThinker</strong>, we are deeply committed to safeguarding your privacy and protecting your personal data. This Privacy Policy details how we collect, store, handle, and secure information gathered when you navigate our website or engage with our services.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div id="information-collected" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                2. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Depending on your interaction with our services, we may collect and process the following categories of data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { title: "Personal Identifiers", desc: "Name, email address, phone number" },
                  { title: "Business Data", desc: "Company name, job title, work details" },
                  { title: "Technical Data", desc: "IP address, browser type, device information" },
                  { title: "Usage Metrics", desc: "Pages visited, dwell time, click patterns" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-[#F49B21]/40 transition-colors">
                    <h4 className="text-sm font-bold text-[#050416]">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. How We Use Information */}
            <div id="how-we-use" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                3. How We Use Your Information
              </h2>
              <ul className="space-y-3 text-gray-600">
                {[
                  "Deliver, maintain, and continuously refine our service offerings.",
                  "Efficiently respond to your support requests, inquiries, and consultations.",
                  "Send crucial updates, administrative alerts, or marketing material (with explicit consent).",
                  "Monitor analytical patterns to optimize user experience and site navigation.",
                  "Protect site integrity, verify user authenticity, and prevent fraudulent activity.",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#F49B21] mt-2" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Data Security */}
            <div id="data-security" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                4. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We employ robust, industry-standard administrative, physical, and technical measures designed to safeguard your personal data from accidental loss, unauthorized access, alteration, or disclosure.
              </p>
              <div className="p-5 rounded-2xl bg-[#F49B21]/10 border border-[#F49B21]/30 text-sm text-[#050416]">
                🔒 <strong>Encryption Standards:</strong> Security measures include end to end data encryption in transit and at rest, automated firewalls, and restricted administrative data access controls.
              </div>
            </div>

            {/* 5. Your Rights */}
            <div id="your-rights" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                5. Your Data Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Subject to applicable data privacy laws, you hold full authority over your data. Your rights include:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {[
                  "Accessing stored personal data",
                  "Requesting data corrections",
                  "Right to data erasure ('Right to be Forgotten')",
                  "Restricting processing activities",
                  "Requesting structured data export",
                  "Withdrawing consent anytime",
                ].map((right, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <svg className="w-4 h-4 text-[#F49B21] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 font-medium">{right}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Cookies */}
            <div id="cookies" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                6. Cookies & Tracking Technologies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use operational cookies to remember user preferences and analyze anonymous traffic metrics. You retain the ability to disable non-essential cookies at any time directly through your web browser preferences.
              </p>
            </div>

            {/* 7. Third-Party Services */}
            <div id="third-party" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                7. Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may utilize vetted third-party vendors (such as cloud hosting providers and analytics services) to support our infrastructure. These entities are granted limited access strictly necessary to perform specific tasks on our behalf, under contractual privacy bindings.
              </p>
            </div>

            {/* 8. Contact Us */}
            <div id="contact" className="scroll-mt-28 space-y-6 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                8. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions, concerns, or requests regarding this Privacy Policy or how your information is handled, reach out to our legal team:
              </p>
              
              <div className="p-8 rounded-3xl bg-[#050416] text-white space-y-5 shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#F49B21]/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#F49B21]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Email</span>
                    <p className="text-sm font-medium mt-0.5">info@codesthinker.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#F49B21]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Phone</span>
                    <p className="text-sm font-medium mt-0.5">+44 7470 103120</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#F49B21]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Office Address</span>
                    <p className="text-sm font-medium mt-0.5">
                      Bartle House 9 Oxford Court, Manchester M23WQ, United Kingdom
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 9. Policy Changes */}
            <div id="changes" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                9. Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to amend this Privacy Policy periodically to reflect evolving legal frameworks or operational procedures. Material updates will be highlighted directly on this page alongside an adjusted timestamp.
              </p>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;