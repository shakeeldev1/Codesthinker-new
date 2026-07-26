"use client";
import { SectionBadge } from '../ui/SectionBadge';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  HelpCircle,
  MessageCircle,
  Sparkles,
  Search,
  Shield,
  Code2,
  Zap,
  Clock,
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions", icon: HelpCircle },
    { id: "general", name: "General", icon: Sparkles },
    { id: "services", name: "Services", icon: Code2 },
    { id: "process", name: "Process", icon: Clock },
  ];

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "What makes Code's Thinker different?",
      answer: "We combine technical excellence with strategic thinking. Unlike traditional agencies, we act as partners rather than vendors, focusing on long-term success through collaborative approaches and transparent communication.",
      category: "general",
    },
    {
      id: 2,
      question: "How long does it typically take to develop a solution?",
      answer: "Timeline varies based on complexity. A simple MVP can take 4-8 weeks, while enterprise solutions may take 3-6 months. We follow agile methodology, providing regular updates every 2 weeks.",
      category: "process",
    },
    {
      id: 3,
      question: "What technologies do you specialize in?",
      answer: "Our core expertise includes React, Next.js, Node.js, and AI/ML frameworks. We stay technology-agnostic to choose the best stack for your specific project needs and future-proofing.",
      category: "services",
    },
    {
      id: 4,
      question: "Do you offer ongoing maintenance?",
      answer: "Yes! We provide comprehensive post-launch support including 24/7 monitoring, security updates, and performance optimization to ensure your solution stays ahead of the curve.",
      category: "services",
    },
    {
      id: 5,
      question: "Do you work with startups or only large businesses?",
      answer: "We work with startups, SMEs, and enterprise clients. Whether you're building your first MVP or scaling an existing platform, we tailor our solutions to match your business stage and goals.",
      category: "general",
    },
    {
      id: 6,
      question: "Can you help improve or upgrade an existing application?",
      answer: "Yes, we specialize in modernizing legacy systems and improving existing applications by enhancing performance, updating technology stacks, improving UI/UX, and adding new features.",
      category: "services",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4 sm:px-6  lg:px-8 overflow-hidden font-sans">
      {/* Background Decor matching system layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-15"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-15"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: FAQ Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
                <SectionBadge text="Help Centre" theme="light" className="mb-4" />
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Frequently{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
                  <span className="text-[#F69A20]">Asked</span>{" "}
                  Questions
                </span>
              </h2>

              {/* Search Bar */}
              <div className="relative max-w-md group pt-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#F69A20] transition-colors" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:border-gray-400 focus:ring-4 focus:ring-gray-200/50 transition-all outline-none text-gray-800 shadow-sm"
                />
              </div>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-gray-900 text-white shadow-md ring-1 ring-gray-900"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200/60 shadow-sm"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className={`group rounded-xl overflow-hidden transition-all duration-300 bg-white ring-1 ${
                        activeId === faq.id 
                          ? "ring-gray-300 shadow-md" 
                          : "ring-gray-200/60 shadow-sm hover:ring-gray-300"
                      }`}
                    >
                      <button
                        onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                        className="w-full px-5 py-2 flex items-center justify-between text-left"
                      >
                        <span className="text-base sm:text-lg font-bold text-gray-900 ">
                          {faq.question}
                        </span>
                        <div className="flex-shrink-0 ml-4 p-1.5 bg-gray-50 rounded-lg text-gray-500 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                          {activeId === faq.id ? (
                            <Minus className="w-4 h-4 text-[#F69A20]" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {activeId === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.42, 0, 0.58, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-10 text-sm font-medium text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
                    No results found matching your search term.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Image Section */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:pt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative w-full"
            >
              {/* Main Image Base Frame */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 group"
              >
                <img
                  src="/ct.png" 
                  alt="Code's Thinker Support Team"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
                  loading="lazy"
                />
                
                {/* Overlay Screen Shader */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent opacity-80" />

                {/* Floating Support Dynamic Badge */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl ring-1 ring-black/5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Live System</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Support Engineers Online</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Brand Accent Identity Badges */}
              <div className="mt-10 flex items-center justify-center gap-12 text-gray-400 opacity-40 hover:opacity-70 transition-opacity duration-300">
                <Shield className="w-6 h-6" />
                <Zap className="w-6 h-6" />
                <Sparkles className="w-6 h-6" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;