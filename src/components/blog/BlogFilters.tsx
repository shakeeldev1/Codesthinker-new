import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const BlogFilters: React.FC<BlogFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-0 left-0 right-0 z-20"
            >
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-6 py-3 pl-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all backdrop-blur-sm"
                autoFocus
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isSearchOpen && (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm">Search articles...</span>
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => onCategoryChange('All')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
            selectedCategory === 'All'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
              : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogFilters;