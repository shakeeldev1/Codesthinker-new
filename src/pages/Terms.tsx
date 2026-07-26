"use client";

import React, { useState, useEffect } from "react";

interface Section {
  id: string;
  title: string;
}

const sections: Section[] = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "definitions", title: "2. Key Definitions" },
  { id: "use-of-website", title: "3. Use of Website" },
  { id: "user-conduct", title: "4. Prohibited Conduct" },
  { id: "intellectual-property", title: "5. Intellectual Property" },
  { id: "external-links", title: "6. External Links" },
  { id: "disclaimers", title: "7. Disclaimers" },
  { id: "limitation-liability", title: "8. Limitation of Liability" },
  { id: "termination", title: "9. Termination" },
  { id: "changes", title: "10. Changes to Terms" },
  { id: "contact", title: "11. Contact Information" },
];

const TermsOfService: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("acceptance");

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
        {/* Ambient Glow Effects */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F49B21]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F49B21]/20 text-[#F49B21] text-xs font-bold uppercase tracking-wider mb-6 border border-[#F49B21]/30">
            Legal Framework
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Terms of Service
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
            
            {/* 1. Acceptance of Terms */}
            <div id="acceptance" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using the <strong className="text-[#050416]">CodesThinker</strong> website and services, you acknowledge that you have read, understood, and unconditionally agree to be bound by these Terms of Service and all applicable local, national, and international laws and regulations.
              </p>
            </div>

            {/* 2. Key Definitions */}
            <div id="definitions" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                2. Key Definitions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                For the purpose of these Terms of Service, the following definitions apply:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { title: '"Company", "we", "us"', desc: "Refers directly to CodesThinker." },
                  { title: '"User", "you"', desc: "Refers to the individual or entity navigating or using our services." },
                  { title: '"Website"', desc: "Refers to CodesThinker\'s online platforms and subdomains." },
                  { title: '"Content"', desc: "Refers to text, code, graphics, media, and features displayed." },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-[#F49B21]/40 transition-colors">
                    <h4 className="text-sm font-bold text-[#050416]">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Use of Website */}
            <div id="use-of-website" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                3. Use of Website
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to utilize this website exclusively for lawful purposes. Your access and engagement with our site are strictly governed by:
              </p>
              <ul className="space-y-3 text-gray-600">
                {[
                  "Compliance with all statutory local and international laws and regulations.",
                  "Adherence to our published community content standards and policies.",
                  "Compliance with third-party service agreements integrated into our digital ecosystem.",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#F49B21] mt-2" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. User Conduct */}
            <div id="user-conduct" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                4. Prohibited User Conduct
              </h2>
              <p className="text-gray-600 leading-relaxed">
                When interacting with our platform, you agree strictly not to:
              </p>
              <div className="space-y-2 text-sm">
                {[
                  "Transmit or post unlawful, harmful, threatening, abusive, or obscene material.",
                  "Impersonate any person, brand, or entity, or misrepresent affiliation with CodesThinker.",
                  "Infringe upon intellectual property, copyrights, or proprietary ownership rights.",
                  "Inject malware, trojans, viruses, or code designed to impair platform infrastructure.",
                  "Attempt unauthorized entry into server configurations, databases, or client accounts.",
                  "Engage in any activity that damages, disables, or discredits our operational reputation.",
                ].map((restriction, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700 font-medium">{restriction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Intellectual Property Rights */}
            <div id="intellectual-property" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                5. Intellectual Property Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The website, structural designs, source code, visual design elements, and original content are owned by or licensed to <strong className="text-[#050416]">CodesThinker</strong> and are protected by applicable international copyright, trademark, and proprietary ownership laws.
              </p>
            </div>

            {/* 6. External Links */}
            <div id="external-links" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                6. Links to Third-Party Websites
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our platform may incorporate hyperlinks leading to third-party web domains. CodesThinker maintains no control over, and assumes no responsibility or liability for, the content, security practices, or terms enforced by external entities.
              </p>
            </div>

            {/* 7. Disclaimers */}
            <div id="disclaimers" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                7. Disclaimers & Warranties
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All platform resources and services are provided strictly on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without explicit or implied warranties of any kind, including fitness for a specific commercial application.
              </p>
            </div>

            {/* 8. Limitation of Liability */}
            <div id="limitation-liability" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To the fullest extent permitted by law, under no circumstances shall CodesThinker, its officers, or employees be held liable for indirect, incidental, consequential, or punitive damages resulting from your usage or inability to access our services.
              </p>
            </div>

            {/* 9. Termination */}
            <div id="termination" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                9. Termination of Service
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate user access privileges immediately, without prior notification or liability, for breach of these Terms or suspected malicious operational activity.
              </p>
            </div>

            {/* 10. Changes to Terms */}
            <div id="changes" className="scroll-mt-28 space-y-4 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                10. Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                CodesThinker retains the authority to modify or update these Terms of Service at any time. Material revisions will be reflected by adjusting the timestamp at the top of this page.
              </p>
            </div>

            {/* 11. Contact Information */}
            <div id="contact" className="scroll-mt-28 space-y-6 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#050416] tracking-tight">
                11. Contact Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have inquiries, feedback, or legal questions regarding these Terms of Service, please reach out directly:
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

          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;