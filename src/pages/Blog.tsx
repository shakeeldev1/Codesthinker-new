import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogHeader from '../components/blog/BlogHeader';
import BlogPostList from '../components/blog/BlogPostList';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden font-sans">
      <Helmet>
        <title>Insights & Engineering Blog | Codes Thinker</title>
        <meta name="description" content="Discover the latest insights, strategies, and engineering patterns from the experts at Codes Thinker. Stay ahead of the curve in software development." />
      </Helmet>
      
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none bg-[linear-gradient(to_right,#07051d05_1px,transparent_1px),linear-gradient(to_bottom,#07051d05_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Background Decor matching corporate style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-900/5 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDuration: '14s' }}></div>
      </div>

      <div className="relative z-10">
        <BlogHeader />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <BlogPostList />
        </div>
      </div>
    </div>
  );
};

export default Blog;