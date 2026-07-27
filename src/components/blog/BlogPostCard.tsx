import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../data/blogData';

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index }) => {
  // Determine hover glow shadow color based on category for a premium reactive touch
  const getGlowColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'development':
        return 'group-hover:shadow-[0_20px_50px_-12px_rgba(244,155,33,0.22)] hover:border-[#F49B21]/50';
      case 'design':
        return 'group-hover:shadow-[0_20px_50px_-12px_rgba(168,85,247,0.22)] hover:border-purple-500/50';
      case 'backend':
        return 'group-hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.22)] hover:border-blue-500/50';
      case 'data science':
        return 'group-hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.22)] hover:border-emerald-500/50';
      default:
        return 'group-hover:shadow-[0_20px_50px_-12px_rgba(244,155,33,0.20)] hover:border-[#F49B21]/50';
    }
  };

  return (
    <Link to={`/blog/${post.slug}`} className="block group h-full select-none">
      
      {/* Outer 1.2px Gradient Border Wrapper (Slate-to-transparent default, glowing gold-to-navy on hover) */}
      <div 
        className={`flex flex-col w-full rounded-[2.2rem] p-[1.2px] bg-gradient-to-br from-slate-200 via-slate-100/50 to-transparent hover:from-[#F49B21] hover:via-amber-400 hover:to-[#07051d]/20 transition-all duration-500 shadow-[0_12px_40px_rgba(7,5,29,0.035)] hover:-translate-y-2 z-10 h-[460px] ${getGlowColor(post.category)}`}
      >
        {/* Inner Card Body */}
        <div className="flex flex-col h-full w-full bg-white rounded-[2.1rem] overflow-hidden relative justify-between flex-grow">
          
          {/* Default Background Layer (Sophisticated Navy-to-Amber Mesh) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#07051d]/05 via-white to-amber-50/15 z-0 pointer-events-none" />

          {/* Hover Background Layer (Glowing Amber-to-White) */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-amber-50/10 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

          {/* Luxury Blueprint Grid Pattern Overlay */}
          <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(to_right,#07051d08_1px,transparent_1px),linear-gradient(to_bottom,#07051d08_1px,transparent_1px)] bg-[size:16px_24px]" />

          {/* Animated radial halo glow in the background */}
          <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(244,155,33,0.12)_0%,transparent_60%)] blur-2xl z-0" />

          {/* Full vertical layout */}
          <div className="flex flex-col h-full w-full relative z-10 justify-between flex-grow">
            
            {/* Top image - Sized perfectly with zoom, sheen glare, & category badge */}
            <div className="w-full h-48 overflow-hidden relative bg-slate-100 flex-shrink-0">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent z-10" />
              
              {/* Glass Glare Sheen Sweep Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms] ease-out z-20 pointer-events-none" />

              {/* Category floating glass tag */}
              <span className="absolute top-4 left-4 z-20 text-[9px] px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#07051D] font-extrabold uppercase tracking-widest border border-slate-200/40 shadow-sm transition-all duration-350 group-hover:bg-[#F49B21] group-hover:text-[#07051D] group-hover:border-transparent">
                {post.category}
              </span>
            </div>

            {/* Bottom text */}
            <div className="p-6 md:p-7 flex flex-col justify-between flex-grow h-full relative z-10">
              
              <div className="space-y-3.5">
                {/* Metadata Row with pulsing active dot */}
                <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase font-bold text-[#F49B21]">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">{post.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F49B21] animate-pulse"></span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#F49B21]" /> {post.readTime}</span>
                  </div>
                  <span className="text-slate-400/80 font-black">NO. {String(index + 1).padStart(2, '0')}</span>
                </div>

                {/* Title with Outfit Font */}
                <h3 
                  className="text-lg font-bold tracking-tight leading-snug group-hover:text-[#F49B21] transition-colors duration-300 line-clamp-2 text-[#07051D]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {post.title}
                </h3>

                {/* Micro-interactive Golden Separator Line */}
                <div className="h-[2px] w-8 bg-[#F49B21]/30 group-hover:w-full transition-all duration-500 ease-out rounded-full" />

                {/* Excerpt description */}
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer details */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-[#F49B21] flex items-center justify-center text-white text-[10px] font-black shadow shadow-amber-500/10">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-none">{post.author}</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-1">Contributor</p>
                  </div>
                </div>

                <div className="relative overflow-hidden pb-0.5">
                  <span className="text-xs font-bold text-[#F49B21] flex items-center gap-1.5 transition-transform duration-300">
                    Read Story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F49B21] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </Link>
  );
};

export default BlogPostCard;