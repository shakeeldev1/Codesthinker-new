// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  gradient: string;
  tags: string[];
  slug: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ 
  post, 
  index, 
  isActive = false,
  onClick 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 text-[10px] px-3 py-1.5 rounded-full bg-[#F69A20] text-white font-bold uppercase tracking-wider shadow-md z-10">
          {post.category}
        </span>

        {/* Read Time Badge */}
        <span className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/80 font-medium flex items-center gap-1 z-10">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {post.readTime}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight text-gray-900 group-hover:text-[#F69A20] transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed mb-3 text-gray-600 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:text-[#F69A20] hover:border-[#F69A20] transition-all duration-300 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-500">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Author & Date Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            {/* Author Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F69A20]/20 to-orange-500/10 border border-gray-200 flex items-center justify-center text-xs font-bold text-[#F69A20]">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900 line-clamp-1">{post.author}</p>
              <p className="text-[10px] text-gray-500">{post.date}</p>
            </div>
          </div>
          
          {/* Read More Link */}
          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-medium text-[#F69A20] hover:text-orange-600 transition-colors flex items-center gap-1 group/link"
          >
            Read More
            <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;