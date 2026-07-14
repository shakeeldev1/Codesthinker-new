import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../data/blogData';

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block group h-full">
      <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 relative z-10">
        
        {/* Image Container */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-gray-100">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08061E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category Badge */}
          <span className="absolute top-4 left-4 text-[10px] px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#08061E] font-bold uppercase tracking-widest shadow-sm">
            {post.category}
          </span>
        </div>

        {/* Content Container */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-amber-500"></span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-[#08061E] mb-3 leading-snug group-hover:text-amber-500 transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {post.author.charAt(0)}
              </div>
              <span className="text-sm font-bold text-[#08061E]">{post.author}</span>
            </div>
            
            <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500 text-gray-400 group-hover:text-white transition-all duration-300">
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;