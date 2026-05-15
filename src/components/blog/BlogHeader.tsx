import React from 'react';
import { motion } from 'framer-motion';

interface BlogHeaderProps {
  totalPosts: number;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ totalPosts }) => {
  return (
    <header className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
        <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">Latest Insights</span>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl  font-bold tracking-tight mb-6"
      >
        Our{' '}
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            Blog
          </span>
          <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 400 20" fill="none">
            <path d="M0 10 Q100 20 200 10 Q300 0 400 10" stroke="url(#gradient)" strokeWidth="3" fill="none" strokeLinecap="round">
              <animate attributeName="stroke-dasharray" from="0 800" to="800 800" dur="2s" fill="freeze" />
            </path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
      >
        Discover the latest trends, tutorials, and insights from the world of technology and design.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center gap-8 mt-8"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-sm text-white/50">{totalPosts} articles</span>
        </div>
        <div className="w-px h-4 bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">📚 6+ categories</span>
        </div>
        <div className="w-px h-4 bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">✨ Weekly updates</span>
        </div>
      </motion.div>
    </header>
  );
};

export default BlogHeader;