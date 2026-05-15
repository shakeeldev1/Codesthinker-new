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
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isActive ? 1 : 0.98,
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative w-full max-w-[380px] h-[520px] flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isActive ? 'z-20' : 'z-10'
      }`}
      onClick={onClick}
      whileHover={{ y: -8 }}
    >
      {/* Gradient Background with Skew Effect */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${post.gradient} ${
          isActive ? 'skew-x-0' : 'skew-x-[12deg]'
        } transition-all duration-500 group-hover:skew-x-0 group-hover:translate-x-[-12px]`}
      />

      {/* Blur Glow Effect */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${post.gradient} ${
          isActive ? 'skew-x-0' : 'skew-x-[12deg]'
        } blur-2xl opacity-40 transition-all duration-500 group-hover:skew-x-0 group-hover:translate-x-[-12px] group-hover:opacity-60`}
      />

      {/* Floating Decorative Elements */}
      <span className="absolute inset-0 z-10 pointer-events-none overflow-visible">
        <span className="absolute w-0 h-0 rounded-xl bg-white/10 backdrop-blur-md opacity-0 shadow-lg border border-white/10 transition-all duration-300 group-hover:w-[60px] group-hover:h-[60px] group-hover:top-[-20px] group-hover:left-[20px] animate-float" />
        <span className="absolute w-0 h-0 rounded-xl bg-white/10 backdrop-blur-md opacity-0 shadow-lg border border-white/10 transition-all duration-500 delay-100 group-hover:w-[60px] group-hover:h-[60px] group-hover:bottom-[-20px] group-hover:right-[20px] animate-float-reverse" />
      </span>

      {/* Main Content Card */}
      <div className={`relative z-20 bg-[#0a0835]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 px-6 py-5 text-white transition-all duration-500 ${
        isActive ? 'translate-x-0' : 'group-hover:-translate-x-5'
      } group-hover:shadow-amber-500/20 w-[94%] h-[94%] flex flex-col`}>
        
        {/* Image Section */}
        <div className="relative h-44 overflow-hidden rounded-xl mb-4 -mx-1">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0835] via-[#0a0835]/40 to-transparent" />
          
          {/* Category Badge */}
          <span className="absolute top-3 left-3 text-[10px] px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold uppercase tracking-wider shadow-lg z-10">
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

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-amber-400 transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed mb-3 text-gray-300 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-500">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Author & Date Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            {/* Author Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 border border-white/20 flex items-center justify-center text-xs font-bold text-amber-400">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-medium text-white line-clamp-1">{post.author}</p>
              <p className="text-[10px] text-gray-500">{post.date}</p>
            </div>
          </div>
          
          {/* Read More Link */}
          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 group/link"
          >
            Read More
            <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Animated Border on Hover */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20" />
      </div>
    </motion.div>
  );
};

export default BlogPostCard;