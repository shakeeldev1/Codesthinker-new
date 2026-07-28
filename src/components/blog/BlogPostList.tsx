import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import BlogPostCard from './BlogPostCard';

import { posts } from '../../data/blogData';
import type { BlogPost } from '../../data/blogData';

const BlogPostList: React.FC = () => {
  const categories = ['All', 'Development', 'Design', 'Backend', 'Career', 'Data Science'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = posts.filter(post => 
    activeCategory === 'All' ? true : post.category === activeCategory
  );

  // For Bento Grid (Top 3)
  const bentoPosts = filteredPosts.slice(0, 3);
  const remainingPosts = filteredPosts.slice(bentoPosts.length);

  return (
    <div id="blog-posts-list" className="relative w-full pb-24 bg-transparent">
      
      {/* Premium Static Category Filter */}
      <div className="py-6 bg-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200/80 pb-6 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === category 
                    ? 'bg-[#08061E] text-white border-[#08061E] shadow-md scale-105' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#F49B21] hover:text-[#08061E]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider whitespace-nowrap">
            Showing {filteredPosts.length} articles
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-4">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* BENTO GRID (Only if we have at least 3 posts and it's 'All' or a big category) */}
            {bentoPosts.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
                
                {/* Main Hero Post (Left side, takes 8 cols) */}
                {bentoPosts[0] && (
                  <Link to={`/blog/${bentoPosts[0].slug}`} className="lg:col-span-8 group block h-full">
                    <div className="relative h-full min-h-[500px] rounded-[2rem] overflow-hidden bg-gray-900 shadow-xl">
                      <img 
                        src={bentoPosts[0].image} 
                        alt={bentoPosts[0].title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08061E] via-[#08061E]/60 to-transparent" />
                      
                      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1.5 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
                            {bentoPosts[0].category}
                          </span>
                          <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                            {bentoPosts[0].readTime}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 group-hover:text-amber-400 transition-colors duration-300">
                          {bentoPosts[0].title}
                        </h2>
                        <p className="text-gray-300 text-lg line-clamp-2 max-w-2xl mb-6">
                          {bentoPosts[0].excerpt}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-sm font-bold border border-white/30">
                            {bentoPosts[0].author.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{bentoPosts[0].author}</p>
                            <p className="text-xs text-white/60">{bentoPosts[0].date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Right Side Stacked Posts (Takes 4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  {bentoPosts.slice(1, 3).map((post) => (
                    <Link to={`/blog/${post.slug}`} key={post.id} className="group flex-1 block">
                      <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                        
                        {/* Image Header */}
                        <div className="relative h-44 overflow-hidden bg-gray-100">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                          />
                          <span className="absolute top-4 left-4 text-[9px] px-2.5 py-1.5 rounded-full bg-[#08061E]/80 backdrop-blur-md text-white font-bold uppercase tracking-widest shadow-sm">
                            {post.category}
                          </span>
                        </div>

                        {/* Card Content - Clean Typography without Overlaps */}
                        <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                          <h3 className="text-lg font-bold text-[#08061E] mb-4 leading-snug group-hover:text-amber-500 transition-colors duration-300">
                            {post.title}
                          </h3>
                          
                          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 pt-4 border-t border-gray-100">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            )}

            {/* Standard Grid for Remaining Posts */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingPosts.map((post, index) => (
                  <BlogPostCard 
                    key={post.id}
                    post={post} 
                    index={index} 
                  />
                ))}
              </div>
            )}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-32">
                <h3 className="text-2xl font-bold text-gray-400">No articles found in this category.</h3>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Newsletter Block */}
        <div className="mt-32 bg-[#08061E] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80')] opacity-5 object-cover mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08061E] via-transparent to-transparent z-0" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Stay Ahead of the Curve</h3>
            <p className="text-gray-300 mb-10 text-lg md:text-xl font-light">
              Join 12,000+ tech leaders receiving our latest insights, case studies, and engineering strategies directly to their inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your work email" 
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white/20 transition-all"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-[#F69A20] hover:bg-amber-500 text-white font-extrabold rounded-xl transition-colors shadow-lg shadow-amber-500/25"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-6 font-medium tracking-wide">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default BlogPostList;