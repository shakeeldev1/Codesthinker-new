"use client";

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
  Clock,
  Code2,
  Zap,
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
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative py-20 bg-[#F8FAFC] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#07051D]/[0.02] -skew-x-12 transform origin-top" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: FAQ Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#07051D]/5 border border-[#07051D]/10 mb-4">
                <HelpCircle className="w-4 h-4 text-[#07051D]" />
                <span className="text-[#07051D] font-bold text-xs uppercase tracking-wider">Help Center</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#07051D] mb-6 leading-tight">
                Frequently Asked <br />
                <span className="text-[#F59C20]">Questions</span>
              </h2>

              {/* Search Bar */}
              <div className="relative max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#07051D] transition-colors" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 bg-white border border-gray-200 rounded-2xl focus:border-[#07051D] focus:ring-4 focus:ring-[#07051D]/5 transition-all outline-none text-gray-800"
                />
              </div>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-[#07051D] text-white shadow-lg shadow-[#07051D]/20"
                      : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
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
                      className={`group border rounded-2xl transition-all duration-300 ${
                        activeId === faq.id 
                          ? "border-indigo-200 bg-white shadow-xl shadow-indigo-500/5" 
                          : "border-gray-200 bg-transparent hover:border-gray-300"
                      }`}
                    >
                      <button
                        onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                      >
                        <span className={`text-lg font-bold transition-colors ${activeId === faq.id ? "text-[#07051D]" : "text-gray-700 group-hover:text-[#07051D]"}`}>
                          {faq.question}
                        </span>
                        <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${activeId === faq.id ? "rotate-180" : ""}`}>
                          {activeId === faq.id ? (
                            <Minus className="w-5 h-5 text-[#F59C20]" />
                          ) : (
                            <Plus className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {activeId === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-400">No results found for your search.</div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Image Section */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full max-w-full"
            >
              {/* Decorative Blur Backgrounds */}
              <div className="absolute -top-10 -right-10 w-full h-full bg-[#F59C20]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-full h-full bg-indigo-500/10 rounded-full blur-3xl" />

              {/* Main Image with Floating Motion */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img
                  src="public/ct.png" 
                  alt="Customer Support Illustration"
                  className="w-full h-auto drop-shadow-2xl"
                />

                {/* Floating Support Badge */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute top-1/4 -right-4 md:-right-8 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</p>
                    <p className="text-sm font-bold text-[#07051D]">Agents Online</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Minimalist Footer Badges for Right Column */}
              <div className="mt-16 flex items-center justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                <Shield className="w-8 h-8 text-[#07051D]" />
                <Zap className="w-8 h-8 text-[#07051D]" />
                <Sparkles className="w-8 h-8 text-[#07051D]" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;