import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Search, ArrowRight, BookOpen, Clock } from "lucide-react";
import video from "../../../public/video.mp4";
import { posts } from "../../data/blogData";
import { Link } from "react-router-dom";
import { SectionBadge } from "../ui/SectionBadge";

const BlogHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Find the first post to show as the featured spotlight in the header
  const featuredPost = posts[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogListSection = document.getElementById("blog-posts-list");
    if (blogListSection) {
      blogListSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#07051D] pt-28 pb-20">
      
      {/* Background Video Layer - 100% Matching Website Hero Theme */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={video}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Dark Navy Overlay - Matching homepage contrast */}
      <div className="absolute inset-0 bg-[#07051D]/75 z-10 pointer-events-none" />

      {/* Modern Gradient Overlays for smooth visual blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07051D] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07051D]/90 via-[#07051D]/40 to-transparent z-10 pointer-events-none" />

      {/* Radial ambient halo glow in background */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#F49B21]/5 filter blur-[150px] pointer-events-none z-10" />

      <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Headings and Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Spotlight/Badge */}
            <SectionBadge text="Ideas, Insights & Tech" theme="dark" className="mb-2" />

            {/* Impressive Typography matching website theme */}
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Ideas that Shape <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F49B21] via-amber-400 to-[#F49B21] bg-[size:200%_auto] animate-pulse">
                The Future
              </span>{" "}
              of Tech
            </h1>

            <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
              Dive into detailed research, engineering strategies, and design paradigms written by the product architects at Codes Thinker.
            </p>

            {/* Glassmorphic Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-lg w-full mx-auto lg:mx-0 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#F49B21] transition-colors" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or categories..." 
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#F49B21] focus:bg-white/10 backdrop-blur-md text-white placeholder-gray-400 rounded-2xl py-4.5 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-[#F49B21]/20 transition-all text-sm shadow-2xl"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#F49B21] hover:bg-amber-500 active:scale-95 text-[#07051D] font-extrabold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-[#F49B21]/25 cursor-pointer"
              >
                Search <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Trending tags */}
            <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap text-xs text-gray-400 w-full lg:w-auto">
              <span className="font-semibold text-gray-300">Popular Topics:</span>
              {["React", "UI/UX Design", "Backend Scaling", "Data Science"].map((tag) => (
                <span 
                  key={tag} 
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-[#F49B21] hover:bg-[#F49B21]/10 hover:text-white transition-all cursor-pointer select-none"
                  onClick={() => {
                    const blogListSection = document.getElementById("blog-posts-list");
                    if (blogListSection) {
                      blogListSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Featured Spotlight Post Card (Responsive) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            {featuredPost && (
              <Link 
                to={`/blog/${featuredPost.slug}`}
                className="group w-full max-w-md block"
              >
                <div className="relative w-full rounded-[2.2rem] overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl p-4.5 shadow-[0_20px_50px_rgba(7,5,29,0.5)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(244,155,33,0.22)] hover:border-[#F49B21]/40 hover:-translate-y-1.5">
                  
                  {/* Category badge */}
                  <span className="absolute top-7 left-7 z-20 text-[9px] px-3.5 py-1.5 rounded-full bg-[#F49B21] text-[#07051D] font-extrabold uppercase tracking-widest shadow-lg">
                    Spotlight Article
                  </span>

                  {/* Image container with zoom effect */}
                  <div className="relative h-56 rounded-2xl overflow-hidden mb-5 bg-gray-900 z-10">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07051D]/70 via-[#07051D]/20 to-transparent z-15" />
                    
                    {/* Glass Glare Sheen Sweep Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms] ease-out z-20 pointer-events-none" />
                  </div>

                  {/* Details */}
                  <div className="space-y-4 px-2 relative z-10">
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-[#F49B21]" /> {featuredPost.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gray-400" /> {featuredPost.readTime}</span>
                    </div>

                    <h3 
                      className="text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#F49B21] transition-colors duration-300"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {featuredPost.title}
                    </h3>

                    <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                      {featuredPost.excerpt}
                    </p>

                    {/* Author block */}
                    <div className="pt-4.5 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F49B21] to-amber-400 flex items-center justify-center text-white text-xs font-bold border border-white/20 shadow-sm">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white leading-none">{featuredPost.author}</p>
                          <p className="text-[8px] text-gray-400 font-bold tracking-wider uppercase mt-1">Contributor</p>
                        </div>
                      </div>

                      <div className="relative overflow-hidden pb-0.5">
                        <span className="text-xs font-bold text-[#F49B21] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read Story <ArrowRight className="w-4 h-4" />
                        </span>
                        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F49B21] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            )}
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[8px] font-mono tracking-[0.3em] text-gray-400 uppercase font-black">Scroll to explore</span>
        <div className="w-5.5 h-9 rounded-full border-2 border-white/20 p-1 flex justify-center bg-[#07051D]/20 backdrop-blur-sm">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-2 rounded-full bg-[#F49B21]"
          />
        </div>
      </div>

      {/* Wave Transition Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none z-10 transform translate-y-[1px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[50px] md:h-[80px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.38,193.36,99.4,241.22,84.1,283.47,69.57,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default BlogHeader;