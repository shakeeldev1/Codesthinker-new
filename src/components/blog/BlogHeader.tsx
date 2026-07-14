import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Search, ArrowRight, BookOpen, Clock, User } from "lucide-react";
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
    // Search function can be wired up if needed, or it can scroll to list and filter
    const blogListSection = document.getElementById("blog-posts-list");
    if (blogListSection) {
      blogListSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#07051D] pt-24 pb-16">
      
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
      <div className="absolute inset-0 bg-[#07051D]/80 z-10 pointer-events-none" />

      {/* Modern Gradient Overlays for smooth visual blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07051D] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07051D]/90 via-[#07051D]/50 to-transparent z-10 pointer-events-none" />

      <div className="container mx-10 px-6 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Headings and Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Spotlight/Badge */}
                      <SectionBadge text="Ideas, Insights & Tech" theme="dark" className="mb-4" />

            {/* Impressive Typography matching website theme */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Ideas that Shape <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F49B21] to-amber-400">
                The Future
              </span>{" "}
              of Tech
            </h1>

            <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Dive into detailed research, engineering strategies, and design paradigms written by the product architects at Codes Thinker.
            </p>

            {/* Glassmorphic Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-lg w-full mx-auto lg:mx-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or categories..." 
                className="w-full bg-white/10 border border-white/15 backdrop-blur-md text-white placeholder-gray-400 rounded-2xl py-4 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-[#F49B21]/50 focus:border-[#F49B21] transition-all text-sm shadow-xl"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-[#F49B21] hover:bg-amber-500 text-[#07051D] font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer"
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
                  className="px-3 py-1 rounded-md bg-white/5 border border-white/10 hover:border-[#F49B21] hover:text-white transition-colors cursor-pointer"
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            {featuredPost && (
              <Link 
                to={`/blog/${featuredPost.slug}`}
                className="group w-full max-w-md block"
              >
                <div className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-[0_20px_50px_rgba(7,5,29,0.5)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(244,155,33,0.15)] hover:border-white/20">
                  
                  {/* Category badge */}
                  <span className="absolute top-7 left-7 z-20 text-[9px] px-2.5 py-1.5 rounded-full bg-[#F49B21] text-[#07051D] font-extrabold uppercase tracking-widest shadow-lg">
                    Spotlight Article
                  </span>

                  {/* Image container with zoom effect */}
                  <div className="relative h-56 rounded-2xl overflow-hidden mb-5 bg-gray-900">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07051D]/60 to-transparent" />
                  </div>

                  {/* Details */}
                  <div className="space-y-4 px-2">
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-[#F49B21]" /> {featuredPost.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-[#F49B21] transition-colors duration-300">
                      {featuredPost.title}
                    </h3>

                    <p className="text-gray-300 text-sm font-light leading-relaxed line-clamp-2">
                      {featuredPost.excerpt}
                    </p>

                    {/* Author block */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold border border-white/10">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{featuredPost.author}</p>
                          <p className="text-[10px] text-gray-400">Contributor</p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#F49B21] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>

                  </div>
                </div>
              </Link>
            )}
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default BlogHeader;