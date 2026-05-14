import React from 'react';
import BlogPostList from '../components/blog/BlogPostList';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07051D] via-[#0c0838] to-[#07051D] text-white relative overflow-hidden flex flex-col items-center py-20 px-6">
      {/* Light Grid Background */}
      <svg
        className="absolute inset-0 pointer-events-none z-0"
        width="1440"
        height="1200"
        viewBox="0 0 1440 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.08 }}
      >
        <defs>
          <pattern id="grid-blog" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#F59C24" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1440" height="1200" fill="url(#grid-blog)" />
      </svg>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-amber-500/10 via-transparent to-transparent rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-600/10 via-transparent to-transparent rounded-full blur-[130px] animate-pulse-delayed" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-gradient-radial from-purple-500/5 via-transparent to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <header className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">Latest Insights</span>
          </div>
          <h1 className="text-5xl  font-bold tracking-tight mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Blog</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Discover the latest trends, tutorials, and insights from the world of technology and design.
          </p>
        </header>

        <BlogPostList />
      </div>
    </div>
  );
};

export default Blog;
